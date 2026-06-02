import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, HeartHandshake, Music, GraduationCap, Brain, Scissors, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/projetos_/$slug")({
  loader: async ({ params }) => {
    const { data: project, error } = await supabase
      .from("projetos")
      .select("*")
      .eq("slug", params.slug)
      .eq("status", "publicado")
      .maybeSingle();
      
    if (error || !project) throw notFound();
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
  const { project } = Route.useLoaderData() as { project: any };
  if (!project) return null;
  const Icon = ICON_MAP[project.categoria as string] || HeartHandshake;
  
  return (
    <>
      <PageHero 
        title={project.titulo}
        image={project.imagem_destaque || "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop"}
        category={project.categoria}
      >
        <Link to="/projetos" className="inline-flex items-center gap-3 text-sm sm:text-base font-black uppercase tracking-[0.3em] text-white/80 hover:text-white hover:gap-5 transition-all mb-12 min-h-[44px]">
          <ArrowLeft className="h-4 w-4" /> TODOS OS PROJETOS
        </Link>
      </PageHero>

      <section className="py-40">
        <div className="max-container grid lg:grid-cols-3 gap-24 px-4 sm:px-8 lg:px-0 max-w-3xl mx-auto">
          <div className="lg:col-span-2 space-y-12">
            <div className="prose prose-2xl max-w-none prose-headings:font-black prose-headings:uppercase prose-p:text-gray/80 prose-p:font-light prose-strong:text-dark prose-strong:font-black">
              {project.conteudo}
            </div>
          </div>
          
          <div className="space-y-12">
            <Reveal direction="left">
              <div className="p-12 rounded-[60px] bg-bg border border-black/5 shadow-premium-utility">
                <HeartHandshake className="w-16 h-16 text-primary mb-8" />
                <h3 className="text-3xl font-black uppercase tracking-tight text-dark mb-6">Participe</h3>
                <p className="text-lg text-gray/60 font-light leading-relaxed mb-10">
                  Quer participar como voluntário ou apoiar este projeto? Entre em contato e faça parte da nossa rede.
                </p>
                <Button asChild className="gf-button gf-button-primary w-full h-auto py-6">
                  <Link to="/contato">FALAR COM O IPAG</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}