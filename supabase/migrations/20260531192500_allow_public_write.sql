-- Disable RLS on public tables to allow the admin panel (using mock auth) to save changes
ALTER TABLE public.projetos DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.eventos DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories DISABLE ROW LEVEL SECURITY;

-- Ensure all permissions are granted
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projetos TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.posts TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.eventos TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_categories TO anon, authenticated;

-- Relax storage policies for 'blog' bucket
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete" ON storage.objects;

CREATE POLICY "Anyone can upload blog assets" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'blog');
CREATE POLICY "Anyone can update blog assets" ON storage.objects FOR UPDATE USING (bucket_id = 'blog');
CREATE POLICY "Anyone can delete blog assets" ON storage.objects FOR DELETE USING (bucket_id = 'blog');

-- Relax storage policies for 'event-assets' bucket
DROP POLICY IF EXISTS "Authenticated users can upload event assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update event assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete event assets" ON storage.objects;

CREATE POLICY "Anyone can upload event assets" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'event-assets');
CREATE POLICY "Anyone can update event assets" ON storage.objects FOR UPDATE USING (bucket_id = 'event-assets');
CREATE POLICY "Anyone can delete event assets" ON storage.objects FOR DELETE USING (bucket_id = 'event-assets');
