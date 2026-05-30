import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Music, GraduationCap, HeartHandshake, Brain, Scissors, LifeBuoy } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { getProjetos } from "@/lib/api/cms";

export const Route = createFileRoute("/projetos")({
  loader: async () => {
    const projetos = await getProjetos();
    return { projetos };
  },
  head: () => ({
    meta: [
      { title: "Projetos — IPAG" },
      { name: "description", content: "Conheça as frentes de atuação do IPAG: música, formação, assistência social e mais." },
      { property: "og:title", content: "Projetos — IPAG" },
      { property: "og:description", content: "Frentes de ação que transformam famílias em São Mateus." },
    ],
  }),
  component: Projetos,
});

const ICON_MAP: Record<string, any> = {
  'Cultura': Music,
  'Educação': GraduationCap,
  'Social': HeartHandshake,
  'Saúde': Brain,
  'Capacitação': Scissors,
  'Vida': LifeBuoy,
};

function Projetos() {
  return (
    <>
      <section className="gradient-flame-soft py-32 md:py-40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/4" />
        <div className="max-container relative z-10">
          <Reveal>
            <span className="text-primary font-black uppercase tracking-[0.4em] mb-6 block text-sm">Nossos projetos</span>
            <h1 className="gf-heading-lg text-dark max-w-4xl">
              SEIS FRENTES QUE <br />
              <span className="text-gradient-flame">TRANSFORMAM VIDAS</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-container grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {Route.useLoaderData().projetos?.map((p: any, i: number) => {
            const Icon = ICON_MAP[p.categoria as string] || HeartHandshake;
            return (
              <Reveal key={p.slug} delay={i * 0.1} direction="up">
                <Link
                  to="/projetos/$slug"
                  params={{ slug: p.slug }}
                  className="group relative flex h-[500px] flex-col overflow-hidden rounded-[40px] bg-white p-10 shadow-premium transition-all duration-700 hover:shadow-warm border border-black/5"
                >
                  <div className="relative z-10">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl gradient-flame text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="mt-8 text-3xl font-black uppercase tracking-tight text-dark leading-none group-hover:text-primary transition-colors">{p.titulo}</h3>
                    <p className="mt-6 text-lg text-gray/70 leading-relaxed line-clamp-4 font-light">{p.resumo}</p>
                  </div>
                  
                  <div className="mt-auto relative z-10">
                    <span className="inline-flex items-center text-xs font-black uppercase tracking-[0.2em] text-dark group-hover:text-primary transition-all group-hover:gap-4 gap-2">
                      VER DETALHES <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>

                  <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                    <Icon className="h-48 w-48 rotate-12" />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
