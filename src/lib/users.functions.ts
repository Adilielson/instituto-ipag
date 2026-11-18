import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAdmin } from "./auth/admin.middleware";
const area = z.enum([
  "projetos",
  "eventos",
  "blog",
  "doacoes",
  "emails",
  "integracoes",
  "parceiros",
  "transparencia",
]);
const accessSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(2).max(120),
  is_admin: z.boolean(),
  active: z.boolean(),
  areas: z.array(area).max(8),
});
export const listUsers = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator(z.object({ page: z.number().int().min(1).max(100000) }))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: result, error } = await supabaseAdmin.auth.admin.listUsers({
      page: data.page,
      perPage: 50,
    });
    if (error) throw new Error("Não foi possível carregar os usuários.");
    const ids = result.users.map((u) => u.id);
    const { data: accesses, error: accessError } = ids.length
      ? await supabaseAdmin.from("site_access").select("*").in("user_id", ids)
      : { data: [], error: null };
    if (accessError)
      throw new Error("Não foi possível carregar as permissões. Confira a migração de usuários.");
    return {
      hasNext: result.users.length === 50,
      users: result.users.map((u) => {
        const access = accesses?.find((a) => a.user_id === u.id);
        return {
          id: u.id,
          email: u.email || "",
          name: access?.name || String(u.user_metadata?.name || u.email || ""),
          is_admin: access?.is_admin || false,
          active: access?.active || false,
          areas: access?.areas || [],
          confirmed: !!u.email_confirmed_at,
          lastSignIn: u.last_sign_in_at || null,
        };
      }),
    };
  });
export const saveUserAccess = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator(accessSchema)
  .handler(async ({ data, context }) => {
    const { error } = await context.adminClient.rpc("manage_site_access", {
      target: data.id,
      display_name: data.name,
      administrator: data.is_admin,
      enabled: data.active,
      allowed_areas: data.is_admin ? [] : data.areas,
    });
    if (error) throw new Error(error.message);
    return { success: true };
  });
export const inviteUser = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator(
    accessSchema.omit({ id: true }).extend({ email: z.string().trim().email().max(254) }),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    // Never use a browser-supplied origin for authentication links.
    const origin = process.env.APP_URL;
    if (!origin || !/^https:\/\//.test(origin))
      throw new Error(
        "Configure APP_URL no servidor com o endereço HTTPS do site para enviar convites.",
      );
    const { data: invited, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(
      data.email.toLowerCase(),
      {
        data: { name: data.name },
        redirectTo: new URL("/redefinir-senha", origin).href,
      },
    );
    if (error || !invited.user)
      throw new Error(
        "Não foi possível enviar o convite. Confira o serviço de e-mail e se a conta já existe; contas existentes podem ser editadas na lista.",
      );
    const { error: accessError } = await context.adminClient.rpc("manage_site_access", {
      target: invited.user.id,
      display_name: data.name,
      administrator: data.is_admin,
      enabled: data.active,
      allowed_areas: data.is_admin ? [] : data.areas,
    });
    if (accessError)
      throw new Error(
        "Convite enviado, mas o acesso não foi liberado. Atualize a lista e edite as permissões do usuário.",
      );
    return { success: true };
  });
export const deleteUser = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data, context }) => {
    // Revoke first: even if Auth deletion fails, an existing token cannot use the panel.
    const { error } = await context.adminClient.rpc("manage_site_access", {
      target: data.id,
      display_name: "Removido",
      administrator: false,
      enabled: false,
      allowed_areas: [],
      remove_access: true,
    });
    if (error) throw new Error(error.message);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(data.id);
    if (deleteError)
      throw new Error(
        "Acesso revogado, mas a conta não pôde ser excluída. Ela pode possuir arquivos ou registros vinculados. Atualize a lista.",
      );
    return { success: true };
  });
