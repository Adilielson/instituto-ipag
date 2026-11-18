CREATE TABLE public.site_access (
 user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
 name text NOT NULL CHECK (length(name) BETWEEN 2 AND 120),
 is_admin boolean NOT NULL DEFAULT false,
 active boolean NOT NULL DEFAULT true,
 areas text[] NOT NULL DEFAULT '{}',
 CHECK (areas <@ ARRAY['projetos','eventos','blog','doacoes','emails','integracoes','parceiros','transparencia']::text[])
);
INSERT INTO public.site_access(user_id,name,is_admin)
 SELECT DISTINCT user_id,'Administrador',true FROM public.user_roles WHERE role='admin';
ALTER TABLE public.site_access ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.site_access FROM anon, authenticated;
GRANT SELECT ON public.site_access TO authenticated, service_role;
CREATE POLICY own_access ON public.site_access FOR SELECT TO authenticated USING(user_id=auth.uid());

CREATE FUNCTION public.can_access(area text) RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
 SELECT EXISTS(SELECT 1 FROM site_access WHERE user_id=auth.uid() AND active AND (is_admin OR area=ANY(areas)));
$$;
REVOKE ALL ON FUNCTION public.can_access(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.can_access(text) TO anon,authenticated;

-- All access changes are serialized, checked again in the database and atomic.
CREATE FUNCTION public.manage_site_access(target uuid, display_name text, administrator boolean, enabled boolean, allowed_areas text[], remove_access boolean DEFAULT false)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
 PERFORM pg_advisory_xact_lock(18112026);
 IF NOT EXISTS(SELECT 1 FROM site_access WHERE user_id=auth.uid() AND active AND is_admin) THEN
  RAISE EXCEPTION 'Somente administradores podem gerenciar acessos';
 END IF;
 IF target=auth.uid() AND (remove_access OR NOT administrator OR NOT enabled) THEN
  RAISE EXCEPTION 'Não é permitido remover ou suspender seu próprio acesso administrativo';
 END IF;
 IF (remove_access OR NOT administrator OR NOT enabled)
 AND EXISTS(SELECT 1 FROM site_access WHERE user_id=target AND active AND is_admin)
 AND (SELECT count(*) FROM site_access WHERE active AND is_admin)<=1 THEN
  RAISE EXCEPTION 'Mantenha pelo menos um administrador ativo';
 END IF;
 IF remove_access THEN
  DELETE FROM site_access WHERE user_id=target;
 ELSE
  INSERT INTO site_access(user_id,name,is_admin,active,areas) VALUES(target,display_name,administrator,enabled,allowed_areas)
  ON CONFLICT(user_id) DO UPDATE SET name=excluded.name,is_admin=excluded.is_admin,active=excluded.active,areas=excluded.areas;
 END IF;
 DELETE FROM user_roles WHERE user_id=target AND role='admin';
 IF NOT remove_access AND administrator AND enabled THEN
  INSERT INTO user_roles(user_id,role) VALUES(target,'admin');
 END IF;
END $$;
REVOKE ALL ON FUNCTION public.manage_site_access(uuid,text,boolean,boolean,text[],boolean) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.manage_site_access(uuid,text,boolean,boolean,text[],boolean) TO authenticated;

DO $$ DECLARE t text; a text;
BEGIN
 FOREACH t IN ARRAY ARRAY['projetos','posts','eventos','blog_categories'] LOOP
  a := CASE WHEN t IN ('posts','blog_categories') THEN 'blog' ELSE t END;
  EXECUTE format('DROP POLICY admin_manage ON public.%I',t);
  EXECUTE format('CREATE POLICY area_manage ON public.%I FOR ALL TO authenticated USING(public.can_access(%L)) WITH CHECK(public.can_access(%L))',t,a,a);
 END LOOP;
END $$;
-- Projects and blog share the existing media bucket. Delegated users may
-- create media there, but destructive operations require ownership.
DROP POLICY ipag_media_insert_guard ON storage.objects;
DROP POLICY ipag_media_update_guard ON storage.objects;
DROP POLICY ipag_media_delete_guard ON storage.objects;
DROP POLICY ipag_admin_media ON storage.objects;
CREATE FUNCTION public.can_manage_media(bucket text, object_owner text) RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
 SELECT public.can_access('usuarios') OR
 ((object_owner IS NULL OR object_owner=auth.uid()::text) AND
 ((bucket='blog' AND (public.can_access('blog') OR public.can_access('projetos'))) OR
 (bucket='event-assets' AND public.can_access('eventos'))));
$$;
REVOKE ALL ON FUNCTION public.can_manage_media(text,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.can_manage_media(text,text) TO anon,authenticated;
CREATE POLICY ipag_media_insert_guard ON storage.objects AS RESTRICTIVE FOR INSERT TO anon,authenticated
WITH CHECK(bucket_id NOT IN ('blog','event-assets') OR public.can_manage_media(bucket_id,NULL));
CREATE POLICY ipag_media_update_guard ON storage.objects AS RESTRICTIVE FOR UPDATE TO anon,authenticated
USING(bucket_id NOT IN ('blog','event-assets') OR public.can_manage_media(bucket_id,coalesce(owner_id,'')))
WITH CHECK(bucket_id NOT IN ('blog','event-assets') OR public.can_manage_media(bucket_id,coalesce(owner_id,'')));
CREATE POLICY ipag_media_delete_guard ON storage.objects AS RESTRICTIVE FOR DELETE TO anon,authenticated
USING(bucket_id NOT IN ('blog','event-assets') OR public.can_manage_media(bucket_id,coalesce(owner_id,'')));
CREATE POLICY ipag_area_media ON storage.objects FOR ALL TO authenticated
USING(bucket_id IN ('blog','event-assets') AND public.can_manage_media(bucket_id,coalesce(owner_id,'')))
WITH CHECK(bucket_id IN ('blog','event-assets') AND public.can_manage_media(bucket_id,coalesce(owner_id,'')));
