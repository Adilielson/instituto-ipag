import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

function checkSuperadmin(pwd: string | undefined) {
  const expected = process.env.SUPERADMIN_PASSWORD;
  if (!expected) throw new Error("SUPERADMIN_PASSWORD não está configurado no servidor.");
  if (!pwd || pwd !== expected) throw new Error("Senha de superadministrador inválida.");
}

const SETTING_KEYS = ["ASAAS_API_KEY", "ASAAS_ENV", "ASAAS_WEBHOOK_TOKEN"] as const;

export const listSettings = createServerFn({ method: "POST" })
  .inputValidator(z.object({ password: z.string() }))
  .handler(async ({ data }) => {
    checkSuperadmin(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows } = await supabaseAdmin
      .from("system_settings")
      .select("key,value")
      .in("key", SETTING_KEYS as unknown as string[]);
    const map: Record<string, string> = {};
    for (const r of rows || []) map[r.key] = r.value ?? "";
    return {
      ASAAS_API_KEY: map.ASAAS_API_KEY || "",
      ASAAS_ENV: map.ASAAS_ENV || "sandbox",
      ASAAS_WEBHOOK_TOKEN: map.ASAAS_WEBHOOK_TOKEN || "",
    };
  });

export const saveSettings = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      password: z.string(),
      ASAAS_API_KEY: z.string().optional(),
      ASAAS_ENV: z.enum(["sandbox", "production"]).optional(),
      ASAAS_WEBHOOK_TOKEN: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    checkSuperadmin(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const rows: { key: string; value: string }[] = [];
    if (data.ASAAS_API_KEY !== undefined) rows.push({ key: "ASAAS_API_KEY", value: data.ASAAS_API_KEY });
    if (data.ASAAS_ENV !== undefined) rows.push({ key: "ASAAS_ENV", value: data.ASAAS_ENV });
    if (data.ASAAS_WEBHOOK_TOKEN !== undefined) rows.push({ key: "ASAAS_WEBHOOK_TOKEN", value: data.ASAAS_WEBHOOK_TOKEN });
    if (rows.length) {
      const { error } = await supabaseAdmin.from("system_settings").upsert(rows);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const testAsaas = createServerFn({ method: "POST" })
  .inputValidator(z.object({ password: z.string() }))
  .handler(async ({ data }) => {
    checkSuperadmin(data.password);
    const { getAsaasConfig, asaasFetch } = await import("@/lib/asaas.server");
    const cfg = await getAsaasConfig();
    const r = await asaasFetch<any>(cfg, "/customers?limit=1");
    return { ok: true, env: cfg.env, totalCustomers: r?.totalCount ?? null };
  });

export const listDonations = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      password: z.string(),
      status: z.enum(["ALL", "PENDING", "CONFIRMED", "FAILED", "REFUNDED", "CANCELLED"]).optional(),
      method: z.enum(["ALL", "PIX", "BOLETO", "CREDIT_CARD"]).optional(),
    }),
  )
  .handler(async ({ data }) => {
    checkSuperadmin(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let q = supabaseAdmin.from("donations").select("*").order("created_at", { ascending: false }).limit(500);
    if (data.status && data.status !== "ALL") q = q.eq("status", data.status);
    if (data.method && data.method !== "ALL") q = q.eq("payment_method", data.method);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);

    const totalConfirmed = (rows || [])
      .filter((r: any) => r.status === "CONFIRMED")
      .reduce((acc: number, r: any) => acc + Number(r.amount || 0), 0);
    const totalAll = (rows || []).reduce((acc: number, r: any) => acc + Number(r.amount || 0), 0);

    return { donations: rows || [], totalConfirmed, totalAll };
  });

export const markDonationConfirmed = createServerFn({ method: "POST" })
  .inputValidator(z.object({ password: z.string(), id: z.string().uuid() }))
  .handler(async ({ data }) => {
    checkSuperadmin(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("donations")
      .update({ status: "CONFIRMED" })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const totalConfirmedPublic = createServerFn({ method: "POST" })
  .inputValidator(z.object({ project_id: z.string().uuid().optional().nullable() }).optional())
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let q = supabaseAdmin.from("donations").select("amount").eq("status", "CONFIRMED");
    if (data?.project_id) q = q.eq("project_id", data.project_id);
    const { data: rows, error } = await q;
    if (error) return { total: 0 };
    const total = (rows || []).reduce((acc: number, r: any) => acc + Number(r.amount || 0), 0);
    return { total };
  });
