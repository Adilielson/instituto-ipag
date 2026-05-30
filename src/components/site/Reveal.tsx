import { motion, useInView } from "framer-motion";
import { ReactNode, useRef, useState, useEffect } from "react";

export function Reveal({ 
  children, 
  delay = 0, 
  className, 
  direction = "up" 
}: { 
  children: ReactNode; 
  delay?: number; 
  className?: string; 
  direction?: "up" | "down" | "left" | "right" | "fade" 
}) {
  const [isClient, setIsClient] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    setIsClient(true);
  }, []);


  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      scale: direction === "fade" ? 1 : 0.95,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      x: 0,
      scale: 1,
    }
  };


  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={isClient ? "hidden" : "visible"}
        animate={isClient && isInView ? "visible" : isClient ? "hidden" : "visible"}
        variants={variants}
        transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        {children}
      </motion.div>
    </div>
  );

}
