import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
const source = readFileSync("src/routes/api/public/donations/webhook.ts", "utf8")
  .replace(
    /import \{ createFileRoute \} from ["']@tanstack\/react-router["'];/,
    "const createFileRoute = () => config => config;",
  )
  .replaceAll(/import\(["']@\/lib\/asaas.server["']\)/g, "Promise.resolve(globalThis.__asaas)")
  .replaceAll(
    /import\(["']@\/lib\/donations\/ledger.server["']\)/g,
    "Promise.resolve(globalThis.__ledger)",
  );
const js = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { Route } = await import("data:text/javascript;base64," + Buffer.from(js).toString("base64"));
let token = "secret",
  fetches = 0,
  persists = 0,
  emails = 0,
  fail = false,
  unmatched = false;
const events = new Set();
globalThis.__asaas = {
  getAsaasConfig: async () => ({ env: "sandbox", webhookToken: token }),
  asaasFetch: async () => {
    fetches++;
    return { id: "pay_test", status: "RECEIVED" };
  },
};
globalThis.__ledger = {
  checked: (r) => {
    if (r.error) throw new Error("db unavailable");
    return r;
  },
  ledgerDb: {
    from: () => ({
      select() {
        return this;
      },
      eq(key, value) {
        if (key === "event_id") this.event = value;
        return this;
      },
      async maybeSingle() {
        return { data: events.has(this.event) ? { event_id: this.event } : null };
      },
      async upsert(e) {
        if (fail) return { error: true };
        events.add(e.event_id);
        return { data: e };
      },
    }),
  },
  persistPayment: async (cfg, raw) => {
    persists++;
    if (fail) throw new Error("write failed");
    assert.equal(raw.status, "RECEIVED");
    return unmatched ? null : { donation_id: "test", status: raw.status };
  },
  notifyFirstConfirmedDonation: async () => {
    emails++;
  },
  syncDonation: async () => {},
};
const event = {
  id: "evt_1",
  event: "PAYMENT_RECEIVED",
  payment: { id: "pay_test", status: "PENDING" },
};
const request = (body = event, key = "secret") =>
  Route.server.handlers.POST({
    request: new Request("https://ipag.invalid/api/public/donations/webhook", {
      method: "POST",
      headers: { "asaas-access-token": key, "Content-Type": "application/json" },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  });
let checks = 0;
const eq = (a, b) => {
  assert.equal(a, b);
  checks++;
};
eq((await request(event, "wrong")).status, 401);
eq(fetches, 0);
token = "";
eq((await request()).status, 503);
eq(fetches, 0);
token = "secret";
eq((await request("{invalid")).status, 400);
eq((await request({ ...event, payment: { id: "../../customers" } })).status, 400);
eq((await request()).status, 200);
eq(fetches, 1);
eq(persists, 1);
eq(emails, 1);
eq((await request()).status, 200);
eq(fetches, 1);
eq(emails, 1);
fail = true;
eq((await request({ ...event, id: "evt_retry" })).status, 503);
eq(events.has("evt_retry"), false);
fail = false;
eq((await request({ ...event, id: "evt_retry" })).status, 200);
eq(events.has("evt_retry"), true);
unmatched = true;
eq((await request({ ...event, id: "evt_external" })).status, 200);
eq(events.has("evt_external"), true);
eq((await request({ ...event, id: "evt_other", event: "TRANSFER_DONE" })).status, 200);
console.log(`${checks} webhook checks passed`);
