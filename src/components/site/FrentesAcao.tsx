import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Heart, Users, HeartHandshake } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { motion, AnimatePresence } from "framer-motion";

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

export function FrentesAcao({ projetos }: FrentesAcaoProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(true);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Triple the items for infinite effect
  const loopedProjetos = projetos.length > 0 ? [...projetos, ...projetos, ...projetos] : [];

  useEffect(() => {
    if (scrollRef.current && projetos.length > 0) {
      // Calculate a more precise offset to start in the middle set
      const cardWidth = window.innerWidth < 768 ? window.innerWidth * 0.85 + 32 : 400 + 32;
      scrollRef.current.scrollLeft = cardWidth * projetos.length;
    }
  }, [projetos]);

  const scroll = (direction: "left" | "right") => {
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

      // Infinite loop logic: silent snapping
      if (scrollLeft <= 0) {
        scrollRef.current.scrollLeft = setWidth;
      } else if (scrollLeft >= scrollWidth - clientWidth) {
        scrollRef.current.scrollLeft = scrollWidth - clientWidth - setWidth;
      }
    }
  };

  const donorAvatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop",
  ];

  return (
    <section className="py-32 bg-bg overflow-hidden">
      <div className="max-container">
        <div className="mb-20">
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
        </div>

        <div className="relative">
          <div className="relative group/carousel overflow-hidden">
            {/* Navigation Buttons - Always visible */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
              <button 
                onClick={() => scroll("left")}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/90 backdrop-blur-sm border border-black/5 text-primary shadow-xl flex items-center justify-center transition-all hover:bg-primary hover:text-white active:scale-95"
              >
                <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
              <button 
                onClick={() => scroll("right")}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/90 backdrop-blur-sm border border-black/5 text-primary shadow-xl flex items-center justify-center transition-all hover:bg-primary hover:text-white active:scale-95"
              >
                <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </div>

            {/* Left fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg via-bg/20 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg via-bg/20 to-transparent z-10 pointer-events-none" />

            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12 pt-2 px-6 md:px-8"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollSnapType: 'x mandatory' }}
            >
              {loopedProjetos.map((p, i) => (
                <div 
                  key={`${p.slug}-${i}`} 
                  className="snap-center md:snap-start shrink-0 w-[85vw] md:w-[400px]"
                >
                  <div className="bg-white rounded-[40px] overflow-hidden shadow-warm-utility h-full flex flex-col border border-black/5 transition-transform duration-500 hover:scale-[1.02]">
                    <div className="relative h-64 overflow-hidden bg-gray/10">
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
                    
                    <div className="p-10 flex flex-col flex-grow">
                      <h3 className="text-2xl font-black text-dark mb-4 uppercase tracking-tight">
                        {p.titulo}
                      </h3>
                      <p className="text-gray/70 mb-8 md:mb-10 line-clamp-3 font-light text-base md:text-lg leading-relaxed">
                        {p.resumo}
                      </p>
                      
                      <div className="mt-auto flex flex-wrap gap-4">
                        <Button asChild className="gf-button-primary rounded-full px-8 py-4 h-auto text-xs font-black tracking-widest group">
                          <Link to="/projetos/$slug" params={{ slug: p.slug }}>
                            APOIAR AGORA <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </Button>
                        <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/5 rounded-full px-8 py-4 h-auto text-xs font-black tracking-widest">
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
          </div>
          
        </div>
      </div>
    </section>
  );
}