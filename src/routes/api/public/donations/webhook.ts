import { createFileRoute } from "@tanstack/react-router";
import { timingSafeEqual } from "node:crypto";

export const Route = createFileRoute("/api/public/donations/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { getAsaasConfig, asaasFetch } = await import("@/lib/asaas.server");
        const {
          ledgerDb: db,
          checked,
          persistPayment,
          syncDonation,
        } = await import("@/lib/donations/ledger.server");
        try {
          const cfg = await getAsaasConfig();
          if (!cfg.webhookToken) return new Response("Webhook token required", { status: 503 });
          const supplied = Buffer.from(request.headers.get("asaas-access-token") || "");
          const expected = Buffer.from(cfg.webhookToken);
          if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected))
            return new Response("Unauthorized", { status: 401 });
          let body: any;
          try {
            body = await request.json();
          } catch {
            return new Response("Invalid JSON", { status: 400 });
          }
          if (typeof body.id !== "string" || body.id.length > 200 || typeof body.event !== "string")
            return new Response("Invalid event", { status: 400 });
          const previous = checked(
            await db
              .from("donation_webhook_events")
              .select("event_id")
              .eq("environment", cfg.env)
              .eq("event_id", body.id)
              .maybeSingle(),
          ).data;
          if (previous) return Response.json({ ok: true, duplicate: true });
          const observed = new Date().toISOString();
          let resource: string;
          let outcome = "PROCESSED";
          if (body.event.startsWith("PAYMENT_")) {
            resource = body.payment?.id;
            if (!/^pay_[\w-]+$/.test(resource || ""))
              return new Response("Invalid payment", { status: 400 });
            // Consult the authoritative current resource: delayed events cannot roll the ledger back.
            const raw = await asaasFetch<any>(cfg, `/payments/${encodeURIComponent(resource)}`);
            const saved = await persistPayment(cfg, raw, observed);
            if (!saved) outcome = "UNMATCHED";
            if (saved && ["CONFIRMED", "RECEIVED", "RECEIVED_IN_CASH"].includes(saved.status)) {
              const { notifyFirstConfirmedDonation } =
                await import("@/lib/donations/ledger.server");
              await notifyFirstConfirmedDonation(saved.donation_id);
            }
          } else if (body.event.startsWith("SUBSCRIPTION_")) {
            resource = body.subscription?.id;
            if (!/^sub_[\w-]+$/.test(resource || ""))
              return new Response("Invalid subscription", { status: 400 });
            const donation = checked(
              await db.from("donations").select("*").eq("asaas_id", resource).maybeSingle(),
            ).data;
            if (!donation) outcome = "UNMATCHED";
            else await syncDonation(cfg, donation);
          } else {
            return Response.json({ ok: true, ignored: true });
          }
          checked(
            await db
              .from("donation_webhook_events")
              .upsert(
                {
                  environment: cfg.env,
                  event_id: body.id,
                  event_type: body.event,
                  resource_id: resource,
                  outcome,
                },
                { onConflict: "environment,event_id", ignoreDuplicates: true },
              ),
          );
          return Response.json({ ok: true });
        } catch (e) {
          console.error("[donation webhook]", e instanceof Error ? e.message : "processing failed");
          return new Response("Processing failed; retry", { status: 503 });
        }
      },
    },
  },
});
