import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { d as Route$8, B as Button } from "./router-X8mh4mh_.mjs";
import { R as Reveal } from "./Reveal-0Ia2h3g0.mjs";
import { m as LifeBuoy, x as Scissors, B as Brain, l as HeartHandshake, j as GraduationCap, s as Music, A as ArrowLeft } from "../_libs/lucide-react.mjs";
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
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const ICON_MAP = {
  "Cultura": Music,
  "Educação": GraduationCap,
  "Social": HeartHandshake,
  "Saúde": Brain,
  "Capacitação": Scissors,
  "Vida": LifeBuoy
};
function ProjetoDetalhe() {
  const {
    project
  } = Route$8.useLoaderData();
  if (!project) return null;
  const Icon = ICON_MAP[project.categoria] || HeartHandshake;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "gradient-flame-soft py-32 md:py-40 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-container relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/projetos", className: "inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-primary hover:gap-5 transition-all mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
          " TODOS OS PROJETOS"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-20 w-20 items-center justify-center rounded-[32px] gradient-flame text-white shadow-warm-utility mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-10 w-10" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "gf-heading-lg text-dark max-w-4xl uppercase", children: project.titulo }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 text-2xl text-gray/60 font-light leading-relaxed max-w-3xl", children: project.resumo })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-container grid lg:grid-cols-3 gap-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-2xl max-w-none prose-headings:font-black prose-headings:uppercase prose-p:text-gray/80 prose-p:font-light prose-strong:text-dark prose-strong:font-black", children: project.conteudo }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { direction: "left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-12 rounded-[60px] bg-bg border border-black/5 shadow-premium-utility", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HeartHandshake, { className: "w-16 h-16 text-primary mb-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-3xl font-black uppercase tracking-tight text-dark mb-6", children: "Participe" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-gray/60 font-light leading-relaxed mb-10", children: "Quer participar como voluntário ou apoiar este projeto? Entre em contato e faça parte da nossa rede." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "gf-button gf-button-primary w-full h-auto py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contato", children: "FALAR COM O IPAG" }) })
      ] }) }) })
    ] }) })
  ] });
}
export {
  ProjetoDetalhe as component
};
