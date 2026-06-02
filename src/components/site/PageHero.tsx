import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect, ReactNode } from "react";
import { Reveal } from "./Reveal";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image: string;
  category?: string;
  children?: ReactNode;
}

export function PageHero({ title, subtitle, image, category, children }: PageHeroProps) {
  const heroRef = useRef(null);
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
    <section ref={heroRef} className="relative min-h-[60vh] flex items-center overflow-hidden bg-dark py-16 sm:py-24 lg:py-32 -mt-[142px] md:-mt-[122px]">
      <motion.div 
        style={isClient ? { y: y1, opacity, scale } : { y: 0, opacity: 1, scale: 1.1 }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <img 
          src={image} 
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/40 to-dark"></div>
      </motion.div>

      <div className="max-container relative z-10 pt-24 md:pt-32">
        <div className="max-w-5xl">
          {children}
          
          {category && (
            <Reveal direction="down">
              <span className="text-primary font-black uppercase tracking-[0.4em] mb-6 block text-sm">
                {category}
              </span>
            </Reveal>
          )}
          
          <Reveal delay={0.2} direction="up">
            <h1 className="gf-heading-lg text-white mb-8 leading-[0.9] uppercase">
              {title}
            </h1>
          </Reveal>

          {subtitle && (
            <Reveal delay={0.4} direction="up">
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl font-light leading-relaxed">
                {subtitle}
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
