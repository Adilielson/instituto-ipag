import { createFileRoute } from "@tanstack/react-router";
import { timingSafeEqual } from "node:crypto";
export const Route = createFileRoute("/api/public/donations/reconcile")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { getRemindersCronSecret } = await import("@/lib/cron-secret.server");
        const secret = await getRemindersCronSecret();
        if (!secret) return new Response("Not configured", { status: 503 });
        const expected = Buffer.from(secret),
          supplied = Buffer.from(request.headers.get("x-cron-secret") || "");
        if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied))
          return new Response("Unauthorized", { status: 401 });
        try {
          const { ledgerDb, checked, reconcileBatch } =
            await import("@/lib/donations/ledger.server");
          const { getAsaasConfig } = await import("@/lib/asaas.server");
          const cfg = await getAsaasConfig();
          const last = checked(
            await ledgerDb
              .from("donation_sync_runs")
              .select("*")
              .eq("environment", cfg.env)
              .eq("scheduled", true)
              .order("started_at", { ascending: false })
              .limit(1)
              .maybeSingle(),
          ).data;
          // Skip an overlapping scheduler call; a stalled run may be retried after 15 minutes.
          if (last?.status === "RUNNING" && Date.now() - Date.parse(last.started_at) < 900000)
            return Response.json({ skipped: "running" });
          const cursor =
            last?.status === "FAILED" || last?.status === "RUNNING"
              ? last.cursor_id
              : last?.next_cursor;
          return Response.json(await reconcileBatch(cursor || null, null, true));
        } catch {
          return new Response("Reconciliation failed; retry", { status: 503 });
        }
      },
    },
  },
});
