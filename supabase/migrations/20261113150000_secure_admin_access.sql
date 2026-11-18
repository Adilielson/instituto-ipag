-- Stage 1: apply only after provisioning and verifying the first admin.
BEGIN;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles r JOIN auth.users u ON u.id = r.user_id WHERE r.role = 'admin' AND u.email_confirmed_at IS NOT NULL) THEN
    RAISE EXCEPTION 'Provision a verified administrator in auth.users and user_roles before applying this migration';
  END IF;
END $$;

-- Replace legacy permissive policies (they combine with OR, so leaving them
-- in place would permit anonymous writes even after adding an admin policy).
DO $$
DECLARE t text; p record;
BEGIN
  FOREACH t IN ARRAY ARRAY['projetos', 'posts', 'eventos', 'blog_categories'] LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    FOR p IN SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename = t LOOP
      EXECUTE format('DROP POLICY %I ON public.%I', p.policyname, t);
    END LOOP;
    EXECUTE format('REVOKE ALL ON public.%I FROM anon, authenticated', t);
    EXECUTE format('GRANT SELECT ON public.%I TO anon, authenticated', t);
    EXECUTE format('GRANT INSERT, UPDATE, DELETE ON public.%I TO authenticated', t);
    EXECUTE format('CREATE POLICY admin_manage ON public.%I FOR ALL TO authenticated USING (public.has_role(auth.uid(), ''admin'')) WITH CHECK (public.has_role(auth.uid(), ''admin''))', t);
    IF t = 'blog_categories' THEN
      EXECUTE format('CREATE POLICY public_read ON public.%I FOR SELECT TO anon, authenticated USING (true)', t);
    ELSE
      EXECUTE format('CREATE POLICY public_read ON public.%I FOR SELECT TO anon, authenticated USING (status = ''publicado'')', t);
    END IF;
  END LOOP;
END $$;

-- Role assignment stays server/operator-only. A user may read only own roles.
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.user_roles FROM anon, authenticated;
GRANT SELECT ON public.user_roles TO authenticated;

-- Public payment creation already uses the server/service-role. No direct
-- anonymous inserts that can forge a confirmed donation.
DROP POLICY IF EXISTS "Anyone can create donation" ON public.donations;
REVOKE INSERT ON public.donations FROM anon, authenticated;

-- Guard media writes even if another permissive storage policy exists.
CREATE POLICY ipag_media_insert_guard ON storage.objects AS RESTRICTIVE
FOR INSERT TO anon, authenticated WITH CHECK
(bucket_id NOT IN ('blog', 'event-assets') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY ipag_media_update_guard ON storage.objects AS RESTRICTIVE
FOR UPDATE TO anon, authenticated USING
(bucket_id NOT IN ('blog', 'event-assets') OR public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id NOT IN ('blog', 'event-assets') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY ipag_media_delete_guard ON storage.objects AS RESTRICTIVE
FOR DELETE TO anon, authenticated USING
(bucket_id NOT IN ('blog', 'event-assets') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY ipag_admin_media ON storage.objects FOR ALL TO authenticated
USING (bucket_id IN ('blog', 'event-assets') AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id IN ('blog', 'event-assets') AND public.has_role(auth.uid(), 'admin'));
COMMIT;
