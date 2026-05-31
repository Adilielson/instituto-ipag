import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { R as Reveal } from "./Reveal-0Ia2h3g0.mjs";
import { F as FileText, D as Download } from "../_libs/lucide-react.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const DOCS = [{
  title: "Estatuto Social",
  year: "2017"
}, {
  title: "Relatório de Atividades",
  year: "2025"
}, {
  title: "Prestação de Contas",
  year: "2025"
}, {
  title: "Certidões e Registros",
  year: "2026"
}];
function Transparencia() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "gradient-flame-soft py-32 md:py-40 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-container relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-black uppercase tracking-[0.4em] mb-6 block text-sm", children: "Transparência" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "gf-heading-lg text-dark max-w-4xl", children: [
          "CLAREZA E ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-flame", children: "RESPONSABILIDADE" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 max-w-2xl text-2xl text-gray/60 font-light leading-relaxed", children: "Disponibilizamos publicamente nossos documentos institucionais para parceiros, apoiadores e toda a comunidade de São Mateus." })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-container grid gap-8 md:grid-cols-2", children: DOCS.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 0.1, direction: "up", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "group flex w-full items-center justify-between gap-6 rounded-[32px] border border-black/5 bg-white p-8 text-left shadow-premium-utility transition-all duration-500 hover:shadow-warm-utility", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-14 w-14 items-center justify-center rounded-2xl gradient-flame text-white shadow-lg transition-transform duration-500 group-hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-7 w-7" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-black uppercase tracking-tight text-dark", children: d.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold uppercase tracking-widest text-primary/60 mt-1", children: d.year })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full bg-bg flex items-center justify-center text-primary transition-all group-hover:bg-primary group-hover:text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-5 w-5 transition-transform group-hover:translate-y-1" }) })
    ] }) }, d.title)) }) })
  ] });
}
export {
  Transparencia as component
};
