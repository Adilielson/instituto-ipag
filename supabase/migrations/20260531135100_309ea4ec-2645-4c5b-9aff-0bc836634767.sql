
ALTER TABLE public.projetos
  ADD COLUMN IF NOT EXISTS featured boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS ordem integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS impacto text;

GRANT SELECT ON public.projetos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projetos TO authenticated;
GRANT ALL ON public.projetos TO service_role;

DROP POLICY IF EXISTS "Public read access for projetos" ON public.projetos;
DROP POLICY IF EXISTS "Anyone can view projetos" ON public.projetos;
DROP POLICY IF EXISTS "Authenticated can manage projetos" ON public.projetos;

CREATE POLICY "Anyone can view projetos"
  ON public.projetos FOR SELECT
  USING (true);

CREATE POLICY "Authenticated can insert projetos"
  ON public.projetos FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update projetos"
  ON public.projetos FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete projetos"
  ON public.projetos FOR DELETE
  TO authenticated
  USING (true);
