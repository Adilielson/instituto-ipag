import { createFileRoute } from "@tanstack/react-router";

/**
 * Envia lembretes branded para doadores mensais cuja próxima parcela
 * vence em N dias (configurável em system_settings.REMINDERS_DAYS_BEFORE).
 *
 * Chamado por:
 *  - pg_cron (diariamente, com header apikey = publishable key)
 *  - Botão "Enviar agora" no admin → /admin/integracoes (com header x-admin-password)
 */
export const Route = createFileRoute("/api/public/donations/send-reminders")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        // Auth: aceita publishable key (cron) OU senha superadmin (botão manual)
        const apikey = request.headers.get("apikey");
        const adminPwd = request.headers.get("x-admin-password");
        const isCron = !!apikey && apikey === process.env.SUPABASE_PUBLISHABLE_KEY;
        const isAdmin = !!adminPwd && adminPwd === process.env.SUPERADMIN_PASSWORD;
        if (!isCron && !isAdmin) {
          return new Response("Unauthorized", { status: 401 });
        }

        // Carrega settings
        const { data: settings } = await supabaseAdmin
          .from("system_settings")
          .select("key,value")
          .in("key", ["REMINDERS_ENABLED", "REMINDERS_DAYS_BEFORE"]);
        const settingsMap: Record<string, string> = {};
        for (const s of settings || []) settingsMap[s.key] = s.value ?? "";
        const enabled = (settingsMap.REMINDERS_ENABLED ?? "true").toLowerCase() === "true";
        const daysBefore = Math.max(0, Math.min(30, parseInt(settingsMap.REMINDERS_DAYS_BEFORE || "3", 10) || 3));

        if (!enabled && isCron) {
          return Response.json({ ok: true, skipped: "disabled", sent: 0 });
        }

        // Calcula data alvo (YYYY-MM-DD)
        const target = new Date();
        target.setDate(target.getDate() + daysBefore);
        const targetDate = target.toISOString().slice(0, 10);

        const { getAsaasConfig, asaasFetch } = await import("@/lib/asaas.server");
        let cfg;
        try { cfg = await getAsaasConfig(); }
        catch (e: any) { return new Response(`Asaas: ${e?.message || "config"}`, { status: 500 }); }

        // Lista cobranças PENDENTES com vencimento exatamente no dia alvo
        let payments: any[] = [];
        try {
          const resp = await asaasFetch<any>(
            cfg,
            `/payments?status=PENDING&dueDate%5Bge%5D=${targetDate}&dueDate%5Ble%5D=${targetDate}&limit=100`,
          );
          payments = resp?.data || [];
        } catch (e: any) {
          return new Response(`Asaas list: ${e?.message || "fail"}`, { status: 502 });
        }

        const { renderAndSendTemplate } = await import("@/lib/email.server");

        const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
        const fmtDate = (iso: string) => {
          const [y, m, d] = iso.split("-");
          return `${d}/${m}/${y}`;
        };
        const methodLabel = (m: string) =>
          m === "PIX" ? "PIX" : m === "BOLETO" ? "Boleto" : m === "CREDIT_CARD" ? "Cartão de crédito" : m;

        let sent = 0;
        let skipped = 0;
        const errors: string[] = [];

        for (const pay of payments) {
          const subId: string | undefined = pay?.subscription;
          if (!subId) { skipped++; continue; } // só assinaturas mensais

          // Doação correspondente (asaas_id guarda o id da subscription quando MONTHLY)
          const { data: donation } = await supabaseAdmin
            .from("donations")
            .select("*")
            .eq("asaas_id", subId)
            .eq("type", "MONTHLY")
            .maybeSingle();

          if (!donation || !donation.donor_email) { skipped++; continue; }
          if (donation.status === "CANCELLED") { skipped++; continue; }
          if (donation.last_reminder_charge_id === pay.id) { skipped++; continue; }

          try {
            await renderAndSendTemplate({
              slug: "donation_reminder_donor",
              to: donation.donor_email,
              vars: {
                donor_name: donation.donor_name,
                project: donation.campaign || "Doação Geral",
                amount: brl(Number(pay.value ?? donation.amount)),
                due_date: fmtDate(pay.dueDate || targetDate),
                payment_method: methodLabel(donation.payment_method),
                invoice_url: pay.invoiceUrl || pay.bankSlipUrl || donation.invoice_url || "",
                days_before: String(daysBefore),
              },
            });
            await supabaseAdmin
              .from("donations")
              .update({
                last_reminder_charge_id: pay.id,
                last_reminder_sent_at: new Date().toISOString(),
              })
              .eq("id", donation.id);
            sent++;
          } catch (e: any) {
            errors.push(`${donation.donor_email}: ${e?.message || "fail"}`);
          }
        }

        return Response.json({
          ok: true,
          target_date: targetDate,
          days_before: daysBefore,
          considered: payments.length,
          sent,
          skipped,
          errors,
        });
      },
    },
  },
});
