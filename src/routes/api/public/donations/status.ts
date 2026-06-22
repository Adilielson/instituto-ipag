import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const Schema = z.object({ id: z.string().uuid() });

export const Route = createFileRoute("/api/public/donations/status")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: any;
        try { body = await request.json(); } catch { return new Response("Bad request", { status: 400 }); }
        const parsed = Schema.safeParse(body);
        if (!parsed.success) return new Response("Invalid", { status: 400 });

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data } = await supabaseAdmin
          .from("donations")
          .select("id,status,payment_method,type,amount,campaign,donor_email,donor_name,asaas_id,confirmation_email_sent_at")
          .eq("id", parsed.data.id)
          .maybeSingle();
        if (!data) return new Response(JSON.stringify({ success: false }), { status: 404, headers: { "Content-Type": "application/json" } });
        let donation = data;

        if (donation.status === "PENDING" && donation.asaas_id) {
          try {
            const { getAsaasConfig, getAsaasCharge, mapAsaasStatus } = await import("@/lib/asaas.server");
            const cfg = await getAsaasConfig();
            const charge = await getAsaasCharge(cfg, donation.asaas_id);
            const liveStatus = mapAsaasStatus(charge?.status);
            if (liveStatus !== donation.status) {
              const { data: updated } = await supabaseAdmin
                .from("donations")
                .update({ status: liveStatus })
                .eq("id", donation.id)
                .select("id,status,payment_method,type,amount,campaign,donor_email,donor_name,asaas_id,confirmation_email_sent_at")
                .maybeSingle();
              if (updated) donation = updated;
            }
          } catch (e) {
            console.warn("[donation status sync]", e);
          }
        }

        if (donation.status === "CONFIRMED" && !donation.confirmation_email_sent_at) {
          try {
            const { sendDonationConfirmedEmails } = await import("@/lib/email.server");
            await sendDonationConfirmedEmails({
              donor_name: donation.donor_name,
              donor_email: donation.donor_email,
              amount: Number(donation.amount),
              payment_method: donation.payment_method,
              type: donation.type,
              campaign: donation.campaign ?? undefined,
              asaas_id: donation.asaas_id ?? donation.id,
            });
            const { data: updated } = await supabaseAdmin
              .from("donations")
              .update({ confirmation_email_sent_at: new Date().toISOString() })
              .eq("id", donation.id)
              .select("id,status,payment_method,type,amount,campaign,donor_email,donor_name,asaas_id,confirmation_email_sent_at")
              .maybeSingle();
            if (updated) donation = updated;
          } catch (e) {
            console.error("[email confirmação status]", e);
          }
        }

        return Response.json({ success: true, ...donation });
      },
    },
  },
});
