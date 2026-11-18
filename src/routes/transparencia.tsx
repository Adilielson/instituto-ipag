import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { publicDocuments, publicPdf } from "@/lib/institutional/functions";
import type { InstitutionalItem } from "@/lib/institutional/functions";
import { PdfViewer } from "@/components/institutional/PdfViewer";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/transparencia")({
  head: () => ({
    meta: [
      { title: "Transparência — IPAG" },
      {
        name: "description",
        content:
          "Documentos institucionais, estatuto, relatórios de atividades e prestação de contas.",
      },
      { property: "og:title", content: "Transparência IPAG" },
      { property: "og:description", content: "Compromisso com clareza e responsabilidade." },
    ],
  }),
  component: Transparencia,
});

function Transparencia() {
  const read = useServerFn(publicDocuments),
    openPdf = useServerFn(publicPdf);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [docs, setDocs] = useState<InstitutionalItem[]>([]),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(true),
    [opening, setOpening] = useState<string | null>(null),
    [file, setFile] = useState<{ title: string; url: string } | null>(null);
  async function load() {
    setError("");
    setLoading(true);
    try {
      setDocs(await read());
    } catch {
      setError("Não foi possível carregar os documentos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    void load();
  }, []);
  async function view(id: string) {
    setOpening(id);
    setActiveId(id);
    setError("");
    try {
      setFile(await openPdf({ data: { id } }));
    } catch {
      setError("Documento indisponível. Atualize a lista e tente novamente.");
    } finally {
      setOpening(null);
    }
  }

  return (
    <>
      <PageHero
        title="Clareza e Responsabilidade"
        subtitle="Disponibilizamos publicamente nossos documentos institucionais para parceiros, apoiadores e toda a comunidade de São Mateus."
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
        category="Transparência"
      />

      <section className="py-20 bg-white">
        <div className="max-container grid gap-8 md:grid-cols-2">
          {loading && <p role="status">Carregando documentos…</p>}
          {error && (
            <div role="alert">
              {error}{" "}
              <Button variant="outline" onClick={load}>
                Atualizar lista
              </Button>
            </div>
          )}
          {!loading && !error && !docs.length && (
            <p className="text-muted-foreground">Nenhum documento publicado no momento.</p>
          )}
          {docs.map((d, i) => (
            <Reveal key={d.id} delay={i * 0.1} direction="up">
              <button
                onClick={() => view(d.id)}
                disabled={!!opening}
                aria-label={`Visualizar PDF: ${d.title}, ${d.year}`}
                className="group flex w-full items-center justify-between gap-6 rounded-[32px] border border-black/5 bg-white p-8 text-left shadow-premium-utility transition-all duration-500 hover:shadow-warm-utility"
              >
                <div className="flex items-center gap-6">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl gradient-flame text-white shadow-lg transition-transform duration-500 group-hover:scale-110">
                    <FileText className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-xl font-black uppercase tracking-tight text-dark">
                      {d.title}
                    </p>
                    <p className="text-sm font-bold uppercase tracking-widest text-primary/60 mt-1">
                      {d.year}
                      {opening === d.id ? " · Abrindo…" : ""}
                    </p>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-bg flex items-center justify-center text-primary transition-all group-hover:bg-primary group-hover:text-white">
                  <Download className="h-5 w-5 transition-transform group-hover:translate-y-1" />
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>
      <PdfViewer
        file={file}
        onClose={() => setFile(null)}
        onRefresh={() => {
          if (activeId) void view(activeId);
        }}
      />
    </>
  );
}
