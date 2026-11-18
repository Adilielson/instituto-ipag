import { PGlite } from "@electric-sql/pglite";
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import ts from "typescript";
const source = readFileSync("src/lib/donations/model.ts", "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
}).outputText;
const model = await import(
  "data:text/javascript;base64," + Buffer.from(compiled).toString("base64")
);
let checks = 0;
const check = (v, msg) => {
  assert.ok(v, msg);
  checks++;
};
const db = new PGlite();
await db.exec(`CREATE ROLE anon; CREATE ROLE authenticated; CREATE ROLE service_role;
CREATE TABLE donations(id uuid PRIMARY KEY, donor_name text, donor_email text, project_id uuid, campaign text, asaas_id text);
INSERT INTO donations VALUES ('11111111-1111-4111-8111-111111111111','Doador teste','teste@example.invalid',NULL,'Educação','sub_test');`);
await db.exec(readFileSync("supabase/migrations/20261118160000_donation_ledger.sql", "utf8"));
await db.exec(
  `INSERT INTO donation_donors VALUES ('sandbox','cus_test','Teste','teste@example.invalid'),('production','cus_test','Teste','teste@example.invalid');`,
);
const id = "11111111-1111-4111-8111-111111111111";
const raw = {
  id: "pay_test",
  customer: "cus_test",
  subscription: "sub_test",
  value: 50,
  netValue: 48,
  status: "RECEIVED",
  billingType: "PIX",
  dateCreated: "2026-11-01",
  dueDate: "2026-11-05",
  paymentDate: "2026-11-05",
  creditDate: "2026-11-05",
};
const record = async (p) =>
  db.query("SELECT record_donation_payment($1::jsonb)", [JSON.stringify(p)]);
const snap = model.normalizePayment(raw, "sandbox", id, "2026-11-18T12:00:00Z");
await record(snap);
await record(snap);
check(
  (await db.query("SELECT count(*)::int n FROM donation_payments")).rows[0].n === 1,
  "duplicate payment does not double count",
);
await record({ ...snap, status: "PENDING", observed_at: "2026-11-17T12:00:00Z" });
check(
  (await db.query("SELECT status FROM donation_payments")).rows[0].status === "RECEIVED",
  "stale snapshot ignored",
);
for (let i = 0; i < 505; i++) await record({ ...snap, payment_id: "pay_" + i });
await record({ ...snap, payment_id: "pay_pending", status: "PENDING" });
await record({ ...snap, payment_id: "pay_overdue", status: "OVERDUE" });
await record({ ...snap, payment_id: "pay_confirmed", status: "CONFIRMED" });
await record({ ...snap, payment_id: "pay_refund", status: "REFUNDED", refunded_amount: 50 });
await record({
  ...snap,
  payment_id: "pay_partial",
  status: "PARTIALLY_REFUNDED",
  refunded_amount: 10,
});
await record({ ...snap, payment_id: "pay_dispute", status: "CHARGEBACK_DISPUTE" });
await record({ ...snap, environment: "production", payment_id: "pay_live" });
const dashboard = async (filters = {}, env = "sandbox") =>
  (await db.query("SELECT donation_dashboard($1,$2::jsonb) d", [env, JSON.stringify(filters)]))
    .rows[0].d;
const d = await dashboard();
check(d.total === 512, "all records counted beyond 500");
check(d.payments.length === 50, "table paginated");
check(d.totals.received === 25300, "received sum includes all pages only settled");
check(d.totals.net === 24288, "net sum correct");
check(d.totals.fees === 1012, "fees sum correct");
check(
  d.totals.pending === 50 && d.totals.overdue === 50 && d.totals.confirmed === 50,
  "status buckets separate",
);
check(d.totals.refunded === 60, "partial/full refunds tracked");
check(d.totals.review === 2, "partial refunds/disputes flagged");
check((await dashboard({}, "production")).total === 1, "sandbox isolated from production");
check((await dashboard({ status: "PENDING" })).total === 1, "status filter");
check(
  (await dashboard({ search: "TESTE@example" })).total === 512,
  "case insensitive donor search",
);
check((await dashboard({ search: "' OR true --" })).total === 0, "search is data, not SQL");
check(
  (await dashboard({ dateField: "payment_date", from: "2026-12-01" })).total === 0,
  "date filter",
);
check((await dashboard({ project: "Outro" })).total === 0, "project filter");
check((await dashboard({ page: 10 })).payments.length === 12, "last page complete");
check(d.donors[0].payments === 512 && d.donorCount === 1, "donor grouping");
await db.exec(
  `INSERT INTO donation_subscriptions VALUES ('sandbox','sub_test','${id}','cus_test','ACTIVE',50,'2026-12-05',now());`,
);
check(
  (await dashboard()).totals.received === 25300,
  "active subscription does not increase received",
);
check((await dashboard()).subscriptions.length === 1, "recurrence visible");
check(
  (await db.query("SELECT donation_public_total(NULL) n")).rows[0].n === "50.00",
  "public total production only",
);
for (const role of ["anon", "authenticated"]) {
  await db.exec(`SET ROLE ${role}`);
  for (const sql of [
    "SELECT * FROM donation_payments",
    "SELECT donation_dashboard('sandbox')",
    "SELECT record_donation_payment('{}')",
  ]) {
    await assert.rejects(() => db.exec(sql));
    checks++;
  }
  await db.exec("RESET ROLE");
}
check(model.safeProviderUrl("javascript:alert(1)") === null, "unsafe scheme rejected");
check(model.safeProviderUrl("https://evil.example/asaas.com") === null, "external link rejected");
check(model.safeProviderUrl("https://www.asaas.com/i/test") !== null, "provider link accepted");
check(model.csvCell('=HYPERLINK("evil")').startsWith("\"'"), "formula injection neutralized");
check(model.csvCell("a;b").includes("a;b"), "CSV delimiter quoted");
check(
  model.normalizePayment(
    {
      ...raw,
      status: "PARTIALLY_REFUNDED",
      refunds: [
        { status: "DONE", value: 10 },
        { status: "PENDING", value: 20 },
      ],
    },
    "sandbox",
    id,
    new Date().toISOString(),
  ).refunded_amount === 10,
  "only completed refunds count",
);
const helper = readFileSync("src/lib/asaas.server.ts", "utf8");
check(!helper.includes('"RECEIVED_IN_CASH", "ACTIVE"'), "active no longer maps to payment");
const exported = await dashboard({ export: true });
check(exported.payments.length === 512, "single snapshot export includes all pages");
const olderSub = {
  environment: "sandbox",
  subscription_id: "sub_test",
  donation_id: id,
  customer_id: "cus_test",
  status: "INACTIVE",
  amount: 50,
  next_due_date: "2026-12-05",
  observed_at: "2020-01-01T00:00:00Z",
};
await db.query("SELECT record_donation_subscription($1::jsonb)", [JSON.stringify(olderSub)]);
check(
  (await dashboard()).subscriptions[0].status === "ACTIVE",
  "stale subscription snapshot ignored",
);
check(
  model.normalizePayment(
    { ...raw, status: "RECEIVED", refunds: [{ status: "DONE", value: 10 }] },
    "sandbox",
    id,
    new Date().toISOString(),
  ).status === "PARTIALLY_REFUNDED",
  "completed refund prevents counting original received amount",
);
check(
  model.normalizePayment(
    { ...raw, status: "RECEIVED", refunds: [{ status: "DONE", value: 50 }] },
    "sandbox",
    id,
    new Date().toISOString(),
  ).status === "REFUNDED",
  "full refund overrides stale received status",
);
await db.close();
console.log(`${checks} donation ledger checks passed`);
