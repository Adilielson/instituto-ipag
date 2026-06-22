
CREATE TABLE public.email_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  header_image_url TEXT,
  body_html TEXT NOT NULL,
  footer_html TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  variables JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT ALL ON public.email_templates TO service_role;

ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

-- No public/anon/authenticated policies: all access goes through server functions
-- using the service role key gated by the superadmin password.

CREATE TRIGGER email_templates_updated_at
BEFORE UPDATE ON public.email_templates
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed default templates
INSERT INTO public.email_templates (slug, name, subject, header_image_url, body_html, footer_html, variables) VALUES
(
  'donation_confirmation_donor',
  'Confirmação de doação (Doador)',
  'Recebemos sua doação — Instituto IPAG',
  NULL,
  '<p>Olá <strong>{{donor_name}}</strong>,</p>
<p>Confirmamos o recebimento da sua contribuição. Obrigado por apoiar o Instituto IPAG e transformar vidas com a gente.</p>
<table style="width:100%;border-collapse:collapse;margin:16px 0">
  <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Projeto</strong></td><td style="padding:8px;border-bottom:1px solid #eee">{{project}}</td></tr>
  <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Valor</strong></td><td style="padding:8px;border-bottom:1px solid #eee">{{amount}}</td></tr>
  <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Data</strong></td><td style="padding:8px;border-bottom:1px solid #eee">{{date}}</td></tr>
  <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Tipo</strong></td><td style="padding:8px;border-bottom:1px solid #eee">{{type}}</td></tr>
  <tr><td style="padding:8px"><strong>Forma de pagamento</strong></td><td style="padding:8px">{{payment_method}}</td></tr>
</table>
<p style="color:#555">Em caso de dúvidas, basta responder este email.</p>',
  'Este é um email automático do Instituto IPAG. Em nome de todos, muito obrigado.',
  '["donor_name","donor_email","project","amount","date","type","payment_method","asaas_id"]'::jsonb
),
(
  'donation_confirmation_admin',
  'Confirmação de doação (Admin)',
  'Nova doação confirmada — {{donor_name}} ({{amount}})',
  NULL,
  '<p>Uma nova doação foi confirmada no Asaas.</p>
<table style="width:100%;border-collapse:collapse;margin:16px 0">
  <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Doador</strong></td><td style="padding:8px;border-bottom:1px solid #eee">{{donor_name}}</td></tr>
  <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Email</strong></td><td style="padding:8px;border-bottom:1px solid #eee">{{donor_email}}</td></tr>
  <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Projeto</strong></td><td style="padding:8px;border-bottom:1px solid #eee">{{project}}</td></tr>
  <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Valor</strong></td><td style="padding:8px;border-bottom:1px solid #eee">{{amount}}</td></tr>
  <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Data</strong></td><td style="padding:8px;border-bottom:1px solid #eee">{{date}}</td></tr>
  <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Tipo</strong></td><td style="padding:8px;border-bottom:1px solid #eee">{{type}}</td></tr>
  <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Pagamento</strong></td><td style="padding:8px;border-bottom:1px solid #eee">{{payment_method}}</td></tr>
  <tr><td style="padding:8px"><strong>Asaas ID</strong></td><td style="padding:8px">{{asaas_id}}</td></tr>
</table>',
  'Notificação interna — Instituto IPAG',
  '["donor_name","donor_email","project","amount","date","type","payment_method","asaas_id"]'::jsonb
);
