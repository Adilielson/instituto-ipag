BEGIN;
CREATE TABLE public.site_partners (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL CHECK(length(btrim(name)) BETWEEN 2 AND 120),
 file_path text NOT NULL CHECK(file_path ~ '^[0-9a-f-]{36}/[0-9a-f-]{36}\.(png|jpg|webp)$'),
 published boolean NOT NULL DEFAULT false, sort_order integer NOT NULL DEFAULT 0,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.transparency_documents (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), title text NOT NULL CHECK(length(btrim(title)) BETWEEN 2 AND 160),
 year integer NOT NULL CHECK(year BETWEEN 1900 AND 2200),
 file_path text NOT NULL CHECK(file_path ~ '^[0-9a-f-]{36}/[0-9a-f-]{36}\.pdf$'),
 published boolean NOT NULL DEFAULT false, sort_order integer NOT NULL DEFAULT 0,
 created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.site_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transparency_documents ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.site_partners,public.transparency_documents TO anon,authenticated;
GRANT INSERT,UPDATE,DELETE ON public.site_partners,public.transparency_documents TO authenticated;
GRANT ALL ON public.site_partners,public.transparency_documents TO service_role;
CREATE POLICY partners_read ON public.site_partners FOR SELECT USING(published OR public.can_access('parceiros'));
CREATE POLICY partners_write ON public.site_partners FOR ALL TO authenticated USING(public.can_access('parceiros')) WITH CHECK(public.can_access('parceiros'));
CREATE POLICY transparency_read ON public.transparency_documents FOR SELECT USING(published OR public.can_access('transparencia'));
CREATE POLICY transparency_write ON public.transparency_documents FOR ALL TO authenticated USING(public.can_access('transparencia')) WITH CHECK(public.can_access('transparencia'));
-- Private buckets: public visitors receive short-lived URLs only for published records.
INSERT INTO storage.buckets(id,name,public,file_size_limit,allowed_mime_types) VALUES
 ('partner-logos','partner-logos',false,5242880,ARRAY['image/png','image/jpeg','image/webp']),
 ('transparency-pdfs','transparency-pdfs',false,20971520,ARRAY['application/pdf']);
CREATE POLICY institutional_media_read ON storage.objects FOR SELECT TO authenticated USING(
 (bucket_id='partner-logos' AND public.can_access('parceiros')) OR
 (bucket_id='transparency-pdfs' AND public.can_access('transparencia')));
CREATE POLICY institutional_media_insert ON storage.objects FOR INSERT TO authenticated WITH CHECK(
 (storage.foldername(name))[1]=auth.uid()::text AND (
 (bucket_id='partner-logos' AND public.can_access('parceiros')) OR
 (bucket_id='transparency-pdfs' AND public.can_access('transparencia'))));
-- No overwrites or direct deletion: replacement gets a new path and cleanup happens server-side after saving.
CREATE POLICY institutional_media_read_guard ON storage.objects AS RESTRICTIVE FOR SELECT TO anon,authenticated USING(
 bucket_id NOT IN ('partner-logos','transparency-pdfs') OR
 (bucket_id='partner-logos' AND public.can_access('parceiros')) OR (bucket_id='transparency-pdfs' AND public.can_access('transparencia')));
CREATE POLICY institutional_media_insert_guard ON storage.objects AS RESTRICTIVE FOR INSERT TO anon,authenticated WITH CHECK(
 bucket_id NOT IN ('partner-logos','transparency-pdfs') OR ((storage.foldername(name))[1]=auth.uid()::text AND (
 (bucket_id='partner-logos' AND public.can_access('parceiros')) OR (bucket_id='transparency-pdfs' AND public.can_access('transparencia')))));
CREATE POLICY institutional_media_update_guard ON storage.objects AS RESTRICTIVE FOR UPDATE TO anon,authenticated USING(bucket_id NOT IN ('partner-logos','transparency-pdfs')) WITH CHECK(bucket_id NOT IN ('partner-logos','transparency-pdfs'));
CREATE POLICY institutional_media_delete_guard ON storage.objects AS RESTRICTIVE FOR DELETE TO anon,authenticated USING(bucket_id NOT IN ('partner-logos','transparency-pdfs'));
COMMIT;
