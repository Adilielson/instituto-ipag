import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as ADMIN_MASTER } from "./admin-mock-Cr0WxVxK.mjs";
function AdminUsuarios() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-background p-6 shadow-card-utility", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: "Usuários" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "mt-6 w-full text-left text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-xs uppercase tracking-wider text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3", children: "Nome" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3", children: "E-mail" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3", children: "Papel" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-4 font-semibold", children: ADMIN_MASTER.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-4", children: ADMIN_MASTER.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full gradient-flame px-3 py-1 text-xs font-semibold text-primary-foreground", children: "Administrador Master" }) })
      ] }) })
    ] })
  ] });
}
export {
  AdminUsuarios as component
};
