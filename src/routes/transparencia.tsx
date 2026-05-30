import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/transparencia")({
  head: () => ({
    meta: [
      { title: "Transparência — IPAG" },
      { name: "description", content: "Documentos institucionais, estatuto, relatórios de atividades e prestação de contas." },
      { property: "og:title", content: "Transparência IPAG" },
      { property: "og:description", content: "Compromisso com clareza e responsabilidade." },
    ],
  }),
  component: Transparencia,
});

const DOCS = [
  { title: "Estatuto Social", year: "2017" },
  { title: "Relatório de Atividades", year: "2025" },
  { title: "Prestação de Contas", year: "2025" },
  { title: "Certidões e Registros", year: "2026" },
];

function Transparencia() {
  return (
    <>
      <section className="gradient-flame-soft py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Transparência</span>
            <h1 className="mt-4 text-5xl font-extrabold leading-[1.05] md:text-6xl">
              Clareza e <span className="text-gradient-flame">responsabilidade</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Disponibilizamos publicamente nossos documentos institucionais para parceiros, apoiadores e a comunidade.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-5xl gap-4 px-4 md:grid-cols-2 md:px-8">
          {DOCS.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.06}>
              <button className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-border bg-background p-6 text-left shadow-card transition-all hover:-translate-y-0.5 hover:shadow-warm">
                <div className="flex items-center gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl gradient-flame text-primary-foreground">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{d.title}</p>
                    <p className="text-sm text-muted-foreground">{d.year}</p>
                  </div>
                </div>
                <Download className="h-5 w-5 text-primary transition-transform group-hover:translate-y-0.5" />
              </button>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
