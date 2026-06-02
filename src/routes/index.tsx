import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Sparkles, Music, GraduationCap, HeartHandshake, Brain, Scissors, LifeBuoy, Users, BarChart, Globe, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/site/Counter";
import { Reveal } from "@/components/site/Reveal";
import { FrentesAcao } from "@/components/site/FrentesAcao";
import { IMPACT_STATS, PARTNERS, SITE, PROJECTS, POSTS, EVENTS } from "@/data/site";
import { supabase } from "@/integrations/supabase/client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export const Route = createFileRoute("/")({
  loader: async () => {
    try {
      const [projetosRes, postsRes, eventosRes] = await Promise.all([
        supabase
          .from("projetos")
          .select("*")
          .eq("status", "publicado")
          .order("ordem", { ascending: true })
          .order("created_at", { ascending: false }),
        supabase
          .from("posts")
          .select("*")
          .eq("status", "publicado")
          .order("data_publicacao", { ascending: false }),
        supabase
          .from("eventos")
          .select("*")
          .order("data_evento", { ascending: true })
      ]);
      
      if (projetosRes.error) throw projetosRes.error;
      if (postsRes.error) throw postsRes.error;
      if (eventosRes.error) throw eventosRes.error;

      const projetos = projetosRes.data;
      const posts = postsRes.data;
      const eventos = eventosRes.data;
      
      const finalProjetos = (projetos && projetos.length > 0) 
        ? projetos 
        : PROJECTS.map(p => ({
            titulo: p.title,
            resumo: p.short,
            categoria: "FORMAÇÃO",
            slug: p.slug,
            imagem_destaque: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop"
          }));

      const finalPosts = (posts && posts.length > 0) 
        ? posts 
        : POSTS.map(p => ({
            titulo: p.title,
            resumo: p.excerpt,
            categoria: p.category,
            slug: p.slug,
            data_publicacao: new Date().toISOString()
          }));

      const finalEventos = (eventos && eventos.length > 0)
        ? eventos
        : EVENTS.map((e, idx) => ({
            id: String(idx),
            titulo: e.title,
            descricao: e.description,
            data_evento: new Date().toISOString(),
            local: e.place,
            slug: e.slug
          }));

      return { 
        projetos: finalProjetos.slice(0, 10), 
        posts: finalPosts.slice(0, 3),
        eventos: finalEventos.slice(0, 3)
      };
    } catch (e) {
      console.error("Loader error:", e);
      return { 
        projetos: PROJECTS.map(p => ({
          titulo: p.title,
          resumo: p.short,
          categoria: "FORMAÇÃO",
          slug: p.slug,
          imagem_destaque: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop"
        })).slice(0, 10), 
        posts: POSTS.map(p => ({
          titulo: p.title,
          resumo: p.excerpt,
          categoria: p.category,
          slug: p.slug,
          data_publicacao: new Date().toISOString()
        })).slice(0, 3), 
        eventos: EVENTS.map((e, idx) => ({
          id: String(idx),
          titulo: e.title,
          descricao: e.description,
          data_evento: new Date().toISOString(),
          local: e.place,
          slug: e.slug
        })).slice(0, 3) 
      };
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
  'SOLIDARIEDADE': Heart,
  'Saúde': Brain,
  'SAÚDE': Brain,
  'Capacitação': Scissors,
  'CAPACITAÇÃO': Scissors,
  'Vida': LifeBuoy,
  'DESENVOLVIMENTO HUMANO': Heart,
  'FORMAÇÃO': GraduationCap,
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
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
        >
          <source src="https://imgur.com/4FYIlqO.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Animated Overlay - keeping it subtle to show the video */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-dark pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/40 to-dark"></div>
      </motion.div>

      <div className="max-container relative z-10 pt-20">
        <div className="max-w-5xl">
          <Reveal direction="down">
            <div className="inline-flex items-center gap-4 mb-10">
              <span className="text-primary font-black uppercase tracking-[0.4em] text-sm md:text-base">
                IPAG | INSTITUTO PASTOR ANTONIO GOMES
              </span>
            </div>
          </Reveal>
          
          <Reveal delay={0.2} direction="up">
            <h1 className="gf-heading-xl text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-10 leading-[0.85]">
              TODA TRANSFORMAÇÃO <br />
              COMEÇA QUANDO ALGUÉM <span className="text-primary relative inline-block">
                ACREDITA
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute -bottom-2 left-0 h-2 bg-primary/20"
                />
              </span> EM UMA VIDA.
            </h1>
          </Reveal>

          <Reveal delay={0.4} direction="up">
            <p className="text-[18px] md:text-[24px] lg:text-[25px] text-white/90 mb-16 max-w-4xl font-light leading-tight tracking-tight">
              O IPAG nasceu do propósito de servir pessoas, criar oportunidades e fortalecer comunidades através da educação, da cultura e do desenvolvimento social.
            </p>
          </Reveal>

          <Reveal delay={0.6} direction="up">
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-8 items-center">
              <Button asChild className="gf-button gf-button-primary h-auto group px-12 py-7 w-full sm:w-auto">
                <Link to="/quem-somos" className="flex items-center gap-4 text-base tracking-widest uppercase">
                  Conheça nossa história <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="gf-button bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white h-auto px-12 py-7 transition-all duration-300 w-full sm:w-auto">
                <Link to="/projetos" className="text-base tracking-widest uppercase">Apoie esta missão</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>

      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 hidden md:block"
      >
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 rotate-180 [writing-mode:vertical-lr]">SCROLL</span>
          <div className="w-[1px] h-24 bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>
        </div>
      </motion.div>
    </>
  );
}

function Home() {
  const heroRef = useRef(null);
  const { projetos = [], posts = [], eventos = [] } = Route.useLoaderData() as { projetos: any[], posts: any[], eventos: any[] };
  
  const validProjetos = (projetos || []).filter((p: any) => p && p.slug && p.titulo);
  const validPosts = (posts || []).filter((p: any) => p && p.slug && p.titulo);
  const validEventos = (eventos || []).filter((e: any) => e && e.slug && e.titulo);

  return (
    <div className="bg-white">
      {/* HERO - Cinematic Premium Layout */}
      <section ref={heroRef} className="relative h-[800px] flex items-center bg-dark py-16 sm:py-24 lg:py-32 -mt-[142px] md:-mt-[122px]">
        <HomeHero heroRef={heroRef} />
      </section>

      {/* IMPACTO - Premium Institutional Style with Bazar-like structure */}
      <section id="impacto" className="relative py-24 bg-white">
        <div className="max-container">
          <Reveal direction="fade">
            <div className="relative overflow-hidden rounded-[40px] md:rounded-[80px] bg-dark min-h-[500px] md:min-h-[700px] flex items-center p-8 md:p-32 shadow-2xl group">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[#0F1115]" />
                <motion.img 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop" 
                  alt="Nossa Pegada" 
                  className="w-full h-full object-cover opacity-60 md:opacity-30 relative z-[1]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0F1115] via-[#0F1115]/95 md:via-[#0F1115]/80 to-transparent z-[2]"></div>
              </div>

              <div className="relative z-10 w-full max-w-4xl">
                <div className="inline-flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
                   <div className="h-10 w-10 md:h-14 md:w-14 rounded-full bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20">
                      <BarChart className="w-5 h-5 md:w-7 md:h-7" />
                   </div>
                   <span className="text-primary font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-xs">NOSSA PEGADA</span>
                </div>
                
                <h2 className="text-4xl md:text-7xl lg:text-8xl font-black text-white mb-6 md:mb-12 uppercase leading-[0.95] md:leading-[0.9] tracking-tighter text-left">
                  RESULTADOS QUE <br /><span className="text-primary italic">MUDAM VIDAS</span>
                </h2>
                <p className="text-lg md:text-3xl text-white/50 mb-10 md:mb-16 leading-relaxed font-light max-w-3xl tracking-tight text-left">
                  Monitoramos cada ação para garantir que o impacto chegue onde é mais necessário, transformando doações em desenvolvimento humano real.
                </p>
                
                {/* Stats Grid for Mobile/Desktop */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
                  {IMPACT_STATS.slice(0, 3).map((stat, idx) => (
                    <div key={idx} className="flex flex-col">
                      <div className="flex items-baseline gap-1">
                        <Counter to={stat.value} className="text-3xl md:text-5xl font-black text-white" />
                        <span className="text-primary font-black text-xl md:text-2xl">{stat.suffix}</span>
                      </div>
                      <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white/40 mt-2">{stat.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap gap-6 md:gap-8 justify-start">
                  <Button asChild className="gf-button gf-button-primary h-auto group px-8 md:px-12 py-5 md:py-7 w-full sm:w-auto">
                    <Link to="/transparencia" className="flex items-center justify-center gap-4 text-sm md:text-base tracking-widest uppercase">
                      Relatório de Transparência <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FRENTES DE AÇÃO - New Carousel Layout */}
      <FrentesAcao projetos={validProjetos as any} />

      {/* QUEM SOMOS - Premium Editorial Storytelling */}
      <section className="py-56 bg-white overflow-hidden">
        <div className="max-container">
          <div className="flex flex-col lg:grid lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-32 items-center px-4 sm:px-8">
            <Reveal direction="left" className="relative group">
              <div className="relative rounded-[40px] lg:rounded-[80px] overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-auto lg:h-[900px] w-full">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.5 }}
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop" 
                  alt="Nossa Essência" 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
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
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>
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
            <div className="relative overflow-hidden rounded-[40px] md:rounded-[80px] bg-dark min-h-[450px] md:min-h-[700px] flex items-center p-6 md:p-32 shadow-2xl group">
              <div className="absolute inset-0 z-0">
                <motion.img 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  src="https://i.ibb.co/KpnYrxHV/image.png" 
                  alt="Bazar Solidário" 
                  className="w-full h-full object-cover opacity-40 md:opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/95 md:via-dark/80 to-transparent"></div>
              </div>

              <div className="relative z-10 max-w-4xl">
                <div className="inline-flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
                   <div className="h-10 w-10 md:h-14 md:w-14 rounded-full bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20">
                      <Heart className="w-5 h-5 md:w-7 md:h-7 fill-white" />
                   </div>
                   <span className="text-primary font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-xs">Apoio Direto & Sustentabilidade</span>
                </div>
                
                <h2 className="text-4xl md:text-7xl lg:text-8xl font-black text-white mb-6 md:mb-12 uppercase leading-[0.95] md:leading-[0.9] tracking-tighter text-center sm:text-left">
                  TRANSFORME <br />O DESAPEGO EM <br /><span className="text-primary">ESPERANÇA</span>
                </h2>
                <p className="text-base md:text-3xl text-white/50 mb-8 md:mb-16 leading-relaxed font-light max-w-3xl tracking-tight text-center sm:text-left">
                  Sua doação financia diretamente nossos projetos e gera dignidade para centenas de famílias.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-6 md:gap-8 justify-center sm:justify-start">
                  <Button asChild className="gf-button gf-button-primary h-auto group px-8 md:px-12 py-5 md:py-7 w-full sm:w-auto">
                    <Link to="/bazar" className="flex items-center justify-center gap-4 text-xs md:text-base tracking-widest uppercase">
                      Saiba como doar <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-2" />
                    </Link>
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
          
          <div className="grid gap-20 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {validPosts.map((post: any, i: number) => (
              <Reveal key={post.slug} delay={i * 0.15} direction="up">
                <Link to="/blog/$slug" params={{ slug: post.slug }} className="group block h-full">
                  <div className="aspect-video w-full overflow-hidden rounded-[40px] mb-12 relative shadow-2xl">
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

      {/* EVENTOS - Premium Preview */}
      {validEventos.length > 0 && (
        <section className="py-56 bg-gradient-to-br from-primary via-primary/90 to-primary/80 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="max-container relative z-10">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-16 mb-32 pb-16 border-b border-white/20">
                <div className="max-w-4xl">
                  <span className="text-white/80 font-black uppercase tracking-[0.5em] mb-8 block text-xs">CALENDÁRIO</span>
                  <h2 className="gf-heading-lg uppercase tracking-tighter leading-none text-[#292c32]">EVENTOS</h2>
                </div>
                <Button asChild variant="outline" className="gf-button border-2 border-white text-white hover:bg-white hover:text-primary h-auto px-14 py-7 transition-all bg-transparent">
                  <Link to="/eventos" className="text-base tracking-widest">VER TUDO</Link>
                </Button>
              </div>
            </Reveal>

            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {validEventos.map((e: any, i: number) => (
                <Reveal key={e.id} delay={i * 0.1} direction="up">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] shadow-card-utility group cursor-pointer border border-white/10">
                    <img 
                      src={e.imagem_destaque || e.imagem_capa || `https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop&sig=${i}`} 
                      alt={e.titulo} 
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent"></div>
                    
                    <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-end">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white bg-primary px-4 py-1.5 rounded-full shadow-lg">
                          {new Date(e.data_evento).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-black mb-4 uppercase tracking-tight text-white leading-tight group-hover:text-primary transition-colors">
                        {e.titulo}
                      </h3>
                      
                      <p className="text-white/70 text-base leading-relaxed line-clamp-2 mb-6 font-light">
                        {e.descricao}
                      </p>
                      
                      <div className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-widest pt-6 border-t border-white/10">
                        <MapPin className="h-4 w-4 text-primary" />
                        {e.local}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

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
