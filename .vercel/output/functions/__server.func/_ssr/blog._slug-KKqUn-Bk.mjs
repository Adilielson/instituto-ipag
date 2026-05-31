import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { R as Reveal } from "./Reveal-0Ia2h3g0.mjs";
import { f as Route$6 } from "./router-Bev7a8oZ.mjs";
import "../_libs/seroval.mjs";
import { A as ArrowLeft } from "../_libs/lucide-react.mjs";
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
import "./server-C9YB9hxW.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
function BlogPost() {
  const {
    post,
    relatedPosts
  } = Route$6.useLoaderData();
  if (!post) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "gradient-flame-soft py-32 md:py-40 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-container relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog", className: "inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-primary hover:gap-5 transition-all mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
          " VOLTAR AO BLOG"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-primary text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl mb-8 inline-block", children: post.categoria }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "gf-heading-lg text-dark max-w-4xl uppercase", children: post.titulo }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center gap-4 text-gray/50 text-xs font-bold uppercase tracking-widest", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(post.data_publicacao).toLocaleDateString("pt-BR") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "POR IPAG COMUNICAÇÃO" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-container grid lg:grid-cols-3 gap-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl text-dark font-light leading-relaxed italic border-l-4 border-primary pl-10 py-4", children: post.resumo }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-2xl max-w-none prose-headings:font-black prose-headings:uppercase prose-p:text-gray/80 prose-p:font-light prose-strong:text-dark prose-strong:font-black", children: post.conteudo })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-40 p-10 rounded-[40px] bg-bg border border-black/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-black uppercase tracking-tight text-dark mb-6", children: "Compartilhar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full bg-white border border-black/5 flex items-center justify-center text-dark hover:bg-primary hover:text-white transition-all cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "h-5 w-5 fill-current", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full bg-white border border-black/5 flex items-center justify-center text-dark hover:bg-primary hover:text-white transition-all cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "h-5 w-5 fill-current", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" }) }) })
        ] })
      ] }) })
    ] }) }),
    relatedPosts && relatedPosts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-32 bg-bg/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-black uppercase tracking-tight mb-16", children: "Artigos Relacionados" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-12 md:grid-cols-2 lg:grid-cols-3", children: relatedPosts.map((related, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 0.1, direction: "up", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog/$slug", params: {
        slug: related.slug
      }, className: "group block bg-white rounded-[30px] overflow-hidden border border-black/5 shadow-premium-utility transition-all hover:shadow-warm-utility h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: related.imagem_destaque || "", alt: related.titulo, className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase tracking-widest text-primary mb-4 block", children: related.categoria }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-black uppercase tracking-tight text-dark group-hover:text-primary transition-colors line-clamp-2", children: related.titulo })
        ] })
      ] }) }, related.slug)) })
    ] }) })
  ] });
}
export {
  BlogPost as component
};
