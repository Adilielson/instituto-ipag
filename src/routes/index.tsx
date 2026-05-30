import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Sparkles, Music, GraduationCap, HeartHandshake, Brain, Scissors, LifeBuoy, Users, BarChart, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/site/Counter";
import { Reveal } from "@/components/site/Reveal";
import { FrentesAcao } from "@/components/site/FrentesAcao";
import { IMPACT_STATS, PARTNERS, SITE } from "@/data/site";
import { getProjetos, getPosts } from "@/lib/api/cms";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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
  'EDUCAÇÃO': GraduationCap,
  'Social': HeartHandshake,
  'DESENVOLVIMENTO SOCIAL': HeartHandshake,
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

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 300]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.8], [1, 0]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1.1, 1.3]), springConfig);

  return (
    <>
      <motion.div 
        style={isClient ? { y: y1, opacity, scale } : { y: 0, opacity: 1, scale: 1.1 }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <motion.img 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 0.4 }}
          transition={{ duration: 3, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" 
          alt="IPAG Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/40 to-dark" />
      </motion.div>

      <div className="max-container relative z-10 pt-20">
        <div className="max-w-5xl">
          <Reveal direction="down">
            <div className="inline-flex items-center gap-4 mb-10">
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="h-[2px] bg-primary" 
              />
              <span className="text-primary font-black uppercase tracking-[0.4em] text-sm md:text-base">
                IPAG — INSTITUTO PASTOR ANTONIO GOMES
              </span>
            </div>
          </Reveal>
          
          <Reveal delay={0.2} direction="up">
            <h1 className="gf-heading-xl text-white mb-10 leading-[0.85]">
              TRANSFORMANDO <br />
              REALIDADES EM <span className="text-primary relative inline-block">
                REDE
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute -bottom-2 left-0 h-2 bg-primary/20"
                />
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.4} direction="up">
            <p className="text-2xl md:text-4xl text-white/90 mb-16 max-w-3xl font-light leading-tight tracking-tight">
              Quase duas décadas promovendo educação, cultura e dignidade humana em São Mateus – ES.
            </p>
          </Reveal>

          <Reveal delay={0.6} direction="up">
            <div className="flex flex-wrap gap-8 items-center">
              <Button asChild className="gf-button gf-button-primary h-auto group px-12 py-7">
                <Link to="/projetos" className="flex items-center gap-4 text-base tracking-widest">
                  CONHEÇA NOSSAS FRENTES <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="gf-button border-2 border-white/20 text-white hover:bg-white/10 h-auto px-12 py-7">
                <Link to="/quem-somos" className="text-base tracking-widest">NOSSA HISTÓRIA</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>

      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 hidden md:block"
      >
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 rotate-180 [writing-mode:vertical-lr]">SCROLL</span>
          <div className="w-[1px] h-24 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
        </div>
      </motion.div>
    </>
  );
}

function Home() {
  const heroRef = useRef(null);
  const loaderData = Route.useLoaderData() || { projetos: [], posts: [] };


  return (
    <div className="bg-white">
      {/* HERO - Cinematic Premium Layout */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-dark">
        <HomeHero heroRef={heroRef} />
      </section>

      {/* IMPACTO - Premium Institutional Style */}
      <section className="py-48 bg-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/4 h-full bg-primary/3 skew-x-12 -translate-x-1/2 blur-3xl" />
        
        <div className="max-container relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-32 items-start">
            <Reveal direction="left">
              <span className="text-primary font-black uppercase tracking-[0.4em] mb-10 block text-xs">NOSSA PEGADA</span>
              <h2 className="gf-heading-lg text-white mb-10 leading-[0.9] uppercase">
                RESULTADOS QUE <br />
                <span className="text-primary italic">MUDAM VIDAS</span>
              </h2>
              <p className="text-2xl text-white/50 max-w-lg font-light leading-relaxed mb-12">
                Monitoramos cada ação para garantir que o impacto chegue onde é mais necessário, transformando doações em desenvolvimento humano real.
              </p>
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="h-16 w-16 rounded-full border border-white/10 flex items-center justify-center transition-all group-hover:bg-primary group-hover:border-primary">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
                <span className="text-white font-black uppercase tracking-[0.3em] text-xs">Relatório de Transparência</span>
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-x-20 gap-y-24">
              {IMPACT_STATS.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.1} direction="up">
                  <div className="relative group">
                    <div className="absolute -top-10 -left-10 text-[10rem] font-black text-white/[0.02] pointer-events-none transition-all group-hover:text-primary/[0.05] select-none">
                      0{i + 1}
                    </div>
                    <p className="text-7xl md:text-9xl font-black text-primary mb-6 tracking-tighter leading-none">
                      <Counter to={s.value} suffix={s.suffix} />
                    </p>
                    <p className="text-sm font-black uppercase tracking-[0.4em] text-white/40 border-l-2 border-primary/30 pl-6">
                      {s.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FRENTES DE AÇÃO - New Carousel Layout */}
      <FrentesAcao projetos={loaderData.projetos || []} />

      {/* QUEM SOMOS - Premium Editorial Storytelling */}
      <section className="py-56 bg-white overflow-hidden">
        <div className="max-container">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-32 items-center">
            <Reveal direction="left" className="relative group">
              <div className="relative rounded-[80px] overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-auto lg:h-[900px]">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.5 }}
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop" 
                  alt="Nossa Essência" 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="absolute -bottom-16 -right-16 bg-primary p-16 rounded-[60px] shadow-2xl hidden md:block max-w-sm text-white border-8 border-white"
              >
                <Users className="w-16 h-16 mb-8 text-white/50" />
                <p className="text-6xl font-black mb-4 leading-none tracking-tighter">19 ANOS</p>
                <p className="text-sm font-black uppercase tracking-[0.4em] opacity-80 leading-relaxed">LEGADO DE TRANSFORMAÇÃO SOCIAL EM SÃO MATEUS</p>
              </motion.div>
            </Reveal>

            <Reveal delay={0.2} direction="right">
              <span className="text-primary font-black uppercase tracking-[0.5em] mb-10 block text-xs">NOSSA JORNADA</span>
              <h2 className="gf-heading-lg mb-12 text-dark uppercase tracking-tighter leading-[0.9]">
                EXCELÊNCIA EM <br /><span className="text-primary">SERVIR</span> A PESSOAS
              </h2>
              <div className="space-y-10 text-2xl text-gray/70 leading-relaxed font-light">
                <p>
                  O IPAG nasceu em 2006 do desejo do Pastor Antonio Gomes de promover desenvolvimento, inclusão e dignidade humana em São Mateus. 
                </p>
                <div className="relative pl-12 py-4">
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary via-primary/50 to-transparent" />
                  <p className="font-bold text-dark italic text-3xl tracking-tight leading-tight">
                    "Nossa missão não é apenas assistir, mas restaurar o protagonismo humano."
                  </p>
                </div>
                <p>
                  Hoje, somos um hub de impacto social, unindo transparência administrativa a um cuidado humanizado e profundo.
                </p>
              </div>
              <Button asChild className="gf-button gf-button-primary mt-20 h-auto px-12 py-7">
                <Link to="/quem-somos" className="text-base tracking-widest">CONHEÇA NOSSA ESSÊNCIA</Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BAZAR - High-End Impact Banner */}
      <section className="py-24 bg-bg">
        <div className="max-container">
          <Reveal direction="fade">
            <div className="relative overflow-hidden rounded-[80px] bg-dark min-h-[700px] flex items-center p-16 md:p-32 shadow-2xl group">
              <div className="absolute inset-0 z-0">
                <motion.img 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  src="https://images.unsplash.com/photo-1459183885447-df53d17ee2ab?q=80&w=2070&auto=format&fit=crop" 
                  alt="Bazar Solidário" 
                  className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-transparent" />
              </div>

              <div className="relative z-10 max-w-4xl">
                <div className="inline-flex items-center gap-6 mb-12">
                   <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20">
                      <Heart className="w-7 h-7 fill-white" />
                   </div>
                   <span className="text-primary font-black uppercase tracking-[0.5em] text-xs">Apoio Direto & Sustentabilidade</span>
                </div>
                
                <h2 className="gf-heading-lg text-white mb-12 uppercase leading-[0.9] tracking-tighter">
                  TRANSFORME <br />O DESAPEGO EM <br /><span className="text-primary">ESPERANÇA</span>
                </h2>
                <p className="text-3xl text-white/50 mb-16 leading-relaxed font-light max-w-3xl tracking-tight">
                  Sua doação financia diretamente nossos projetos e gera dignidade para centenas de famílias. O Bazar IPAG é o coração pulsante da nossa autonomia financeira.
                </p>
                <div className="flex flex-wrap gap-8">
                  <Button asChild className="gf-button gf-button-primary h-auto px-14 py-8">
                    <Link to="/bazar" className="text-base tracking-widest">QUERO SER UM DOADOR</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BLOG - Editorial Magazine Style */}
      <section className="py-56 bg-white">
        <div className="max-container">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-16 mb-32 pb-16 border-b border-black/5">
              <div className="max-w-4xl">
                <span className="text-primary font-black uppercase tracking-[0.5em] mb-8 block text-xs">IPAG EM FOCO</span>
                <h2 className="gf-heading-lg uppercase text-dark tracking-tighter leading-none">EDITORIAL <br />INSTITUCIONAL</h2>
              </div>
              <Button asChild variant="outline" className="gf-button border-2 border-dark text-dark hover:bg-dark hover:text-white h-auto px-14 py-7 transition-all">
                <Link to="/blog" className="text-base tracking-widest">ARQUIVO COMPLETO</Link>
              </Button>
            </div>
          </Reveal>
          
          <div className="grid gap-20 md:grid-cols-2 lg:grid-cols-3">
            {loaderData.posts?.map((post: any, i: number) => (
              <Reveal key={post.slug} delay={i * 0.15} direction="up">
                <Link to="/blog/$slug" params={{ slug: post.slug }} className="group block h-full">
                  <div className="aspect-[16/10] overflow-hidden rounded-[40px] mb-12 relative shadow-2xl">
                    <img 
                      src={post.imagem_destaque || "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2006&auto=format&fit=crop"} 
                      alt={post.titulo} 
                      className="w-full h-full object-cover transition-all duration-[1.5s] group-hover:scale-110"
                    />
                    <div className="absolute top-8 left-8">
                      <span className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-dark shadow-2xl">
                        {post.categoria}
                      </span>
                    </div>
                  </div>

                  <div className="px-4">
                    <div className="flex items-center gap-6 mb-8 text-gray font-black text-[10px] uppercase tracking-[0.4em]">
                       <span>{new Date(post.data_publicacao).toLocaleDateString('pt-BR')}</span>
                       <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                       <span>EDITORIAL IPAG</span>
                    </div>
                    <h3 className="text-3xl font-black mb-8 leading-tight text-dark group-hover:text-primary transition-colors line-clamp-2 uppercase tracking-tight">
                      {post.titulo}
                    </h3>
                    <p className="text-gray text-xl leading-relaxed mb-10 line-clamp-3 font-light tracking-tight opacity-70">
                      {post.resumo}
                    </p>
                    <div className="flex items-center gap-4 text-dark font-black uppercase tracking-[0.3em] text-[10px] group-hover:gap-8 transition-all duration-500">
                       LER MATÉRIA COMPLETA <ArrowRight className="w-5 h-5 text-primary transition-transform group-hover:translate-x-2" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS - Premium Stripe Marquee */}
      <section className="py-48 bg-white overflow-hidden border-t border-black/5">
        <div className="max-container text-center mb-24">
          <Reveal direction="up">
             <span className="text-primary font-black uppercase tracking-[0.6em] mb-6 block text-[10px]">REDE DE APOIO</span>
             <h2 className="text-4xl font-black text-dark uppercase tracking-tight">CORPORAÇÕES QUE IMPULSIONAM O IMPACTO</h2>
          </Reveal>
        </div>

        <div className="relative py-12 border-y border-black/5">
          <div className="flex animate-scroll whitespace-nowrap gap-32">
            {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, index) => (
              <div key={index} className="flex items-center grayscale opacity-20 hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-pointer">
                <span className="text-4xl md:text-5xl font-black text-dark uppercase tracking-[0.2em]">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
