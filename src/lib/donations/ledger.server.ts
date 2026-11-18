import type { SupabaseClient } from "@supabase/supabase-js";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { asaasFetch, getAsaasConfig, mapAsaasStatus } from "@/lib/asaas.server";
import type { AsaasConfig } from "@/lib/asaas.server";
import { normalizePayment } from "./model";

// New tables are intentionally confined to this server module until Cloud regenerates its types.
export const ledgerDb = supabaseAdmin as SupabaseClient;
export function checked<T extends { error: any }>(result: T): T {
  if (result.error)
    throw new Error(
      "Falha ao gravar ou consultar o acompanhamento de doações. Verifique a migração e os logs.",
    );
  return result;
}
export async function findDonation(payment: any) {
  const ids = [payment.id, payment.subscription].filter(Boolean);
  let rows = checked(await ledgerDb.from("donations").select("*").in("asaas_id", ids)).data || [];
  if (!rows.length && /^[0-9a-f-]{36}$/i.test(payment.externalReference || "")) {
    rows =
      checked(await ledgerDb.from("donations").select("*").eq("id", payment.externalReference))
        .data || [];
  }
  if (rows.length > 1) throw new Error("Vínculo duplicado: revise os registros da doação.");
  const donation = rows[0];
  if (donation && donation.asaas_customer !== payment.customer)
    throw new Error("Cliente Asaas divergente da doação.");
  return donation;
}
async function saveDonor(cfg: AsaasConfig, d: any) {
  checked(
    await ledgerDb.from("donation_donors").upsert(
      {
        environment: cfg.env,
        customer_id: d.asaas_customer,
        name: d.donor_name,
        email: d.donor_email,
      },
      { onConflict: "environment,customer_id" },
    ),
  );
}
export async function persistPayment(cfg: AsaasConfig, raw: any, observed: string, donation?: any) {
  const d = donation || (await findDonation(raw));
  if (!d) return null;
  if (d.asaas_customer !== raw.customer) throw new Error("Cliente Asaas divergente.");
  if (d.type === "MONTHLY" && raw.subscription !== d.asaas_id)
    throw new Error("Parcela não pertence à assinatura.");
  if (d.type === "ONE_TIME" && raw.id !== d.asaas_id)
    throw new Error("Cobrança não pertence à doação.");
  await saveDonor(cfg, d);
  const payment = normalizePayment(raw, cfg.env, d.id, observed);
  checked(await ledgerDb.rpc("record_donation_payment", { snapshot: payment }));
  // Compatibility with the public one-time donation screen; monthly status never means receipt.
  if (d.type === "ONE_TIME")
    checked(
      await ledgerDb
        .from("donations")
        .update({ status: mapAsaasStatus(payment.status) })
        .eq("id", d.id),
    );
  return payment;
}
export async function syncDonation(cfg: AsaasConfig, d: any) {
  if (!d.asaas_id || !d.asaas_customer)
    throw new Error("Doação sem identificador Asaas: revisão manual necessária.");
  if (d.type !== "MONTHLY") {
    const observed = new Date().toISOString();
    const raw = await asaasFetch<any>(cfg, `/payments/${encodeURIComponent(d.asaas_id)}`);
    await persistPayment(cfg, raw, observed, d);
    return 1;
  }
  const observed = new Date().toISOString();
  const sub = await asaasFetch<any>(cfg, `/subscriptions/${encodeURIComponent(d.asaas_id)}`);
  if (sub.customer !== d.asaas_customer) throw new Error("Assinatura pertence a outro cliente.");
  await saveDonor(cfg, d);
  checked(
    await ledgerDb.rpc("record_donation_subscription", {
      snapshot: {
        environment: cfg.env,
        subscription_id: sub.id,
        donation_id: d.id,
        customer_id: sub.customer,
        status: sub.deleted ? "DELETED" : sub.status,
        amount: sub.value,
        next_due_date: sub.nextDueDate || null,
        observed_at: observed,
      },
    }),
  );
  let count = 0;
  for (let offset = 0; offset < 10000; offset += 100) {
    const stamp = new Date().toISOString();
    const page = await asaasFetch<any>(
      cfg,
      `/payments?subscription=${encodeURIComponent(sub.id)}&limit=100&offset=${offset}`,
    );
    if (!Array.isArray(page.data)) throw new Error("Resposta inválida na conciliação.");
    for (const payment of page.data) {
      await persistPayment(cfg, payment, stamp, d);
      count++;
    }
    if (!page.hasMore) return count;
    if (!page.data.length) throw new Error("Paginação Asaas inconsistente.");
  }
  throw new Error(
    "Assinatura muito extensa. Conciliação incompleta; requer processamento adicional.",
  );
}
export async function syncPaymentId(id: string) {
  const cfg = await getAsaasConfig();
  const observed = new Date().toISOString();
  const raw = await asaasFetch<any>(cfg, `/payments/${encodeURIComponent(id)}`);
  const payment = await persistPayment(cfg, raw, observed);
  if (!payment) throw new Error("Cobrança não vinculada a uma doação IPAG.");
  return payment;
}

// Preserve the existing first confirmation email. Per-installment campaigns belong to stage 3.
export async function notifyFirstConfirmedDonation(id: string) {
  const claimed = checked(
    await ledgerDb
      .from("donations")
      .update({ confirmation_email_sent_at: new Date().toISOString() })
      .eq("id", id)
      .is("confirmation_email_sent_at", null)
      .select("*")
      .maybeSingle(),
  ).data;
  if (!claimed) return;
  try {
    const { sendDonationConfirmedEmails } = await import("@/lib/email.server");
    await sendDonationConfirmedEmails({
      donor_name: claimed.donor_name,
      donor_email: claimed.donor_email,
      amount: Number(claimed.amount),
      payment_method: claimed.payment_method,
      type: claimed.type,
      campaign: claimed.campaign || undefined,
      asaas_id: claimed.asaas_id || claimed.id,
    });
  } catch (e) {
    checked(
      await ledgerDb
        .from("donations")
        .update({ confirmation_email_sent_at: null })
        .eq("id", id)
        .eq("confirmation_email_sent_at", claimed.confirmation_email_sent_at),
    );
    throw e;
  }
}

export async function reconcileBatch(
  cursor: string | null,
  actorId: string | null,
  scheduled = false,
) {
  const cfg = await getAsaasConfig();
  const run = checked(
    await ledgerDb
      .from("donation_sync_runs")
      .insert({ environment: cfg.env, actor_id: actorId, cursor_id: cursor, scheduled })
      .select("id")
      .single(),
  ).data;
  if (!run) throw new Error("Não foi possível iniciar a conciliação.");
  const errors: { id: string; message: string }[] = [];
  let processed = 0;
  try {
    let query = ledgerDb
      .from("donations")
      .select("*")
      .not("asaas_id", "is", null)
      .order("id")
      .limit(6);
    if (cursor) query = query.gt("id", cursor);
    const rows = checked(await query).data || [];
    for (const d of rows.slice(0, 5)) {
      try {
        processed += await syncDonation(cfg, d);
        checked(
          await ledgerDb
            .from("donation_sync_issues")
            .delete()
            .eq("environment", cfg.env)
            .eq("donation_id", d.id),
        );
      } catch {
        const issue = {
          id: d.id,
          message: "Não conciliada. Verifique ambiente, vínculo Asaas e tente novamente.",
        };
        errors.push(issue);
        checked(
          await ledgerDb.from("donation_sync_issues").upsert(
            {
              environment: cfg.env,
              donation_id: d.id,
              message: issue.message,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "environment,donation_id" },
          ),
        );
      }
    }
    const nextCursor = rows.length > 5 ? rows[4].id : null;
    checked(
      await ledgerDb
        .from("donation_sync_runs")
        .update({
          status: errors.length ? "PARTIAL" : "COMPLETED",
          processed,
          errors,
          next_cursor: nextCursor,
          finished_at: new Date().toISOString(),
        })
        .eq("id", run.id),
    );
    return { processed, errors, cursor: nextCursor, environment: cfg.env };
  } catch (e) {
    await ledgerDb
      .from("donation_sync_runs")
      .update({
        status: "FAILED",
        processed,
        errors: [...errors, { message: "Falha de processamento. Reinicie a conciliação." }],
        finished_at: new Date().toISOString(),
      })
      .eq("id", run.id);
    throw e;
  }
}
