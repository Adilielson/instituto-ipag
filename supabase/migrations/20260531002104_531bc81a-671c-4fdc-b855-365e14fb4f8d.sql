-- Create blog_categories table
CREATE TABLE public.blog_categories (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    nome TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Grant permissions
GRANT SELECT ON public.blog_categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_categories TO authenticated;
GRANT ALL ON public.blog_categories TO service_role;

-- Enable RLS
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Categories are viewable by everyone" ON public.blog_categories FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage categories" ON public.blog_categories FOR ALL USING (auth.role() = 'authenticated');

-- Insert initial categories
INSERT INTO public.blog_categories (nome) VALUES ('Educação'), ('Social'), ('Música e cultura'), ('Solidariedade');

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) VALUES ('blog', 'blog', true);

-- Storage policies
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'blog');
CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'blog' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated Update" ON storage.objects FOR UPDATE USING (bucket_id = 'blog' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated Delete" ON storage.objects FOR DELETE USING (bucket_id = 'blog' AND auth.role() = 'authenticated');
