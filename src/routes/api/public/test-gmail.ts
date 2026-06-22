import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/test-gmail")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const to = url.searchParams.get("to") || "instituto.ipag@gmail.com";
        try {
          const { renderAndSendTemplate } = await import("@/lib/email.server");
          // Tenta usar um template existente; se falhar, envia HTML simples
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { data: tpl } = await supabaseAdmin
            .from("email_templates")
            .select("id, slug")
            .eq("is_active", true)
            .limit(1)
            .maybeSingle();

          if (tpl) {
            await renderAndSendTemplate({
              templateId: tpl.id,
              to,
              vars: {
                donor_name: "Teste Lovable",
                donor_email: to,
                project: "Teste de Envio Gmail",
                amount: "R$ 1,00",
                date: new Date().toLocaleString("pt-BR"),
                type: "Teste",
                payment_method: "PIX",
                asaas_id: "test_123",
              },
            });
            return Response.json({ ok: true, via: "template", slug: tpl.slug, to });
          }

          // fallback: chamar Gmail direto
          const lovableKey = process.env.LOVABLE_API_KEY;
          const gmailKey = process.env.GOOGLE_MAIL_API_KEY;
          if (!lovableKey || !gmailKey) {
            return Response.json(
              { ok: false, error: "Faltam LOVABLE_API_KEY ou GOOGLE_MAIL_API_KEY" },
              { status: 500 },
            );
          }
          const headers = [
            "From: Instituto IPAG <instituto.ipag@gmail.com>",
            `To: ${to}`,
            "Subject: =?UTF-8?B?" + btoa(unescape(encodeURIComponent("Teste Gmail — Instituto IPAG"))) + "?=",
            "MIME-Version: 1.0",
            'Content-Type: text/html; charset="UTF-8"',
          ].join("\r\n");
          const body = "<h2>Teste de envio via Gmail</h2><p>Funcionou! 🎉</p>";
          const bin = new TextEncoder().encode(headers + "\r\n\r\n" + body);
          let s = "";
          for (const b of bin) s += String.fromCharCode(b);
          const raw = btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
          const res = await fetch(
            "https://connector-gateway.lovable.dev/google_mail/gmail/v1/users/me/messages/send",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${lovableKey}`,
                "X-Connection-Api-Key": gmailKey,
              },
              body: JSON.stringify({ raw }),
            },
          );
          const data = await res.text();
          return new Response(data, { status: res.status });
        } catch (e: any) {
          return Response.json({ ok: false, error: e?.message || String(e) }, { status: 500 });
        }
      },
    },
  },
});
