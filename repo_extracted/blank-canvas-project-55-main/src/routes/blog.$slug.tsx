import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { POSTS } from "@/data/site";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = POSTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.post.title ?? "Post"} — IPAG` },
      { name: "description", content: loaderData?.post.excerpt ?? "" },
      { property: "og:title", content: loaderData?.post.title ?? "" },
      { property: "og:description", content: loaderData?.post.excerpt ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Post não encontrado</h1>
      <Link to="/blog" className="mt-6 inline-block text-primary">← Voltar ao blog</Link>
    </div>
  ),
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData();
  return (
    <article>
      <section className="gradient-flame-soft py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <Link to="/blog" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
            <ArrowLeft className="mr-1 h-4 w-4" /> Voltar ao blog
          </Link>
          <Reveal>
            <span className="mt-8 inline-block text-xs font-semibold uppercase tracking-wider text-primary">{post.category}</span>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">{post.title}</h1>
            <p className="mt-4 text-sm text-muted-foreground">{post.date}</p>
          </Reveal>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-3xl space-y-5 px-4 text-lg leading-relaxed text-muted-foreground md:px-8">
          <p className="text-xl text-foreground">{post.excerpt}</p>
          <p>Este é um conteúdo de exemplo. Aqui entrará o texto completo do post, com mais detalhes sobre a história, dados, depoimentos e fotos do projeto.</p>
          <p>O blog do IPAG é um espaço para fortalecer autoridade institucional e o relacionamento com a comunidade — abordando temas como educação, cultura, voluntariado, saúde mental e histórias de transformação.</p>
        </div>
      </section>
    </article>
  );
}
