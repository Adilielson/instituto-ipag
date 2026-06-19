import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useServerFn } from "@tanstack/react-start";
import { listDonations, markDonationConfirmed } from "@/lib/admin.functions";
import { toast } from "sonner";
import { Heart, Loader2, ShieldCheck, KeyRound, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/admin/doacoes")({
  head: () => ({ meta: [{ title: "Doações — Admin" }, { name: "robots", content: "noindex" }] }),
  component: AdminDoacoes,
});

const fmt = (n: number) => Number(n || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const fmtDate = (s: string) => new Date(s).toLocaleString("pt-BR");

function AdminDoacoes() {
  const listFn = useServerFn(listDonations);
  const markFn = useServerFn(markDonationConfirmed);

  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>("ALL");
  const [method, setMethod] = useState<string>("ALL");
  const [data, setData] = useState<any>(null);

  async function load(pwd = password, st = status, mt = method) {
    setLoading(true);
    try {
      const r = await listFn({ data: { password: pwd, status: st as any, method: mt as any } });
      setData(r);
      setUnlocked(true);
    } catch (e: any) {
      toast.error(e?.message || "Erro");
    } finally { setLoading(false); }
  }

  async function unlock(e: React.FormEvent) { e.preventDefault(); if (!password) return; load(); }
  async function changeFilter(newStatus: string, newMethod: string) { setStatus(newStatus); setMethod(newMethod); load(password, newStatus, newMethod); }

  async function markConfirmed(id: string) {
    try { await markFn({ data: { password, id } }); toast.success("Marcada como confirmada"); load(); }
    catch (e: any) { toast.error(e?.message || "Erro"); }
  }

  if (!unlocked) {
    return (
      <div className="max-w-md mx-auto rounded-3xl bg-white border border-black/5 p-6 lg:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center"><Heart className="h-6 w-6 text-primary" /></div>
          <div><h1 className="text-2xl font-black">Doações</h1><p className="text-sm text-muted-foreground">Área protegida</p></div>
        </div>
        <form onSubmit={unlock} className="space-y-4">
          <div className="flex items-center gap-2 text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span>Informe a senha de superadministrador para visualizar.</span>
          </div>
          <div><Label htmlFor="pwd">Senha</Label><Input id="pwd" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus /></div>
          <Button type="submit" disabled={loading}>{loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <KeyRound className="h-4 w-4 mr-2" />} Entrar</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-orange-600 text-white p-6">
          <p className="text-xs uppercase tracking-wider opacity-80">Total confirmado</p>
          <p className="text-3xl font-black mt-1">{fmt(data?.totalConfirmed || 0)}</p>
        </div>
        <div className="rounded-3xl bg-white border border-black/5 p-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Total (todos status)</p>
          <p className="text-3xl font-black mt-1">{fmt(data?.totalAll || 0)}</p>
        </div>
      </div>

      <div className="rounded-3xl bg-white border border-black/5 p-4 lg:p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="text-xs font-bold uppercase text-muted-foreground self-center mr-2">Status:</div>
          {["ALL", "PENDING", "CONFIRMED", "FAILED", "REFUNDED", "CANCELLED"].map((s) => (
            <button key={s} onClick={() => changeFilter(s, method)} className={`px-3 py-1 text-xs rounded-full border ${status === s ? "bg-primary text-white border-primary" : "border-border"}`}>{s}</button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="text-xs font-bold uppercase text-muted-foreground self-center mr-2">Método:</div>
          {["ALL", "PIX", "BOLETO", "CREDIT_CARD"].map((s) => (
            <button key={s} onClick={() => changeFilter(status, s)} className={`px-3 py-1 text-xs rounded-full border ${method === s ? "bg-primary text-white border-primary" : "border-border"}`}>{s}</button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-xs uppercase tracking-wider text-muted-foreground">
                <th className="py-3 text-left">Data</th>
                <th className="py-3 text-left">Doador</th>
                <th className="py-3 text-left">Valor</th>
                <th className="py-3 text-left">Método</th>
                <th className="py-3 text-left">Tipo</th>
                <th className="py-3 text-left">Status</th>
                <th className="py-3 text-left">Campanha</th>
                <th className="py-3"></th>
              </tr>
            </thead>
            <tbody>
              {(data?.donations || []).map((d: any) => (
                <tr key={d.id} className="border-b hover:bg-muted/30">
                  <td className="py-3 text-xs">{fmtDate(d.created_at)}</td>
                  <td className="py-3"><div className="font-semibold">{d.donor_name}</div><div className="text-xs text-muted-foreground">{d.donor_email}</div></td>
                  <td className="py-3 font-bold">{fmt(d.amount)}</td>
                  <td className="py-3 text-xs">{d.payment_method}</td>
                  <td className="py-3 text-xs">{d.type}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 text-xs rounded-full font-bold ${
                      d.status === "CONFIRMED" ? "bg-green-100 text-green-700" :
                      d.status === "PENDING" ? "bg-amber-100 text-amber-700" :
                      "bg-red-100 text-red-700"
                    }`}>{d.status}</span>
                  </td>
                  <td className="py-3 text-xs">{d.campaign || "—"}</td>
                  <td className="py-3 text-right">
                    {d.status !== "CONFIRMED" && (
                      <Button size="sm" variant="outline" onClick={() => markConfirmed(d.id)}>
                        <CheckCircle2 className="h-3 w-3 mr-1" /> Confirmar
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
              {!data?.donations?.length && (
                <tr><td colSpan={8} className="py-8 text-center text-muted-foreground">Nenhuma doação encontrada</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
