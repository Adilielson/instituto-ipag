import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { totalConfirmedPublic } from "@/lib/admin.functions";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { Heart, QrCode, FileText, CreditCard, Copy, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

type Project = {
  id: string;
  slug: string;
  name: string | null;
  short_description: string | null;
  cover_image: string | null;
};

export const Route = createFileRoute("/doar")({
  validateSearch: (s: Record<string, unknown>) => ({
    project: typeof s.project === "string" ? s.project : undefined,
  }),
  loaderDeps: ({ search }) => ({ project: search.project }),
  loader: async ({ deps }) => {
    let project: Project | null = null;
    if (deps.project) {
      const { data } = await supabase
        .from("projects")
        .select("id,slug,name,short_description,cover_image")
        .eq("slug", deps.project)
        .maybeSingle();
      project = (data as Project) || null;
    }
    return { project };
  },
  head: () => ({
    meta: [
      { title: "Doar — IPAG" },
      { name: "description", content: "Doe para o IPAG via PIX, Boleto ou Cartão. Sua contribuição transforma vidas." },
      { property: "og:title", content: "Doe para o IPAG" },
      { property: "og:description", content: "Apoie projetos sociais em São Mateus." },
    ],
  }),
  component: DoarPage,
});

const PRESETS = [25, 50, 100, 250, 500];

function DoarPage() {
  const { project } = Route.useLoaderData() as { project: Project | null };
  const totalFn = useServerFn(totalConfirmedPublic);
  const totalQuery = useQuery({
    queryKey: ["donations-total", project?.id],
    queryFn: () => totalFn({ data: { project_id: project?.id ?? null } }),
  });

  const [type, setType] = useState<"ONE_TIME" | "MONTHLY">("ONE_TIME");
  const [method, setMethod] = useState<"PIX" | "BOLETO" | "CREDIT_CARD">("PIX");
  const [amount, setAmount] = useState<number>(50);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [card, setCard] = useState({ holderName: "", number: "", expiryMonth: "", expiryYear: "", ccv: "" });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [copied, setCopied] = useState(false);

  // Poll status when PIX
  useEffect(() => {
    if (!result?.donation?.id || confirmed) return;
    if (method !== "PIX") return;
    let cancelled = false;
    const id = result.donation.id;
    const interval = setInterval(async () => {
      try {
        const r = await fetch("/api/public/donations/status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        const j = await r.json();
        if (!cancelled && j?.status === "CONFIRMED") {
          setConfirmed(true);
          totalQuery.refetch();
        }
      } catch {}
    }, 5000);
    return () => { cancelled = true; clearInterval(interval); };
  }, [result, method, confirmed, totalQuery]);

  const formattedTotal = useMemo(
    () => (totalQuery.data?.total || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
    [totalQuery.data],
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    if (!name.trim() || !email.trim() || !cpf.trim()) { toast.error("Preencha nome, email e CPF."); return; }
    if (!amount || amount < 5) { toast.error("Valor mínimo: R$ 5,00"); return; }
    if (method === "CREDIT_CARD" && (!card.number || !card.holderName || !card.expiryMonth || !card.expiryYear || !card.ccv)) {
      toast.error("Preencha todos os dados do cartão."); return;
    }

    setLoading(true);
    setResult(null);
    setConfirmed(false);
    try {
      const res = await fetch("/api/public/donations/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donor_name: name,
          donor_email: email,
          donor_cpf: cpf,
          donor_phone: phone || undefined,
          amount: Number(amount),
          type,
          payment_method: method,
          campaign: project?.name || undefined,
          project_id: project?.id ?? null,
          card: method === "CREDIT_CARD" ? card : undefined,
        }),
      });
      const j = await res.json();
      if (!res.ok || !j.success) {
        toast.error(j.error || "Erro ao processar doação");
      } else {
        setResult(j);
        if (j.donation?.status === "CONFIRMED") setConfirmed(true);
        if (method === "BOLETO" && j.boleto_url) window.open(j.boleto_url, "_blank");
      }
    } catch (err: any) {
      toast.error(err?.message || "Erro de rede");
    } finally {
      setLoading(false);
    }
  }

  function copyPix() {
    if (!result?.pix_payload) return;
    navigator.clipboard.writeText(result.pix_payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHero
        category="DOE AGORA"
        title={project?.name ? `Apoie: ${project.name}` : "Sua doação transforma"}
        subtitle={project?.short_description || "Cada contribuição fortalece nosso impacto em São Mateus."}
        image={project?.cover_image || "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2400&auto=format&fit=crop"}
      />

      <section className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-border bg-card p-6 lg:p-8 shadow-sm">
              {confirmed ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-black mb-2">Doação confirmada!</h2>
                  <p className="text-muted-foreground mb-6">Muito obrigado pela sua contribuição.</p>
                  <Link to="/"><Button>Voltar à home</Button></Link>
                </div>
              ) : result ? (
                <div className="space-y-6">
                  <h2 className="text-2xl font-black flex items-center gap-2">
                    {method === "PIX" && <><QrCode className="h-6 w-6 text-primary" /> Pague com PIX</>}
                    {method === "BOLETO" && <><FileText className="h-6 w-6 text-primary" /> Boleto gerado</>}
                    {method === "CREDIT_CARD" && <><CreditCard className="h-6 w-6 text-primary" /> Processando cartão...</>}
                  </h2>
                  {method === "PIX" && result.pix_qrcode && (
                    <div className="text-center">
                      <img src={result.pix_qrcode} alt="QR Code PIX" className="mx-auto max-w-xs border rounded-2xl" />
                      <p className="text-sm text-muted-foreground mt-3">Escaneie o QR Code no seu app bancário</p>
                      {result.pix_payload && (
                        <div className="mt-4">
                          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Pix Copia e Cola</p>
                          <div className="flex gap-2 items-center">
                            <code className="flex-1 text-xs bg-muted p-2 rounded break-all text-left">{result.pix_payload}</code>
                            <Button size="icon" variant="outline" onClick={copyPix}>
                              {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground mt-4 flex items-center justify-center gap-2">
                        <Loader2 className="h-3 w-3 animate-spin" /> Aguardando confirmação automática...
                      </p>
                    </div>
                  )}
                  {method === "BOLETO" && result.boleto_url && (
                    <div className="text-center">
                      <p className="mb-4">O boleto foi aberto em uma nova aba.</p>
                      <a href={result.boleto_url} target="_blank" rel="noreferrer">
                        <Button>Abrir boleto novamente</Button>
                      </a>
                    </div>
                  )}
                  {method === "CREDIT_CARD" && (
                    <p className="text-sm text-muted-foreground">Você receberá uma confirmação no seu email. Pode fechar essa página.</p>
                  )}
                  <Button variant="outline" className="w-full" onClick={() => { setResult(null); setConfirmed(false); }}>
                    Fazer outra doação
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Type */}
                  <div>
                    <Label className="mb-2 block">Tipo de doação</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { v: "ONE_TIME", l: "Única" },
                        { v: "MONTHLY", l: "Mensal" },
                      ].map((o) => (
                        <button
                          key={o.v}
                          type="button"
                          onClick={() => setType(o.v as any)}
                          className={`py-3 rounded-xl border-2 font-bold text-sm transition ${
                            type === o.v ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/50"
                          }`}
                        >
                          {o.l}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Amount */}
                  <div>
                    <Label className="mb-2 block">Valor (R$)</Label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {PRESETS.map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setAmount(v)}
                          className={`px-4 py-2 rounded-full border-2 text-sm font-bold ${
                            amount === v ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/50"
                          }`}
                        >
                          R$ {v}
                        </button>
                      ))}
                    </div>
                    <Input type="number" min={5} step="0.01" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
                  </div>

                  {/* Method */}
                  <div>
                    <Label className="mb-2 block">Forma de pagamento</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { v: "PIX", l: "PIX", I: QrCode },
                        { v: "BOLETO", l: "Boleto", I: FileText },
                        { v: "CREDIT_CARD", l: "Cartão", I: CreditCard },
                      ].map((o) => (
                        <button
                          key={o.v}
                          type="button"
                          onClick={() => setMethod(o.v as any)}
                          className={`py-3 rounded-xl border-2 font-bold text-xs flex flex-col items-center gap-1 transition ${
                            method === o.v ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/50"
                          }`}
                        >
                          <o.I className="h-5 w-5" />
                          {o.l}
                        </button>
                      ))}
                    </div>
                    {type === "MONTHLY" && method !== "CREDIT_CARD" && (
                      <p className="text-xs text-muted-foreground mt-2">Para doações mensais recomendamos Cartão de Crédito.</p>
                    )}
                  </div>

                  {/* Donor info */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome completo</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={120} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={160} />
                    </div>
                    <div>
                      <Label htmlFor="cpf">CPF</Label>
                      <Input id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} required maxLength={20} placeholder="000.000.000-00" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={30} placeholder="(00) 00000-0000" />
                    </div>
                  </div>

                  {method === "CREDIT_CARD" && (
                    <div className="space-y-3 rounded-xl bg-muted/40 p-4">
                      <Label>Dados do cartão</Label>
                      <Input placeholder="Nome impresso no cartão" value={card.holderName} onChange={(e) => setCard({ ...card, holderName: e.target.value })} />
                      <Input placeholder="Número do cartão" value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} />
                      <div className="grid grid-cols-3 gap-2">
                        <Input placeholder="MM" value={card.expiryMonth} onChange={(e) => setCard({ ...card, expiryMonth: e.target.value })} maxLength={2} />
                        <Input placeholder="AAAA" value={card.expiryYear} onChange={(e) => setCard({ ...card, expiryYear: e.target.value })} maxLength={4} />
                        <Input placeholder="CVV" value={card.ccv} onChange={(e) => setCard({ ...card, ccv: e.target.value })} maxLength={4} />
                      </div>
                    </div>
                  )}

                  <Button type="submit" size="lg" className="w-full font-black text-base" disabled={loading}>
                    {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Heart className="h-5 w-5 mr-2" />}
                    {loading ? "Processando..." : `Doar R$ ${Number(amount || 0).toFixed(2)}`}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Side info */}
          <aside className="lg:col-span-2 space-y-6">
            {project?.cover_image && (
              <img src={project.cover_image} alt={project.name || ""} className="rounded-3xl w-full aspect-video object-cover" />
            )}
            <div className="rounded-3xl bg-gradient-to-br from-primary to-orange-600 text-white p-6">
              <p className="text-xs uppercase tracking-wider opacity-80">Total arrecadado</p>
              <p className="text-4xl font-black mt-1">{formattedTotal}</p>
              <p className="text-sm mt-2 opacity-90">{project?.name ? `Para ${project.name}` : "Em todos os projetos"}</p>
            </div>
            <div className="rounded-3xl bg-muted/40 p-6 text-sm space-y-2">
              <p className="font-bold">Pagamento processado por Asaas</p>
              <p className="text-muted-foreground">Seus dados são protegidos. Não armazenamos dados de cartão.</p>
            </div>
          </aside>
        </div>
      </section>
      <Footer />
    </div>
  );
}
