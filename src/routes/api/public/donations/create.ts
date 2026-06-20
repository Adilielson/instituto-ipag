import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const Schema = z.object({
  donor_name: z.string().trim().min(2).max(120),
  donor_email: z.string().trim().email().max(160),
  donor_cpf: z.string().trim().min(11).max(20),
  donor_phone: z.string().trim().max(30).optional().or(z.literal("")),
  amount: z.number().positive().max(1_000_000),
  type: z.enum(["ONE_TIME", "MONTHLY"]),
  payment_method: z.enum(["PIX", "BOLETO", "CREDIT_CARD"]),
  campaign: z.string().max(120).optional().or(z.literal("")),
  project_id: z.string().uuid().optional().nullable(),
  card: z
    .object({
      holderName: z.string().min(2),
      number: z.string().min(12),
      expiryMonth: z.string().min(1),
      expiryYear: z.string().min(2),
      ccv: z.string().min(3),
    })
    .optional(),
});

function jsonError(message: string, status = 400) {
  return new Response(JSON.stringify({ success: false, error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const Route = createFileRoute("/api/public/donations/create")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try { body = await request.json(); } catch { return jsonError("Corpo inválido"); }
        const parsed = Schema.safeParse(body);
        if (!parsed.success) return jsonError(parsed.error.issues[0]?.message || "Dados inválidos");
        const data = parsed.data;

        const { getAsaasConfig, asaasFetch, findOrCreateCustomer } = await import("@/lib/asaas.server");
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        let cfg;
        try { cfg = await getAsaasConfig(); }
        catch (e: any) { return jsonError(e?.message || "Asaas não configurado", 500); }

        let customer;
        try {
          customer = await findOrCreateCustomer(cfg, {
            name: data.donor_name,
            email: data.donor_email,
            cpfCnpj: data.donor_cpf,
            phone: data.donor_phone || undefined,
          });
        } catch (e: any) {
          console.error("[asaas customer]", e);
          return jsonError(e?.message || "Erro ao criar cliente", 502);
        }

        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 3);
        const dueDateStr = dueDate.toISOString().slice(0, 10);

        const billingMap: Record<string, string> = {
          PIX: "PIX",
          BOLETO: "BOLETO",
          CREDIT_CARD: "CREDIT_CARD",
        };

        // Build payload
        const projectLabel = data.campaign || "Geral";
        const description = `Doação IPAG — Projeto: ${projectLabel} — Doador: ${data.donor_name}`;
        // externalReference must be <= 100 chars in Asaas. Keep it short and parseable.
        const refRaw = `proj:${data.project_id || "geral"}|t:${data.type === "MONTHLY" ? "M" : "O"}`;
        const externalReference = refRaw.slice(0, 100);

        let asaasResp: any;
        try {
          if (data.type === "MONTHLY") {
            const subPayload: any = {
              customer: customer.id,
              billingType: billingMap[data.payment_method],
              value: data.amount,
              nextDueDate: dueDateStr,
              cycle: "MONTHLY",
              description,
              externalReference,
            };
            if (data.payment_method === "CREDIT_CARD" && data.card) {
              subPayload.creditCard = {
                holderName: data.card.holderName,
                number: data.card.number.replace(/\s/g, ""),
                expiryMonth: data.card.expiryMonth,
                expiryYear: data.card.expiryYear,
                ccv: data.card.ccv,
              };
              subPayload.creditCardHolderInfo = {
                name: data.donor_name,
                email: data.donor_email,
                cpfCnpj: data.donor_cpf.replace(/\D/g, ""),
                postalCode: "00000000",
                addressNumber: "0",
                phone: data.donor_phone?.replace(/\D/g, "") || "",
              };
            }
            asaasResp = await asaasFetch(cfg, "/subscriptions", {
              method: "POST",
              body: JSON.stringify(subPayload),
            });
          } else {
            const payPayload: any = {
              customer: customer.id,
              billingType: billingMap[data.payment_method],
              value: data.amount,
              dueDate: dueDateStr,
              description,
              externalReference,
            };
            if (data.payment_method === "CREDIT_CARD" && data.card) {
              payPayload.creditCard = {
                holderName: data.card.holderName,
                number: data.card.number.replace(/\s/g, ""),
                expiryMonth: data.card.expiryMonth,
                expiryYear: data.card.expiryYear,
                ccv: data.card.ccv,
              };
              payPayload.creditCardHolderInfo = {
                name: data.donor_name,
                email: data.donor_email,
                cpfCnpj: data.donor_cpf.replace(/\D/g, ""),
                postalCode: "00000000",
                addressNumber: "0",
                phone: data.donor_phone?.replace(/\D/g, "") || "",
              };
            }
            asaasResp = await asaasFetch(cfg, "/payments", {
              method: "POST",
              body: JSON.stringify(payPayload),
            });
          }
        } catch (e: any) {
          console.error("[asaas create]", e);
          return jsonError(e?.message || "Erro ao processar pagamento", 502);
        }

        // Extract details
        const paymentId: string = asaasResp.id;
        const invoiceUrl: string | undefined = asaasResp.invoiceUrl;
        const bankSlipUrl: string | undefined = asaasResp.bankSlipUrl;
        const status: string = asaasResp.status || "PENDING";
        let pixQrcode: string | undefined;
        let pixPayload: string | undefined;

        if (data.payment_method === "PIX" && data.type === "ONE_TIME") {
          try {
            const qr = await asaasFetch<any>(cfg, `/payments/${paymentId}/pixQrCode`);
            pixQrcode = qr?.encodedImage ? `data:image/png;base64,${qr.encodedImage}` : undefined;
            pixPayload = qr?.payload;
          } catch (e) {
            console.warn("[asaas pix qr]", e);
          }
        }

        // Map status
        const internalStatus =
          status === "CONFIRMED" || status === "RECEIVED" ? "CONFIRMED"
          : status === "REFUNDED" ? "REFUNDED"
          : status === "OVERDUE" || status === "FAILED" ? "FAILED"
          : "PENDING";

        // Insert donation
        const { data: donation, error: insErr } = await supabaseAdmin
          .from("donations")
          .insert({
            donor_name: data.donor_name,
            donor_email: data.donor_email,
            donor_cpf: data.donor_cpf.replace(/\D/g, ""),
            donor_phone: data.donor_phone || null,
            amount: data.amount,
            type: data.type,
            payment_method: data.payment_method,
            status: internalStatus,
            asaas_id: paymentId,
            asaas_customer: customer.id,
            asaas_link: invoiceUrl || null,
            pix_qrcode: pixQrcode || null,
            pix_payload: pixPayload || null,
            boleto_url: bankSlipUrl || null,
            invoice_url: invoiceUrl || null,
            campaign: data.campaign || null,
            project_id: data.project_id || null,
          })
          .select()
          .single();

        if (insErr) {
          console.error("[donation insert]", insErr);
          return jsonError("Erro ao salvar doação", 500);
        }

        return Response.json({
          success: true,
          donation,
          pix_qrcode: pixQrcode,
          pix_payload: pixPayload,
          boleto_url: bankSlipUrl,
          invoice_url: invoiceUrl,
        });
      },
    },
  },
});
