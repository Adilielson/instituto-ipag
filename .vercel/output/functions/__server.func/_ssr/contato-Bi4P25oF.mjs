import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as SITE, B as Button } from "./router-Bev7a8oZ.mjs";
import { I as Input, T as Textarea } from "./textarea-DvY2udUj.mjs";
import { R as Reveal } from "./Reveal-0Ia2h3g0.mjs";
import "../_libs/seroval.mjs";
import { p as MapPin, M as Mail, u as Phone, z as Send } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "./server-C9YB9hxW.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function Contato() {
  const [sent, setSent] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "gradient-flame-soft py-32 md:py-40 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-container relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-black uppercase tracking-[0.4em] mb-6 block text-sm", children: "Fale Conosco" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "gf-heading-lg text-dark max-w-4xl", children: [
          "VAMOS ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-flame", children: "CONVERSAR" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-container grid gap-24 lg:grid-cols-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { className: "lg:col-span-2", direction: "up", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-10", children: [{
        icon: MapPin,
        label: "Endereço",
        value: SITE.address
      }, {
        icon: Mail,
        label: "E-mail",
        value: SITE.email
      }, {
        icon: Phone,
        label: "WhatsApp",
        value: SITE.whatsapp
      }].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-6 group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl gradient-flame text-white shadow-lg transition-transform duration-500 group-hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "h-7 w-7" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-black uppercase tracking-[0.2em] text-primary mb-2", children: c.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-light text-gray/80 leading-relaxed", children: c.value })
        ] })
      ] }, c.label)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.15, className: "lg:col-span-3", direction: "up", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        setSent(true);
      }, className: "rounded-[60px] border border-black/5 bg-white p-12 md:p-16 shadow-premium-utility", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-black uppercase tracking-tight text-dark mb-10", children: "Envie uma mensagem" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "NOME", required: true, className: "h-16 rounded-2xl bg-bg border-none px-6 font-bold uppercase tracking-widest text-xs focus-visible:ring-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", placeholder: "E-MAIL", required: true, className: "h-16 rounded-2xl bg-bg border-none px-6 font-bold uppercase tracking-widest text-xs focus-visible:ring-primary" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "mt-6 h-16 rounded-2xl bg-bg border-none px-6 font-bold uppercase tracking-widest text-xs focus-visible:ring-primary", placeholder: "ASSUNTO", required: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { className: "mt-6 min-h-[200px] rounded-3xl bg-bg border-none p-6 font-bold uppercase tracking-widest text-xs focus-visible:ring-primary", placeholder: "MENSAGEM", required: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", size: "lg", className: "mt-10 gf-button gf-button-primary w-full h-auto py-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "mr-3 h-5 w-5" }),
          " ENVIAR MENSAGEM"
        ] }),
        sent && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
          opacity: 0,
          y: 10
        }, animate: {
          opacity: 1,
          y: 0
        }, className: "mt-8 text-center font-black uppercase tracking-[0.2em] text-primary", children: "Mensagem enviada com sucesso!" })
      ] }) })
    ] }) })
  ] });
}
export {
  Contato as component
};
