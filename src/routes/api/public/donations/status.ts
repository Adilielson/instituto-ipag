import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const Schema = z.object({ id: z.string().uuid() });

function corsHeaders(request: Request) {
  const origin = request.headers.get("Origin") || "*";
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

export const Route = createFileRoute("/api/public/donations/status")({
  server: {
    handlers: {
      OPTIONS: async ({ request }) =>
        new Response(null, { status: 204, headers: corsHeaders(request) }),
      POST: async ({ request }) => {
        let body: any;
        try {
          body = await request.json();
        } catch {
          return new Response("Bad request", { status: 400, headers: corsHeaders(request) });
        }
        const parsed = Schema.safeParse(body);
        if (!parsed.success)
          return new Response("Invalid", { status: 400, headers: corsHeaders(request) });

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data } = await supabaseAdmin
          .from("donations")
          .select(
            "id,status,payment_method,type,amount,campaign,donor_email,donor_name,asaas_id,confirmation_email_sent_at",
          )
          .eq("id", parsed.data.id)
          .maybeSingle();
        if (!data)
          return new Response(JSON.stringify({ success: false }), {
            status: 404,
            headers: { "Content-Type": "application/json", ...corsHeaders(request) },
          });
        let donation = data;

        if (donation.type === "ONE_TIME" && donation.status === "PENDING" && donation.asaas_id) {
          try {
            const { getAsaasConfig, getAsaasCharge, mapAsaasStatus } =
              await import("@/lib/asaas.server");
            const { syncPaymentId } = await import("@/lib/donations/ledger.server");
            const verified = await syncPaymentId(donation.asaas_id);
            const charge = { status: verified.status };
            const liveStatus = mapAsaasStatus(charge?.status);
            if (liveStatus !== donation.status) {
              const { data: updated } = await supabaseAdmin
                .from("donations")
                .update({ status: liveStatus })
                .eq("id", donation.id)
                .select(
                  "id,status,payment_method,type,amount,campaign,donor_email,donor_name,asaas_id,confirmation_email_sent_at",
                )
                .maybeSingle();
              if (updated) donation = updated;
            }
          } catch (e) {
            console.warn("[donation status sync]", e);
          }
        }

        // A recurring commitment is never evidence of payment. Show the first verified installment.
        if (donation.type === "MONTHLY") {
          const { ledgerDb, checked } = await import("@/lib/donations/ledger.server");
          const { getAsaasConfig, mapAsaasStatus } = await import("@/lib/asaas.server");
          const cfg = await getAsaasConfig();
          const latest = checked(
            await ledgerDb
              .from("donation_payments")
              .select("status")
              .eq("environment", cfg.env)
              .eq("donation_id", donation.id)
              .order("due_date", { ascending: true })
              .limit(1)
              .maybeSingle(),
          ).data;
          donation = { ...donation, status: latest ? mapAsaasStatus(latest.status) : "PENDING" };
        }
        if (donation.status === "CONFIRMED") {
          const { notifyFirstConfirmedDonation } = await import("@/lib/donations/ledger.server");
          try {
            await notifyFirstConfirmedDonation(donation.id);
          } catch {
            /* webhook/reconciliation can retry */
          }
        }

        return Response.json(
          {
            success: true,
            id: donation.id,
            status: donation.status,
            amount: donation.amount,
            payment_method: donation.payment_method,
            type: donation.type,
          },
          { headers: corsHeaders(request) },
        );
      },
    },
  },
});
