import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

function checkSuperadmin(pwd: string | undefined) {
  const expected = process.env.SUPERADMIN_PASSWORD;
  if (!expected) throw new Error("SUPERADMIN_PASSWORD não está configurado no servidor.");
  if (!pwd || pwd !== expected) throw new Error("Senha de superadministrador inválida.");
}

const templateSchema = z.object({
  slug: z.string().min(2).max(80).regex(/^[a-z0-9_]+$/i, "Use apenas letras, números e _"),
  name: z.string().min(1).max(120),
  subject: z.string().min(1).max(200),
  header_image_url: z.string().url().nullable().optional(),
  body_html: z.string().min(1),
  footer_html: z.string().nullable().optional(),
  is_active: z.boolean().optional(),
  variables: z.array(z.string()).optional(),
});

export const listEmailTemplates = createServerFn({ method: "POST" })
  .inputValidator(z.object({ password: z.string() }))
  .handler(async ({ data }) => {
    checkSuperadmin(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("email_templates")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return { templates: rows || [] };
  });

export const getEmailTemplate = createServerFn({ method: "POST" })
  .inputValidator(z.object({ password: z.string(), id: z.string().uuid() }))
  .handler(async ({ data }) => {
    checkSuperadmin(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("email_templates")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) throw new Error("Template não encontrado");
    return row;
  });

export const createEmailTemplate = createServerFn({ method: "POST" })
  .inputValidator(z.object({ password: z.string(), template: templateSchema }))
  .handler(async ({ data }) => {
    checkSuperadmin(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("email_templates")
      .insert({
        slug: data.template.slug,
        name: data.template.name,
        subject: data.template.subject,
        header_image_url: data.template.header_image_url || null,
        body_html: data.template.body_html,
        footer_html: data.template.footer_html || null,
        is_active: data.template.is_active ?? true,
        variables: data.template.variables ?? [],
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const updateEmailTemplate = createServerFn({ method: "POST" })
  .inputValidator(z.object({ password: z.string(), id: z.string().uuid(), template: templateSchema.partial() }))
  .handler(async ({ data }) => {
    checkSuperadmin(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const patch: Record<string, unknown> = {};
    const t = data.template;
    if (t.slug !== undefined) patch.slug = t.slug;
    if (t.name !== undefined) patch.name = t.name;
    if (t.subject !== undefined) patch.subject = t.subject;
    if (t.header_image_url !== undefined) patch.header_image_url = t.header_image_url || null;
    if (t.body_html !== undefined) patch.body_html = t.body_html;
    if (t.footer_html !== undefined) patch.footer_html = t.footer_html || null;
    if (t.is_active !== undefined) patch.is_active = t.is_active;
    if (t.variables !== undefined) patch.variables = t.variables;
    const { data: row, error } = await supabaseAdmin
      .from("email_templates")
      .update(patch)
      .eq("id", data.id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const deleteEmailTemplate = createServerFn({ method: "POST" })
  .inputValidator(z.object({ password: z.string(), id: z.string().uuid() }))
  .handler(async ({ data }) => {
    checkSuperadmin(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("email_templates").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const sendTestEmail = createServerFn({ method: "POST" })
  .inputValidator(z.object({ password: z.string(), id: z.string().uuid(), to: z.string().email() }))
  .handler(async ({ data }) => {
    checkSuperadmin(data.password);
    const { renderAndSendTemplate } = await import("@/lib/email.server");
    const sampleVars: Record<string, string> = {
      donor_name: "João Teste",
      donor_email: data.to,
      project: "Projeto Exemplo",
      amount: "R$ 150,00",
      date: new Date().toLocaleString("pt-BR"),
      type: "Doação única",
      payment_method: "PIX",
      asaas_id: "pay_TEST_123",
    };
    await renderAndSendTemplate({ templateId: data.id, to: data.to, vars: sampleVars });
    return { ok: true };
  });
