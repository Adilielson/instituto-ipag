import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { POSTS } from "@/data/site";

export const Route = createFileRoute("/blog/")({
  loader: async () => {
    try {
      const { data: posts, error } = await supabase
        .from("posts")
        .select("*")
        .eq("status", "publicado")
        .order("data_publicacao", { ascending: false });
      
      if (error) throw error;
      
      return { 
        posts: (posts && posts.length > 0) 
          ? posts 
          : POSTS.map(p => ({
              titulo: p.title,
              resumo: p.excerpt,
              categoria: p.category,
              slug: p.slug,
              data_publicacao: new Date().toISOString()
            }))
      };
    } catch {
      return {
        posts: POSTS.map(p => ({
          titulo: p.title,
          resumo: p.excerpt,
          categoria: p.category,
          slug: p.slug,
          data_publicacao: new Date().toISOString()
        }))
      };
    }
  },
  head: () => ({
    meta: [
      { title: "Blog — IPAG" },
      { name: "description", content: "Conteúdo sobre desenvolvimento social, educação, cultura e histórias de transformação." },
      { property: "og:title", content: "Blog IPAG" },
      { property: "og:description", content: "Histórias, projetos e reflexões da nossa equipe." },
    ],
  }),
  component: Blog,
});

function Blog() {
  return (
    <>
      <section className="gradient-flame-soft py-32 md:py-40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/4"></div>
        <div className="max-container relative z-10">
          <Reveal>
            <span className="text-primary font-black uppercase tracking-[0.4em] mb-6 block text-sm">Editorial IPAG</span>
            <h1 className="gf-heading-lg text-dark max-w-4xl">
              HISTÓRIAS DE <br />
              <span className="text-gradient-flame">TRANSFORMAÇÃO</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-container">
          <div className="mb-12 flex flex-wrap gap-4 items-center justify-between">
             <div className="relative max-w-md w-full">
                <input 
                  type="text" 
                  placeholder="Buscar artigos..." 
                  className="w-full pl-12 pr-6 py-4 rounded-full border border-black/5 bg-bg text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  onChange={(e) => {/* Implementar busca local ou server-side se quiser */}}
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
             </div>
          </div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {Route.useLoaderData().posts?.map((post: any, i: number) => (
              <Reveal key={post.slug} delay={i * 0.1} direction="up">
              <Link to="/blog/$slug" params={{ slug: post.slug }} className="group block h-full overflow-hidden rounded-[40px] border border-black/5 bg-white shadow-premium-utility transition-all duration-700 hover:shadow-warm-utility">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img 
                    src={post.imagem_destaque || "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2006&auto=format&fit=crop"} 
                    alt={post.titulo} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-dark shadow-xl">
                      {post.categoria}
                    </span>
                  </div>
                </div>
                <div className="p-10">
                  <div className="flex items-center gap-4 mb-6 text-gray/50 text-xs font-bold uppercase tracking-widest">
                    <span>{new Date(post.data_publicacao).toLocaleDateString('pt-BR')}</span>
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    <span>POR IPAG</span>
                  </div>
                  <h3 className="text-2xl font-black mb-6 leading-tight text-dark group-hover:text-primary transition-colors line-clamp-2 uppercase tracking-tight">
                    {post.titulo}
                  </h3>
                  <p className="text-gray/70 leading-relaxed line-clamp-3 font-light text-base md:text-lg">
                    {post.resumo}
                  </p>
                  <div className="mt-8 flex items-center gap-3 text-dark font-black uppercase tracking-widest text-xs group-hover:gap-5 transition-all">
                    LER MATÉRIA COMPLETA <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </Link>
            </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
