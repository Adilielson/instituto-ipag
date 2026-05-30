import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { POSTS } from "@/data/site";

export const Route = createFileRoute("/blog")({
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
      <section className="gradient-flame-soft py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Blog</span>
            <h1 className="mt-4 text-5xl font-extrabold leading-[1.05] md:text-6xl">
              Histórias de <span className="text-gradient-flame">transformação</span>.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2 md:px-8 lg:grid-cols-3">
          {Route.useLoaderData().posts?.map((post: any, i: number) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <Link to="/blog/$slug" params={{ slug: post.slug }} className="group block h-full overflow-hidden rounded-3xl border border-border bg-background shadow-card transition-all hover:-translate-y-1 hover:shadow-warm">
                <div className="h-48 gradient-flame" />
                <div className="p-7">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">{post.categoria}</span>
                  <h3 className="mt-3 text-lg font-bold leading-snug">{post.titulo}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{post.resumo}</p>
                  <p className="mt-5 text-xs text-muted-foreground">{new Date(post.data_publicacao).toLocaleDateString('pt-BR')}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
