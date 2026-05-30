-- Create PROJECTS table
CREATE TABLE public.projetos (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    titulo TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    imagem_destaque TEXT,
    galeria TEXT[],
    resumo TEXT,
    conteudo TEXT,
    categoria TEXT,
    status TEXT NOT NULL DEFAULT 'publicado',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create POSTS table
CREATE TABLE public.posts (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    titulo TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    imagem_destaque TEXT,
    resumo TEXT,
    conteudo TEXT,
    categoria TEXT,
    autor TEXT,
    data_publicacao TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    status TEXT NOT NULL DEFAULT 'publicado',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create EVENTOS table
CREATE TABLE public.eventos (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    titulo TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    imagem_destaque TEXT,
    descricao TEXT,
    local TEXT,
    data_evento TIMESTAMP WITH TIME ZONE NOT NULL,
    galeria TEXT[],
    status TEXT NOT NULL DEFAULT 'publicado',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- GRANT permissions
GRANT SELECT ON public.projetos TO anon, authenticated;
GRANT SELECT ON public.posts TO anon, authenticated;
GRANT SELECT ON public.eventos TO anon, authenticated;
GRANT ALL ON public.projetos TO service_role;
GRANT ALL ON public.posts TO service_role;
GRANT ALL ON public.eventos TO service_role;

-- Enable RLS
ALTER TABLE public.projetos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eventos ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies
CREATE POLICY "Public read access for projetos" ON public.projetos FOR SELECT USING (status = 'publicado');
CREATE POLICY "Public read access for posts" ON public.posts FOR SELECT USING (status = 'publicado');
CREATE POLICY "Public read access for eventos" ON public.eventos FOR SELECT USING (status = 'publicado');

-- Timestamps function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER update_projetos_updated_at BEFORE UPDATE ON public.projetos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_eventos_updated_at BEFORE UPDATE ON public.eventos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();