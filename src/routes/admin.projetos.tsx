import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Edit2, Loader2, Save, X, Globe, Image as ImageIcon, Upload, Settings, Star, FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/^-+|-+$/g, "");

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
    const { data } = await supabase.from("projetos").select("*").order("ordem", { ascending: true });
    if (data) setProjetos(data as any);
  };

  const handleCreate = () => { setCurrent(emptyProjeto()); setIsEditing(true); };
  const handleEdit = (p: Projeto) => { setCurrent({ ...p, galeria: p.galeria || [] }); setIsEditing(true); };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este projeto definitivamente?")) return;
    await supabase.from("projetos").delete().eq("id", id);
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
    const { id, ...rest } = payload;
    let error;
    if (id) {
        const { error: err } = await supabase.from("projetos").update(rest).eq("id", id);
        error = err;
    } else {
        const { error: err } = await supabase.from("projetos").insert([rest]);
        error = err;
    }
    if (error) alert("Erro ao salvar: " + error.message);
    else { setIsEditing(false); setCurrent(null); fetchProjetos(); }
    setLoading(false);
  };

  if (isEditing && current) {
    return (
      <div className="rounded-[32px] sm:rounded-[40px] border border-black/5 bg-background p-4 sm:p-8 shadow-premium-utility space-y-6 sm:space-y-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 sm:pb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
              {current.id ? "Editar Projeto" : "Novo Projeto"}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Preencha os dados do projeto.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button size="lg" onClick={handleSave} disabled={loading} className="gf-button-primary w-full sm:w-auto h-12 text-base order-first sm:order-last">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
              Salvar Projeto
            </Button>
            <Button variant="outline" size="lg" onClick={() => { setIsEditing(false); setCurrent(null); }} className="w-full sm:w-auto h-12 text-base">
              <X className="mr-2 h-5 w-5" /> Cancelar
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
          <aside className="order-first lg:order-last space-y-6">
            <div className="space-y-6 border rounded-2xl p-5 bg-muted/20">
              <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 border-b pb-3 mb-4">
                <Settings className="h-4 w-4 text-primary" /> Publicação
              </h3>
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Categoria</Label>
                  <Select value={current.categoria || "Social"} onValueChange={(v) => setCurrent({ ...current, categoria: v })}>
                    <SelectTrigger className="h-12 text-base"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {CATEGORIAS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Status</Label>
                  <Select value={current.status} onValueChange={(v) => setCurrent({ ...current, status: v })}>
                    <SelectTrigger className="h-12 text-base"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="publicado">Publicado</SelectItem>
                      <SelectItem value="rascunho">Rascunho</SelectItem>
                      <SelectItem value="arquivado">Arquivado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-background border px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    <Label className="text-xs font-bold uppercase">Destaque</Label>
                  </div>
                  <Switch checked={current.featured} onCheckedChange={(v) => setCurrent({ ...current, featured: v })} />
                </div>
              </div>
            </div>

            <div className="space-y-6 border rounded-2xl p-5 bg-muted/20">
              <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 border-b pb-3 mb-4">
                <ImageIcon className="h-4 w-4 text-primary" /> Mídia
              </h3>
              <div className="space-y-4">
                <Label className="text-sm font-medium">Imagem de Destaque</Label>
                <div className="aspect-video w-full rounded-xl border-2 border-dashed border-border overflow-hidden bg-muted flex flex-col items-center justify-center gap-3 relative group">
                  {current.imagem_destaque ? (
                    <img src={current.imagem_destaque} className="h-full w-full object-cover" alt="Preview" />
                  ) : (
                    <div className="text-center p-4">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()} disabled={uploading} className="min-h-[44px]">
                        {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Selecionar Foto"}
                      </Button>
                    </div>
                  )}
                  <input type="file" ref={fileRef} className="hidden" accept="image/*" onChange={handleUpload} />
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Título</Label>
                <Input value={current.titulo} onChange={(e) => setCurrent({ ...current, titulo: e.target.value })} className="h-12 text-base font-bold" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Slug (URL)</Label>
                <div className="flex gap-2">
                  <Input value={current.slug} onChange={(e) => setCurrent({ ...current, slug: e.target.value })} className="h-12 text-base" />
                  <Button variant="outline" size="icon" onClick={() => setCurrent({ ...current, slug: slugify(current.titulo) })} className="h-12 w-12 shrink-0"><Globe className="h-5 w-5" /></Button>
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Resumo</Label>
              <Textarea rows={3} value={current.resumo || ""} onChange={(e) => setCurrent({ ...current, resumo: e.target.value })} className="text-base" placeholder="Breve descrição do projeto..." />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Conteúdo Completo</Label>
              <Textarea rows={10} value={current.conteudo || ""} onChange={(e) => setCurrent({ ...current, conteudo: e.target.value })} className="text-base min-h-[300px]" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Impacto</Label>
              <Input value={current.impacto || ""} onChange={(e) => setCurrent({ ...current, impacto: e.target.value })} className="h-12 text-base" placeholder="Ex: 500+ atendimentos" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[32px] sm:rounded-[40px] bg-white border border-black/5 p-4 sm:p-8 shadow-premium-utility animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 sm:mb-10 border-b border-black/5 pb-6 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#2A2A2B]">Gestão de Projetos</h1>
          <p className="text-xs sm:text-sm font-medium text-[#8E8E8F]">Gerencie os projetos sociais do IPAG.</p>
        </div>
        <Button onClick={handleCreate} className="gf-button-primary shadow-warm-utility w-full sm:w-auto h-12 text-base">
          <Plus className="mr-2 h-5 w-5" /> Novo Projeto
        </Button>
      </div>

      <div className="hidden sm:block overflow-x-auto">
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
                    <div className="h-12 w-12 shrink-0 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden">
                      {p.imagem_destaque ? <img src={p.imagem_destaque} alt="" className="h-full w-full object-cover" /> : <FolderKanban className="h-5 w-5 text-primary" />}
                    </div>
                    <div className="min-w-0">
                      <p className="font-black text-sm text-[#2A2A2B] truncate uppercase tracking-tight flex items-center gap-2">
                        {p.titulo}
                        {p.featured && <Star className="h-3 w-3 text-primary fill-primary" />}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-5 pr-4">
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl bg-primary/10 text-primary">
                    {p.categoria}
                  </span>
                </td>
                <td className="py-5 pr-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#2A2A2B] opacity-70">{p.status}</span>
                </td>
                <td className="py-5 pr-4 text-xs font-bold text-[#8E8E8F]">{p.impacto || "—"}</td>
                <td className="py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(p)} className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary"><Edit2 className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id!)} className="h-10 w-10 rounded-xl text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden space-y-4">
        {projetos.map((p) => (
          <div key={p.id} className="bg-[#F7F8FA] rounded-2xl p-4 border border-black/5 shadow-sm space-y-4">
            <div className="flex gap-4">
              <div className="h-20 w-24 shrink-0 rounded-xl overflow-hidden bg-white border border-black/5">
                {p.imagem_destaque ? <img src={p.imagem_destaque} className="h-full w-full object-cover" alt="" /> : <div className="h-full w-full flex items-center justify-center bg-primary/10"><FolderKanban className="h-8 w-8 text-primary" /></div>}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20">
                    {p.categoria}
                    </span>
                    {p.featured && <Star className="h-3 w-3 text-primary fill-primary" />}
                </div>
                <h3 className="font-black text-sm text-[#2A2A2B] line-clamp-2 leading-tight uppercase tracking-tight">{p.titulo}</h3>
                <p className="text-[10px] font-bold text-primary mt-1">{p.impacto}</p>
              </div>
            </div>
            <div className="flex gap-2 pt-2 border-t border-black/5">
              <Button onClick={() => handleEdit(p)} variant="outline" className="flex-1 h-11 text-xs font-black uppercase tracking-widest bg-white">
                <Edit2 className="mr-2 h-4 w-4" /> Editar
              </Button>
              <Button onClick={() => handleDelete(p.id!)} variant="ghost" className="h-11 w-11 shrink-0 rounded-xl text-destructive hover:bg-destructive/10 border border-black/5">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {projetos.length === 0 && (
        <div className="py-12 text-center text-muted-foreground italic">Nenhum projeto encontrado.</div>
      )}
    </div>
  );
}