import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { A as ADMIN_MASTER } from "./admin-mock-Cr0WxVxK.mjs";
import { B as Button } from "./router-D-TF2mOo.mjs";
import { K as ShieldCheck, r as Menu, W as Users, X, L as LayoutDashboard, i as FolderKanban, C as Calendar, N as Newspaper, c as Building2, F as FileText, f as ChevronRight, o as LogOut } from "../_libs/lucide-react.mjs";
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
const ADMIN_NAV = [{
  to: "/admin",
  label: "Dashboard",
  icon: LayoutDashboard
}, {
  to: "/admin/projetos",
  label: "Projetos",
  icon: FolderKanban
}, {
  to: "/admin/eventos",
  label: "Eventos",
  icon: Calendar
}, {
  to: "/admin/blog",
  label: "Blog",
  icon: Newspaper
}, {
  to: "/admin/parceiros",
  label: "Parceiros",
  icon: Building2
}, {
  to: "/admin/transparencia",
  label: "Transparência",
  icon: FileText
}, {
  to: "/admin/usuarios",
  label: "Usuários",
  icon: Users
}];
function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = reactExports.useState(true);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#F7F8FA] flex flex-col text-[#2A2A2B] overflow-hidden h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "h-20 bg-gradient-to-r from-[#f97316] to-white border-b border-black/5 flex items-center justify-between px-8 shrink-0 z-[60] shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl bg-white flex items-center justify-center text-[#f97316] shadow-sm group-hover:scale-105 transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-heading font-black text-xl tracking-tight block leading-none text-white", children: "IPAG" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-white/80", children: "Painel Admin" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-px bg-white/20 mx-2 hidden lg:block" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "lg:hidden text-white hover:bg-white/10", onClick: () => setIsSidebarOpen(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-heading font-black text-lg uppercase tracking-tight text-white lg:text-[#2A2A2B]/80 mix-blend-multiply lg:mix-blend-normal", children: "Painel Administrativo" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex flex-col items-end text-right mr-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-black uppercase tracking-wider text-[#2A2A2B]", children: ADMIN_MASTER.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-muted-foreground", children: ADMIN_MASTER.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl bg-white border border-black/5 flex items-center justify-center shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5 text-[#f97316]" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 overflow-hidden gap-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: `fixed top-24 bottom-6 left-6 z-50 w-72 bg-[#2A2A2B] border border-white/5 transition-transform duration-300 lg:relative lg:top-0 lg:bottom-0 lg:left-0 lg:translate-x-0 lg:my-6 rounded-[40px] shadow-premium-utility ${isSidebarOpen ? "translate-x-0" : "-translate-x-[calc(100%+64px)]"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full p-6 text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden mb-6 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "text-white hover:bg-white/10", onClick: () => setIsSidebarOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 p-4 rounded-2xl bg-white/5 border border-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-primary", children: "Master Admin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-black truncate text-white", children: ADMIN_MASTER.name.split(" ")[0] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex-1 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-4 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/40", children: "Menu Principal" }),
          ADMIN_NAV.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: n.to, activeOptions: {
            exact: n.to === "/admin"
          }, className: "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-white/60 transition-all duration-200 hover:bg-white/5 hover:text-white group", activeProps: {
            className: "bg-primary text-white shadow-warm-utility hover:bg-primary hover:text-white"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(n.icon, { className: `h-5 w-5 transition-transform group-hover:scale-110` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: n.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 opacity-0 group-hover:opacity-40 transition-opacity" })
          ] }, n.to))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto pt-6 border-t border-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-destructive hover:bg-destructive/10 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-5 w-5" }),
          " Sair do Painel"
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-y-auto scrollbar-hide p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }) })
    ] })
  ] });
}
export {
  AdminLayout as component
};
