import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useServerFn } from "@tanstack/react-start";
import { listSettings, saveSettings, testAsaas, runRemindersNow } from "@/lib/admin.functions";
import { toast } from "sonner";
import { ShieldCheck, Loader2, Plug, KeyRound, Bell, Send } from "lucide-react";

export const Route = createFileRoute("/admin/integracoes")({
  head: () => ({ meta: [{ title: "Integrações — Admin" }, { name: "robots", content: "noindex" }] }),
  component: AdminIntegracoes,
});

function AdminIntegracoes() {
  const listFn = useServerFn(listSettings);
  const saveFn = useServerFn(saveSettings);
  const testFn = useServerFn(testAsaas);
  const runRemindersFn = useServerFn(runRemindersNow);

  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [testing, setTesting] = useState(false);
  const [runningReminders, setRunningReminders] = useState(false);

  const [form, setForm] = useState({
    ASAAS_API_KEY: "",
    ASAAS_ENV: "sandbox" as "sandbox" | "production",
    ASAAS_WEBHOOK_TOKEN: "",
    REMINDERS_ENABLED: "true" as "true" | "false",
    REMINDERS_DAYS_BEFORE: "3",
  });

  async function unlock(e: React.FormEvent) {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    try {
      const s = await listFn({ data: { password } });
      setForm({
        ASAAS_API_KEY: s.ASAAS_API_KEY,
        ASAAS_ENV: (s.ASAAS_ENV as any) || "sandbox",
        ASAAS_WEBHOOK_TOKEN: s.ASAAS_WEBHOOK_TOKEN,
        REMINDERS_ENABLED: ((s as any).REMINDERS_ENABLED === "false" ? "false" : "true"),
        REMINDERS_DAYS_BEFORE: ((s as any).REMINDERS_DAYS_BEFORE || "3"),
      });
      setUnlocked(true);
    } catch (e: any) {
      toast.error(e?.message || "Erro");
    } finally { setLoading(false); }
  }

  async function save() {
    setLoading(true);
    try {
      await saveFn({ data: { password, ...form } });
      toast.success("Configurações salvas");
    } catch (e: any) { toast.error(e?.message || "Erro ao salvar"); }
    finally { setLoading(false); }
  }

  async function test() {
    setTesting(true);
    try {
      const r = await testFn({ data: { password } });
      toast.success(`Conexão OK — Ambiente: ${r.env}`);
    } catch (e: any) { toast.error(e?.message || "Falha na conexão"); }
    finally { setTesting(false); }
  }

  async function runReminders() {
    setRunningReminders(true);
    try {
      const r: any = await runRemindersFn({ data: { password } });
      toast.success(`Lembretes processados — enviados: ${r.sent ?? 0} · ignorados: ${r.skipped ?? 0}`);
    } catch (e: any) { toast.error(e?.message || "Falha ao enviar lembretes"); }
    finally { setRunningReminders(false); }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="rounded-3xl bg-white border border-black/5 p-6 lg:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Plug className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-black">Integrações</h1>
            <p className="text-sm text-muted-foreground">Configurações do gateway Asaas</p>
          </div>
        </div>

        {!unlocked ? (
          <form onSubmit={unlock} className="space-y-4 max-w-sm">
            <div className="flex items-center gap-2 text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>Esta área é protegida. Informe a senha de superadministrador.</span>
            </div>
            <div>
              <Label htmlFor="pwd">Senha superadmin</Label>
              <Input id="pwd" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <KeyRound className="h-4 w-4 mr-2" />}
              Desbloquear
            </Button>
          </form>
        ) : (
          <div className="space-y-5">
            <div>
              <Label>Ambiente</Label>
              <div className="flex gap-2 mt-1">
                {(["sandbox", "production"] as const).map((e) => (
                  <button
                    key={e}
                    onClick={() => setForm({ ...form, ASAAS_ENV: e })}
                    className={`px-4 py-2 rounded-xl border-2 text-sm font-bold ${
                      form.ASAAS_ENV === e ? "border-primary bg-primary/10 text-primary" : "border-border"
                    }`}
                  >
                    {e === "sandbox" ? "Sandbox" : "Produção"}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="key">API Key Asaas</Label>
              <Input id="key" value={form.ASAAS_API_KEY} onChange={(e) => setForm({ ...form, ASAAS_API_KEY: e.target.value })} placeholder="$aact_..." />
            </div>
            <div>
              <Label htmlFor="webhook">Webhook Token (Asaas-Access-Token)</Label>
              <Input id="webhook" value={form.ASAAS_WEBHOOK_TOKEN} onChange={(e) => setForm({ ...form, ASAAS_WEBHOOK_TOKEN: e.target.value })} placeholder="opcional, recomendado" />
              <p className="text-xs text-muted-foreground mt-1">
                URL do webhook: <code className="bg-muted px-1 rounded">/api/public/donations/webhook</code>
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={save} disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />} Salvar
              </Button>
              <Button variant="outline" onClick={test} disabled={testing}>
                {testing && <Loader2 className="h-4 w-4 animate-spin mr-2" />} Testar conexão
              </Button>
            </div>
          </div>
        )}
      </div>

      {unlocked && (
        <div className="rounded-3xl bg-white border border-black/5 p-6 lg:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-black">Lembretes de doação mensal</h2>
              <p className="text-sm text-muted-foreground">
                Email branded enviado automaticamente alguns dias antes do vencimento de cada parcela.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <Label>Status</Label>
              <div className="flex gap-2 mt-1">
                {(["true", "false"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setForm({ ...form, REMINDERS_ENABLED: v })}
                    className={`px-4 py-2 rounded-xl border-2 text-sm font-bold ${
                      form.REMINDERS_ENABLED === v ? "border-primary bg-primary/10 text-primary" : "border-border"
                    }`}
                  >
                    {v === "true" ? "Ativado" : "Desativado"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="days">Dias de antecedência</Label>
              <Input
                id="days"
                type="number"
                min={0}
                max={30}
                value={form.REMINDERS_DAYS_BEFORE}
                onChange={(e) => setForm({ ...form, REMINDERS_DAYS_BEFORE: e.target.value })}
                className="max-w-[140px]"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enviar o lembrete X dias antes do vencimento (padrão: 3).
              </p>
            </div>

            <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800">
              O texto do email pode ser editado em <code className="bg-white/60 px-1 rounded">/admin/emails</code> →
              template <strong>Lembrete de doação mensal (Doador)</strong>.
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button onClick={save} disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />} Salvar
              </Button>
              <Button variant="outline" onClick={runReminders} disabled={runningReminders}>
                {runningReminders ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                Enviar lembretes agora
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
