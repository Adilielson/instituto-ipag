import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as ADMIN_MASTER } from "./admin-mock-Cr0WxVxK.mjs";
import { m as FolderKanban, C as Calendar, N as Newspaper, U as Users, T as TrendingUp, q as ArrowUpRight } from "../_libs/lucide-react.mjs";
function AdminHome() {
  const stats = [{
    label: "Projetos Ativos",
    value: 6,
    icon: FolderKanban,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  }, {
    label: "Eventos Agendados",
    value: 3,
    icon: Calendar,
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  }, {
    label: "Posts Publicados",
    value: 12,
    icon: Newspaper,
    color: "text-orange-500",
    bg: "bg-orange-500/10"
  }, {
    label: "Voluntários",
    value: 80,
    icon: Users,
    color: "text-green-500",
    bg: "bg-green-500/10"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl bg-white border border-black/5 p-8 shadow-premium-utility hover:shadow-[0_20px_50px_-12px_rgba(247,155,52,0.15)] transition-shadow duration-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-black uppercase tracking-[0.2em] text-primary mb-2", children: "Visão Geral do Sistema" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl font-black tracking-tight text-[#2A2A2B] mb-3", children: [
          "Bem-vindo, ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: ADMIN_MASTER.name.split(" ")[0] }),
          "!"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-2xl text-[#8E8E8F] font-medium leading-relaxed", children: "Seu painel administrativo está pronto para gestão. Aqui você pode monitorar o impacto social, gerenciar eventos e atualizar o blog institucional com facilidade." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-10 right-10 h-32 w-32 rounded-full bg-accent/5 blur-2xl" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden rounded-3xl bg-white border border-black/5 p-6 shadow-card-utility hover:shadow-premium-utility transition-all duration-300 hover:-translate-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-3 rounded-2xl ${s.bg}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: `h-6 w-6 ${s.color}` }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-[10px] font-black text-green-500 uppercase tracking-widest bg-green-500/10 px-2 py-1 rounded-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3 w-3" }),
          " +12%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl font-black tracking-tight text-[#2A2A2B] mb-1", children: s.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-[#8E8E8F]", children: s.label })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-5 w-5 text-primary" }) })
    ] }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 rounded-3xl bg-white border border-black/5 p-8 shadow-premium-utility", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8 border-b border-black/5 pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-black uppercase tracking-tight", children: "Atividade Recente" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-xs font-black uppercase tracking-widest text-primary hover:opacity-70 transition-opacity", children: "Ver Tudo" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 group cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-2xl bg-[#F7F8FA] flex items-center justify-center border border-black/5 group-hover:border-primary/30 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Newspaper, { className: "h-5 w-5 text-[#8E8E8F] group-hover:text-primary transition-colors" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-[#2A2A2B] truncate group-hover:text-primary transition-colors", children: 'Novo post publicado no blog: "Impacto da Música na Infância"' }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-bold text-[#8E8E8F] uppercase tracking-wider", children: [
              "Há ",
              i * 2,
              " horas • Por Admin"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-2 rounded-full bg-primary" })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl gradient-flame p-8 text-white shadow-warm-utility relative overflow-hidden group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 h-full flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-black uppercase tracking-tight mb-4 leading-tight", children: "Pronto para causar impacto hoje?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium opacity-90 mb-8 leading-relaxed", children: "Tudo o que você cria e gerencia aqui ajuda o IPAG a transformar mais vidas através da música e educação." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "mt-auto bg-white text-primary rounded-full px-6 py-4 text-xs font-black uppercase tracking-widest shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95", children: "Criar Novo Post" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "absolute -bottom-4 -right-4 h-32 w-32 opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-700" })
      ] })
    ] })
  ] });
}
const Sparkles = ({
  className
}) => /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 3V4M12 20V21M4 12H3M21 12H20M5.63604 5.63604L4.92893 4.92893M19.0711 19.0711L18.364 18.364M5.63604 18.364L4.92893 19.0711M19.0711 4.92893L18.364 5.63604", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) });
export {
  AdminHome as component
};
