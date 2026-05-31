import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { B as Button, i as deleteEvento, g as cn, h as createEvento, u as updateEvento, j as getEventos } from "./router-Bev7a8oZ.mjs";
import { I as Input, T as Textarea } from "./textarea-DvY2udUj.mjs";
import { b as useQueryClient, a as useQuery, u as useMutation } from "../_libs/tanstack__react-query.mjs";
import { R as Root, P as Portal, a as Content, C as Close, T as Title, O as Overlay, D as Description } from "../_libs/radix-ui__react-dialog.mjs";
import { L as Label } from "./label-LODw_UPD.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { s as supabase } from "./client-CddS5Swf.mjs";
import "../_libs/seroval.mjs";
import { w as Plus, y as Search, n as LoaderCircle, C as Calendar, p as MapPin, t as Pen, T as Trash2, X, v as Play, V as Upload } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
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
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
const Dialog = Root;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-[100] bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-[100] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
function FileUpload({
  onUploadComplete,
  onRemove,
  value,
  label,
  bucket = "event-assets",
  accept = "image/*",
  type = "image"
}) {
  const [isUploading, setIsUploading] = reactExports.useState(false);
  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;
      const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(filePath);
      onUploadComplete(publicUrl);
      toast.success(`${type === "image" ? "Imagem" : "Vídeo"} enviada com sucesso!`);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(`Erro ao enviar arquivo: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-[#8E8E8F]", children: label }),
    value ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group rounded-xl overflow-hidden border border-black/5 aspect-video bg-[#F7F8FA] flex items-center justify-center", children: [
      type === "image" ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: value, alt: "Preview", className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-8 w-8 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase text-[#8E8E8F]", children: "Vídeo Carregado" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onRemove,
          className: "absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-white",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex flex-col items-center justify-center w-full aspect-video rounded-xl border-2 border-dashed border-black/5 bg-[#F7F8FA] cursor-pointer hover:bg-black/[0.02] transition-colors group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center justify-center pt-5 pb-6", children: isUploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-8 w-8 text-[#8E8E8F] mb-2 group-hover:scale-110 transition-transform" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-[#8E8E8F]", children: "Clique para enviar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-bold text-[#8E8E8F]/60 mt-1 uppercase", children: type === "image" ? "PNG, JPG ou GIF" : "MP4, WebM" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "file",
          className: "hidden",
          onChange: handleUpload,
          accept,
          disabled: isUploading
        }
      )
    ] })
  ] });
}
function AdminEventos() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [isDialogOpen, setIsDialogOpen] = reactExports.useState(false);
  const [editingEvento, setEditingEvento] = reactExports.useState(null);
  const [formData, setFormData] = reactExports.useState({
    titulo: "",
    data_evento: "",
    local: "",
    descricao: "",
    status: "publicado",
    imagem_destaque: "",
    galeria: [],
    video_url: ""
  });
  const {
    data: eventos,
    isLoading
  } = useQuery({
    queryKey: ["eventos"],
    queryFn: () => getEventos()
  });
  const createMutation = useMutation({
    mutationFn: (data) => createEvento({
      data
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["eventos"]
      });
      toast.success("Evento criado com sucesso!");
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      console.error("Erro ao criar evento:", error);
      const message = error?.message || "Erro desconhecido";
      toast.error(`Erro ao criar evento: ${message}`);
    }
  });
  const updateMutation = useMutation({
    mutationFn: (data) => updateEvento({
      data
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["eventos"]
      });
      toast.success("Evento atualizado com sucesso!");
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      console.error("Erro ao atualizar evento:", error);
      const message = error?.message || "Erro desconhecido";
      toast.error(`Erro ao atualizar evento: ${message}`);
    }
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteEvento({
      data: {
        id
      }
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["eventos"]
      });
      toast.success("Evento excluído com sucesso!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Erro ao excluir evento.");
    }
  });
  const resetForm = () => {
    setFormData({
      titulo: "",
      data_evento: "",
      local: "",
      descricao: "",
      status: "publicado",
      imagem_destaque: "",
      galeria: [],
      video_url: ""
    });
    setEditingEvento(null);
  };
  const handleEdit = (evento) => {
    setEditingEvento(evento);
    let formattedDate = "";
    if (evento.data_evento) {
      const date = new Date(evento.data_evento);
      const offset = date.getTimezoneOffset() * 6e4;
      const localDate = new Date(date.getTime() - offset);
      formattedDate = localDate.toISOString().slice(0, 16);
    }
    setFormData({
      titulo: evento.titulo,
      data_evento: formattedDate,
      local: evento.local || "",
      descricao: evento.descricao || "",
      status: evento.status || "publicado",
      imagem_destaque: evento.imagem_destaque || "",
      galeria: evento.galeria || [],
      video_url: evento.video_url || ""
    });
    setIsDialogOpen(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const slug = formData.titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w ]+/g, "").replace(/ +/g, "-");
    let formattedDate = formData.data_evento;
    if (formData.data_evento && !formData.data_evento.includes("Z")) {
      formattedDate = new Date(formData.data_evento).toISOString();
    }
    const payload = {
      ...formData,
      data_evento: formattedDate,
      slug
    };
    if (editingEvento) {
      updateMutation.mutate({
        id: editingEvento.id,
        ...payload
      });
    } else {
      createMutation.mutate(payload);
    }
  };
  const filteredEventos = reactExports.useMemo(() => {
    if (!eventos) return [];
    return eventos.filter((e) => e.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || e.local.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [eventos, searchTerm]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[40px] bg-white border border-black/5 p-8 shadow-premium-utility animate-in fade-in duration-500", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black uppercase tracking-tight text-[#2A2A2B]", children: "Calendário de Eventos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#8E8E8F]", children: "Gerencie os workshops, concertos e reuniões do IPAG." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => {
        resetForm();
        setIsDialogOpen(true);
      }, className: "gf-button-primary shadow-warm-utility hover:scale-105 transition-transform w-full md:w-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
        " Novo Evento"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row gap-4 mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8E8E8F]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), placeholder: "Buscar eventos por nome ou local...", className: "pl-10 h-11 bg-[#F7F8FA] border-black/5 rounded-xl" })
    ] }) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-black/5 text-[10px] font-black uppercase tracking-[0.2em] text-[#8E8E8F]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-4 pr-4", children: "Evento / Detalhes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-4 pr-4", children: "Imagens" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-4 pr-4", children: "Data e Hora" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-4 pr-4", children: "Local" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-4 text-right", children: "Ações" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-black/[0.03]", children: [
        filteredEventos.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "group hover:bg-[#F7F8FA] transition-all duration-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-5 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 shrink-0 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-6 w-6 text-purple-600" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black text-sm text-[#2A2A2B] truncate uppercase tracking-tight group-hover:text-primary transition-colors", children: e.titulo }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold text-[#8E8E8F] truncate uppercase tracking-widest", children: e.status })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-5 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex -space-x-2", children: [
            e.galeria?.slice(0, 3).map((img, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-lg border-2 border-white overflow-hidden bg-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, className: "h-full w-full object-cover", alt: "" }) }, idx)),
            e.galeria?.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-8 w-8 rounded-lg border-2 border-white bg-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-500", children: [
              "+",
              e.galeria.length - 3
            ] }),
            (!e.galeria || e.galeria.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-gray-300 font-bold uppercase", children: "Sem fotos" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-5 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-black text-[#2A2A2B]", children: new Date(e.data_evento).toLocaleDateString("pt-BR") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-[#8E8E8F] uppercase tracking-wider", children: new Date(e.data_evento).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit"
            }) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-5 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs font-bold text-[#2A2A2B]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[150px]", children: e.local })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-5 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => handleEdit(e), variant: "ghost", size: "icon", className: "h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => {
              if (confirm("Tem certeza que deseja excluir este evento?")) {
                deleteMutation.mutate(e.id);
              }
            }, variant: "ghost", size: "icon", className: "h-9 w-9 rounded-xl text-destructive hover:bg-destructive/10 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
          ] }) })
        ] }, e.id)),
        filteredEventos.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "py-20 text-center text-[#8E8E8F] font-medium", children: "Nenhum evento encontrado." }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-[500px] rounded-[32px] p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-2xl font-black uppercase tracking-tight", children: editingEvento ? "Editar Evento" : "Novo Evento" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "titulo", className: "text-[10px] font-black uppercase tracking-widest text-[#8E8E8F]", children: "Título do Evento" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "titulo", value: formData.titulo, onChange: (e) => setFormData({
            ...formData,
            titulo: e.target.value
          }), required: true, className: "h-12 bg-[#F7F8FA] border-black/5 rounded-xl font-bold" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "data", className: "text-[10px] font-black uppercase tracking-widest text-[#8E8E8F]", children: "Data e Hora" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "data", type: "datetime-local", value: formData.data_evento, onChange: (e) => setFormData({
              ...formData,
              data_evento: e.target.value
            }), required: true, className: "h-12 bg-[#F7F8FA] border-black/5 rounded-xl font-bold" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "local", className: "text-[10px] font-black uppercase tracking-widest text-[#8E8E8F]", children: "Local" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "local", value: formData.local, onChange: (e) => setFormData({
              ...formData,
              local: e.target.value
            }), required: true, className: "h-12 bg-[#F7F8FA] border-black/5 rounded-xl font-bold" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "descricao", className: "text-[10px] font-black uppercase tracking-widest text-[#8E8E8F]", children: "Descrição" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "descricao", value: formData.descricao, onChange: (e) => setFormData({
            ...formData,
            descricao: e.target.value
          }), className: "min-h-[100px] bg-[#F7F8FA] border-black/5 rounded-xl font-medium" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileUpload, { label: "Imagem de Destaque", value: formData.imagem_destaque, onUploadComplete: (url) => setFormData({
            ...formData,
            imagem_destaque: url
          }), onRemove: () => setFormData({
            ...formData,
            imagem_destaque: ""
          }), type: "image" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileUpload, { label: "Vídeo do Evento", value: formData.video_url, onUploadComplete: (url) => setFormData({
            ...formData,
            video_url: url
          }), onRemove: () => setFormData({
            ...formData,
            video_url: ""
          }), type: "video", accept: "video/*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] font-black uppercase tracking-widest text-[#8E8E8F]", children: "Galeria de Fotos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 sm:grid-cols-4 gap-2", children: [
            formData.galeria.map((url, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group aspect-square rounded-lg overflow-hidden border border-black/5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url, alt: `Galeria ${index}`, className: "w-full h-full object-cover" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setFormData({
                ...formData,
                galeria: formData.galeria.filter((_, i) => i !== index)
              }), className: "absolute top-1 right-1 p-1 bg-white/90 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }) })
            ] }, index)),
            formData.galeria.length < 10 && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center justify-center aspect-square rounded-lg border-2 border-dashed border-black/5 bg-[#F7F8FA] cursor-pointer hover:bg-black/[0.02] transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-5 w-5 text-[#8E8E8F]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", className: "hidden", accept: "image/*", onChange: async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const toastId = toast.loading("Enviando imagem...");
                try {
                  const fileExt = file.name.split(".").pop();
                  const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
                  const {
                    error
                  } = await supabase.storage.from("event-assets").upload(fileName, file);
                  if (error) throw error;
                  const {
                    data: {
                      publicUrl
                    }
                  } = supabase.storage.from("event-assets").getPublicUrl(fileName);
                  setFormData((prev) => ({
                    ...prev,
                    galeria: [...prev.galeria, publicUrl].slice(0, 10)
                  }));
                  toast.success("Imagem adicionada à galeria!", {
                    id: toastId
                  });
                } catch (err) {
                  toast.error(`Erro: ${err.message}`, {
                    id: toastId
                  });
                }
              } })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", onClick: () => setIsDialogOpen(false), className: "rounded-xl font-bold uppercase tracking-wider text-xs", children: "Cancelar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: createMutation.isPending || updateMutation.isPending, className: "gf-button-primary shadow-warm-utility px-8 rounded-xl font-black uppercase tracking-widest text-xs", children: [
            (createMutation.isPending || updateMutation.isPending) && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
            editingEvento ? "Salvar Alterações" : "Criar Evento"
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AdminEventos as component
};
