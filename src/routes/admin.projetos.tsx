import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Plus, Trash2, Edit2, Loader2, Save, X, Globe, Image as ImageIcon,
  Upload, Settings, Star, FolderKanban,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/admin/projetos")({ component: AdminProjetos });

type Projeto = {
  id?: string;
  titulo: string;
  slug: string;
  resumo: string | null;
  conteudo: string | null;
  categoria: string | null;
  status: string;
  imagem_destaque: string | null;
  galeria: string[] | null;
  impacto: string | null;
  featured: boolean;
  ordem: number;
};

const CATEGORIAS = ["Cultura", "Educação", "Social", "Saúde", "Capacitação", "Vida"];

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/^-+|-+$/g, "");

function emptyProjeto(): Projeto {
  return {
    titulo: "", slug: "", resumo: "", conteudo: "", categoria: "Social",
    status: "publicado", imagem_destaque: "", galeria: [], impacto: "",
    featured: false, ordem: 0,
  };
}

function AdminProjetos() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [current, setCurrent] = useState<Projeto | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchProjetos(); }, []);

  const fetchProjetos = async () => {
    const { data, error } = await supabase
      .from("projetos").select("*")
      .order("ordem", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) alert(error.message);
    if (data) setProjetos(data as any);
  };

  const handleCreate = () => { setCurrent(emptyProjeto()); setIsEditing(true); };
  const handleEdit = (p: Projeto) => { setCurrent({ ...p, galeria: p.galeria || [] }); setIsEditing(true); };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este projeto definitivamente?")) return;
    const { error } = await supabase.from("projetos").delete().eq("id", id);
    if (error) return alert(error.message);
    setProjetos(projetos.filter(p => p.id !== id));
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !current) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `projetos/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("blog").upload(path, file);
    if (error) { alert("Erro no upload: " + error.message); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("blog").getPublicUrl(path);
    setCurrent({ ...current, imagem_destaque: publicUrl });
    setUploading(false);
  };

  const handleSave = async () => {
    if (!current) return;
    setLoading(true);
    const payload: any = { ...current };
    if (!payload.slug && payload.titulo) payload.slug = slugify(payload.titulo);
    if (!payload.titulo || !payload.slug) {
      alert("Título e slug são obrigatórios.");
      setLoading(false); return;
    }
    const { id, ...rest } = payload;
    const { error } = id
      ? await supabase.from("projetos").update(rest).eq("id", id)
      : await supabase.from("projetos").insert([rest]);
    if (error) alert("Erro ao salvar: " + error.message);
    else { setIsEditing(false); setCurrent(null); fetchProjetos(); }
    setLoading(false);
  };

  if (isEditing && current) {
    return (
      <div className="rounded-[40px] border border-black/5 bg-background p-8 shadow-premium-utility space-y-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight">
              {current.id ? "Editar Projeto" : "Novo Projeto"}
            </h1>
            <p className="text-sm text-muted-foreground">Preencha os dados do projeto social.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => { setIsEditing(false); setCurrent(null); }}>
              <X className="mr-2 h-4 w-4" /> Cancelar
            </Button>
            <Button size="sm" onClick={handleSave} disabled={loading} className="gf-button-primary">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Salvar
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Título</Label>
                <Input value={current.titulo}
                  onChange={(e) => setCurrent({ ...current, titulo: e.target.value })}
                  className="text-lg font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Slug</Label>
                <div className="flex gap-2">
                  <Input value={current.slug}
                    onChange={(e) => setCurrent({ ...current, slug: e.target.value })} />
                  <Button variant="outline" size="icon"
                    onClick={() => setCurrent({ ...current, slug: slugify(current.titulo) })}>
                    <Globe className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Resumo</Label>
              <Textarea rows={3} value={current.resumo || ""}
                onChange={(e) => setCurrent({ ...current, resumo: e.target.value })}
                placeholder="Descrição curta exibida nos cards..." />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Conteúdo Completo</Label>
              <Textarea rows={18} value={current.conteudo || ""}
                onChange={(e) => setCurrent({ ...current, conteudo: e.target.value })}
                className="font-mono text-sm leading-relaxed resize-y min-h-[300px]" />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Impacto</Label>
              <Input value={current.impacto || ""}
                onChange={(e) => setCurrent({ ...current, impacto: e.target.value })}
                placeholder="Ex: 150+ famílias atendidas" />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="space-y-6 border rounded-2xl p-6 bg-muted/20">
              <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 border-b pb-3">
                <Settings className="h-4 w-4 text-primary" /> Publicação
              </h3>

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase text-muted-foreground">Categoria</Label>
                <Select value={current.categoria || "Social"}
                  onValueChange={(v) => setCurrent({ ...current, categoria: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIAS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase text-muted-foreground">Status</Label>
                <Select value={current.status}
                  onValueChange={(v) => setCurrent({ ...current, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="publicado">Publicado</SelectItem>
                    <SelectItem value="rascunho">Rascunho</SelectItem>
                    <SelectItem value="arquivado">Arquivado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase text-muted-foreground">Ordem</Label>
                <Input type="number" value={current.ordem}
                  onChange={(e) => setCurrent({ ...current, ordem: Number(e.target.value) || 0 })} />
              </div>

              <div className="flex items-center justify-between rounded-xl bg-background border px-4 py-3">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  <Label className="text-xs font-bold uppercase">Destaque</Label>
                </div>
                <Switch checked={current.featured}
                  onCheckedChange={(v) => setCurrent({ ...current, featured: v })} />
              </div>
            </div>

            <div className="space-y-6 border rounded-2xl p-6 bg-muted/20">
              <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 border-b pb-3">
                <ImageIcon className="h-4 w-4 text-primary" /> Imagem de Destaque
              </h3>
              <div className="aspect-video w-full rounded-xl border-2 border-dashed border-border overflow-hidden bg-muted flex flex-col items-center justify-center gap-3 relative group">
                {current.imagem_destaque ? (
                  <>
                    <img src={current.imagem_destaque} className="h-full w-full object-cover" alt="Preview" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button variant="secondary" size="sm" onClick={() => fileRef.current?.click()}>
                        <Upload className="mr-2 h-4 w-4" /> Trocar
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-4">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <Button variant="outline" size="sm" className="mt-2"
                      onClick={() => fileRef.current?.click()} disabled={uploading}>
                      {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Selecionar Foto"}
                    </Button>
                  </div>
                )}
                <input type="file" ref={fileRef} className="hidden" accept="image/*" onChange={handleUpload} />
              </div>
              <Input value={current.imagem_destaque || ""}
                onChange={(e) => setCurrent({ ...current, imagem_destaque: e.target.value })}
                placeholder="Ou cole uma URL..." className="text-xs" />
            </div>
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[40px] bg-white border border-black/5 p-8 shadow-premium-utility animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-[#2A2A2B]">Gestão de Projetos</h1>
          <p className="text-sm font-medium text-[#8E8E8F]">Gerencie as iniciativas e projetos sociais do IPAG.</p>
        </div>
        <Button onClick={handleCreate} className="gf-button-primary shadow-warm-utility hover:scale-105 transition-transform w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Novo Projeto
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-black/5 text-[10px] font-black uppercase tracking-[0.2em] text-[#8E8E8F]">
              <th className="pb-4 pr-4">Projeto</th>
              <th className="pb-4 pr-4">Categoria</th>
              <th className="pb-4 pr-4">Status</th>
              <th className="pb-4 pr-4">Impacto</th>
              <th className="pb-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.03]">
            {projetos.map((p) => (
              <tr key={p.id} className="group hover:bg-[#F7F8FA] transition-all duration-200">
                <td className="py-5 pr-4">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 shrink-0 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden">
                      {p.imagem_destaque
                        ? <img src={p.imagem_destaque} alt="" className="h-full w-full object-cover" />
                        : <FolderKanban className="h-6 w-6 text-primary" />}
                    </div>
                    <div className="min-w-0">
                      <p className="font-black text-sm text-[#2A2A2B] truncate uppercase tracking-tight group-hover:text-primary transition-colors flex items-center gap-2">
                        {p.titulo}
                        {p.featured && <Star className="h-3 w-3 text-primary fill-primary" />}
                      </p>
                      <p className="text-[10px] font-bold text-[#8E8E8F] truncate italic">/projetos/{p.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="py-5 pr-4">
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                    {p.categoria || "—"}
                  </span>
                </td>
                <td className="py-5 pr-4">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border ${
                    p.status === "publicado"
                      ? "bg-green-500/10 text-green-600 border-green-500/20"
                      : "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="py-5 pr-4">
                  <p className="text-xs font-bold text-[#2A2A2B]">{p.impacto || "—"}</p>
                </td>
                <td className="py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary" onClick={() => handleEdit(p)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDelete(p.id!)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {projetos.length === 0 && (
              <tr><td colSpan={5} className="py-12 text-center text-sm text-muted-foreground">Nenhum projeto cadastrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
