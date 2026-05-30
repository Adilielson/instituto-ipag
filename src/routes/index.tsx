import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/site/Counter";
import { Reveal } from "@/components/site/Reveal";
import { IMPACT_STATS, PROJECTS, POSTS, PARTNERS, SITE } from "@/data/site";
import logoSymbol from "@/assets/logo-symbol.png";

export const Route = createFileRoute("/")({
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
      <section className="bg-muted/40 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Nossos projetos</span>
                <h2 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">
                  Frentes de ação que transformam.
                </h2>
              </div>
              <Button asChild variant="outline" className="border-foreground/20">
                <Link to="/projetos">Ver todos <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
              </Button>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <Link
                  to="/projetos/$slug"
                  params={{ slug: p.slug }}
                  className="group flex h-full flex-col rounded-3xl bg-background p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-warm"
                >
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl gradient-flame text-primary-foreground">
                    <p.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold leading-snug">{p.title}</h3>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.short}</p>
                  <span className="mt-6 inline-flex items-center text-sm font-semibold text-primary">
                    Saiba mais <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BAZAR */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl gradient-flame p-10 text-primary-foreground shadow-warm md:p-16">
              <img src={logoSymbol} alt="" aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-80 w-80 opacity-15" />
              <div className="relative max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/80">Bazar Solidário IPAG</span>
                <h2 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">
                  Transforme o que você não usa em esperança para quem precisa.
                </h2>
                <p className="mt-5 text-lg text-primary-foreground/90">
                  Doe roupas, calçados, brinquedos e livros em bom estado. Sua doação financia diretamente nossos projetos.
                </p>
                <p className="mt-6 text-sm text-primary-foreground/80">
                  <strong className="font-semibold">Ponto de entrega:</strong> {SITE.address}
                </p>
                <Button asChild size="lg" variant="secondary" className="mt-7 bg-background text-foreground hover:bg-background/90">
                  <Link to="/bazar">Como doar</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PARCEIROS */}
      <section className="border-y border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal>
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Parceiros e investidores</span>
              <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-extrabold leading-tight md:text-4xl">
                Grandes transformações acontecem quando trabalhamos juntos.
              </h2>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {PARTNERS.map((p) => (
              <div key={p} className="flex h-20 items-center justify-center rounded-xl border border-border bg-background px-4 text-center text-sm font-semibold text-muted-foreground">
                {p}
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild size="lg" className="gradient-flame text-primary-foreground">
              <Link to="/parceiros">Quero ser parceiro</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Fique por dentro</span>
                <h2 className="mt-3 text-4xl font-extrabold md:text-5xl">Últimas notícias</h2>
              </div>
              <Button asChild variant="outline" className="border-foreground/20">
                <Link to="/blog">Ver blog <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
              </Button>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {POSTS.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.08}>
                <Link to="/blog/$slug" params={{ slug: post.slug }} className="group block h-full overflow-hidden rounded-3xl border border-border bg-background shadow-card transition-all hover:-translate-y-1 hover:shadow-warm">
                  <div className="h-48 gradient-flame" />
                  <div className="p-7">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">{post.category}</span>
                    <h3 className="mt-3 text-lg font-bold leading-snug">{post.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{post.excerpt}</p>
                    <p className="mt-5 text-xs text-muted-foreground">{post.date}</p>
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
