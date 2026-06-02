import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, HeartHandshake, Music, GraduationCap, Brain, Scissors, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
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
      <section className="relative min-h-[50vh] flex items-center pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        {project.imagem_destaque && (
          <div className="absolute inset-0 z-0">
            <img 
              src={project.imagem_destaque} 
              alt={project.titulo} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/40"></div>
          </div>
        )}
        {!project.imagem_destaque && (
          <div className="absolute inset-0 z-0 gradient-flame-soft">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/4"></div>
          </div>
        )}
        <div className="max-container relative z-10">
          <Link to="/projetos" className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-primary hover:gap-5 transition-all mb-12">
            <ArrowLeft className="h-4 w-4" /> TODOS OS PROJETOS
          </Link>
          <Reveal>
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-[32px] gradient-flame text-white shadow-warm-utility mb-10">
              <Icon className="h-10 w-10" />
            </div>
            <h1 className="gf-heading-lg text-dark max-w-4xl uppercase">{project.titulo}</h1>
            <p className="mt-8 text-2xl text-gray/60 font-light leading-relaxed max-w-3xl">{project.resumo}</p>
          </Reveal>
        </div>
      </section>

      <section className="py-40">
        <div className="max-container grid lg:grid-cols-3 gap-24">
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