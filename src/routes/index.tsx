import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Sparkles, Music, GraduationCap, HeartHandshake, Brain, Scissors, LifeBuoy, Users, BarChart, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/site/Counter";
import { Reveal } from "@/components/site/Reveal";
import { IMPACT_STATS, PARTNERS, SITE } from "@/data/site";
import { getProjetos, getPosts } from "@/lib/api/cms";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export const Route = createFileRoute("/")({
  loader: async () => {
    try {
      const [projetos, posts] = await Promise.all([
        getProjetos().catch(() => []),
        getPosts().catch(() => [])
      ]);
      return { 
        projetos: (projetos || [])?.slice(0, 3), 
        posts: (posts || [])?.slice(0, 3) 
      };
    } catch (e) {
      console.error("Loader error:", e);
      return { projetos: [], posts: [] };
    }
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

function HomeHero({ heroRef }: { heroRef: any }) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      <motion.div 
        style={isClient ? { y: y1, opacity } : { y: 0, opacity: 1 }}
        className="absolute inset-0 z-0"
      >

        <img 
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" 
          alt="IPAG Background" 
          className="w-full h-full object-cover opacity-40 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/40 to-dark" />
      </motion.div>

      <div className="max-container relative z-10 pt-20">
        <div className="max-w-4xl">
          <Reveal direction="down">
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="h-[2px] w-12 bg-primary" />
              <span className="text-primary font-black uppercase tracking-[0.3em] text-sm md:text-base">
                IPAG — INSTITUTO PASTOR ANTONIO GOMES
              </span>
            </div>
          </Reveal>
          
          <Reveal delay={0.2} direction="up">
            <h1 className="gf-heading-xl text-white mb-10">
              TRANSFORMANDO <br />
              A REALIDADE EM <span className="text-primary">REDE</span>
            </h1>
          </Reveal>

          <Reveal delay={0.4} direction="up">
            <p className="text-xl md:text-3xl text-white/80 mb-12 max-w-2xl font-light leading-relaxed">
              Quase duas décadas promovendo educação, cultura e dignidade humana em São Mateus – ES.
            </p>
          </Reveal>

          <Reveal delay={0.6} direction="up">
            <div className="flex flex-wrap gap-6">
              <Button asChild className="gf-button gf-button-primary h-auto group">
                <Link to="/projetos" className="flex items-center gap-3">
                  CONHEÇA NOSSAS FRENTES <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="gf-button border-2 border-white text-white hover:bg-white/10 h-auto">
                <Link to="/quem-somos">NOSSA HISTÓRIA</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </>
  );
}

function Home() {
  const heroRef = useRef(null);
  const loaderData = Route.useLoaderData();

  return (
    <div className="bg-white">
      {/* HERO - Cinematic Premium Layout */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-dark">
        <HomeHero heroRef={heroRef} />
      </section>

      {/* IMPACTO - Numbers that matter */}
      <section className="py-32 bg-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
        
        <div className="max-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <Reveal direction="left">
              <span className="text-primary font-black uppercase tracking-[0.3em] mb-6 block">Nossa Pegada</span>
              <h2 className="gf-heading-lg text-white mb-8">
                RESULTADOS QUE <br />
                <span className="text-primary">MUDAM VIDAS</span>
              </h2>
              <p className="text-xl text-white/60 max-w-lg font-light leading-relaxed">
                Monitoramos cada ação para garantir que o impacto chegue onde é mais necessário, transformando doações em desenvolvimento real.
              </p>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-12">
              {IMPACT_STATS.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.1} direction="up">
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-white/5 rounded-3xl scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500" />
                    <p className="text-6xl md:text-7xl font-black text-primary mb-4 tracking-tighter">
                      <Counter to={s.value} suffix={s.suffix} />
                    </p>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/40">
                      {s.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJETOS - Premium Cards */}
      <section className="py-40 bg-white">
        <div className="max-container">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-12 mb-24 border-b border-border pb-12">
              <div className="max-w-3xl">
                <span className="text-primary font-black uppercase tracking-[0.3em] mb-6 block text-sm">Frentes de Ação</span>
                <h2 className="gf-heading-lg uppercase text-dark">Onde nossa rede atua</h2>
              </div>
              <Button asChild variant="ghost" className="text-primary font-black tracking-widest hover:bg-transparent group h-auto">
                <Link to="/projetos" className="flex items-center gap-3">
                  VER TODOS OS PROJETOS <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
            </div>
          </Reveal>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {loaderData.projetos?.map((p: any, i: number) => {
              const Icon = ICON_MAP[p.categoria as string] || HeartHandshake;
              return (
                <Reveal key={p.slug} delay={i * 0.15} direction="up">
                  <Link
                    to="/projetos/$slug"
                    params={{ slug: p.slug }}
                    className="group relative block aspect-[4/5] overflow-hidden rounded-[40px] shadow-premium hover:shadow-2xl transition-all duration-700 bg-white"
                  >
                    <img 
                      src={p.imagem || "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop"} 
                      alt={p.titulo}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    
                    <div className="absolute inset-0 p-10 flex flex-col justify-end">
                      <div className="mb-6 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white mb-6">
                          <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-3xl font-black text-white mb-4 uppercase leading-none tracking-tight">
                          {p.titulo}
                        </h3>
                        <p className="text-white/70 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-medium">
                          {p.resumo}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        VER DETALHES <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* QUEM SOMOS - Editorial Storytelling */}
      <section className="py-40 bg-white overflow-hidden">
        <div className="max-container grid lg:grid-cols-2 gap-24 items-center">
          <Reveal direction="left" className="relative">
            <div className="relative rounded-[60px] overflow-hidden shadow-2xl aspect-[3/4] lg:aspect-auto lg:h-[800px]">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.5 }}
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop" 
                alt="Nossa Essência" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-primary p-12 rounded-[40px] shadow-2xl hidden md:block max-w-xs text-white">
              <Users className="w-12 h-12 mb-6" />
              <p className="text-4xl font-black mb-2 leading-none">19 ANOS</p>
              <p className="text-sm font-bold uppercase tracking-widest opacity-80">De história e impacto em São Mateus</p>
            </div>
          </Reveal>

          <Reveal delay={0.2} direction="right">
            <span className="text-primary font-black uppercase tracking-[0.4em] mb-8 block text-sm">Nosso Legado</span>
            <h2 className="gf-heading-lg mb-12 text-dark">
              NASCEU PARA <span className="text-primary">SERVIR</span> COM EXCELÊNCIA
            </h2>
            <div className="space-y-8 text-xl text-gray/80 leading-relaxed font-light">
              <p>
                O IPAG nasceu em 2006 do desejo do Pastor Antonio Gomes de promover desenvolvimento e inclusão em São Mateus. 
              </p>
              <p className="font-medium text-dark italic border-l-4 border-primary pl-8 py-2">
                "Não trabalhamos apenas com assistência, mas com a restauração da dignidade humana através da rede de apoio."
              </p>
              <p>
                Hoje, somos referência em projetos sociais que unem modernidade e cuidado humano, preservando um legado de transformação contínua.
              </p>
            </div>
            <Button asChild className="gf-button gf-button-primary mt-16 h-auto">
              <Link to="/quem-somos">CONHEÇA NOSSA JORNADA</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* BAZAR - Prominent High-End Banner */}
      <section className="py-20 bg-bg">
        <div className="max-container">
          <Reveal direction="fade">
            <div className="relative overflow-hidden rounded-[60px] bg-dark min-h-[600px] flex items-center p-12 md:p-24 shadow-2xl group">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1459183885447-df53d17ee2ab?q=80&w=2070&auto=format&fit=crop" 
                  alt="Bazar Solidário" 
                  className="w-full h-full object-cover opacity-30 transition-transform duration-[3s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/90 to-transparent" />
              </div>

              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-4 mb-8">
                   <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <Heart className="w-6 h-6 fill-primary" />
                   </div>
                   <span className="text-primary font-black uppercase tracking-[0.4em] text-sm">Apoio Direto</span>
                </div>
                
                <h2 className="gf-heading-lg text-white mb-10 uppercase leading-none">
                  TRANSFORME O QUE <br />VOCÊ NÃO USA EM <span className="text-primary">ESPERANÇA</span>
                </h2>
                <p className="text-2xl text-white/60 mb-12 leading-relaxed font-light max-w-2xl">
                  Sua doação financia diretamente nossos projetos e gera dignidade para centenas de famílias em São Mateus. O Bazar IPAG é motor de transformação social.
                </p>
                <div className="flex flex-wrap gap-6">
                  <Button asChild className="gf-button gf-button-primary h-auto">
                    <Link to="/bazar">QUERO DOAR AGORA</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BLOG - Editorial Magazine Style */}
      <section className="py-40 bg-white">
        <div className="max-container">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-12 mb-24 pb-12 border-b border-black/5">
              <div className="max-w-3xl">
                <span className="text-primary font-black uppercase tracking-[0.4em] mb-6 block text-sm">IPAG EM FOCO</span>
                <h2 className="gf-heading-lg uppercase text-dark tracking-tighter">EDITORIAL IPAG</h2>
              </div>
              <Button asChild variant="outline" className="gf-button border-2 border-dark text-dark hover:bg-dark hover:text-white h-auto">
                <Link to="/blog">VER TODAS AS MATÉRIAS</Link>
              </Button>
            </div>
          </Reveal>
          
          <div className="grid gap-16 md:grid-cols-3">
            {loaderData.posts?.map((post: any, i: number) => (
              <Reveal key={post.slug} delay={i * 0.15} direction="up">
                <Link to="/blog/$slug" params={{ slug: post.slug }} className="group block h-full">
                  <div className="aspect-[16/11] overflow-hidden rounded-[32px] mb-8 relative">
                    <img 
                      src={post.imagem_destaque || "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2006&auto=format&fit=crop"} 
                      alt={post.titulo} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="bg-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-dark shadow-xl">
                        {post.categoria}
                      </span>
                    </div>
                  </div>

                  <div className="px-2">
                    <div className="flex items-center gap-4 mb-6 text-gray/50 text-xs font-bold uppercase tracking-widest">
                       <span>{new Date(post.data_publicacao).toLocaleDateString('pt-BR')}</span>
                       <span className="h-1 w-1 rounded-full bg-primary" />
                       <span>POR IPAG COMUNICAÇÃO</span>
                    </div>
                    <h3 className="text-2xl font-black mb-6 leading-tight text-dark group-hover:text-primary transition-colors line-clamp-2 uppercase tracking-tight">
                      {post.titulo}
                    </h3>
                    <p className="text-gray/70 leading-relaxed mb-8 line-clamp-3 font-light text-lg">
                      {post.resumo}
                    </p>
                    <div className="flex items-center gap-3 text-dark font-black uppercase tracking-widest text-xs group-hover:gap-5 transition-all">
                       LER MATÉRIA COMPLETA <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* PARTNERS - Premium Stripe */}
      <section className="py-32 bg-bg overflow-hidden">
        <div className="max-container text-center mb-20">
          <Reveal direction="up">
             <span className="text-primary font-black uppercase tracking-[0.4em] mb-4 block text-xs">REDE DE APOIO</span>
             <h2 className="text-3xl font-black text-dark uppercase tracking-tight">EMPRESAS QUE ACREDITAM NO IPAG</h2>
          </Reveal>
        </div>

        <div className="relative">
          <div className="flex animate-scroll whitespace-nowrap">
            {[...PARTNERS, ...PARTNERS].map((partner, index) => (
              <div key={index} className="mx-12 flex items-center grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <span className="text-2xl font-black text-dark/40 uppercase tracking-widest">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
