// Asaas API helpers — server only
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type AsaasEnv = "sandbox" | "production";

export interface AsaasConfig {
  apiKey: string;
  env: AsaasEnv;
  baseUrl: string;
  webhookToken?: string;
}

export type DonationStatus = "CONFIRMED" | "PENDING" | "FAILED" | "REFUNDED" | "CANCELLED";

export function mapAsaasStatus(status?: string | null): DonationStatus {
  const s = String(status || "").toUpperCase();
  if (["CONFIRMED", "RECEIVED", "RECEIVED_IN_CASH", "ACTIVE"].includes(s)) return "CONFIRMED";
  if (["REFUNDED", "PARTIALLY_REFUNDED"].includes(s)) return "REFUNDED";
  if (["DELETED", "CANCELLED", "CHARGEBACK_REQUESTED", "CHARGEBACK_DISPUTE", "AWAITING_CHARGEBACK_REVERSAL"].includes(s)) return "CANCELLED";
  if (["OVERDUE", "FAILED", "INACTIVE", "EXPIRED"].includes(s)) return "FAILED";
  return "PENDING";
}

export function cleanPhone(phone?: string | null) {
  const digits = phone?.replace(/\D/g, "") || "";
  return digits.length >= 10 && digits.length <= 11 ? digits : undefined;
}

function admin() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

export async function getSetting(key: string): Promise<string | null> {
  const { data } = await admin().from("system_settings").select("value").eq("key", key).maybeSingle();
  return data?.value ?? null;
}

export async function setSetting(key: string, value: string): Promise<void> {
  await admin().from("system_settings").upsert({ key, value });
}

export async function getAsaasConfig(): Promise<AsaasConfig> {
  const apiKey =
    (await getSetting("ASAAS_API_KEY")) || process.env.ASAAS_API_KEY || "";
  const envRaw =
    ((await getSetting("ASAAS_ENV")) || process.env.ASAAS_ENV || "sandbox").toLowerCase();
  const env: AsaasEnv = envRaw === "production" ? "production" : "sandbox";
  const webhookToken =
    (await getSetting("ASAAS_WEBHOOK_TOKEN")) || process.env.ASAAS_WEBHOOK_TOKEN || undefined;
  const baseUrl =
    env === "production"
      ? "https://api.asaas.com/v3"
      : "https://api-sandbox.asaas.com/v3";

  if (!apiKey) {
    throw new Error("Asaas não está configurado. Defina ASAAS_API_KEY em Admin → Integrações.");
  }
  return { apiKey, env, baseUrl, webhookToken };
}

export async function asaasFetch<T = any>(
  cfg: AsaasConfig,
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${cfg.baseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "IPAG-Doacoes/1.0",
      access_token: cfg.apiKey,
      ...(init.headers || {}),
    },
  });
  const text = await res.text();
  let json: any = {};
  try { json = text ? JSON.parse(text) : {}; } catch { json = { raw: text }; }
  if (!res.ok) {
    const msg = json?.errors?.[0]?.description || json?.message || `Asaas ${res.status}`;
    throw new Error(msg);
  }
  return json as T;
}

// Find or create a customer by CPF/CNPJ
export async function findOrCreateCustomer(
  cfg: AsaasConfig,
  customer: { name: string; email: string; cpfCnpj: string; phone?: string },
) {
  // Search existing
  const search = await asaasFetch<any>(
    cfg,
    `/customers?cpfCnpj=${encodeURIComponent(customer.cpfCnpj.replace(/\D/g, ""))}`,
    { method: "GET" },
  );
  if (search?.data?.length) return search.data[0];

  const mobilePhone = cleanPhone(customer.phone);
  const payload: Record<string, string | boolean> = {
    name: customer.name,
    email: customer.email,
    cpfCnpj: customer.cpfCnpj.replace(/\D/g, ""),
    notificationDisabled: false,
  };
  if (mobilePhone) payload.mobilePhone = mobilePhone;

  try {
    return await asaasFetch<any>(cfg, `/customers`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (e: any) {
    const msg = String(e?.message || "").toLowerCase();
    if (mobilePhone && (msg.includes("celular") || msg.includes("telefone"))) {
      delete payload.mobilePhone;
      return asaasFetch<any>(cfg, `/customers`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }
    throw e;
  }
}

export async function getAsaasCharge(cfg: AsaasConfig, id: string) {
  if (id.startsWith("sub_")) return asaasFetch<any>(cfg, `/subscriptions/${id}`);
  return asaasFetch<any>(cfg, `/payments/${id}`);
}
