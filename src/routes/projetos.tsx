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
      <section className="gradient-flame-soft py-24 md:py-28">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Nossos projetos</span>
            <h1 className="mt-4 text-5xl font-extrabold leading-[1.05] md:text-6xl">
              Seis frentes que <span className="text-gradient-flame">transformam vidas</span>.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2 md:px-8 lg:grid-cols-3">
          {Route.useLoaderData().projetos?.map((p: any, i: number) => {
            const Icon = ICON_MAP[p.categoria as string] || HeartHandshake;
            return (
              <Reveal key={p.slug} delay={i * 0.06}>
                <Link
                  to="/projetos/$slug"
                  params={{ slug: p.slug }}
                  className="group flex h-full flex-col rounded-3xl bg-background p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-warm border border-border"
                >
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl gradient-flame text-primary-foreground">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold leading-snug">{p.titulo}</h3>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.resumo}</p>
                  <span className="mt-6 inline-flex items-center text-sm font-semibold text-primary">
                    Saiba mais <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
