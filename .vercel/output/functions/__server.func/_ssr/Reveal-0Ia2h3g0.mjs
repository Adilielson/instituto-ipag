import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as useInView, m as motion } from "../_libs/framer-motion.mjs";
function Reveal({
  children,
  delay = 0,
  className,
  direction = "up"
}) {
  const [isClient, setIsClient] = reactExports.useState(false);
  const ref = reactExports.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  reactExports.useEffect(() => {
    setIsClient(true);
  }, []);
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      scale: direction === "fade" ? 1 : 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: isClient ? "hidden" : "visible",
      animate: isClient && isInView ? "visible" : isClient ? "hidden" : "visible",
      variants,
      transition: { duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] },
      children
    }
  ) });
}
export {
  Reveal as R
};
