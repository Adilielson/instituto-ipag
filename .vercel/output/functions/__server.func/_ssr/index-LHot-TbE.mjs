import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { c as Route$a, I as IMPACT_STATS, B as Button, P as PARTNERS } from "./router-Da_DI_yI.mjs";
import { R as Reveal } from "./Reveal-0Ia2h3g0.mjs";
import { a as ArrowRight, W as Users, k as Heart, C as Calendar, p as MapPin, A as ArrowLeft } from "../_libs/lucide-react.mjs";
import { m as motion, a as useScroll, b as useSpring, c as useTransform, u as useInView } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function Counter({ to, suffix = "" }) {
  const [isClient, setIsClient] = reactExports.useState(false);
  const ref = reactExports.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = reactExports.useState(0);
  reactExports.useEffect(() => {
    setIsClient(true);
  }, []);
  reactExports.useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.span, { ref, className: "tabular-nums", children: [
    isClient ? n.toLocaleString("pt-BR") : to.toLocaleString("pt-BR"),
    suffix
  ] });
}
function FrentesAcao({ projetos }) {
  const scrollRef = reactExports.useRef(null);
  const [canScrollLeft, setCanScrollLeft] = reactExports.useState(true);
  const [canScrollRight, setCanScrollRight] = reactExports.useState(true);
  const loopedProjetos = projetos.length > 0 ? [...projetos, ...projetos, ...projetos] : [];
  reactExports.useEffect(() => {
    if (scrollRef.current && projetos.length > 0) {
      const cardWidth = window.innerWidth < 768 ? window.innerWidth * 0.85 + 32 : 400 + 32;
      scrollRef.current.scrollLeft = cardWidth * projetos.length;
    }
  }, [projetos]);
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const cardWidth = window.innerWidth < 768 ? window.innerWidth * 0.85 + 32 : 400 + 32;
      const scrollTo = direction === "left" ? scrollLeft - cardWidth : scrollLeft + cardWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };
  const handleScroll = () => {
    if (scrollRef.current && projetos.length > 0) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const cardWidth = window.innerWidth < 768 ? window.innerWidth * 0.85 + 32 : 400 + 32;
      const setWidth = cardWidth * projetos.length;
      if (scrollLeft <= 0) {
        scrollRef.current.scrollLeft = setWidth;
      } else if (scrollLeft >= scrollWidth - clientWidth) {
        scrollRef.current.scrollLeft = scrollWidth - clientWidth - setWidth;
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-32 bg-bg overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-container", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4 text-white fill-white" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-[10px] font-black uppercase tracking-widest", children: "AJUDE E DOE" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "gf-heading-lg text-dark max-w-4xl uppercase leading-none tracking-tighter", children: [
        "ONDE NOSSA REDE ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary italic", children: "GERA VALOR" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group/carousel overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-4 top-1/2 -translate-y-1/2 z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => scroll("left"),
          className: "w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/90 backdrop-blur-sm border border-black/5 text-primary shadow-xl flex items-center justify-center transition-all hover:bg-primary hover:text-white active:scale-95",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-6 h-6 md:w-8 md:h-8" })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-4 top-1/2 -translate-y-1/2 z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => scroll("right"),
          className: "w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/90 backdrop-blur-sm border border-black/5 text-primary shadow-xl flex items-center justify-center transition-all hover:bg-primary hover:text-white active:scale-95",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-6 h-6 md:w-8 md:h-8" })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg via-bg/20 to-transparent z-10 pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg via-bg/20 to-transparent z-10 pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          ref: scrollRef,
          onScroll: handleScroll,
          className: "flex gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12 pt-2 px-6 md:px-8",
          style: { scrollbarWidth: "none", msOverflowStyle: "none", scrollSnapType: "x mandatory" },
          children: loopedProjetos.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "snap-center md:snap-start shrink-0 w-[85vw] md:w-[400px]",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-[40px] overflow-hidden shadow-warm-utility h-full flex flex-col border border-black/5 transition-transform duration-500 hover:scale-[1.02]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-64 overflow-hidden bg-gray/10", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: p.imagem_destaque && p.imagem_destaque.startsWith("http") ? p.imagem_destaque : "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop",
                      alt: p.titulo,
                      className: "w-full h-full object-cover",
                      onError: (e) => {
                        const target = e.target;
                        target.src = "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop";
                        target.onerror = null;
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-6 left-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-primary text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg", children: p.categoria }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-10 flex flex-col flex-grow", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-black text-dark mb-4 uppercase tracking-tight", children: p.titulo }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray/70 mb-8 md:mb-10 line-clamp-3 font-light text-base md:text-lg leading-relaxed", children: p.resumo }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex flex-wrap gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "gf-button-primary rounded-full px-8 py-4 h-auto text-xs font-black tracking-widest group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/projetos/$slug", params: { slug: p.slug }, children: [
                      "APOIAR AGORA ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "border-primary text-primary hover:bg-primary/5 rounded-full px-8 py-4 h-auto text-xs font-black tracking-widest", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/projetos/$slug", params: { slug: p.slug }, children: "CONHECER MAIS" }) })
                  ] })
                ] })
              ] })
            },
            `${p.slug}-${i}`
          ))
        }
      )
    ] }) })
  ] }) });
}
function HomeHero({
  heroRef
}) {
  const [isClient, setIsClient] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setIsClient(true);
  }, []);
  const {
    scrollYProgress
  } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const springConfig = {
    stiffness: 100,
    damping: 30,
    restDelta: 1e-3
  };
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 300]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.8], [1, 0]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1.1, 1.3]), springConfig);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { style: isClient ? {
      y: y1,
      opacity,
      scale
    } : {
      y: 0,
      opacity: 1,
      scale: 1.1
    }, className: "absolute inset-0 z-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.img, { initial: {
        scale: 1.2,
        opacity: 0
      }, animate: {
        scale: 1.1,
        opacity: 0.4
      }, transition: {
        duration: 3,
        ease: "easeOut"
      }, src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop", alt: "IPAG Background", className: "w-full h-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/40 to-dark" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-container relative z-10 pt-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { direction: "down", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center gap-4 mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-black uppercase tracking-[0.4em] text-sm md:text-base", children: "IPAG | INSTITUTO PASTOR ANTONIO GOMES" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.2, direction: "up", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "gf-heading-xl text-white mb-10 leading-[0.85]", children: [
        "TRANSFORMANDO ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "REALIDADES EM ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary relative inline-block", children: [
          "REDE",
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { initial: {
            width: 0
          }, animate: {
            width: "100%"
          }, transition: {
            delay: 1,
            duration: 0.8
          }, className: "absolute -bottom-2 left-0 h-2 bg-primary/20" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.4, direction: "up", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[18px] md:text-[24px] lg:text-[25px] text-white/90 mb-16 max-w-3xl font-light leading-tight tracking-tight", children: "Quase duas décadas promovendo educação, cultura e dignidade humana em São Mateus – ES." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.6, direction: "up", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-8 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "gf-button gf-button-primary h-auto group px-12 py-7", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/projetos", className: "flex items-center gap-4 text-base tracking-widest", children: [
          "CONHEÇA NOSSAS FRENTES ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-6 h-6 transition-transform group-hover:translate-x-2" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "gf-button bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white h-auto px-12 py-7 transition-all duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/quem-somos", className: "text-base tracking-widest uppercase", children: "NOSSA HISTÓRIA" }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
      y: [0, 15, 0]
    }, transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut"
    }, className: "absolute bottom-12 left-1/2 -translate-x-1/2 z-10 hidden md:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase tracking-[0.5em] text-white/30 rotate-180 [writing-mode:vertical-lr]", children: "SCROLL" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[1px] h-24 bg-gradient-to-b from-primary via-primary/50 to-transparent" })
    ] }) })
  ] });
}
function Home() {
  const heroRef = reactExports.useRef(null);
  const {
    projetos = [],
    posts = [],
    eventos = []
  } = Route$a.useLoaderData() || {};
  const validProjetos = (projetos || []).filter((p) => p && p.slug && p.titulo);
  const validPosts = (posts || []).filter((p) => p && p.slug && p.titulo);
  const validEventos = (eventos || []).filter((e) => e && e.slug && e.titulo);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref: heroRef, className: "relative min-h-screen flex items-center overflow-hidden bg-dark", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HomeHero, { heroRef }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-48 bg-dark relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-1/4 h-full bg-primary/3 skew-x-12 -translate-x-1/2 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-container relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[1fr_1.5fr] gap-32 items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { direction: "left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-black uppercase tracking-[0.4em] mb-10 block text-xs", children: "NOSSA PEGADA" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "gf-heading-lg text-white mb-10 leading-[0.9] uppercase", children: [
            "RESULTADOS QUE ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary italic", children: "MUDAM VIDAS" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl text-white/50 max-w-lg font-light leading-relaxed mb-12", children: "Monitoramos cada ação para garantir que o impacto chegue onde é mais necessário, transformando doações em desenvolvimento humano real." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 group cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-full border border-white/10 flex items-center justify-center transition-all group-hover:bg-primary group-hover:border-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-6 h-6 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-black uppercase tracking-[0.3em] text-xs", children: "Relatório de Transparência" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-x-20 gap-y-24", children: IMPACT_STATS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 0.1, direction: "up", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -top-10 -left-10 text-[10rem] font-black text-white/[0.02] pointer-events-none transition-all group-hover:text-primary/[0.05] select-none", children: [
            "0",
            i + 1
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-7xl md:text-9xl font-black text-primary mb-6 tracking-tighter leading-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Counter, { to: s.value, suffix: s.suffix }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-black uppercase tracking-[0.4em] text-white/40 border-l-2 border-primary/30 pl-6", children: s.label })
        ] }) }, s.label)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FrentesAcao, { projetos: validProjetos }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-56 bg-white overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[1.2fr_1fr] gap-32 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { direction: "left", className: "relative group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-[80px] overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-auto lg:h-[900px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.img, { whileHover: {
            scale: 1.05
          }, transition: {
            duration: 1.5
          }, src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop", alt: "Nossa Essência", className: "w-full h-full object-cover transition-all duration-1000 group-hover:opacity-90" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          x: 50,
          opacity: 0
        }, whileInView: {
          x: 0,
          opacity: 1
        }, viewport: {
          once: true
        }, className: "absolute -bottom-16 -right-16 bg-primary p-16 rounded-[60px] shadow-2xl hidden md:block max-w-sm text-white border-8 border-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-16 h-16 mb-8 text-white/50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-6xl font-black mb-4 leading-none tracking-tighter", children: "19 ANOS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-black uppercase tracking-[0.4em] opacity-80 leading-relaxed", children: "LEGADO DE TRANSFORMAÇÃO SOCIAL EM SÃO MATEUS" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { delay: 0.2, direction: "right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-black uppercase tracking-[0.5em] mb-10 block text-xs", children: "NOSSA JORNADA" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "gf-heading-lg mb-12 text-dark uppercase tracking-tighter leading-[0.9]", children: [
          "EXCELÊNCIA EM ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "SERVIR" }),
          " A PESSOAS"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-10 text-2xl text-gray/70 leading-relaxed font-light", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "O IPAG nasceu em 2006 do desejo do Pastor Antonio Gomes de promover desenvolvimento, inclusão e dignidade humana em São Mateus." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pl-12 py-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary via-primary/50 to-transparent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-dark italic text-3xl tracking-tight leading-tight", children: '"Nossa missão não é apenas assistir, mas restaurar o protagonismo humano."' })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Hoje, somos um hub de impacto social, unindo transparência administrativa a um cuidado humanizado e profundo." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "gf-button gf-button-primary mt-20 h-auto px-12 py-7", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/quem-somos", className: "text-base tracking-widest", children: "CONHEÇA NOSSA ESSÊNCIA" }) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 bg-bg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { direction: "fade", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-[40px] md:rounded-[80px] bg-dark min-h-[450px] md:min-h-[700px] flex items-center p-6 md:p-32 shadow-2xl group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.img, { animate: {
          scale: [1, 1.05, 1]
        }, transition: {
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }, src: "https://i.ibb.co/67Zz2x7p/image.png", alt: "Bazar Solidário", className: "w-full h-full object-cover opacity-40 md:opacity-40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-dark via-dark/95 md:via-dark/80 to-transparent" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-4xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-4 md:gap-6 mb-8 md:mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 md:h-14 md:w-14 rounded-full bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-5 h-5 md:w-7 md:h-7 fill-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-xs", children: "Apoio Direto & Sustentabilidade" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-7xl lg:text-8xl font-black text-white mb-6 md:mb-12 uppercase leading-[0.95] md:leading-[0.9] tracking-tighter", children: [
          "TRANSFORME ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "O DESAPEGO EM ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "ESPERANÇA" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base md:text-3xl text-white/50 mb-8 md:mb-16 leading-relaxed font-light max-w-3xl tracking-tight", children: "Sua doação financia diretamente nossos projetos e gera dignidade para centenas de famílias." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-6 md:gap-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "gf-button gf-button-primary h-auto px-10 md:px-14 py-5 md:py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/bazar", className: "text-sm md:text-base tracking-widest", children: "QUERO SER UM DOADOR" }) }) })
      ] })
    ] }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-56 bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-16 mb-32 pb-16 border-b border-black/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-black uppercase tracking-[0.5em] mb-8 block text-xs", children: "IPAG EM FOCO" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "gf-heading-lg uppercase text-dark tracking-tighter leading-none", children: [
            "EDITORIAL ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "INSTITUCIONAL"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "gf-button border-2 border-dark text-dark hover:bg-dark hover:text-white h-auto px-14 py-7 transition-all", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog", className: "text-base tracking-widest", children: "ARQUIVO COMPLETO" }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-20 md:grid-cols-2 lg:grid-cols-3", children: validPosts.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 0.15, direction: "up", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog/$slug", params: {
        slug: post.slug
      }, className: "group block h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[16/10] overflow-hidden rounded-[40px] mb-12 relative shadow-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: post.imagem_destaque || "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2006&auto=format&fit=crop", alt: post.titulo, className: "w-full h-full object-cover transition-all duration-[1.5s] group-hover:scale-110" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-8 left-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-white/90 backdrop-blur-md px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-dark shadow-2xl", children: post.categoria }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 mb-8 text-gray font-black text-[10px] uppercase tracking-[0.4em]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(post.data_publicacao).toLocaleDateString("pt-BR") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "EDITORIAL IPAG" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-3xl font-black mb-8 leading-tight text-dark group-hover:text-primary transition-colors line-clamp-2 uppercase tracking-tight", children: post.titulo }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray text-xl leading-relaxed mb-10 line-clamp-3 font-light tracking-tight opacity-70", children: post.resumo }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-dark font-black uppercase tracking-[0.3em] text-[10px] group-hover:gap-8 transition-all duration-500", children: [
            "LER MATÉRIA COMPLETA ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5 text-primary transition-transform group-hover:translate-x-2" })
          ] })
        ] })
      ] }) }, post.slug)) })
    ] }) }),
    validEventos.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-56 bg-[#F7F8FA]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-16 mb-32 pb-16 border-b border-black/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-black uppercase tracking-[0.5em] mb-8 block text-xs", children: "CALENDÁRIO" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "gf-heading-lg uppercase text-dark tracking-tighter leading-none", children: [
            "PRÓXIMOS ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "ENCONTROS"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "gf-button border-2 border-primary text-primary hover:bg-primary hover:text-white h-auto px-14 py-7 transition-all", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/eventos", className: "text-base tracking-widest", children: "VER TUDO" }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-8 md:grid-cols-3", children: validEventos.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 0.1, direction: "up", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-10 rounded-[40px] shadow-card-utility border border-black/5 hover:shadow-premium-utility transition-all duration-500 group h-full flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-8 w-8" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 px-4 py-1.5 rounded-full", children: new Date(e.data_evento).toLocaleDateString("pt-BR") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-black mb-4 uppercase tracking-tight text-dark leading-tight", children: e.titulo }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray text-base leading-relaxed line-clamp-2 mb-6 font-light", children: e.descricao })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-bold text-dark/40 uppercase tracking-widest pt-6 border-t border-black/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 text-primary" }),
          e.local
        ] })
      ] }) }, e.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-48 bg-white overflow-hidden border-t border-black/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-container text-center mb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { direction: "up", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-black uppercase tracking-[0.6em] mb-6 block text-[10px]", children: "REDE DE APOIO" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-black text-dark uppercase tracking-tight", children: "CORPORAÇÕES QUE IMPULSIONAM O IMPACTO" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative py-12 border-y border-black/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex animate-scroll whitespace-nowrap gap-32", children: [...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center grayscale opacity-20 hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl md:text-5xl font-black text-dark uppercase tracking-[0.2em]", children: partner }) }, index)) }) })
    ] })
  ] });
}
export {
  Home as component
};
