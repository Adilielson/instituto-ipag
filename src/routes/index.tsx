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
      {/* HERO - Gerando Falcões Layout */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <Reveal direction="down">
              <span className="inline-block text-primary font-bold uppercase tracking-[0.2em] mb-6">
                IPAG — São Mateus
              </span>
            </Reveal>
            <Reveal delay={0.2}>
              <h1 className="gf-heading-xl text-dark mb-8">
                Força em <br />
                <span className="text-primary">Rede</span>
              </h1>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="text-xl md:text-2xl text-gray mb-10 max-w-lg font-medium leading-relaxed">
                Transformando a realidade de favelas e periferias através da educação e cultura.
              </p>
            </Reveal>
            <Reveal delay={0.6}>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="gf-button gf-button-primary h-auto">
                  <Link to="/projetos">
                    CONHEÇA E APOIE
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
          
          <div className="relative lg:h-[600px]">
            <Reveal direction="right" delay={0.4}>
              <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl">
                <img 
                  src="https://i.imgur.com/iiJLmgU.jpeg" 
                  alt="IPAG Ação" 
                  className="w-full h-full object-cover aspect-[4/5] lg:aspect-auto"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary rounded-full -z-10 opacity-20 blur-2xl" />
              <div className="absolute -top-10 -right-10 w-60 h-60 bg-primary rounded-full -z-10 opacity-10 blur-3xl" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* IMPACTO - Banner horizontal full width like model */}
      <section className="bg-dark py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8 text-center">
          <Reveal>
            <h2 className="gf-heading-lg mb-16">
              DA POBREZA À <span className="text-primary">DIGNIDADE</span>
            </h2>
          </Reveal>

          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {IMPACT_STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div className="group border-r border-white/10 last:border-0 hidden lg:block" />
                <div className="relative">
                  <p className="gf-heading-xl text-primary mb-2">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-sm font-bold uppercase tracking-[0.3em] text-white/40">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* QUEM SOMOS - Modern Editorial Style */}
      <section className="py-32 overflow-hidden bg-bg">
        <div className="mx-auto grid max-w-7xl gap-20 px-4 md:px-8 lg:grid-cols-2 lg:items-center">
          <Reveal direction="left">
            <div className="relative rounded-[40px] overflow-hidden shadow-premium aspect-square">
              <img 
                src="https://i.imgur.com/iiJLmgU.jpeg" 
                alt="Nossa Essência" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          </Reveal>
          <Reveal delay={0.2} direction="right">
            <span className="text-primary font-bold uppercase tracking-[0.3em] mb-4 block">Nossa Essência</span>
            <h2 className="gf-heading-lg mb-8">
              NASCEU PARA SERVIR COM <span className="text-primary">EXCELÊNCIA</span>
            </h2>
            <div className="space-y-6 text-lg text-gray leading-relaxed font-medium">
              <p>
                O IPAG nasceu em 2006 do desejo do Pastor Antonio Gomes de promover desenvolvimento e inclusão em São Mateus.
              </p>
              <p>
                Hoje, somos referência em projetos sociais que unem modernidade e cuidado humano, preservando um legado de transformação contínua.
              </p>
            </div>
            <Button asChild className="gf-button gf-button-primary mt-12">
              <Link to="/quem-somos">SAIBA MAIS</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* PROJETOS - Grid with GF Cards style */}
      <section className="py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-10 mb-20">
              <div className="max-w-2xl">
                <span className="text-primary font-bold uppercase tracking-[0.3em] mb-4 block">Nossos Projetos</span>
                <h2 className="gf-heading-lg">FRENTES DE AÇÃO</h2>
              </div>
              <Button asChild variant="outline" className="gf-button border-2 border-primary text-primary hover:bg-primary/5">
                <Link to="/projetos">EXPLORAR TUDO</Link>
              </Button>
            </div>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Route.useLoaderData().projetos?.map((p: any, i: number) => {
              const Icon = ICON_MAP[p.categoria as string] || HeartHandshake;
              return (
                <Reveal key={p.slug} delay={i * 0.1}>
                  <Link
                    to="/projetos/$slug"
                    params={{ slug: p.slug }}
                    className="gf-card group relative flex h-full flex-col p-10 overflow-hidden"
                  >
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white mb-8">
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-extrabold mb-4 uppercase tracking-tight">{p.titulo}</h3>
                    <p className="flex-1 text-gray leading-relaxed mb-8">{p.resumo}</p>
                    <div className="flex items-center font-bold text-primary group-hover:gap-4 transition-all uppercase tracking-wider text-sm">
                      VER PROJETO <ArrowRight className="ml-2 h-4 w-4" />
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
