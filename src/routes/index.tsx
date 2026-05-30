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
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" 
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
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop" 
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


      {/* BAZAR - Prominent call to action with image background */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal direction="fade">
            <div className="relative overflow-hidden rounded-[40px] bg-dark min-h-[500px] flex items-center p-12 md:p-24 shadow-2xl">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1459183885447-df53d17ee2ab?q=80&w=2070&auto=format&fit=crop" 
                  alt="Bazar" 
                  className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-transparent" />
              </div>

              
              <div className="relative z-10 max-w-2xl">
                <span className="text-primary font-bold uppercase tracking-[0.3em] mb-6 block">Solidariedade</span>
                <h2 className="gf-heading-lg text-white mb-8 uppercase">
                  TRANSFORME O QUE <br />VOCÊ NÃO USA EM <span className="text-primary">ESPERANÇA</span>
                </h2>
                <p className="text-xl text-white/70 mb-12 leading-relaxed font-medium">
                  Sua doação financia diretamente nossos projetos e gera dignidade para centenas de famílias em São Mateus.
                </p>
                <Button asChild className="gf-button gf-button-primary">
                  <Link to="/bazar">QUERO DOAR AGORA</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BLOG - Horizontal scrollable or clean grid like model */}
      <section className="py-32 bg-bg">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-10 mb-20">
              <div className="max-w-2xl">
                <span className="text-primary font-bold uppercase tracking-[0.3em] mb-4 block">Fique por dentro</span>
                <h2 className="gf-heading-lg uppercase">ÚLTIMAS NOTÍCIAS</h2>
              </div>
              <Button asChild variant="outline" className="gf-button border-2 border-dark text-dark hover:bg-dark/5">
                <Link to="/blog">VER TODAS</Link>
              </Button>
            </div>
          </Reveal>
          
          <div className="grid gap-10 md:grid-cols-3">
            {Route.useLoaderData().posts?.map((post: any, i: number) => (
              <Reveal key={post.slug} delay={i * 0.1} direction="up">
                <Link to="/blog/$slug" params={{ slug: post.slug }} className="group block h-full bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img 
                      src={post.imagem_destaque || "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2006&auto=format&fit=crop"} 
                      alt={post.titulo} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-8">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary mb-4 block">{post.categoria}</span>
                    <h3 className="text-xl font-bold mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-2 uppercase">{post.titulo}</h3>
                    <p className="text-gray leading-relaxed mb-6 line-clamp-3 text-sm font-medium">{post.resumo}</p>
                    <div className="flex items-center justify-between pt-6 border-t border-black/5">
                      <span className="text-xs font-bold text-gray/50">{new Date(post.data_publicacao).toLocaleDateString('pt-BR')}</span>
                      <ArrowRight className="h-5 w-5 text-primary" />
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
