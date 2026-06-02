import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Edit2, Loader2, Save, X, Globe, FileText, Image as ImageIcon, Upload, Sparkles, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin/blog")({ component: AdminBlog });

function AdminBlog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase.from("posts").select("*").order("data_publicacao", { ascending: false });
    if (data) setPosts(data);
  };

  const fetchCategories = async () => {
    const { data } = await supabase.from("blog_categories").select("*").order("nome");
    if (data) setCategories(data);
  };

  const handleAddCategory = async () => {
    const nome = prompt("Nome da nova categoria:");
    if (!nome) return;
    const { error } = await supabase.from("blog_categories").insert([{ nome }]);
    if (error) alert(error.message);
    else fetchCategories();
  };

  const handleDeleteCategory = async (id: string, nome: string) => {
    if (!confirm(`Excluir a categoria "${nome}"?`)) return;
    const { error } = await supabase.from("blog_categories").delete().eq("id", id);
    if (error) alert(error.message);
    else fetchCategories();
  };

  const deletePost = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este post?")) return;
    await supabase.from("posts").delete().eq("id", id);
    setPosts(posts.filter(p => p.id !== id));
  };

  const handleEdit = (post: any) => {
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
      data_publicacao: new Date().toISOString(),
      seo_title: "",
      seo_description: ""
    });
    setIsEditing(true);
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const generateSEO = () => {
    if (!currentPost) return;
    const title = currentPost.titulo ? `${currentPost.titulo} | IPAG` : "";
    const description = currentPost.resumo || (currentPost.conteudo ? currentPost.conteudo.substring(0, 160).replace(/<[^>]*>/g, '') : "");
    setCurrentPost({
      ...currentPost,
      seo_title: title.substring(0, 60),
      seo_description: description.substring(0, 160)
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;
    const { error: uploadError } = await supabase.storage.from('blog').upload(filePath, file);
    if (uploadError) {
      alert("Erro no upload: " + uploadError.message);
    } else {
      const { data: { publicUrl } } = supabase.storage.from('blog').getPublicUrl(filePath);
      setCurrentPost({ ...currentPost, imagem_destaque: publicUrl });
    }
    setUploading(false);
  };

  const savePost = async () => {
    setLoading(true);
    const postToSave = { ...currentPost };
    if (!postToSave.slug && postToSave.titulo) postToSave.slug = generateSlug(postToSave.titulo);
    let error;
    if (postToSave.id) {
      const { error: err } = await supabase.from("posts").update(postToSave).eq("id", postToSave.id);
      error = err;
    } else {
      const { error: err } = await supabase.from("posts").insert([postToSave]);
      error = err;
    }
    if (error) alert("Erro ao salvar: " + error.message);
    else { setIsEditing(false); fetchPosts(); }
    setLoading(false);
  };

  if (isEditing) {
    return (
      <div className="rounded-[32px] sm:rounded-[40px] border border-black/5 bg-background p-4 sm:p-8 shadow-premium-utility space-y-6 sm:space-y-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 sm:pb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
              {currentPost.id ? "Editar Artigo" : "Novo Artigo"}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Preencha os campos para publicar.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button size="lg" onClick={savePost} disabled={loading} className="gf-button-primary w-full sm:w-auto h-12 text-base order-first sm:order-last">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
              Salvar Artigo
            </Button>
            <Button variant="outline" size="lg" onClick={() => setIsEditing(false)} className="w-full sm:w-auto h-12 text-base">
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
                  <div className="flex gap-2">
                    <Select value={currentPost.categoria} onValueChange={(v) => setCurrentPost({...currentPost, categoria: v})}>
                      <SelectTrigger className="flex-1 h-12 text-base"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat.id} value={cat.nome}>{cat.nome}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Status</Label>
                  <Select value={currentPost.status} onValueChange={(v) => setCurrentPost({...currentPost, status: v})}>
                    <SelectTrigger className="h-12 text-base"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rascunho">Rascunho</SelectItem>
                      <SelectItem value="publicado">Publicado</SelectItem>
                      <SelectItem value="arquivado">Arquivado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Autor</Label>
                  <Input value={currentPost.autor} onChange={(e) => setCurrentPost({...currentPost, autor: e.target.value})} className="h-12 text-base" />
                </div>
              </div>
            </div>

            <div className="space-y-6 border rounded-2xl p-5 bg-muted/20">
              <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 border-b pb-3 mb-4">
                <ImageIcon className="h-4 w-4 text-primary" /> Mídia
              </h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Imagem de Destaque</Label>
                  <div className="aspect-video w-full rounded-xl border-2 border-dashed border-border overflow-hidden bg-muted flex flex-col items-center justify-center gap-3 relative group">
                    {currentPost.imagem_destaque ? (
                      <img src={currentPost.imagem_destaque} className="h-full w-full object-cover" alt="Preview" />
                    ) : (
                      <div className="text-center p-4">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploading} className="min-h-[44px]">
                          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Selecionar Foto"}
                        </Button>
                      </div>
                    )}
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Título do Post</Label>
                <Input value={currentPost.titulo} onChange={(e) => setCurrentPost({...currentPost, titulo: e.target.value})} className="h-12 text-base font-bold" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Slug (URL)</Label>
                <div className="flex gap-2">
                  <Input value={currentPost.slug} onChange={(e) => setCurrentPost({...currentPost, slug: e.target.value})} className="h-12 text-base" />
                  <Button variant="outline" size="icon" onClick={() => setCurrentPost({...currentPost, slug: generateSlug(currentPost.titulo)})} className="h-12 w-12 shrink-0"><Globe className="h-5 w-5" /></Button>
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Conteúdo Completo</Label>
              <Textarea value={currentPost.conteudo} onChange={(e) => setCurrentPost({...currentPost, conteudo: e.target.value})} rows={10} className="text-base leading-relaxed min-h-[300px]" />
            </div>
            <div className="space-y-6 border rounded-2xl p-5 bg-primary/5 border-primary/20">
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" /> SEO
                </h3>
                <Button variant="ghost" size="sm" onClick={generateSEO} className="h-10 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/10">Gerar Automático</Button>
              </div>
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">SEO Title</Label>
                  <Input value={currentPost.seo_title} onChange={(e) => setCurrentPost({...currentPost, seo_title: e.target.value})} className="h-12 text-base" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Resumo / Descrição</Label>
                  <Textarea value={currentPost.resumo} onChange={(e) => setCurrentPost({...currentPost, resumo: e.target.value, seo_description: e.target.value})} rows={4} className="text-base" />
                </div>
              </div>
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
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#2A2A2B]">Gestão do Blog</h1>
          <p className="text-xs sm:text-sm font-medium text-[#8E8E8F]">Gerencie os artigos do IPAG.</p>
        </div>
        <Button onClick={handleCreate} className="gf-button-primary shadow-warm-utility w-full sm:w-auto h-12 text-base">
          <Plus className="mr-2 h-5 w-5" /> Novo Post
        </Button>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-black/5 text-[10px] font-black uppercase tracking-[0.2em] text-[#8E8E8F]">
              <th className="pb-4 pr-4">Artigo / Título</th>
              <th className="pb-4 pr-4">Categoria</th>
              <th className="pb-4 pr-4">Data</th>
              <th className="pb-4 pr-4">Status</th>
              <th className="pb-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {posts.map((p) => (
              <tr key={p.id} className="group hover:bg-[#F7F8FA] transition-all duration-200 border-b border-black/[0.03] last:border-0">
                <td className="py-5 pr-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-16 shrink-0 rounded-xl overflow-hidden bg-[#F7F8FA] border border-black/5">
                      {p.imagem_destaque ? (
                        <img src={p.imagem_destaque} className="h-full w-full object-cover" alt="" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center"><ImageIcon className="h-4 w-4 opacity-20" /></div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-black text-sm text-[#2A2A2B] truncate uppercase tracking-tight">{p.titulo}</p>
                      <p className="text-[10px] font-bold text-[#8E8E8F] truncate uppercase tracking-widest">/{p.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="py-5 pr-4">
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                    {p.categoria}
                  </span>
                </td>
                <td className="py-5 pr-4 text-xs font-bold text-[#8E8E8F]">
                  {new Date(p.data_publicacao).toLocaleDateString('pt-BR')}
                </td>
                <td className="py-5 pr-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#2A2A2B] opacity-70">{p.status}</span>
                </td>
                <td className="py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(p)} className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary"><Edit2 className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => deletePost(p.id)} className="h-10 w-10 rounded-xl text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-4">
        {posts.map((p) => (
          <div key={p.id} className="bg-[#F7F8FA] rounded-2xl p-4 border border-black/5 shadow-sm space-y-4">
            <div className="flex gap-4">
              <div className="h-20 w-24 shrink-0 rounded-xl overflow-hidden bg-white border border-black/5">
                {p.imagem_destaque ? (
                  <img src={p.imagem_destaque} className="h-full w-full object-cover" alt="" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center"><ImageIcon className="h-6 w-6 opacity-20" /></div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20 inline-block mb-1">
                  {p.categoria}
                </span>
                <h3 className="font-black text-sm text-[#2A2A2B] line-clamp-2 leading-tight uppercase tracking-tight">{p.titulo}</h3>
                <p className="text-[10px] font-bold text-[#8E8E8F] mt-1">{new Date(p.data_publicacao).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
            <div className="flex gap-2 pt-2 border-t border-black/5">
              <Button onClick={() => handleEdit(p)} variant="outline" className="flex-1 h-11 text-xs font-black uppercase tracking-widest bg-white">
                <Edit2 className="mr-2 h-4 w-4" /> Editar
              </Button>
              <Button onClick={() => deletePost(p.id)} variant="ghost" className="h-11 w-11 shrink-0 rounded-xl text-destructive hover:bg-destructive/10 border border-black/5">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="py-12 text-center text-muted-foreground italic">Nenhum post encontrado.</div>
      )}
    </div>
  );
}