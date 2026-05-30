import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { PROJECTS } from "@/data/site";

export const Route = createFileRoute("/projetos/$slug")({
  loader: ({ params }) => {
    const project = PROJECTS.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.project.title ?? "Projeto"} — IPAG` },
      { name: "description", content: loaderData?.project.short ?? "" },
      { property: "og:title", content: loaderData?.project.title ?? "" },
      { property: "og:description", content: loaderData?.project.short ?? "" },
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

function ProjetoDetalhe() {
  const { project } = Route.useLoaderData();
  const Icon = project.icon;
  return (
    <>
      <section className="gradient-flame-soft py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <Link to="/projetos" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
            <ArrowLeft className="mr-1 h-4 w-4" /> Todos os projetos
          </Link>
          <Reveal>
            <div className="mt-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl gradient-flame text-primary-foreground shadow-warm">
              <Icon className="h-8 w-8" />
            </div>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-5xl">{project.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{project.short}</p>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-lg leading-relaxed text-muted-foreground md:px-8">
          <Reveal>
            <p>{project.description}</p>
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
