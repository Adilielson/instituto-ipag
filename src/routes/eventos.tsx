import { createFileRoute } from "@tanstack/react-router";
import { Calendar, MapPin } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { EVENTS } from "@/data/site";

export const Route = createFileRoute("/eventos")({
  head: () => ({
    meta: [
      { title: "Eventos — IPAG" },
      { name: "description", content: "Concertos, campanhas, cursos e ações comunitárias do IPAG." },
      { property: "og:title", content: "Eventos IPAG" },
      { property: "og:description", content: "Acompanhe as próximas ações e apresentações." },
    ],
  }),
  component: Eventos,
});

function Eventos() {
  return (
    <>
      <section className="gradient-flame-soft py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Eventos</span>
            <h1 className="mt-4 text-5xl font-extrabold leading-[1.05] md:text-6xl">
              Encontros que <span className="text-gradient-flame">mobilizam a comunidade</span>.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl space-y-5 px-4 md:px-8">
          {EVENTS.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.08}>
              <article className="grid gap-4 rounded-3xl border border-border bg-background p-7 shadow-card md:grid-cols-[200px_1fr]">
                <div className="rounded-2xl gradient-flame p-5 text-primary-foreground">
                  <Calendar className="h-6 w-6" />
                  <p className="mt-3 text-sm font-semibold uppercase tracking-wider">{e.date}</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{e.title}</h3>
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{e.place}</p>
                  <p className="mt-3 text-muted-foreground">{e.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
