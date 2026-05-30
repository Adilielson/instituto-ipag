import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [isClient, setIsClient] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);


  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <motion.span ref={ref} className="tabular-nums">
      {n.toLocaleString("pt-BR")}
      {suffix}
    </motion.span>
  );
}
