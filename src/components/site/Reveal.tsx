import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
      x: direction === "left" ? 30 : direction === "right" ? -30 : 0,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      x: 0,
    }
  };

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
        transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
