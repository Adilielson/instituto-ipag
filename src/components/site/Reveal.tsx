import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { Variants } from "framer-motion";

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
  const variants: Variants = {
    hidden: { 
      opacity: 0, 
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      x: 0,
      transition: { 
        duration: 0.8, 
        delay, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
