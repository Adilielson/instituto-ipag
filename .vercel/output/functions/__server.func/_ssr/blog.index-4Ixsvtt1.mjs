import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { R as Reveal } from "./Reveal-0Ia2h3g0.mjs";
import { c as Route$a } from "./router-D-TF2mOo.mjs";
import { a as ArrowRight } from "../_libs/lucide-react.mjs";
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
function Blog() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "gradient-flame-soft py-32 md:py-40 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-container relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-black uppercase tracking-[0.4em] mb-6 block text-sm", children: "Editorial IPAG" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "gf-heading-lg text-dark max-w-4xl", children: [
          "HISTÓRIAS DE ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-flame", children: "TRANSFORMAÇÃO" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-12 flex flex-wrap gap-4 items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-md w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Buscar artigos...", className: "w-full pl-12 pr-6 py-4 rounded-full border border-black/5 bg-bg text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all", onChange: (e) => {
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray/40", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-12 md:grid-cols-2 lg:grid-cols-3", children: Route$a.useLoaderData().posts?.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 0.1, direction: "up", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog/$slug", params: {
        slug: post.slug
      }, className: "group block h-full overflow-hidden rounded-[40px] border border-black/5 bg-white shadow-premium-utility transition-all duration-700 hover:shadow-warm-utility", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[16/10] overflow-hidden relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: post.imagem_destaque || "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2006&auto=format&fit=crop", alt: post.titulo, className: "w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-6 left-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-dark shadow-xl", children: post.categoria }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-6 text-gray/50 text-xs font-bold uppercase tracking-widest", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(post.data_publicacao).toLocaleDateString("pt-BR") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "POR IPAG" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-black mb-6 leading-tight text-dark group-hover:text-primary transition-colors line-clamp-2 uppercase tracking-tight", children: post.titulo }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray/70 leading-relaxed line-clamp-3 font-light text-base md:text-lg", children: post.resumo }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center gap-3 text-dark font-black uppercase tracking-widest text-xs group-hover:gap-5 transition-all", children: [
            "LER MATÉRIA COMPLETA ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 text-primary" })
          ] })
        ] })
      ] }) }, post.slug)) })
    ] }) })
  ] });
}
export {
  Blog as component
};
