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
        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-16 md:px-8 md:pt-24 lg:grid-cols-12 lg:pb-32">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> Desde 2006 em São Mateus – ES
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
                Transformando vidas através da{" "}
                <span className="text-gradient-flame">educação, cultura e desenvolvimento social</span>.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
                Há quase duas décadas, o IPAG promove projetos que fortalecem famílias, desenvolvem talentos
                e geram impacto positivo na comunidade.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild size="lg" className="gradient-flame text-primary-foreground shadow-warm hover:opacity-95">
                  <Link to="/projetos">
                    Conheça nossos projetos <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-foreground/20">
                  <Link to="/parceiros">Seja um parceiro</Link>
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <div className="relative rounded-3xl gradient-flame p-1 shadow-warm">
                <div className="rounded-[1.4rem] bg-background p-7 md:p-9">
                  <Heart className="h-9 w-9 text-primary" />
                  <p className="mt-5 text-2xl font-display font-semibold leading-snug">
                    "A transformação de uma comunidade acontece quando pessoas se unem em torno de um propósito maior."
                  </p>
                  <p className="mt-5 text-sm font-medium text-muted-foreground">
                    — Pastor Antonio Gomes <span className="text-primary">(Pastor Toninho)</span>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* IMPACTO */}
      <section className="bg-foreground py-20 text-background md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal>
            <h2 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">
              Onde existir necessidade, levaremos <span className="text-gradient-flame">dignidade</span>.
            </h2>
            <p className="mt-5 max-w-2xl text-background/70">
              Juntos, somamos quase duas décadas de impacto real na vida de famílias, jovens, crianças e idosos de São Mateus.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {IMPACT_STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="border-l-2 border-primary pl-5">
                  <p className="font-display text-5xl font-extrabold text-primary-glow md:text-6xl">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-sm font-medium uppercase tracking-wider text-background/70">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUEM SOMOS */}
      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 md:px-8 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl gradient-flame shadow-warm">
              <div className="absolute inset-0 flex items-center justify-center">
                <img src={logoSymbol} alt="" className="h-64 w-64 opacity-90" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Quem somos</span>
            <h2 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">
              Um instituto nascido para servir.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              O IPAG nasceu em 2006 do desejo do Pastor Antonio Gomes — conhecido carinhosamente como Pastor Toninho —
              de promover desenvolvimento, inclusão e qualidade de vida em São Mateus.
            </p>
            <p className="mt-4 text-muted-foreground">
              Em 2017, a instituição passou a se chamar Instituto de Desenvolvimento Social Pastor Antonio Gomes,
              preservando o legado de um líder que dedicou sua vida ao cuidado das pessoas.
            </p>
            <Button asChild className="mt-8 gradient-flame text-primary-foreground" size="lg">
              <Link to="/quem-somos">Conheça nossa história <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
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
