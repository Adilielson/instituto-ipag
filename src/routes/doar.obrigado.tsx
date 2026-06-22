import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Heart, Share2, Loader2 } from "lucide-react";

export const Route = createFileRoute("/doar/obrigado")({
  validateSearch: (s: Record<string, unknown>) => ({
    id: typeof s.id === "string" ? s.id : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Obrigado pela sua doação — IPAG" },
      { name: "description", content: "Sua contribuição transforma vidas em São Mateus." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ObrigadoPage,
});

function brl(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function ObrigadoPage() {
  const { id } = Route.useSearch();
  const [donation, setDonation] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(!!id);

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/api/public/donations/status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        const j = await r.json();
        if (!cancelled) setDonation(j);
      } catch {
        /* noop */
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [id]);

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <Header />
      <main className="flex-1 flex items-center relative -mt-[142px] md:-mt-[122px] bg-gradient-to-b from-dark via-dark to-bg">
        <div className="container mx-auto px-4 pt-[180px] md:pt-[180px] pb-16 md:pb-24 max-w-3xl">
          <div className="bg-white rounded-[40px] border border-black/5 shadow-warm-utility p-8 md:p-14 text-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 md:w-14 md:h-14 text-green-500" />
            </div>

            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-dark mb-4 leading-none">
              Obrigado, <span className="text-primary italic">de coração</span>!
            </h1>

            <p className="text-base md:text-lg text-gray/70 font-light leading-relaxed max-w-xl mx-auto mb-8">
              Sua doação foi recebida e já está sendo direcionada para nossos projetos.
              Você acaba de ajudar a transformar a vida de famílias em São Mateus.
            </p>

            {loading ? (
              <div className="flex justify-center mb-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : donation?.amount ? (
              <div className="inline-flex flex-col items-center gap-1 bg-bg rounded-2xl px-8 py-5 mb-8 border border-black/5">
                <span className="text-[10px] uppercase tracking-widest font-black text-gray/60">Valor da doação</span>
                <span className="text-3xl md:text-4xl font-black text-primary">{brl(Number(donation.amount))}</span>
                {donation.campaign && (
                  <span className="text-xs text-gray/60 mt-1">Para: <strong>{donation.campaign}</strong></span>
                )}
              </div>
            ) : null}

            <div className="bg-primary/5 border border-primary/15 rounded-2xl p-5 md:p-6 text-left mb-8">
              <p className="text-sm md:text-base text-gray/80 leading-relaxed">
                Em alguns minutos você vai receber em <strong>{donation?.donor_email || "seu email"}</strong> uma confirmação
                personalizada do Instituto IPAG. Se não chegar, verifique a caixa de spam.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="gf-button-primary rounded-full px-8 h-12 text-xs font-black tracking-widest">
                <Link to="/projetos"><Heart className="w-4 h-4 mr-2" /> CONHECER NOSSOS PROJETOS</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-primary text-primary hover:bg-primary/5 rounded-full px-8 h-12 text-xs font-black tracking-widest"
              >
                <Link to="/"><Share2 className="w-4 h-4 mr-2" /> VOLTAR À HOME</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
