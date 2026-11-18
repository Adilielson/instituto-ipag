import { createMiddleware } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export const requireArea = (area: string) =>
  createMiddleware({ type: "function" }).server(async ({ next }) => {
    const token = getRequest()
      .headers.get("authorization")
      ?.match(/^Bearer (\S+)$/i)?.[1];
    if (!token) throw new Error("Acesso não autorizado. Entre novamente.");
    const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) throw new Error("Autenticação não configurada no servidor.");
    const client = createClient<Database>(url, key, {
      global: { headers: { Authorization: `Bearer ${token}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const {
      data: { user },
      error,
    } = await client.auth.getUser(token);
    if (error || !user) throw new Error("Sessão inválida ou expirada.");
    const { data: allowed, error: accessError } = await client.rpc("can_access", { area });
    if (accessError || !allowed) throw new Error("Você não possui acesso a esta área.");
    return next({ context: { adminUser: user, adminClient: client } });
  });

export const requireAdmin = requireArea("usuarios");
