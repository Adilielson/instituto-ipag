import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { getPostBySlug } from "@/lib/api/cms";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getPostBySlug({ data: { slug: params.slug } });
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.post?.titulo ?? "Post"} — IPAG` },
      { name: "description", content: loaderData?.post?.resumo ?? "" },
      { property: "og:title", content: loaderData?.post?.titulo ?? "" },
      { property: "og:description", content: loaderData?.post?.resumo ?? "" },
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
  if (!post) return null;
  
  return (
    <article>
      <section className="gradient-flame-soft py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <Link to="/blog" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
            <ArrowLeft className="mr-1 h-4 w-4" /> Voltar ao blog
          </Link>
          <Reveal>
            <span className="mt-8 inline-block text-xs font-semibold uppercase tracking-wider text-primary">{post.categoria}</span>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">{post.titulo}</h1>
            <p className="mt-4 text-sm text-muted-foreground">{new Date(post.data_publicacao).toLocaleDateString('pt-BR')}</p>
          </Reveal>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-3xl space-y-5 px-4 text-lg leading-relaxed text-muted-foreground md:px-8">
          <p className="text-xl text-foreground font-semibold">{post.resumo}</p>
          <div className="prose prose-lg max-w-none">
            {post.conteudo}
          </div>
        </div>
      </section>
    </article>
  );
}
