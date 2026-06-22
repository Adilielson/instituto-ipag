import process from "node:process";

const FROM = "Instituto IPAG <onboarding@resend.dev>";
const ADMIN_EMAIL = "instituto.ipag@gmail.com";

type SendArgs = {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
};

async function sendEmail({ to, subject, html, replyTo }: SendArgs) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY ausente — pulando envio");
    return { skipped: true };
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: FROM,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("[resend]", res.status, text);
    throw new Error(`Falha ao enviar email (${res.status})`);
  }
  return res.json();
}

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function baseLayout(title: string, body: string) {
  return `<!doctype html><html><body style="font-family:Arial,sans-serif;background:#f6f7f9;margin:0;padding:24px;color:#1a1a1a">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #eaeaea">
      <tr><td style="padding:24px 28px;background:#0f3460;color:#ffffff">
        <h1 style="margin:0;font-size:20px">Instituto IPAG</h1>
      </td></tr>
      <tr><td style="padding:28px">
        <h2 style="margin:0 0 16px;font-size:18px;color:#0f3460">${title}</h2>
        ${body}
      </td></tr>
      <tr><td style="padding:16px 28px;background:#fafafa;color:#888;font-size:12px;text-align:center">
        Este é um email automático do Instituto IPAG.
      </td></tr>
    </table></body></html>`;
}

export async function sendDonationConfirmedEmails(d: {
  donor_name: string;
  donor_email: string;
  amount: number;
  payment_method: string;
  type: string;
  campaign?: string | null;
  asaas_id: string;
}) {
  const projeto = d.campaign || "Doação Geral";
  const tipo = d.type === "MONTHLY" ? "Doação mensal" : "Doação única";

  // Doador
  const donorHtml = baseLayout(
    "Recebemos sua doação 💙",
    `<p>Olá <strong>${d.donor_name}</strong>,</p>
     <p>Confirmamos o recebimento da sua contribuição. Obrigado por apoiar o Instituto IPAG e transformar vidas com a gente.</p>
     <table style="width:100%;border-collapse:collapse;margin:16px 0">
       <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Projeto</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${projeto}</td></tr>
       <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Valor</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${brl(d.amount)}</td></tr>
       <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Tipo</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${tipo}</td></tr>
       <tr><td style="padding:8px"><strong>Forma de pagamento</strong></td><td style="padding:8px">${d.payment_method}</td></tr>
     </table>
     <p style="color:#555">Em caso de dúvidas, basta responder este email.</p>`
  );

  // Admin
  const adminHtml = baseLayout(
    "Nova doação confirmada",
    `<p>Uma nova doação foi confirmada no Asaas.</p>
     <table style="width:100%;border-collapse:collapse;margin:16px 0">
       <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Doador</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${d.donor_name}</td></tr>
       <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Email</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${d.donor_email}</td></tr>
       <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Projeto</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${projeto}</td></tr>
       <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Valor</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${brl(d.amount)}</td></tr>
       <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Tipo</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${tipo}</td></tr>
       <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Pagamento</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${d.payment_method}</td></tr>
       <tr><td style="padding:8px"><strong>Asaas ID</strong></td><td style="padding:8px">${d.asaas_id}</td></tr>
     </table>`
  );

  await Promise.allSettled([
    sendEmail({
      to: d.donor_email,
      subject: "Recebemos sua doação — Instituto IPAG",
      html: donorHtml,
    }),
    sendEmail({
      to: ADMIN_EMAIL,
      subject: `Nova doação confirmada — ${d.donor_name} (${brl(d.amount)})`,
      html: adminHtml,
      replyTo: d.donor_email,
    }),
  ]);
}
