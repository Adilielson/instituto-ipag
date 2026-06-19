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
          .select("id,status,payment_method,type,amount")
          .eq("id", parsed.data.id)
          .maybeSingle();
        if (!data) return new Response(JSON.stringify({ success: false }), { status: 404, headers: { "Content-Type": "application/json" } });
        return Response.json({ success: true, ...data });
      },
    },
  },
});
