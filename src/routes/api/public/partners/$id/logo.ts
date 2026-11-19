import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/api/public/partners/$id/logo")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        if (!/^[0-9a-f-]{36}$/i.test(params.id)) return new Response("Not found", { status: 404 });
        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const db = supabaseAdmin as import("@supabase/supabase-js").SupabaseClient;
          const { data: row, error } = await db
            .from("site_partners")
            .select("file_path")
            .eq("id", params.id)
            .eq("published", true)
            .maybeSingle();
          if (error) throw error;
          if (!row)
            return new Response("Not found", {
              status: 404,
              headers: { "Cache-Control": "no-store" },
            });
          const asset = await db.storage.from("partner-logos").download(row.file_path);
          if (asset.error || !asset.data) throw new Error("Logo unavailable");
          if (!["image/png", "image/jpeg", "image/webp"].includes(asset.data.type))
            throw new Error("Invalid logo type");
          return new Response(asset.data, {
            headers: {
              "Content-Type": asset.data.type,
              "Content-Length": String(asset.data.size),
              "Cache-Control": "public, max-age=60, s-maxage=60",
              "X-Content-Type-Options": "nosniff",
            },
          });
        } catch {
          return new Response("Logo temporarily unavailable", {
            status: 503,
            headers: { "Cache-Control": "no-store" },
          });
        }
      },
    },
  },
});
