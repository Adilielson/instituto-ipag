import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Sparkles, Music, GraduationCap, HeartHandshake, Brain, Scissors, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/site/Counter";
import { Reveal } from "@/components/site/Reveal";
import { IMPACT_STATS, PARTNERS, SITE } from "@/data/site";
import logoSymbol from "@/assets/logo-symbol.png";
import { getProjetos, getPosts } from "@/lib/api/cms";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [projetos, posts] = await Promise.all([
      getProjetos(),
      getPosts()
    ]);
    return { projetos: projetos?.slice(0, 3), posts: posts?.slice(0, 3) };
  },
  head: () => ({
    meta: [
      { title: "IPAG — Transformando vidas em São Mateus" },
      { name: "description", content: "Quase duas décadas promovendo educação, cultura, assistência social e valorização da vida em São Mateus – ES." },
      { property: "og:title", content: "IPAG — Instituto Pastor Antonio Gomes" },
      { property: "og:description", content: "Educação, cultura e desenvolvimento social que transformam comunidades." },
    ],
  }),
  component: Home,
});

const ICON_MAP: Record<string, any> = {
  'Cultura': Music,
  'Educação': GraduationCap,
  'Social': HeartHandshake,
  'Saúde': Brain,
  'Capacitação': Scissors,
  'Vida': LifeBuoy,
};

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 gradient-flame-soft" />
        <img
          src={logoSymbol}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-20 h-[600px] w-[600px] opacity-[0.08] md:opacity-[0.12]"
        />
        <div className="mx-auto grid max-w-7xl gap-16 px-4 pb-32 pt-20 md:px-8 md:pt-32 lg:grid-cols-12 lg:pb-48">
          <div className="lg:col-span-8">
            <Reveal direction="down">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" /> Desde 2006 em São Mateus – ES
              </span>
            </Reveal>
            <Reveal delay={0.2}>
              <h1 className="mt-8 text-6xl font-extrabold leading-[1.1] tracking-tight text-foreground md:text-7xl lg:text-8xl">
                Transformando vidas através da{" "}
                <span className="text-primary italic">educação e cultura</span>.
              </h1>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
                Há quase duas décadas, o IPAG promove projetos que fortalecem famílias, desenvolvem talentos
                e geram impacto positivo na comunidade com excelência e propósito.
              </p>
            </Reveal>
            <Reveal delay={0.6}>
              <div className="mt-12 flex flex-wrap gap-5">
                <Button asChild size="lg" className="h-14 px-10 text-base font-bold">
                  <Link to="/projetos">
                    Nossos Projetos <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 border-2 px-10 text-base font-bold">
                  <Link to="/parceiros">Seja um Parceiro</Link>
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="hidden lg:col-span-4 lg:block">
            <Reveal delay={0.4} direction="right">
              <div className="relative aspect-[3/4] rounded-[32px] bg-primary/10 p-2 shadow-premium">
                <div className="flex h-full w-full items-center justify-center rounded-[28px] bg-background">
                  <img src={logoSymbol} alt="" className="h-48 w-48 opacity-20 grayscale" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* IMPACTO */}
      <section className="bg-foreground py-32 text-background md:py-48">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal>
            <h2 className="max-w-4xl text-5xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
              Onde existir necessidade, levaremos <span className="text-primary italic">dignidade</span>.
            </h2>
            <p className="mt-8 max-w-2xl text-xl text-background/60">
              Juntos, somamos quase duas décadas de impacto real na vida de famílias, jovens e crianças de São Mateus.
            </p>
          </Reveal>

          <div className="mt-24 grid gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {IMPACT_STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div className="group">
                  <p className="font-display text-7xl font-extrabold tracking-tighter text-primary md:text-8xl">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <div className="mt-4 h-1 w-12 bg-primary transition-all group-hover:w-20" />
                  <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-background/50">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUEM SOMOS */}
      <section className="section-padding overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-20 px-4 md:px-8 lg:grid-cols-2 lg:items-center">
          <Reveal direction="left">
            <div className="relative aspect-square overflow-hidden rounded-[40px] bg-muted shadow-premium">
              <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-3xl">
                <img src={logoSymbol} alt="" className="h-64 w-64 opacity-10 grayscale" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
            </div>
          </Reveal>
          <Reveal delay={0.2} direction="right">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Nossa Essência</span>
            <h2 className="mt-6 text-5xl font-extrabold leading-tight md:text-6xl">
              Um instituto nascido para servir com excelência.
            </h2>
            <div className="mt-8 space-y-6 text-lg text-muted-foreground">
              <p>
                O IPAG nasceu em 2006 do desejo do Pastor Antonio Gomes de promover desenvolvimento e inclusão em São Mateus.
              </p>
              <p>
                Hoje, somos referência em projetos sociais que unem modernidade e cuidado humano, preservando um legado de transformação contínua.
              </p>
            </div>
            <Button asChild className="mt-12 h-14 px-10 font-bold" size="lg">
              <Link to="/quem-somos">Conheça Nossa História <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* PROJETOS */}
      <section className="bg-white/50 py-32 md:py-48">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-10">
              <div className="max-w-3xl">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Nossos Projetos</span>
                <h2 className="mt-6 text-5xl font-extrabold leading-tight md:text-6xl">
                  Frentes de ação que renovam a esperança.
                </h2>
              </div>
              <Button asChild variant="outline" className="h-14 border-2 px-8 font-bold">
                <Link to="/projetos">Explorar Tudo <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
          </Reveal>

          <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Route.useLoaderData().projetos?.map((p: any, i: number) => {
              const Icon = ICON_MAP[p.categoria as string] || HeartHandshake;
              return (
                <Reveal key={p.slug} delay={i * 0.1}>
                  <Link
                    to="/projetos/$slug"
                    params={{ slug: p.slug }}
                    className="group relative flex h-full flex-col overflow-hidden rounded-[32px] bg-background p-10 shadow-premium transition-all hover:-translate-y-2"
                  >
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="mt-8 text-2xl font-extrabold leading-tight">{p.titulo}</h3>
                    <p className="mt-4 flex-1 text-muted-foreground leading-relaxed">{p.resumo}</p>
                    <div className="mt-8 flex items-center font-bold text-primary">
                      Detalhes do projeto <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* BAZAR */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal direction="fade">
            <div className="relative overflow-hidden rounded-[48px] bg-foreground p-12 text-background shadow-premium md:p-24">
              <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/20 blur-[100px]" />
              <div className="relative max-w-3xl">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Solidariedade</span>
                <h2 className="mt-8 text-5xl font-extrabold leading-tight md:text-6xl">
                  Transforme o que você não usa em esperança.
                </h2>
                <p className="mt-8 text-xl text-background/60 leading-relaxed">
                  Doe roupas, calçados e livros em bom estado. Sua doação financia diretamente nossos projetos e gera dignidade para centenas de famílias.
                </p>
                <div className="mt-12 flex flex-wrap gap-8 items-center">
                  <Button asChild size="lg" className="h-14 px-10 font-bold bg-primary text-white hover:bg-primary/90">
                    <Link to="/bazar">Saiba Como Doar</Link>
                  </Button>
                  <div className="text-sm">
                    <p className="text-background/40 uppercase tracking-widest font-bold">Ponto de entrega</p>
                    <p className="mt-1 font-semibold">{SITE.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PARCEIROS */}
      <section className="bg-muted py-32 md:py-48">
        <div className="mx-auto max-w-7xl px-4 md:px-8 text-center">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Parcerias Estratégicas</span>
            <h2 className="mx-auto mt-8 max-w-4xl text-5xl font-extrabold leading-tight md:text-6xl">
              Grandes transformações nascem da colaboração.
            </h2>
          </Reveal>
          <div className="mt-20 flex flex-wrap justify-center gap-6">
            {PARTNERS.map((p, i) => (
              <Reveal key={p} delay={i * 0.05} direction="fade">
                <div className="flex h-24 items-center justify-center rounded-[24px] bg-background px-10 text-center text-sm font-bold text-muted-foreground shadow-sm hover:shadow-premium transition-shadow">
                  {p}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.4}>
            <div className="mt-16">
              <Button asChild size="lg" className="h-14 px-12 font-bold shadow-premium">
                <Link to="/parceiros">Seja um Investidor Social</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BLOG */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-10">
              <div className="max-w-3xl">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Imprensa e Notícias</span>
                <h2 className="mt-6 text-5xl font-extrabold leading-tight md:text-6xl">Impacto documentado.</h2>
              </div>
              <Button asChild variant="outline" className="h-14 border-2 px-8 font-bold">
                <Link to="/blog">Ver Todas as Notícias <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
          </Reveal>
          <div className="mt-20 grid gap-10 md:grid-cols-3">
            {Route.useLoaderData().posts?.map((post: any, i: number) => (
              <Reveal key={post.slug} delay={i * 0.1} direction="up">
                <Link to="/blog/$slug" params={{ slug: post.slug }} className="group block h-full overflow-hidden rounded-[40px] border border-border bg-background shadow-sm transition-all hover:-translate-y-2 hover:shadow-premium">
                  <div className="aspect-[16/10] bg-muted overflow-hidden">
                    <div className="h-full w-full bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                  </div>
                  <div className="p-10">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">{post.categoria}</span>
                    <h3 className="mt-4 text-2xl font-extrabold leading-tight group-hover:text-primary transition-colors">{post.titulo}</h3>
                    <p className="mt-4 text-muted-foreground leading-relaxed">{post.resumo}</p>
                    <div className="mt-8 flex items-center justify-between">
                      <span className="text-sm font-bold text-muted-foreground/50">{new Date(post.data_publicacao).toLocaleDateString('pt-BR')}</span>
                      <ArrowRight className="h-5 w-5 text-primary opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
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
