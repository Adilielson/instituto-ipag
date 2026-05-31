import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button, P as PARTNERS } from "./router-BLb-OGAX.mjs";
import { R as Reveal } from "./Reveal-0Ia2h3g0.mjs";
import "../_libs/seroval.mjs";
import { c as Building2, H as HandHeart, W as Users, q as Megaphone } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
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
import "./server-CzbV9FqZ.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const WAYS = [{
  icon: Building2,
  title: "Patrocínio institucional",
  text: "Apoie financeiramente projetos com impacto mensurável."
}, {
  icon: HandHeart,
  title: "Doação de recursos",
  text: "Contribua com bens, materiais e infraestrutura."
}, {
  icon: Users,
  title: "Voluntariado corporativo",
  text: "Engaje seu time em ações comunitárias estruturadas."
}, {
  icon: Megaphone,
  title: "Responsabilidade social",
  text: "Desenvolva ações conjuntas alinhadas à sua marca."
}];
function Parceiros() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "gradient-flame-soft py-24 md:py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-4xl px-4 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-primary", children: "Parceiros e investidores" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-4 text-5xl font-extrabold leading-[1.05] md:text-6xl", children: [
        "Grandes transformações acontecem ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-flame", children: "juntos" }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-2xl text-lg text-muted-foreground", children: "O IPAG busca constantemente parcerias que ampliem o alcance dos projetos e gerem impacto social duradouro." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "mt-8 gradient-flame text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contato", children: "Quero ser parceiro" }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2 md:px-8 lg:grid-cols-4", children: WAYS.map((w, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 0.06, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full rounded-3xl border border-border bg-background p-7 shadow-card-utility", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-12 w-12 items-center justify-center rounded-xl gradient-flame text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(w.icon, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 text-lg font-bold", children: w.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: w.text })
    ] }) }, w.title)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border bg-muted/30 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-center text-3xl font-extrabold md:text-4xl", children: "Parceiros que caminham conosco" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid grid-cols-2 gap-4 md:grid-cols-4", children: PARTNERS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-20 items-center justify-center rounded-xl border border-border bg-background px-4 text-center text-sm font-semibold text-muted-foreground", children: p }, p)) })
    ] }) })
  ] });
}
export {
  Parceiros as component
};
