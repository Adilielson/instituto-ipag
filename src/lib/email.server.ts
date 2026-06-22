import process from "node:process";

const FROM = "Instituto IPAG <instituto.ipag@gmail.com>";
const ADMIN_EMAIL = "instituto.ipag@gmail.com";
const GMAIL_GATEWAY = "https://connector-gateway.lovable.dev/google_mail/gmail/v1";

type SendArgs = {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
};

function b64url(str: string) {
  // UTF-8 safe base64url
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function buildRawEmail(opts: {
  from: string;
  to: string[];
  subject: string;
  html: string;
  replyTo?: string;
}) {
  // Encode subject as UTF-8 (RFC 2047) to support accents
  const subjectEncoded = `=?UTF-8?B?${btoa(unescape(encodeURIComponent(opts.subject)))}?=`;
  const headers = [
    `From: ${opts.from}`,
    `To: ${opts.to.join(", ")}`,
    `Subject: ${subjectEncoded}`,
    "MIME-Version: 1.0",
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: 7bit",
  ];
  if (opts.replyTo) headers.push(`Reply-To: ${opts.replyTo}`);
  return b64url(headers.join("\r\n") + "\r\n\r\n" + opts.html);
}

async function sendEmail({ to, subject, html, replyTo }: SendArgs) {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const gmailKey = process.env.GOOGLE_MAIL_API_KEY;
  if (!lovableKey || !gmailKey) {
    console.warn("[email] LOVABLE_API_KEY ou GOOGLE_MAIL_API_KEY ausente — pulando envio");
    return { skipped: true };
  }
  const recipients = Array.isArray(to) ? to : [to];
  const raw = buildRawEmail({ from: FROM, to: recipients, subject, html, replyTo });

  const res = await fetch(`${GMAIL_GATEWAY}/users/me/messages/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": gmailKey,
    },
    body: JSON.stringify({ raw }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("[gmail]", res.status, text);
    throw new Error(`Falha ao enviar email via Gmail (${res.status})`);
  }
  return res.json();
}

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function render(template: string, vars: Record<string, string>) {
  return template.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_, key) =>
    vars[key] !== undefined ? String(vars[key]) : "",
  );
}

function wrapLayout(opts: {
  headerImageUrl?: string | null;
  bodyHtml: string;
  footerHtml?: string | null;
}) {
  const header = opts.headerImageUrl
    ? `<tr><td style="padding:0"><img src="${opts.headerImageUrl}" alt="Instituto IPAG" style="display:block;width:100%;max-width:560px;height:auto"/></td></tr>`
    : `<tr><td style="padding:24px 28px;background:#0f3460;color:#ffffff"><h1 style="margin:0;font-size:20px">Instituto IPAG</h1></td></tr>`;
  const footer = opts.footerHtml
    ? `<tr><td style="padding:16px 28px;background:#fafafa;color:#888;font-size:12px;text-align:center">${opts.footerHtml}</td></tr>`
    : `<tr><td style="padding:16px 28px;background:#fafafa;color:#888;font-size:12px;text-align:center">Este é um email automático do Instituto IPAG.</td></tr>`;
  return `<!doctype html><html><body style="font-family:Arial,sans-serif;background:#f6f7f9;margin:0;padding:24px;color:#1a1a1a">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #eaeaea">
      ${header}
      <tr><td style="padding:28px">${opts.bodyHtml}</td></tr>
      ${footer}
    </table></body></html>`;
}

async function loadTemplate(slug: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("email_templates")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  if (error) {
    console.error("[email] erro ao carregar template", slug, error.message);
    return null;
  }
  return data;
}

async function loadTemplateById(id: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("email_templates")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) throw new Error("Template não encontrado");
  return data;
}

export async function renderAndSendTemplate(args: {
  templateId?: string;
  slug?: string;
  to: string | string[];
  vars: Record<string, string>;
  replyTo?: string;
}) {
  const tpl = args.templateId
    ? await loadTemplateById(args.templateId)
    : args.slug
      ? await loadTemplate(args.slug)
      : null;
  if (!tpl) {
    console.warn("[email] template ausente", args.slug || args.templateId);
    return;
  }
  const subject = render(tpl.subject, args.vars);
  const body = render(tpl.body_html, args.vars);
  const footer = tpl.footer_html ? render(tpl.footer_html, args.vars) : null;
  const html = wrapLayout({
    headerImageUrl: tpl.header_image_url,
    bodyHtml: body,
    footerHtml: footer,
  });
  return sendEmail({ to: args.to, subject, html, replyTo: args.replyTo });
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
  const vars: Record<string, string> = {
    donor_name: d.donor_name,
    donor_email: d.donor_email,
    project: projeto,
    amount: brl(d.amount),
    date: new Date().toLocaleString("pt-BR"),
    type: tipo,
    payment_method: d.payment_method,
    asaas_id: d.asaas_id,
  };

  await Promise.allSettled([
    renderAndSendTemplate({ slug: "donation_confirmation_donor", to: d.donor_email, vars }),
    renderAndSendTemplate({
      slug: "donation_confirmation_admin",
      to: ADMIN_EMAIL,
      vars,
      replyTo: d.donor_email,
    }),
  ]);
}
