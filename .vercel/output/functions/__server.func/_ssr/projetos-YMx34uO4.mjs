import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { R as Reveal } from "./Reveal-0Ia2h3g0.mjs";
import { R as Route$h } from "./router-shstBMh_.mjs";
import { m as LifeBuoy, x as Scissors, B as Brain, l as HeartHandshake, j as GraduationCap, s as Music, a as ArrowRight } from "../_libs/lucide-react.mjs";
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
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
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
const ICON_MAP = {
  "Cultura": Music,
  "Educação": GraduationCap,
  "EDUCAÇÃO": GraduationCap,
  "Social": HeartHandshake,
  "Saúde": Brain,
  "Capacitação": Scissors,
  "Vida": LifeBuoy
};
function Projetos() {
  const {
    projetos = []
  } = Route$h.useLoaderData() || {};
  const validProjetos = (projetos || []).filter((p) => p && p.slug && p.titulo);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "gradient-flame-soft py-32 md:py-40 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-container relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-black uppercase tracking-[0.4em] mb-6 block text-sm", children: "Nossos projetos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "gf-heading-lg text-dark max-w-4xl uppercase", children: [
          "PROJETOS QUE ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-flame", children: "TRANSFORMAM VIDAS" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-container grid gap-12 md:grid-cols-2 lg:grid-cols-3", children: validProjetos.map((p, i) => {
      const Icon = ICON_MAP[p.categoria] || HeartHandshake;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 0.1, direction: "up", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/projetos/$slug", params: {
        slug: p.slug
      }, className: "group relative flex h-[500px] md:h-[600px] flex-col overflow-hidden rounded-[40px] bg-white shadow-premium-utility transition-all duration-700 hover:shadow-warm-utility border border-black/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-48 md:h-64 overflow-hidden bg-gray/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.imagem_destaque && p.imagem_destaque.startsWith("http") ? p.imagem_destaque : "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop", alt: p.titulo, className: "w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-6 left-6 z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 backdrop-blur-md text-primary shadow-lg transition-transform duration-500 group-hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-6 right-6 z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-primary text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg", children: p.categoria }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-10 flex flex-col flex-grow relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-black uppercase tracking-tight text-dark leading-none group-hover:text-primary transition-colors", children: p.titulo }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-lg text-gray/70 leading-relaxed line-clamp-4 font-light", children: p.resumo }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-dark group-hover:text-primary transition-all group-hover:gap-4 gap-2", children: [
            "VER DETALHES ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-48 w-48 rotate-12" }) })
      ] }) }, p.slug);
    }) }) })
  ] });
}
export {
  Projetos as component
};
