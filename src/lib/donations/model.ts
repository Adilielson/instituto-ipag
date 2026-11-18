export const statusLabels: Record<string, string> = {
  PENDING: "Pendente",
  RECEIVED: "Recebido",
  CONFIRMED: "Confirmado — a liberar",
  OVERDUE: "Vencido",
  REFUNDED: "Estornado",
  PARTIALLY_REFUNDED: "Estorno parcial",
  DELETED: "Excluído",
  RECEIVED_IN_CASH: "Recebido fora do Asaas",
  CHARGEBACK_REQUESTED: "Contestação",
  CHARGEBACK_DISPUTE: "Em disputa",
  AWAITING_CHARGEBACK_REVERSAL: "Aguardando reversão",
  REFUND_REQUESTED: "Estorno solicitado",
  REFUND_IN_PROGRESS: "Estorno em andamento",
  ACTIVE: "Ativa",
  INACTIVE: "Inativa",
  EXPIRED: "Expirada",
};
export const methods: Record<string, string> = {
  PIX: "PIX",
  BOLETO: "Boleto",
  CREDIT_CARD: "Cartão",
};
export type Payment = {
  environment: string;
  payment_id: string;
  donation_id: string;
  customer_id: string;
  subscription_id: string | null;
  status: string;
  amount: number;
  net_amount: number | null;
  refunded_amount: number;
  billing_type: string;
  created_date: string | null;
  due_date: string | null;
  payment_date: string | null;
  credit_date: string | null;
  invoice_url: string | null;
  receipt_url: string | null;
  observed_at: string;
  donor_name?: string;
  donor_email?: string;
  campaign?: string | null;
  project_id?: string | null;
};
export function safeProviderUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  try {
    const u = new URL(value);
    return u.protocol === "https:" &&
      (u.hostname === "asaas.com" || u.hostname.endsWith(".asaas.com"))
      ? u.href
      : null;
  } catch {
    return null;
  }
}
export function normalizePayment(
  raw: any,
  environment: string,
  donationId: string,
  observedAt: string,
): Payment {
  if (
    !/^pay_[\w-]+$/.test(raw.id || "") ||
    !raw.customer ||
    !Number.isFinite(Number(raw.value)) ||
    Number(raw.value) < 0
  )
    throw new Error("Cobrança Asaas inválida.");
  const date = (v: unknown) => (typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : null);
  const amount = Number(raw.value);
  const refunds = (raw.refunds || [])
    .filter((r: any) => r.status === "DONE")
    .reduce((s: number, r: any) => s + Number(r.value || 0), 0);
  if (!Number.isFinite(refunds) || (raw.netValue != null && !Number.isFinite(Number(raw.netValue))))
    throw new Error("Valores financeiros inválidos.");
  const refundedAmount =
    raw.status === "REFUNDED" ? amount : Math.min(amount, Math.max(0, refunds));
  let normalizedStatus = String(raw.status || "UNKNOWN");
  if (refundedAmount > 0)
    normalizedStatus = refundedAmount >= amount ? "REFUNDED" : "PARTIALLY_REFUNDED";
  if (raw.deleted) normalizedStatus = "DELETED";
  return {
    environment,
    donation_id: donationId,
    payment_id: raw.id,
    customer_id: raw.customer,
    subscription_id: raw.subscription || null,
    status: normalizedStatus,
    amount,
    net_amount: raw.netValue == null ? null : Number(raw.netValue),
    refunded_amount: refundedAmount,
    billing_type: raw.billingType || "UNKNOWN",
    created_date: date(raw.dateCreated),
    due_date: date(raw.dueDate),
    payment_date: date(raw.paymentDate || raw.clientPaymentDate),
    credit_date: date(raw.creditDate || raw.estimatedCreditDate),
    invoice_url: safeProviderUrl(raw.invoiceUrl || raw.bankSlipUrl),
    receipt_url: safeProviderUrl(raw.transactionReceiptUrl),
    observed_at: observedAt,
  };
}
export function csvCell(value: unknown) {
  const text = String(value ?? "");
  return '"' + (/^[\s]*[=+@\-\t\r]/.test(text) ? "'" + text : text).replaceAll('"', '""') + '"';
}
export function paymentsCsv(rows: Payment[]) {
  return (
    "\uFEFF" +
    [
      [
        "Pagamento",
        "Doador",
        "E-mail",
        "Projeto",
        "Assinatura",
        "Status",
        "Método",
        "Valor bruto",
        "Valor líquido informado",
        "Estornado",
        "Criação",
        "Vencimento",
        "Pagamento",
        "Crédito",
      ],
      ...rows.map((p) => [
        p.payment_id,
        p.donor_name,
        p.donor_email,
        p.campaign,
        p.subscription_id,
        statusLabels[p.status] || p.status,
        methods[p.billing_type] || p.billing_type,
        p.amount,
        p.net_amount,
        p.refunded_amount,
        p.created_date,
        p.due_date,
        p.payment_date,
        p.credit_date,
      ]),
    ]
      .map((row) => row.map(csvCell).join(";"))
      .join("\r\n")
  );
}
