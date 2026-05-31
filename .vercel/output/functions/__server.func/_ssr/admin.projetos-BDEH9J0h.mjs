import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-CddS5Swf.mjs";
import { B as Button, g as cn } from "./router-CKAY__H_.mjs";
import { I as Input, T as Textarea } from "./textarea-BXJEinwP.mjs";
import { L as Label } from "./label-BCTOilrI.mjs";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./select-CVo1rwKy.mjs";
import { R as Root, T as Thumb } from "../_libs/radix-ui__react-switch.mjs";
import "../_libs/seroval.mjs";
import { X, n as LoaderCircle, S as Save, G as Globe, E as Settings, R as Star, I as Image, V as Upload, w as Plus, i as FolderKanban, t as Pen, T as Trash2 } from "../_libs/lucide-react.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
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
import "./server-CXKgA0il.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
const Switch = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Thumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = Root.displayName;
const CATEGORIAS = ["Cultura", "Educação", "Social", "Saúde", "Capacitação", "Vida"];
const slugify = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/^-+|-+$/g, "");
function emptyProjeto() {
  return {
    titulo: "",
    slug: "",
    resumo: "",
    conteudo: "",
    categoria: "Social",
    status: "publicado",
    imagem_destaque: "",
    galeria: [],
    impacto: "",
    featured: false,
    ordem: 0
  };
}
function AdminProjetos() {
  const [projetos, setProjetos] = reactExports.useState([]);
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [current, setCurrent] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [uploading, setUploading] = reactExports.useState(false);
  const fileRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    fetchProjetos();
  }, []);
  const fetchProjetos = async () => {
    const {
      data,
      error
    } = await supabase.from("projetos").select("*").order("ordem", {
      ascending: true
    }).order("created_at", {
      ascending: false
    });
    if (error) alert(error.message);
    if (data) setProjetos(data);
  };
  const handleCreate = () => {
    setCurrent(emptyProjeto());
    setIsEditing(true);
  };
  const handleEdit = (p) => {
    setCurrent({
      ...p,
      galeria: p.galeria || []
    });
    setIsEditing(true);
  };
  const handleDelete = async (id) => {
    if (!confirm("Excluir este projeto definitivamente?")) return;
    const {
      error
    } = await supabase.from("projetos").delete().eq("id", id);
    if (error) return alert(error.message);
    setProjetos(projetos.filter((p) => p.id !== id));
  };
  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !current) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `projetos/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const {
      error
    } = await supabase.storage.from("blog").upload(path, file);
    if (error) {
      alert("Erro no upload: " + error.message);
      setUploading(false);
      return;
    }
    const {
      data: {
        publicUrl
      }
    } = supabase.storage.from("blog").getPublicUrl(path);
    setCurrent({
      ...current,
      imagem_destaque: publicUrl
    });
    setUploading(false);
  };
  const handleSave = async () => {
    if (!current) return;
    setLoading(true);
    const payload = {
      ...current
    };
    if (!payload.slug && payload.titulo) payload.slug = slugify(payload.titulo);
    if (!payload.titulo || !payload.slug) {
      alert("Título e slug são obrigatórios.");
      setLoading(false);
      return;
    }
    const {
      id,
      ...rest
    } = payload;
    const {
      error
    } = id ? await supabase.from("projetos").update(rest).eq("id", id) : await supabase.from("projetos").insert([rest]);
    if (error) alert("Erro ao salvar: " + error.message);
    else {
      setIsEditing(false);
      setCurrent(null);
      fetchProjetos();
    }
    setLoading(false);
  };
  if (isEditing && current) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[40px] border border-black/5 bg-background p-8 shadow-premium-utility space-y-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b pb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black uppercase tracking-tight", children: current.id ? "Editar Projeto" : "Novo Projeto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Preencha os dados do projeto social." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => {
            setIsEditing(false);
            setCurrent(null);
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "mr-2 h-4 w-4" }),
            " Cancelar"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: handleSave, disabled: loading, className: "gf-button-primary", children: [
            loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "mr-2 h-4 w-4" }),
            "Salvar"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Título" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: current.titulo, onChange: (e) => setCurrent({
                ...current,
                titulo: e.target.value
              }), className: "text-lg font-bold" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Slug" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: current.slug, onChange: (e) => setCurrent({
                  ...current,
                  slug: e.target.value
                }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", onClick: () => setCurrent({
                  ...current,
                  slug: slugify(current.titulo)
                }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-4 w-4" }) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Resumo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 3, value: current.resumo || "", onChange: (e) => setCurrent({
              ...current,
              resumo: e.target.value
            }), placeholder: "Descrição curta exibida nos cards..." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Conteúdo Completo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 18, value: current.conteudo || "", onChange: (e) => setCurrent({
              ...current,
              conteudo: e.target.value
            }), className: "font-mono text-sm leading-relaxed resize-y min-h-[300px]" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Impacto" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: current.impacto || "", onChange: (e) => setCurrent({
              ...current,
              impacto: e.target.value
            }), placeholder: "Ex: 150+ famílias atendidas" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 border rounded-2xl p-6 bg-muted/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-black uppercase tracking-widest flex items-center gap-2 border-b pb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-4 w-4 text-primary" }),
              " Publicação"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase text-muted-foreground", children: "Categoria" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: current.categoria || "Social", onValueChange: (v) => setCurrent({
                ...current,
                categoria: v
              }), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORIAS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase text-muted-foreground", children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: current.status, onValueChange: (v) => setCurrent({
                ...current,
                status: v
              }), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "publicado", children: "Publicado" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "rascunho", children: "Rascunho" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "arquivado", children: "Arquivado" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase text-muted-foreground", children: "Ordem" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: current.ordem, onChange: (e) => setCurrent({
                ...current,
                ordem: Number(e.target.value) || 0
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl bg-background border px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase", children: "Destaque" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: current.featured, onCheckedChange: (v) => setCurrent({
                ...current,
                featured: v
              }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 border rounded-2xl p-6 bg-muted/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-black uppercase tracking-widest flex items-center gap-2 border-b pb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-4 w-4 text-primary" }),
              " Imagem de Destaque"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-video w-full rounded-xl border-2 border-dashed border-border overflow-hidden bg-muted flex flex-col items-center justify-center gap-3 relative group", children: [
              current.imagem_destaque ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: current.imagem_destaque, className: "h-full w-full object-cover", alt: "Preview" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "secondary", size: "sm", onClick: () => fileRef.current?.click(), children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "mr-2 h-4 w-4" }),
                  " Trocar"
                ] }) })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-8 w-8 mx-auto mb-2 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "mt-2", onClick: () => fileRef.current?.click(), disabled: uploading, children: uploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Selecionar Foto" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", ref: fileRef, className: "hidden", accept: "image/*", onChange: handleUpload })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: current.imagem_destaque || "", onChange: (e) => setCurrent({
              ...current,
              imagem_destaque: e.target.value
            }), placeholder: "Ou cole uma URL...", className: "text-xs" })
          ] })
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[40px] bg-white border border-black/5 p-8 shadow-premium-utility animate-in fade-in duration-500", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black uppercase tracking-tight text-[#2A2A2B]", children: "Gestão de Projetos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#8E8E8F]", children: "Gerencie as iniciativas e projetos sociais do IPAG." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleCreate, className: "gf-button-primary shadow-warm-utility hover:scale-105 transition-transform w-full md:w-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
        " Novo Projeto"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-black/5 text-[10px] font-black uppercase tracking-[0.2em] text-[#8E8E8F]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-4 pr-4", children: "Projeto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-4 pr-4", children: "Categoria" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-4 pr-4", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-4 pr-4", children: "Impacto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-4 text-right", children: "Ações" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-black/[0.03]", children: [
        projetos.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "group hover:bg-[#F7F8FA] transition-all duration-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-5 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 shrink-0 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden", children: p.imagem_destaque ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.imagem_destaque, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FolderKanban, { className: "h-6 w-6 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-black text-sm text-[#2A2A2B] truncate uppercase tracking-tight group-hover:text-primary transition-colors flex items-center gap-2", children: [
                p.titulo,
                p.featured && /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 text-primary fill-primary" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-bold text-[#8E8E8F] truncate italic", children: [
                "/projetos/",
                p.slug
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-5 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl bg-primary/10 text-primary border border-primary/20", children: p.categoria || "—" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-5 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border ${p.status === "publicado" ? "bg-green-500/10 text-green-600 border-green-500/20" : "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"}`, children: p.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-5 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-[#2A2A2B]", children: p.impacto || "—" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-5 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary", onClick: () => handleEdit(p), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-9 w-9 rounded-xl hover:bg-destructive/10 hover:text-destructive", onClick: () => handleDelete(p.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
          ] }) })
        ] }, p.id)),
        projetos.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "py-12 text-center text-sm text-muted-foreground", children: "Nenhum projeto cadastrado." }) })
      ] })
    ] }) })
  ] });
}
export {
  AdminProjetos as component
};
