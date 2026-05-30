import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, HeartHandshake, Music, GraduationCap, Brain, Scissors, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { getProjetoBySlug } from "@/lib/api/cms";

export const Route = createFileRoute("/projetos/$slug")({
  loader: async ({ params }) => {
    const project = await getProjetoBySlug({ data: { slug: params.slug } });
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.project?.titulo ?? "Projeto"} — IPAG` },
      { name: "description", content: loaderData?.project?.resumo ?? "" },
      { property: "og:title", content: loaderData?.project?.titulo ?? "" },
      { property: "og:description", content: loaderData?.project?.resumo ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Projeto não encontrado</h1>
      <Button asChild className="mt-6 gradient-flame text-primary-foreground"><Link to="/projetos">Ver todos</Link></Button>
    </div>
  ),
  component: ProjetoDetalhe,
});

const ICON_MAP: Record<string, any> = {
  'Cultura': Music,
  'Educação': GraduationCap,
  'Social': HeartHandshake,
  'Saúde': Brain,
  'Capacitação': Scissors,
  'Vida': LifeBuoy,
};

function ProjetoDetalhe() {
  const { project } = Route.useLoaderData();
  if (!project) return null;
  const Icon = ICON_MAP[project.categoria as string] || HeartHandshake;
  
  return (
    <>
      <section className="gradient-flame-soft py-32 md:py-40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/4" />
        <div className="max-container relative z-10">
          <Link to="/projetos" className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-primary hover:gap-5 transition-all mb-12">
            <ArrowLeft className="h-4 w-4" /> TODOS OS PROJETOS
          </Link>
          <Reveal>
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-[32px] gradient-flame text-white shadow-warm mb-10">
              <Icon className="h-10 w-10" />
            </div>
            <h1 className="gf-heading-lg text-dark max-w-4xl uppercase">{project.titulo}</h1>
            <p className="mt-8 text-2xl text-gray/60 font-light leading-relaxed max-w-3xl">{project.resumo}</p>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-lg leading-relaxed text-muted-foreground md:px-8">
          <Reveal>
            <div className="prose prose-lg max-w-none">
              {project.conteudo}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12 rounded-3xl border border-border bg-muted/40 p-8">
              <h3 className="text-xl font-bold text-foreground">Quer participar ou apoiar este projeto?</h3>
              <p className="mt-2 text-sm">Entre em contato com a nossa equipe.</p>
              <Button asChild className="mt-5 gradient-flame text-primary-foreground"><Link to="/contato">Falar com o IPAG</Link></Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
