import { createFileRoute } from "@tanstack/react-router";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { EVENTS } from "@/data/site";

export const Route = createFileRoute("/eventos")({
  loader: async () => {
    try {
      const { data: eventos, error } = await supabase
        .from("eventos")
        .select("*")
        .order("data_evento", { ascending: true });
      
      if (error) throw error;
      
      return { 
        eventos: (eventos && eventos.length > 0) 
          ? eventos 
          : EVENTS.map((e, idx) => ({
              id: String(idx),
              titulo: e.title,
              descricao: e.description,
              data_evento: new Date().toISOString(),
              local: e.place
            }))
      };
    } catch {
      return {
        eventos: EVENTS.map((e, idx) => ({
          id: String(idx),
          titulo: e.title,
          descricao: e.description,
          data_evento: new Date().toISOString(),
          local: e.place
        }))
      };
    }
  },
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
          {Route.useLoaderData().eventos?.map((e: any, i: number) => (
            <Reveal key={e.id} delay={i * 0.08}>
              <Link 
                to="/eventos/$slug" 
                params={{ slug: e.slug }} 
                className="group block"
              >
                <article className="grid gap-4 rounded-3xl border border-border bg-background p-7 shadow-card-utility md:grid-cols-[200px_1fr] transition-all hover:border-primary/20 hover:shadow-premium-utility">
                  <div className="rounded-2xl gradient-flame p-5 text-primary-foreground flex flex-col items-center justify-center text-center">
                    <Calendar className="h-8 w-8 mb-2" />
                    <p className="text-sm font-semibold uppercase tracking-wider">{new Date(e.data_evento).toLocaleDateString('pt-BR')}</p>
                    <p className="text-xs font-bold opacity-80 mt-1">{new Date(e.data_evento).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{e.titulo}</h3>
                    <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{e.local}</p>
                    <p className="mt-3 text-muted-foreground line-clamp-2">{e.descricao}</p>
                    <div className="mt-auto pt-4 flex items-center gap-2 text-primary font-bold text-sm">
                      VER DETALHES <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
