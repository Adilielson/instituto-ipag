import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Music, GraduationCap, HeartHandshake, Brain, Scissors, LifeBuoy } from "lucide-react";
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
          {validProjetos.map((p: any, i: number) => {
            const Icon = ICON_MAP[p.categoria as string] || HeartHandshake;
            return (
              <Reveal key={p.slug} delay={i * 0.1} direction="up">
                <Link
                  to="/projetos/$slug"
                  params={{ slug: p.slug }}
                  className="group relative flex h-[500px] md:h-[600px] flex-col overflow-hidden rounded-[40px] bg-white shadow-premium-utility transition-all duration-700 hover:shadow-warm-utility border border-black/5"
                >
                  <div className="relative h-48 md:h-64 overflow-hidden bg-gray/10">
                    <img 
                      src={(p.imagem_destaque && p.imagem_destaque.startsWith('http')) ? p.imagem_destaque : "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop"} 
                      alt={p.titulo}
                      className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                    />
                    <div className="absolute top-6 left-6 z-20">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 backdrop-blur-md text-primary shadow-lg transition-transform duration-500 group-hover:scale-110">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="absolute top-6 right-6 z-20">
                      <span className="bg-primary text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                        {p.categoria}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                  
                  <div className="p-10 flex flex-col flex-grow relative z-10">
                    <h3 className="text-2xl font-black uppercase tracking-tight text-dark leading-none group-hover:text-primary transition-colors">{p.titulo}</h3>
                    <p className="mt-6 text-lg text-gray/70 leading-relaxed line-clamp-4 font-light">{p.resumo}</p>
                    
                    <div className="mt-auto">
                      <span className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-dark group-hover:text-primary transition-all group-hover:gap-4 gap-2">
                        VER DETALHES <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
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
