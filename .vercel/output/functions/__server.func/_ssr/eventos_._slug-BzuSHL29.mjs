import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { R as Reveal } from "./Reveal-0Ia2h3g0.mjs";
import { e as Route$7, B as Button } from "./router-shstBMh_.mjs";
import { A as ArrowLeft, C as Calendar, h as Clock, p as MapPin, J as Share2 } from "../_libs/lucide-react.mjs";
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
function EventoPage() {
  const {
    evento
  } = Route$7.useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "min-h-screen bg-white pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative h-[40vh] min-h-[400px] w-full overflow-hidden bg-dark", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: evento.imagem_destaque || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop", alt: evento.titulo, className: "h-full w-full object-cover opacity-50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto w-full max-w-4xl px-4 pb-12 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { direction: "up", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/eventos", className: "mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/80 hover:text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
          " Voltar para eventos"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-black uppercase tracking-tight text-white md:text-6xl", children: evento.titulo })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto mt-12 grid max-w-4xl gap-12 px-4 md:px-8 lg:grid-cols-[1fr_300px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.2, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-p:text-gray/80 prose-p:leading-relaxed font-light", children: evento.descricao?.split("\n").map((paragraph, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: paragraph }, i)) }) }),
        evento.video_url && /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.3, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "pt-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-8 text-2xl font-black uppercase tracking-tight", children: "Vídeo do Evento" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-video overflow-hidden rounded-[32px] border border-black/5 bg-black shadow-premium", children: /* @__PURE__ */ jsxRuntimeExports.jsx("video", { src: evento.video_url, controls: true, className: "h-full w-full object-contain" }) })
        ] }) }),
        evento.galeria && evento.galeria.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.4, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "pt-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-8 text-2xl font-black uppercase tracking-tight", children: "Galeria de Fotos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 md:grid-cols-3", children: evento.galeria.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, alt: `Imagem ${i + 1} de ${evento.titulo}`, className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" }) }, i)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.3, direction: "left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-24 space-y-6 rounded-[32px] border border-black/5 bg-[#F7F8FA] p-8 shadow-card-utility", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-black uppercase tracking-[0.2em] text-primary", children: "Informações" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 rounded-lg bg-white p-2 text-primary shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-gray/50", children: "Data" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-dark", children: new Date(evento.data_evento).toLocaleDateString("pt-BR") })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 rounded-lg bg-white p-2 text-primary shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-gray/50", children: "Horário" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-dark", children: new Date(evento.data_evento).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit"
              }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 rounded-lg bg-white p-2 text-primary shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-gray/50", children: "Local" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-dark", children: evento.local })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gf-button-primary w-full shadow-warm-utility", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "mr-2 h-4 w-4" }),
          " Compartilhar"
        ] }) })
      ] }) }) })
    ] })
  ] });
}
export {
  EventoPage as component
};
