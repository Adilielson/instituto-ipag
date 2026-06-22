import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/donations/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { mapAsaasStatus } = await import("@/lib/asaas.server");
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { sendDonationConfirmedEmails } = await import("@/lib/email.server");

        let body: any;
        try { body = await request.json(); } catch { return new Response("Bad request", { status: 400 }); }

        const event: string = body?.event || "";
        const payment = body?.payment || {};
        const asaasId: string | undefined = payment?.id;
        if (!asaasId) return new Response("ok");

        let status = mapAsaasStatus(payment?.status);
        if (event.startsWith("PAYMENT_CONFIRMED") || event.startsWith("PAYMENT_RECEIVED")) status = "CONFIRMED";
        else if (event.startsWith("PAYMENT_REFUNDED")) status = "REFUNDED";
        else if (event.startsWith("PAYMENT_DELETED") || event.startsWith("PAYMENT_CHARGEBACK")) status = "CANCELLED";
        else if (event.startsWith("PAYMENT_OVERDUE") || event.includes("FAILED")) status = "FAILED";

        const { data: updated, error } = await supabaseAdmin
          .from("donations")
          .update({ status })
          .eq("asaas_id", asaasId)
          .select()
          .maybeSingle();
        if (error) console.error("[webhook update]", error);

        // Envia email apenas uma vez quando confirmada
        if (status === "CONFIRMED" && updated && !updated.confirmation_email_sent_at) {
          try {
            await sendDonationConfirmedEmails({
              donor_name: updated.donor_name,
              donor_email: updated.donor_email,
              amount: Number(updated.amount),
              payment_method: updated.payment_method,
              type: updated.type,
              campaign: updated.campaign ?? undefined,
              asaas_id: updated.asaas_id ?? asaasId,
            });
            await supabaseAdmin
              .from("donations")
              .update({ confirmation_email_sent_at: new Date().toISOString() })
              .eq("id", updated.id);
          } catch (e) {
            console.error("[email confirmação]", e);
          }
        }

        return new Response("ok");
      },
    },
  },
});
