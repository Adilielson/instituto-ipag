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
      <section className="gradient-flame-soft py-32 md:py-40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/4" />
        <div className="max-container relative z-10">
          <Reveal>
            <span className="text-primary font-black uppercase tracking-[0.4em] mb-6 block text-sm">Transparência</span>
            <h1 className="gf-heading-lg text-dark max-w-4xl">
              CLAREZA E <br />
              <span className="text-gradient-flame">RESPONSABILIDADE</span>
            </h1>
            <p className="mt-8 max-w-2xl text-2xl text-gray/60 font-light leading-relaxed">
              Disponibilizamos publicamente nossos documentos institucionais para parceiros, apoiadores e toda a comunidade de São Mateus.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="max-container grid gap-8 md:grid-cols-2">
          {DOCS.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.1} direction="up">
              <button className="group flex w-full items-center justify-between gap-6 rounded-[32px] border border-black/5 bg-white p-8 text-left shadow-premium transition-all duration-500 hover:shadow-warm">
                <div className="flex items-center gap-6">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl gradient-flame text-white shadow-lg transition-transform duration-500 group-hover:scale-110">
                    <FileText className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-xl font-black uppercase tracking-tight text-dark">{d.title}</p>
                    <p className="text-sm font-bold uppercase tracking-widest text-primary/60 mt-1">{d.year}</p>
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
    </>
  );
}
