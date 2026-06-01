import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { s as supabase, B as Button } from "./router-shstBMh_.mjs";
import { I as Input, T as Textarea } from "./textarea-Cji3oxuE.mjs";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./select-vOjq6-DB.mjs";
import { L as Label } from "./label-CgSDyNjG.mjs";
import { X, n as LoaderCircle, S as Save, G as Globe, E as Settings, w as Plus, T as Trash2, I as Image, V as Upload, Q as Sparkles, t as Pen } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
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
import "../_libs/radix-ui__react-label.mjs";
function AdminBlog() {
  const [posts, setPosts] = reactExports.useState([]);
  const [categories, setCategories] = reactExports.useState([]);
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [uploading, setUploading] = reactExports.useState(false);
  const [currentPost, setCurrentPost] = reactExports.useState(null);
  const fileInputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);
  const fetchPosts = async () => {
    const {
      data
    } = await supabase.from("posts").select("*").order("data_publicacao", {
      ascending: false
    });
    if (data) setPosts(data);
  };
  const fetchCategories = async () => {
    const {
      data
    } = await supabase.from("blog_categories").select("*").order("nome");
    if (data) setCategories(data);
  };
  const handleAddCategory = async () => {
    const nome = prompt("Nome da nova categoria:");
    if (!nome) return;
    const {
      error
    } = await supabase.from("blog_categories").insert([{
      nome
    }]);
    if (error) alert(error.message);
    else fetchCategories();
  };
  const handleDeleteCategory = async (id, nome) => {
    if (!confirm(`Excluir a categoria "${nome}"?`)) return;
    const {
      error
    } = await supabase.from("blog_categories").delete().eq("id", id);
    if (error) alert(error.message);
    else fetchCategories();
  };
  const deletePost = async (id) => {
    if (!confirm("Tem certeza que deseja excluir este post?")) return;
    await supabase.from("posts").delete().eq("id", id);
    setPosts(posts.filter((p) => p.id !== id));
  };
  const handleEdit = (post) => {
    setCurrentPost(post);
    setIsEditing(true);
  };
  const handleCreate = () => {
    setCurrentPost({
      titulo: "",
      slug: "",
      resumo: "",
      conteudo: "",
      imagem_destaque: "",
      categoria: categories[0]?.nome || "Social",
      autor: "Editorial IPAG",
      status: "rascunho",
      data_publicacao: (/* @__PURE__ */ new Date()).toISOString(),
      seo_title: "",
      seo_description: ""
    });
    setIsEditing(true);
  };
  const generateSlug = (text) => {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/^-+|-+$/g, "");
  };
  const generateSEO = () => {
    if (!currentPost) return;
    const title = currentPost.titulo ? `${currentPost.titulo} | IPAG` : "";
    const description = currentPost.resumo || (currentPost.conteudo ? currentPost.conteudo.substring(0, 160).replace(/<[^>]*>/g, "") : "");
    setCurrentPost({
      ...currentPost,
      seo_title: title.substring(0, 60),
      seo_description: description.substring(0, 160)
    });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;
    const {
      error: uploadError,
      data
    } = await supabase.storage.from("blog").upload(filePath, file);
    if (uploadError) {
      alert("Erro no upload: " + uploadError.message);
    } else {
      const {
        data: {
          publicUrl
        }
      } = supabase.storage.from("blog").getPublicUrl(filePath);
      setCurrentPost({
        ...currentPost,
        imagem_destaque: publicUrl
      });
    }
    setUploading(false);
  };
  const savePost = async () => {
    setLoading(true);
    const postToSave = {
      ...currentPost
    };
    if (!postToSave.slug && postToSave.titulo) {
      postToSave.slug = generateSlug(postToSave.titulo);
    }
    let error;
    if (postToSave.id) {
      const {
        error: err
      } = await supabase.from("posts").update(postToSave).eq("id", postToSave.id);
      error = err;
    } else {
      const {
        error: err
      } = await supabase.from("posts").insert([postToSave]);
      error = err;
    }
    if (error) {
      alert("Erro ao salvar: " + error.message);
    } else {
      setIsEditing(false);
      fetchPosts();
    }
    setLoading(false);
  };
  if (isEditing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[40px] border border-black/5 bg-background p-8 shadow-premium-utility space-y-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b pb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black uppercase tracking-tight", children: currentPost.id ? "Editar Artigo" : "Novo Artigo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Preencha os campos abaixo para publicar no blog." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => setIsEditing(false), className: "hover:bg-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "mr-2 h-4 w-4" }),
            " Cancelar"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: savePost, disabled: loading, className: "gf-button-primary", children: [
            loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "mr-2 h-4 w-4" }),
            "Salvar Artigo"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Título do Post" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: currentPost.titulo, onChange: (e) => setCurrentPost({
                ...currentPost,
                titulo: e.target.value
              }), placeholder: "Ex: Como a música ajuda no desenvolvimento...", className: "text-lg font-bold" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Slug (URL amigável)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: currentPost.slug, onChange: (e) => setCurrentPost({
                  ...currentPost,
                  slug: e.target.value
                }), placeholder: "como-a-musica-ajuda" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", onClick: () => setCurrentPost({
                  ...currentPost,
                  slug: generateSlug(currentPost.titulo)
                }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-4 w-4" }) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Conteúdo Completo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: currentPost.conteudo, onChange: (e) => setCurrentPost({
              ...currentPost,
              conteudo: e.target.value
            }), rows: 25, className: "font-mono text-sm leading-relaxed resize-y min-h-[400px]", placeholder: "Escreva seu artigo aqui... HTML é suportado." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 border rounded-2xl p-6 bg-muted/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-black uppercase tracking-widest flex items-center gap-2 border-b pb-3 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-4 w-4 text-primary" }),
              " Publicação"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase text-muted-foreground", children: "Categoria" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-6 w-6", onClick: handleAddCategory, title: "Adicionar Categoria", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }) }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: currentPost.categoria, onValueChange: (v) => setCurrentPost({
                    ...currentPost,
                    categoria: v
                  }), children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: cat.nome, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between w-full gap-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cat.nome }) }) }, cat.id)) })
                  ] }),
                  currentPost.categoria && categories.find((c) => c.nome === currentPost.categoria) && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-10 w-10 text-destructive hover:bg-destructive/10", onClick: () => {
                    const cat = categories.find((c) => c.nome === currentPost.categoria);
                    if (cat) handleDeleteCategory(cat.id, cat.nome);
                  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase text-muted-foreground", children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: currentPost.status, onValueChange: (v) => setCurrentPost({
                  ...currentPost,
                  status: v
                }), children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "rascunho", children: "Rascunho" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "publicado", children: "Publicado" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "arquivado", children: "Arquivado" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase text-muted-foreground", children: "Autor" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: currentPost.autor, onChange: (e) => setCurrentPost({
                  ...currentPost,
                  autor: e.target.value
                }) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 border rounded-2xl p-6 bg-muted/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-black uppercase tracking-widest flex items-center gap-2 border-b pb-3 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-4 w-4 text-primary" }),
              " Mídia"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase text-muted-foreground", children: "Imagem de Destaque" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-video w-full rounded-xl border-2 border-dashed border-border overflow-hidden bg-muted flex flex-col items-center justify-center gap-3 relative group", children: [
                currentPost.imagem_destaque ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: currentPost.imagem_destaque, className: "h-full w-full object-cover", alt: "Preview" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "secondary", size: "sm", onClick: () => fileInputRef.current?.click(), children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "mr-2 h-4 w-4" }),
                    " Trocar Imagem"
                  ] }) })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-8 w-8 mx-auto mb-2 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground", children: "Clique para fazer upload" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "mt-4", onClick: () => fileInputRef.current?.click(), disabled: uploading, children: uploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Selecionar Foto" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", ref: fileInputRef, className: "hidden", accept: "image/*", onChange: handleFileUpload })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: currentPost.imagem_destaque, onChange: (e) => setCurrentPost({
                ...currentPost,
                imagem_destaque: e.target.value
              }), placeholder: "Ou cole a URL da imagem aqui...", className: "text-xs mt-2" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 border rounded-2xl p-6 bg-primary/5 border-primary/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b pb-3 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-black uppercase tracking-widest flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-primary" }),
                " SEO"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: generateSEO, className: "h-8 text-[10px] font-black uppercase tracking-widest hover:bg-primary/10 text-primary", children: "Gerar Automático" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase text-muted-foreground", children: "SEO Title" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: currentPost.seo_title, onChange: (e) => setCurrentPost({
                  ...currentPost,
                  seo_title: e.target.value
                }), placeholder: "Título para buscadores" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase text-muted-foreground", children: "Resumo / SEO Description" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: currentPost.resumo, onChange: (e) => setCurrentPost({
                  ...currentPost,
                  resumo: e.target.value,
                  seo_description: e.target.value
                }), rows: 4, placeholder: "Descrição para buscadores e redes sociais..." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground italic text-right", children: "Mantenha abaixo de 160 caracteres." })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[40px] bg-white border border-black/5 p-8 shadow-premium-utility animate-in fade-in duration-500", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-10 border-b border-black/5 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black uppercase tracking-tight text-[#2A2A2B]", children: "Gestão do Blog" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#8E8E8F]", children: "Crie, edite e gerencie os artigos do IPAG com facilidade." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleCreate, className: "gf-button-primary shadow-warm-utility hover:scale-105 transition-transform", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
        " Novo Post"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-black/5 text-[10px] font-black uppercase tracking-[0.2em] text-[#8E8E8F]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-4 pr-4", children: "Artigo / Título" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-4 pr-4", children: "Categoria" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-4 pr-4", children: "Publicação" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-4 pr-4", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-4 text-right", children: "Ações" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-border", children: [
        posts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "group hover:bg-[#F7F8FA] transition-all duration-200 border-b border-black/[0.03] last:border-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-5 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-20 shrink-0 rounded-2xl overflow-hidden bg-[#F7F8FA] border border-black/5 shadow-sm", children: p.imagem_destaque ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.imagem_destaque, className: "h-full w-full object-cover group-hover:scale-110 transition-transform duration-500", alt: "" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-5 w-5 opacity-20" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black text-sm text-[#2A2A2B] truncate uppercase tracking-tight group-hover:text-primary transition-colors", children: p.titulo }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-bold text-[#8E8E8F] truncate italic flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-3 w-3" }),
                " /",
                p.slug
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-5 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl bg-primary/10 text-primary border border-primary/20", children: p.categoria }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-5 pr-4 text-xs font-bold text-[#8E8E8F]", children: new Date(p.data_publicacao).toLocaleDateString("pt-BR") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-5 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-2 w-2 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.1)] ${p.status === "publicado" ? "bg-green-500 shadow-green-500/50" : p.status === "rascunho" ? "bg-yellow-500 shadow-yellow-500/50" : "bg-[#8E8E8F]"}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase tracking-widest text-[#2A2A2B] opacity-70", children: p.status })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-5 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => handleEdit(p), className: "h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => deletePost(p.id), className: "h-9 w-9 rounded-xl text-destructive hover:bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
          ] }) })
        ] }, p.id)),
        posts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "py-12 text-center text-muted-foreground italic", children: "Nenhum post encontrado." }) })
      ] })
    ] }) })
  ] });
}
export {
  AdminBlog as component
};
