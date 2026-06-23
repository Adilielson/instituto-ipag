import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";

interface Projeto {
  id?: string;
  titulo: string;
  resumo: string;
  imagem?: string;
  imagem_destaque?: string;
  categoria: string;
  slug: string;
}

interface FrentesAcaoProps {
  projetos: Projeto[];
}

const AUTOPLAY_MS = 5000;
const RESUME_AFTER_MS = 10000;

export function FrentesAcao({ projetos }: FrentesAcaoProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = projetos.length;

  const scrollToIndex = useCallback((i: number) => {
    const el = scrollRef.current;
    if (!el || total === 0) return;
    const child = el.children[i] as HTMLElement | undefined;
    if (!child) return;
    el.scrollTo({ left: child.offsetLeft - el.offsetLeft, behavior: "smooth" });
  }, [total]);

  const goTo = useCallback((i: number) => {
    if (total === 0) return;
    const next = ((i % total) + total) % total;
    setIndex(next);
    scrollToIndex(next);
  }, [total, scrollToIndex]);

  const pauseAndScheduleResume = useCallback(() => {
    setPaused(true);
    if (resumeRef.current) clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(() => setPaused(false), RESUME_AFTER_MS);
  }, []);

  const handlePrev = () => {
    pauseAndScheduleResume();
    goTo(index - 1);
  };
  const handleNext = () => {
    pauseAndScheduleResume();
    goTo(index + 1);
  };

  // Autoplay
  useEffect(() => {
    if (paused || total === 0) return;
    autoplayRef.current = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % total;
        scrollToIndex(next);
        return next;
      });
    }, AUTOPLAY_MS);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [paused, total, scrollToIndex]);

  // Cleanup
  useEffect(() => () => {
    if (resumeRef.current) clearTimeout(resumeRef.current);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  }, []);

  // Track manual scroll/swipe to update index and pause
  const onUserScroll = () => {
    pauseAndScheduleResume();
    const el = scrollRef.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    const scrollLeft = el.scrollLeft;
    let closest = 0;
    let min = Infinity;
    children.forEach((c, i) => {
      const d = Math.abs(c.offsetLeft - el.offsetLeft - scrollLeft);
      if (d < min) { min = d; closest = i; }
    });
    setIndex(closest);
  };

  return (
    <section className="py-20 md:py-32 bg-bg overflow-hidden">
      <div className="max-container">
        <div className="mb-12 md:mb-20">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary mb-6">
              <Heart className="w-4 h-4 text-white fill-white" />
              <span className="text-white text-[10px] font-black uppercase tracking-widest">
                AJUDE E DOE
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="gf-heading-lg text-dark max-w-4xl uppercase leading-none tracking-tighter">
              ONDE NOSSA REDE <br />
              <span className="text-primary italic">GERA VALOR</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-gray/70 font-light leading-relaxed">
              Escolha o projeto que mais toca o seu coração e transforme vidas com a sua doação.
            </p>
          </Reveal>
        </div>

        <div className="relative">
          {/* Prev */}
          <button
            type="button"
            aria-label="Anterior"
            onClick={handlePrev}
            className="absolute left-2 md:-left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white border border-black/5 text-primary shadow-xl flex items-center justify-center transition-all hover:bg-primary hover:text-white active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          {/* Next */}
          <button
            type="button"
            aria-label="Próximo"
            onClick={handleNext}
            className="absolute right-2 md:-right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white border border-black/5 text-primary shadow-xl flex items-center justify-center transition-all hover:bg-primary hover:text-white active:scale-95"
          >
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div
            ref={scrollRef}
            onScroll={onUserScroll}
            onTouchStart={pauseAndScheduleResume}
            onMouseDown={pauseAndScheduleResume}
            className="flex flex-nowrap gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12 pt-2 px-4"
          >
            {projetos.map((p, i) => (
              <div
                key={`${p.slug}-${i}`}
                className="snap-center shrink-0 w-[85%] sm:w-[60%] md:w-[calc((100%-4rem)/3)]"
              >
                <div className="bg-white rounded-[40px] overflow-hidden shadow-warm-utility h-full flex flex-col border border-black/5 transition-transform duration-500 hover:scale-[1.02]">
                  <div className="relative aspect-video overflow-hidden bg-gray/10">
                    <img
                      src={(p.imagem_destaque && p.imagem_destaque.startsWith('http')) ? p.imagem_destaque : "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop"}
                      alt={p.titulo}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop";
                        target.onerror = null;
                      }}
                    />
                    <div className="absolute top-6 left-6">
                      <span className="bg-primary text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                        {p.categoria}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 md:p-10 flex flex-col flex-grow">
                    <h3 className="text-2xl font-black text-dark mb-4 uppercase tracking-tight">
                      {p.titulo}
                    </h3>
                    <p className="text-gray/70 mb-8 md:mb-10 line-clamp-3 font-light text-base md:text-lg leading-relaxed">
                      {p.resumo}
                    </p>

                    <div className="mt-auto flex flex-wrap gap-4">
                      <Button asChild className="gf-button-primary rounded-full px-8 py-4 h-auto min-h-[44px] text-xs font-black tracking-widest group">
                        <Link to="/doar" search={{ project: p.slug }}>
                          APOIAR AGORA <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/5 rounded-full px-8 py-4 h-auto min-h-[44px] text-xs font-black tracking-widest">
                        <Link to="/projetos/$slug" params={{ slug: p.slug }}>
                          CONHECER MAIS
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          {total > 1 && (
            <div className="flex justify-center gap-2 mt-2">
              {projetos.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Ir para slide ${i + 1}`}
                  onClick={() => { pauseAndScheduleResume(); goTo(i); }}
                  className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-primary" : "w-2 bg-primary/30"}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
