import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireArea } from "@/lib/auth/admin.middleware";
import type { Payment } from "./model";

const Filters = z
  .object({
    search: z.string().max(120).default(""),
    status: z.string().max(50).default("ALL"),
    method: z.string().max(30).default("ALL"),
    project: z.string().max(120).default("ALL"),
    customer: z.string().max(100).default(""),
    from: z
      .string()
      .regex(/^$|^\d{4}-\d{2}-\d{2}$/)
      .default(""),
    to: z
      .string()
      .regex(/^$|^\d{4}-\d{2}-\d{2}$/)
      .default(""),
    dateField: z.enum(["created_date", "due_date", "payment_date"]).default("payment_date"),
    page: z.number().int().min(0).default(0),
  })
  .refine((d) => !d.from || !d.to || d.from <= d.to, "A data inicial deve ser anterior à final.");

export const donationDashboard = createServerFn({ method: "POST" })
  .middleware([requireArea("doacoes")])
  .inputValidator(Filters)
  .handler(async ({ data }) => {
    const { ledgerDb: db, checked } = await import("./ledger.server");
    const { getAsaasConfig } = await import("@/lib/asaas.server");
    const cfg = await getAsaasConfig();
    const response = checked(
      await db.rpc("donation_dashboard", { env: cfg.env, filters: data }),
    ).data;
    return response as {
      payments: Payment[];
      total: number;
      totals: Record<string, number>;
      donors: any[];
      subscriptions: any[];
      projects: string[];
      lastSync: any;
      unmapped: number;
      environment: string;
      lastWebhook: string | null;
      donorCount: number;
      subscriptionCount: number;
    };
  });

export const reconcileDonations = createServerFn({ method: "POST" })
  .middleware([requireArea("doacoes")])
  .inputValidator(z.object({ cursor: z.string().uuid().nullable().default(null) }))
  .handler(async ({ data, context }) => {
    const { reconcileBatch } = await import("./ledger.server");
    return reconcileBatch(data.cursor, context.adminUser.id);
  });

export const refreshDonationPayment = createServerFn({ method: "POST" })
  .middleware([requireArea("doacoes")])
  .inputValidator(z.object({ id: z.string().regex(/^pay_[\w-]+$/) }))
  .handler(async ({ data }) => {
    const { syncPaymentId } = await import("./ledger.server");
    return syncPaymentId(data.id);
  });

export const donorHistory = createServerFn({ method: "POST" })
  .middleware([requireArea("doacoes")])
  .inputValidator(
    z.object({ customer: z.string().min(1).max(100), page: z.number().int().min(0).default(0) }),
  )
  .handler(async ({ data }) => {
    const { ledgerDb: db, checked } = await import("./ledger.server");
    const { getAsaasConfig } = await import("@/lib/asaas.server");
    const cfg = await getAsaasConfig();
    const result = checked(
      await db
        .from("donation_payments")
        .select("*", { count: "exact" })
        .eq("environment", cfg.env)
        .eq("customer_id", data.customer)
        .order("created_date", { ascending: false })
        .order("payment_id")
        .range(data.page * 50, data.page * 50 + 49),
    );
    return { rows: result.data as Payment[], total: result.count || 0 };
  });

export const exportDonationPayments = createServerFn({ method: "POST" })
  .middleware([requireArea("doacoes")])
  .inputValidator(Filters)
  .handler(async ({ data }) => {
    const { ledgerDb, checked } = await import("./ledger.server");
    const { getAsaasConfig } = await import("@/lib/asaas.server");
    const cfg = await getAsaasConfig();
    const result = checked(
      await ledgerDb.rpc("donation_dashboard", {
        env: cfg.env,
        filters: { ...data, page: 0, export: true },
      }),
    ).data;
    if (result.total > 20000)
      throw new Error("Mais de 20.000 pagamentos. Reduza o período para exportar sem truncamento.");
    return result.payments as Payment[];
  });
