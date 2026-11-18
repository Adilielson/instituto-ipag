import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  donationDashboard,
  reconcileDonations,
  refreshDonationPayment,
  donorHistory,
  exportDonationPayments,
} from "@/lib/donations/dashboard.functions";
import { methods, statusLabels, paymentsCsv } from "@/lib/donations/model";
import type { Payment } from "@/lib/donations/model";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, RefreshCw, Download, ExternalLink, Heart } from "lucide-react";

export const Route = createFileRoute("/admin/doacoes")({
  head: () => ({ meta: [{ title: "Doações — IPAG" }, { name: "robots", content: "noindex" }] }),
  component: Donations,
});
const money = (v: unknown) =>
  Number(v || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const date = (v: string | null | undefined) =>
  v ? v.slice(0, 10).split("-").reverse().join("/") : "—";
const initial = {
  search: "",
  status: "ALL",
  method: "ALL",
  project: "ALL",
  customer: "",
  from: "",
  to: "",
  dateField: "payment_date" as "payment_date" | "created_date" | "due_date",
  page: 0,
};
function Donations() {
  const read = useServerFn(donationDashboard),
    reconcile = useServerFn(reconcileDonations),
    refresh = useServerFn(refreshDonationPayment),
    history = useServerFn(donorHistory),
    exportPayments = useServerFn(exportDonationPayments);
  const [filters, setFilters] = useState(initial),
    [applied, setApplied] = useState(initial);
  const [data, setData] = useState<any>(null),
    [busy, setBusy] = useState(false),
    [working, setWorking] = useState(false),
    [error, setError] = useState("");
  const [tab, setTab] = useState("payments"),
    [selected, setSelected] = useState<Payment | null>(null),
    [donor, setDonor] = useState<any>(null),
    [historyPage, setHistoryPage] = useState(0),
    [past, setPast] = useState<{ rows: Payment[]; total: number } | null>(null);
  const [syncErrors, setSyncErrors] = useState<{ id: string; message: string }[]>([]),
    [syncProgress, setSyncProgress] = useState("");
  const sequence = useRef(0),
    cancel = useRef(false);
  async function load(f = applied) {
    const seq = ++sequence.current;
    setBusy(true);
    setError("");
    try {
      const result = await read({ data: f });
      if (seq === sequence.current) setData(result);
    } catch (e: any) {
      if (seq === sequence.current) {
        setError(e.message);
        setData(null);
      }
    } finally {
      if (seq === sequence.current) setBusy(false);
    }
  }
  useEffect(() => {
    void load(applied);
    return () => {
      sequence.current++;
    };
  }, [applied]);
  useEffect(
    () => () => {
      cancel.current = true;
    },
    [],
  );
  useEffect(() => {
    if (!donor) return;
    let live = true;
    setPast(null);
    history({ data: { customer: donor.customer_id, page: historyPage } })
      .then((r) => {
        if (live) setPast(r);
      })
      .catch((e) => toast.error(e.message));
    return () => {
      live = false;
    };
  }, [donor, historyPage]);
  async function sync() {
    setWorking(true);
    cancel.current = false;
    setSyncErrors([]);
    let cursor: string | null = null;
    let total = 0;
    const errors: { id: string; message: string }[] = [];
    try {
      do {
        const r = await reconcile({ data: { cursor } });
        cursor = r.cursor;
        total += r.processed;
        errors.push(...r.errors);
        setSyncErrors([...errors]);
        setSyncProgress(`${total} pagamentos conferidos · ${errors.length} pendências`);
      } while (cursor && !cancel.current);
      toast[errors.length ? "warning" : "success"](
        cancel.current
          ? "Conciliação interrompida. Pode reiniciar sem duplicar."
          : errors.length
            ? "Conciliação concluída com pendências."
            : "Conciliação concluída.",
      );
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setWorking(false);
      void load();
    }
  }
  async function verify(p: Payment) {
    setWorking(true);
    try {
      const updated = await refresh({ data: { id: p.payment_id } });
      setSelected({ ...p, ...updated });
      toast.success("Situação consultada no Asaas.");
      await load();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setWorking(false);
    }
  }
  async function exportCsv() {
    setWorking(true);
    try {
      const rows = await exportPayments({ data: applied });
      const blob = new Blob([paymentsCsv(rows)], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ipag-doacoes-${data?.environment}-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast.success(`${rows.length} pagamentos exportados.`);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setWorking(false);
    }
  }
  const card = "rounded-2xl border border-black/10 bg-white p-5";
  const total =
    tab === "payments"
      ? data?.total
      : tab === "donors"
        ? data?.donorCount
        : data?.subscriptionCount;
  function paymentTable(rows: Payment[]) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b">
              {["Doador / projeto", "Valor", "Situação", "Vencimento", "Pagamento", ""].map(
                (v, i) => (
                  <th className="py-3 px-2" key={i}>
                    {v}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.payment_id} className="border-b">
                <td className="p-2">
                  <strong>{p.donor_name || p.payment_id}</strong>
                  <p className="text-xs text-muted-foreground">
                    {p.campaign || "—"} · {methods[p.billing_type] || p.billing_type}
                    {p.subscription_id ? " · Mensal" : ""}
                  </p>
                </td>
                <td className="p-2 whitespace-nowrap">{money(p.amount)}</td>
                <td className="p-2">{statusLabels[p.status] || p.status}</td>
                <td className="p-2">{date(p.due_date)}</td>
                <td className="p-2">{date(p.payment_date)}</td>
                <td className="p-2">
                  <Button variant="outline" size="sm" onClick={() => setSelected(p)}>
                    Detalhes
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && <p className="py-8 text-center">Nenhum pagamento neste recorte.</p>}
      </div>
    );
  }
  return (
    <div className="space-y-5 min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold flex gap-2 items-center">
            <Heart /> Acompanhamento de doações
          </h1>
          <p className="text-sm text-muted-foreground">
            Pagamentos verificados no Asaas, vinculados aos projetos do IPAG.
          </p>
        </div>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-sm">
          {data?.environment === "production"
            ? "Produção"
            : data?.environment === "sandbox"
              ? "Ambiente de testes"
              : "Ambiente não carregado"}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => load()} disabled={busy || working}>
          <RefreshCw className="size-4 mr-2" />
          Atualizar painel
        </Button>
        <Button variant="outline" onClick={sync} disabled={busy || working}>
          Conciliar histórico Asaas
        </Button>
        <Button variant="outline" onClick={exportCsv} disabled={!data || busy || working}>
          <Download className="size-4 mr-2" />
          Exportar CSV
        </Button>
        {working && (
          <span role="status" className="flex items-center gap-2">
            <Loader2 className="animate-spin size-4" />
            Processando…
          </span>
        )}
        {working && syncProgress && (
          <Button
            variant="outline"
            onClick={() => {
              cancel.current = true;
            }}
          >
            Parar após lote
          </Button>
        )}
      </div>
      <div className={card + " text-sm space-y-1"}>
        <p>
          Última conciliação:{" "}
          {data?.lastSync?.finished_at
            ? new Date(data.lastSync.finished_at).toLocaleString("pt-BR")
            : "Ainda não concluída"}{" "}
          · {data?.lastSync?.status || "Sem execução"}
        </p>
        <p>
          Último evento Asaas processado:{" "}
          {data?.lastWebhook ? new Date(data.lastWebhook).toLocaleString("pt-BR") : "Nenhum"}
        </p>
        <p>
          {data?.unmapped ?? "—"} registros legados ainda sem vínculo verificado neste ambiente.
        </p>
        <p>
          {data?.unmatchedEvents ?? 0} eventos recebidos sem vínculo IPAG; revisar no histórico
          técnico antes de importar.
        </p>
        {syncProgress && <p role="status">{syncProgress}</p>}
        {(syncErrors.length > 0 || data?.syncIssueCount > 0) && (
          <details>
            <summary className="text-amber-800 cursor-pointer">
              Pendências da conciliação ({data?.syncIssueCount || syncErrors.length}; até 100
              exibidas)
            </summary>
            {(syncErrors.length ? syncErrors : data.syncIssues).map((e: any) => (
              <p key={e.id}>
                {e.id}: {e.message}
              </p>
            ))}
          </details>
        )}
      </div>
      <form
        className={card + " grid sm:grid-cols-2 lg:grid-cols-4 gap-3"}
        onSubmit={(e) => {
          e.preventDefault();
          setApplied({ ...filters, page: 0 });
        }}
      >
        <label className="text-sm">
          Buscar doador, e-mail ou pagamento
          <Input
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </label>
        <label className="text-sm">
          Projeto
          <select
            className="border rounded-md w-full h-10 px-2"
            value={filters.project}
            onChange={(e) => setFilters({ ...filters, project: e.target.value })}
          >
            <option value="ALL">Todos os projetos</option>
            {data?.projects?.map((p: string) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          Situação
          <select
            className="border rounded-md w-full h-10 px-2"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="ALL">Todas</option>
            {Object.entries(statusLabels)
              .filter(([k]) => !["ACTIVE", "INACTIVE", "EXPIRED"].includes(k))
              .map(([k, v]) => (
                <option value={k} key={k}>
                  {v}
                </option>
              ))}
          </select>
        </label>
        <label className="text-sm">
          Forma de pagamento
          <select
            className="border rounded-md w-full h-10 px-2"
            value={filters.method}
            onChange={(e) => setFilters({ ...filters, method: e.target.value })}
          >
            <option value="ALL">Todas</option>
            {Object.entries(methods).map(([k, v]) => (
              <option value={k} key={k}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          Usar data de
          <select
            className="border rounded-md w-full h-10 px-2"
            value={filters.dateField}
            onChange={(e) => setFilters({ ...filters, dateField: e.target.value as any })}
          >
            <option value="payment_date">Pagamento</option>
            <option value="due_date">Vencimento</option>
            <option value="created_date">Criação</option>
          </select>
        </label>
        <label className="text-sm">
          De
          <Input
            type="date"
            value={filters.from}
            onChange={(e) => setFilters({ ...filters, from: e.target.value })}
          />
        </label>
        <label className="text-sm">
          Até
          <Input
            type="date"
            value={filters.to}
            onChange={(e) => setFilters({ ...filters, to: e.target.value })}
          />
        </label>
        <div className="flex gap-2 items-end">
          <Button disabled={busy || working}>Filtrar</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setFilters(initial);
              setApplied(initial);
            }}
          >
            Limpar
          </Button>
        </div>
        <p className="text-xs text-muted-foreground sm:col-span-2 lg:col-span-4">
          Sem datas, considera todo o histórico conciliado. O período de pagamento exclui cobranças
          ainda não pagas. Para acompanhar pendências por período, escolha vencimento.
        </p>
      </form>
      {error && (
        <div role="alert" className="rounded-xl bg-red-50 text-red-800 p-4">
          {error}{" "}
          <p>
            Se esta é a primeira ativação, aplique a migração do acompanhamento no Lovable Cloud.
          </p>
        </div>
      )}
      {busy ? (
        <p role="status">Carregando dados…</p>
      ) : (
        data && (
          <>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
              {[
                ["Recebido no Asaas", "received"],
                ["Líquido informado", "net"],
                ["Tarifas das cobranças recebidas", "fees"],
                ["Confirmado · a liberar", "confirmed"],
                ["Pendente", "pending"],
                ["Vencido", "overdue"],
                ["Recebido fora do Asaas", "cash"],
                ["Estornado", "refunded"],
              ].map(([label, key]) => (
                <div key={key} className={card}>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-xl font-bold mt-2">{money(data.totals[key])}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Valores do recorte selecionado; não representam saldo bancário. {data.totals.review}{" "}
              pagamentos em contestação, estorno parcial ou outra situação exigem análise e ficam
              fora dos totais de recebimento. {data.totals.unknownNet} recebimentos sem líquido
              informado. Histórico de tarifas e estornos deve ser conferido no extrato Asaas.
            </p>
            <div className="flex gap-2 flex-wrap" role="tablist" aria-label="Visões de doações">
              {[
                ["payments", "Pagamentos"],
                ["donors", "Doadores"],
                ["subscriptions", "Recorrência"],
              ].map(([key, label]) => (
                <Button
                  key={key}
                  role="tab"
                  aria-selected={tab === key}
                  variant={tab === key ? "default" : "outline"}
                  onClick={() => {
                    setTab(key);
                    setApplied({ ...applied, page: 0 });
                  }}
                >
                  {label}
                </Button>
              ))}
            </div>
            <section className={card}>
              {tab === "payments" && paymentTable(data.payments)}
              {tab === "donors" && (
                <div className="grid md:grid-cols-2 gap-3">
                  {data.donors.map((d: any) => (
                    <button
                      key={d.customer_id}
                      className="border rounded-xl p-4 text-left hover:bg-muted"
                      onClick={() => {
                        setDonor(d);
                        setHistoryPage(0);
                      }}
                    >
                      <strong>{d.name}</strong>
                      <p className="text-sm break-all">{d.email}</p>
                      <p className="text-sm">
                        {money(d.received)} recebidos · {d.payments} parcelas no recorte
                      </p>
                      <p className="text-xs">
                        Último pagamento: {date(d.last_payment)} · Ver histórico completo
                      </p>
                    </button>
                  ))}
                  {!data.donors.length && <p>Nenhum doador neste recorte.</p>}
                </div>
              )}
              {tab === "subscriptions" && (
                <>
                  <p className="text-sm mb-4">
                    Assinaturas filtradas por busca e projeto. Datas, método e situação dos
                    pagamentos não filtram esta visão. Assinatura ativa não significa parcela paga.
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {data.subscriptions.map((s: any) => (
                      <button
                        key={s.subscription_id}
                        className="border rounded-xl p-4 text-left"
                        onClick={() => {
                          setDonor({ customer_id: s.customer_id, name: s.donor_name });
                          setHistoryPage(0);
                        }}
                      >
                        <strong>{s.donor_name}</strong>
                        <p>{s.campaign}</p>
                        <p>
                          {money(s.amount)} / mês · {statusLabels[s.status] || s.status}
                        </p>
                        <p className="text-sm">Próximo vencimento: {date(s.next_due_date)}</p>
                        <p className="text-xs">Ver parcelas do doador</p>
                      </button>
                    ))}
                    {!data.subscriptions.length && <p>Nenhuma assinatura conciliada.</p>}
                  </div>
                </>
              )}
              <div className="flex flex-wrap justify-between gap-2 items-center mt-4">
                <p className="text-sm">
                  {total || 0} registros · Página {applied.page + 1}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    disabled={!applied.page || busy}
                    onClick={() => setApplied({ ...applied, page: applied.page - 1 })}
                  >
                    Anterior
                  </Button>
                  <Button
                    variant="outline"
                    disabled={(applied.page + 1) * 50 >= (total || 0) || busy}
                    onClick={() => setApplied({ ...applied, page: applied.page + 1 })}
                  >
                    Próxima
                  </Button>
                </div>
              </div>
            </section>
          </>
        )
      )}
      {donor && (
        <section className={card} aria-label="Histórico completo do doador">
          <div className="flex justify-between gap-2">
            <h2 className="font-bold">Histórico completo: {donor.name}</h2>
            <Button variant="outline" onClick={() => setDonor(null)}>
              Fechar histórico
            </Button>
          </div>
          {past ? paymentTable(past.rows) : <p>Carregando…</p>}
          <div className="flex gap-2 mt-3">
            <Button
              variant="outline"
              disabled={!historyPage}
              onClick={() => setHistoryPage(historyPage - 1)}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              disabled={!past || (historyPage + 1) * 50 >= past.total}
              onClick={() => setHistoryPage(historyPage + 1)}
            >
              Próxima
            </Button>
          </div>
        </section>
      )}
      {selected && (
        <section className={card} aria-label="Detalhes do pagamento">
          <div className="flex justify-between gap-2">
            <h2 className="font-bold break-all">Pagamento {selected.payment_id}</h2>
            <Button variant="outline" onClick={() => setSelected(null)}>
              Fechar detalhes
            </Button>
          </div>
          <dl className="grid sm:grid-cols-2 gap-3 my-4">
            {[
              ["Situação", statusLabels[selected.status] || selected.status],
              ["Valor bruto", money(selected.amount)],
              [
                "Líquido informado",
                selected.net_amount == null ? "Não informado" : money(selected.net_amount),
              ],
              ["Estornado", money(selected.refunded_amount)],
              ["Pagamento", date(selected.payment_date)],
              ["Crédito / previsão", date(selected.credit_date)],
              ["Assinatura", selected.subscription_id || "Avulsa"],
              ["Última consulta", new Date(selected.observed_at).toLocaleString("pt-BR")],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs text-muted-foreground">{k}</dt>
                <dd className="break-all">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap gap-2">
            <Button disabled={working} onClick={() => verify(selected)}>
              Verificar no Asaas
            </Button>
            {selected.invoice_url && (
              <a
                className="inline-flex items-center gap-2 underline p-2"
                href={selected.invoice_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir cobrança
                <ExternalLink className="size-4" />
              </a>
            )}
            {selected.receipt_url && (
              <a
                className="underline p-2"
                href={selected.receipt_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Comprovante Asaas
              </a>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
