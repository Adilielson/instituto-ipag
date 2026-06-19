import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/donations/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { getAsaasConfig } = await import("@/lib/asaas.server");
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        let cfg;
        try { cfg = await getAsaasConfig(); }
        catch { return new Response("Misconfigured", { status: 500 }); }

        if (cfg.webhookToken) {
          const provided = request.headers.get("asaas-access-token") || request.headers.get("Asaas-Access-Token");
          if (provided !== cfg.webhookToken) {
            return new Response("Unauthorized", { status: 401 });
          }
        }

        let body: any;
        try { body = await request.json(); } catch { return new Response("Bad request", { status: 400 }); }

        const event: string = body?.event || "";
        const payment = body?.payment || {};
        const asaasId: string | undefined = payment?.id;
        if (!asaasId) return new Response("ok");

        let status: "CONFIRMED" | "PENDING" | "FAILED" | "REFUNDED" | "CANCELLED" = "PENDING";
        if (event.startsWith("PAYMENT_CONFIRMED") || event.startsWith("PAYMENT_RECEIVED")) status = "CONFIRMED";
        else if (event.startsWith("PAYMENT_REFUNDED")) status = "REFUNDED";
        else if (event.startsWith("PAYMENT_DELETED") || event.startsWith("PAYMENT_CHARGEBACK")) status = "CANCELLED";
        else if (event.startsWith("PAYMENT_OVERDUE") || event.includes("FAILED")) status = "FAILED";

        const { error } = await supabaseAdmin
          .from("donations")
          .update({ status })
          .eq("asaas_id", asaasId);
        if (error) console.error("[webhook update]", error);

        return new Response("ok");
      },
    },
  },
});
