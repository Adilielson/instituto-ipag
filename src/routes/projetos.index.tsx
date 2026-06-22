import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Music, GraduationCap, HeartHandshake, Brain, Scissors, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { supabase } from "@/integrations/supabase/client";
import { PROJECTS } from "@/data/site";

export const Route = createFileRoute("/projetos/")({
  loader: async () => {
    try {
      const { data: projetos, error } = await supabase
        .from("projetos")
        .select("*")
        .eq("status", "publicado")
        .order("ordem", { ascending: true })
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      return { 
        projetos: (projetos && projetos.length > 0) 
          ? projetos 
          : PROJECTS.map(p => ({
              titulo: p.title,
              resumo: p.short,
              categoria: "FORMAÇÃO",
              slug: p.slug,
              imagem_destaque: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop"
            }))
      };
    } catch {
      return {
        projetos: PROJECTS.map(p => ({
          titulo: p.title,
          resumo: p.short,
          categoria: "FORMAÇÃO",
          slug: p.slug,
          imagem_destaque: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop"
        }))
      };
    }
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
  'EDUCAÇÃO': GraduationCap,
  'Social': HeartHandshake,
  'Saúde': Brain,
  'Capacitação': Scissors,
  'Vida': LifeBuoy,
};

function Projetos() {
  const { projetos = [] } = Route.useLoaderData() || {};
  const validProjetos = (projetos || []).filter((p: any) => p && p.slug && p.titulo);
  const latestProjeto = validProjetos[0];
  const heroImage = latestProjeto?.imagem_destaque || "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop";

  return (
    <>
      <PageHero 
        title="Projetos que Transformam"
        subtitle="Conheça as frentes de atuação que geram impacto real na vida das famílias."
        image={heroImage}
        category="Nossos Projetos"
      />

      <section className="py-20 bg-white">
        <div className="max-container grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {validProjetos.map((p: any, i: number) => (
            <Reveal key={p.slug} delay={i * 0.1} direction="up">
              <div className="bg-white rounded-[40px] overflow-hidden shadow-warm-utility h-full flex flex-col border border-black/5 transition-transform duration-500 hover:scale-[1.02]">
                <div className="relative aspect-video overflow-hidden bg-gray/10">
                  <img
                    src={(p.imagem_destaque && p.imagem_destaque.startsWith('http')) ? p.imagem_destaque : "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop"}
                    alt={p.titulo}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop";
                      target.onerror = null;
                    }}
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-primary text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                      {p.categoria}
                    </span>
                  </div>
                </div>

                <div className="p-8 md:p-10 flex flex-col flex-grow">
                  <h3 className="text-2xl font-black text-dark mb-4 uppercase tracking-tight">
                    {p.titulo}
                  </h3>
                  <p className="text-gray/70 mb-8 md:mb-10 line-clamp-3 font-light text-base md:text-lg leading-relaxed">
                    {p.resumo}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-4">
                    <Button asChild className="gf-button-primary rounded-full px-8 py-4 h-auto min-h-[44px] text-xs font-black tracking-widest group">
                      <Link to="/doar" search={{ project: p.slug }}>
                        APOIAR AGORA <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/5 rounded-full px-8 py-4 h-auto min-h-[44px] text-xs font-black tracking-widest">
                      <Link to="/projetos/$slug" params={{ slug: p.slug }}>
                        CONHECER MAIS
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
