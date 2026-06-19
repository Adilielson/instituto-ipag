
-- 1) Enum app_role
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 2) user_roles
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users see own roles" ON public.user_roles;
CREATE POLICY "Users see own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- 3) has_role
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- 4) system_settings (server-only)
CREATE TABLE IF NOT EXISTS public.system_settings (
  key text PRIMARY KEY,
  value text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.system_settings TO service_role;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
-- No policies for anon/authenticated. Only service_role (which bypasses RLS) reads/writes.

DROP TRIGGER IF EXISTS trg_system_settings_updated_at ON public.system_settings;
CREATE TRIGGER trg_system_settings_updated_at
BEFORE UPDATE ON public.system_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 5) donations
CREATE TABLE IF NOT EXISTS public.donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name text NOT NULL,
  donor_email text NOT NULL,
  donor_cpf text NOT NULL,
  donor_phone text,
  amount numeric(12,2) NOT NULL CHECK (amount > 0),
  type text NOT NULL CHECK (type IN ('ONE_TIME','MONTHLY')),
  payment_method text NOT NULL CHECK (payment_method IN ('PIX','BOLETO','CREDIT_CARD')),
  status text NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING','CONFIRMED','FAILED','REFUNDED','CANCELLED')),
  asaas_id text,
  asaas_customer text,
  asaas_link text,
  pix_qrcode text,
  pix_payload text,
  boleto_url text,
  invoice_url text,
  campaign text,
  project_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.donations TO authenticated;
GRANT INSERT ON public.donations TO anon;
GRANT ALL ON public.donations TO service_role;

ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can create donation" ON public.donations;
CREATE POLICY "Anyone can create donation" ON public.donations
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Admins read donations" ON public.donations;
CREATE POLICY "Admins read donations" ON public.donations
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins update donations" ON public.donations;
CREATE POLICY "Admins update donations" ON public.donations
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins delete donations" ON public.donations;
CREATE POLICY "Admins delete donations" ON public.donations
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX IF NOT EXISTS idx_donations_asaas_id ON public.donations(asaas_id);
CREATE INDEX IF NOT EXISTS idx_donations_project_id ON public.donations(project_id);
CREATE INDEX IF NOT EXISTS idx_donations_status ON public.donations(status);

DROP TRIGGER IF EXISTS trg_donations_updated_at ON public.donations;
CREATE TRIGGER trg_donations_updated_at
BEFORE UPDATE ON public.donations
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 6) Public projects view (safe columns from projetos)
CREATE OR REPLACE VIEW public.projects AS
SELECT
  id,
  slug,
  titulo AS name,
  resumo AS short_description,
  imagem_destaque AS cover_image,
  status
FROM public.projetos
WHERE status = 'publicado';

GRANT SELECT ON public.projects TO anon, authenticated;
