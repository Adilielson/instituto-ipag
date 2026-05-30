import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { getPosts } from "@/lib/api/cms";

export const Route = createFileRoute("/blog")({
  loader: async () => {
    const posts = await getPosts();
    return { posts };
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
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/4" />
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

      <section className="py-20">
        <div className="max-container grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {Route.useLoaderData().posts?.map((post: any, i: number) => (
            <Reveal key={post.slug} delay={i * 0.1} direction="up">
              <Link to="/blog/$slug" params={{ slug: post.slug }} className="group block h-full overflow-hidden rounded-[40px] border border-black/5 bg-white shadow-premium transition-all duration-700 hover:shadow-warm">
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
                  <p className="text-gray/70 leading-relaxed line-clamp-3 font-light text-lg">
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
      </section>
    </>
  );
}
