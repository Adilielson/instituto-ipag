-- Adicionar colunas de SEO se não existirem
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS seo_title TEXT;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS seo_description TEXT;

-- Garantir que a tabela posts tenha a estrutura solicitada
-- No Supabase atual, já temos: id, titulo, slug, resumo, conteudo, imagem_destaque, categoria, autor, status, data_publicacao, created_at, updated_at.
-- O solicitado pede: id, title, slug, excerpt, content, featured_image, category, author, status, published_at, created_at, updated_at, seo_title, seo_description.
-- Vou manter os nomes em português para não quebrar o que já existe (Home e Blog já usam esses nomes), 
-- mas garantir que todos os campos solicitados existam.

-- Se necessário, poderíamos renomear, mas o código atual já espera 'titulo', 'resumo', etc.
-- Vou apenas adicionar os campos que faltam ou garantir os tipos.

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.posts TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.posts TO anon; -- Permitir select para visitantes
GRANT ALL ON public.posts TO service_role;

-- Enable RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Posts are viewable by everyone" ON public.posts;
DROP POLICY IF EXISTS "Admin can manage posts" ON public.posts;

-- Create policies
CREATE POLICY "Posts are viewable by everyone" 
ON public.posts 
FOR SELECT 
USING (status = 'publicado' OR (auth.jwt() ->> 'email' = 'adilielson@gmail.com'));

CREATE POLICY "Admin can manage posts" 
ON public.posts 
FOR ALL 
USING (auth.jwt() ->> 'email' = 'adilielson@gmail.com');
