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
    
    // Simple generation logic
    const title = currentPost.titulo ? `${currentPost.titulo} | IPAG` : "";
    const description = currentPost.resumo || 
      (currentPost.conteudo ? currentPost.conteudo.substring(0, 160).replace(/<[^>]*>/g, '') : "");
    
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

    const { error: uploadError, data } = await supabase.storage
      .from('blog')
      .upload(filePath, file);

    if (uploadError) {
      alert("Erro no upload: " + uploadError.message);
    } else {
      const { data: { publicUrl } } = supabase.storage
        .from('blog')
        .getPublicUrl(filePath);
      
      setCurrentPost({ ...currentPost, imagem_destaque: publicUrl });
    }
    setUploading(false);
  };

  const savePost = async () => {
    setLoading(true);
    const postToSave = { ...currentPost };
    
    if (!postToSave.slug && postToSave.titulo) {
      postToSave.slug = generateSlug(postToSave.titulo);
    }

    let error;
    if (postToSave.id) {
      const { error: err } = await supabase.from("posts").update(postToSave).eq("id", postToSave.id);
      error = err;
    } else {
      const { error: err } = await supabase.from("posts").insert([postToSave]);
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
    return (
      <div className="rounded-[40px] border border-black/5 bg-background p-8 shadow-premium-utility space-y-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight">
              {currentPost.id ? "Editar Artigo" : "Novo Artigo"}
            </h1>
            <p className="text-sm text-muted-foreground">Preencha os campos abaixo para publicar no blog.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsEditing(false)} className="hover:bg-muted"><X className="mr-2 h-4 w-4" /> Cancelar</Button>
            <Button size="sm" onClick={savePost} disabled={loading} className="gf-button-primary">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Salvar Artigo
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Título do Post</Label>
                <Input 
                  value={currentPost.titulo} 
                  onChange={(e) => setCurrentPost({...currentPost, titulo: e.target.value})}
                  placeholder="Ex: Como a música ajuda no desenvolvimento..."
                  className="text-lg font-bold"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Slug (URL amigável)</Label>
                <div className="flex gap-2">
                  <Input 
                    value={currentPost.slug} 
                    onChange={(e) => setCurrentPost({...currentPost, slug: e.target.value})}
                    placeholder="como-a-musica-ajuda"
                  />
                  <Button variant="outline" size="icon" onClick={() => setCurrentPost({...currentPost, slug: generateSlug(currentPost.titulo)})}>
                    <Globe className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Conteúdo Completo</Label>
              <Textarea 
                value={currentPost.conteudo} 
                onChange={(e) => setCurrentPost({...currentPost, conteudo: e.target.value})} 
                rows={25}
                className="font-mono text-sm leading-relaxed resize-y min-h-[400px]"
                placeholder="Escreva seu artigo aqui... HTML é suportado."
              />
            </div>
          </div>

          <aside className="space-y-8">
            <div className="space-y-6 border rounded-2xl p-6 bg-muted/20">
              <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 border-b pb-3 mb-4">
                <Settings className="h-4 w-4 text-primary" /> Publicação
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-bold uppercase text-muted-foreground">Categoria</Label>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleAddCategory} title="Adicionar Categoria">
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Select value={currentPost.categoria} onValueChange={(v) => setCurrentPost({...currentPost, categoria: v})}>
                      <SelectTrigger className="flex-1"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat.id} value={cat.nome}>
                            <div className="flex items-center justify-between w-full gap-8">
                              <span>{cat.nome}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {currentPost.categoria && categories.find(c => c.nome === currentPost.categoria) && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-10 w-10 text-destructive hover:bg-destructive/10" 
                        onClick={() => {
                          const cat = categories.find(c => c.nome === currentPost.categoria);
                          if (cat) handleDeleteCategory(cat.id, cat.nome);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-muted-foreground">Status</Label>
                  <Select value={currentPost.status} onValueChange={(v) => setCurrentPost({...currentPost, status: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rascunho">Rascunho</SelectItem>
                      <SelectItem value="publicado">Publicado</SelectItem>
                      <SelectItem value="arquivado">Arquivado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-muted-foreground">Autor</Label>
                  <Input value={currentPost.autor} onChange={(e) => setCurrentPost({...currentPost, autor: e.target.value})} />
                </div>
              </div>
            </div>

            <div className="space-y-6 border rounded-2xl p-6 bg-muted/20">
              <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 border-b pb-3 mb-4">
                <ImageIcon className="h-4 w-4 text-primary" /> Mídia
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-muted-foreground">Imagem de Destaque</Label>
                  <div className="aspect-video w-full rounded-xl border-2 border-dashed border-border overflow-hidden bg-muted flex flex-col items-center justify-center gap-3 relative group">
                    {currentPost.imagem_destaque ? (
                      <>
                        <img src={currentPost.imagem_destaque} className="h-full w-full object-cover" alt="Preview" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()}>
                            <Upload className="mr-2 h-4 w-4" /> Trocar Imagem
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-4">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-xs font-medium text-muted-foreground">Clique para fazer upload</p>
                        <Button variant="outline" size="sm" className="mt-4" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Selecionar Foto"}
                        </Button>
                      </div>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleFileUpload}
                    />
                  </div>
                  <Input 
                    value={currentPost.imagem_destaque} 
                    onChange={(e) => setCurrentPost({...currentPost, imagem_destaque: e.target.value})} 
                    placeholder="Ou cole a URL da imagem aqui..." 
                    className="text-xs mt-2"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6 border rounded-2xl p-6 bg-primary/5 border-primary/20">
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" /> SEO
                </h3>
                <Button variant="ghost" size="sm" onClick={generateSEO} className="h-8 text-[10px] font-black uppercase tracking-widest hover:bg-primary/10 text-primary">
                  Gerar Automático
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-muted-foreground">SEO Title</Label>
                  <Input 
                    value={currentPost.seo_title} 
                    onChange={(e) => setCurrentPost({...currentPost, seo_title: e.target.value})}
                    placeholder="Título para buscadores"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-muted-foreground">Resumo / SEO Description</Label>
                  <Textarea 
                    value={currentPost.resumo} 
                    onChange={(e) => setCurrentPost({...currentPost, resumo: e.target.value, seo_description: e.target.value})} 
                    rows={4} 
                    placeholder="Descrição para buscadores e redes sociais..."
                  />
                  <p className="text-[10px] text-muted-foreground italic text-right">Mantenha abaixo de 160 caracteres.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[40px] bg-white border border-black/5 p-8 shadow-premium-utility animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-10 border-b border-black/5 pb-6">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-[#2A2A2B]">Gestão do Blog</h1>
          <p className="text-sm font-medium text-[#8E8E8F]">Crie, edite e gerencie os artigos do IPAG com facilidade.</p>
        </div>
        <Button onClick={handleCreate} className="gf-button-primary shadow-warm-utility hover:scale-105 transition-transform">
          <Plus className="mr-2 h-4 w-4" /> Novo Post
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-black/5 text-[10px] font-black uppercase tracking-[0.2em] text-[#8E8E8F]">
              <th className="pb-4 pr-4">Artigo / Título</th>
              <th className="pb-4 pr-4">Categoria</th>
              <th className="pb-4 pr-4">Publicação</th>
              <th className="pb-4 pr-4">Status</th>
              <th className="pb-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {posts.map((p) => (
              <tr key={p.id} className="group hover:bg-[#F7F8FA] transition-all duration-200 border-b border-black/[0.03] last:border-0">
                <td className="py-5 pr-4">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-20 shrink-0 rounded-2xl overflow-hidden bg-[#F7F8FA] border border-black/5 shadow-sm">
                      {p.imagem_destaque ? (
                        <img src={p.imagem_destaque} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center"><ImageIcon className="h-5 w-5 opacity-20" /></div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-black text-sm text-[#2A2A2B] truncate uppercase tracking-tight group-hover:text-primary transition-colors">{p.titulo}</p>
                      <p className="text-[10px] font-bold text-[#8E8E8F] truncate italic flex items-center gap-1">
                        <Globe className="h-3 w-3" /> /{p.slug}
                      </p>
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
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.1)] ${p.status === 'publicado' ? 'bg-green-500 shadow-green-500/50' : p.status === 'rascunho' ? 'bg-yellow-500 shadow-yellow-500/50' : 'bg-[#8E8E8F]'}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#2A2A2B] opacity-70">{p.status}</span>
                  </div>
                </td>
                <td className="py-5 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleEdit(p)}
                      className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => deletePost(p.id)} 
                      className="h-9 w-9 rounded-xl text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="py-12 text-center text-muted-foreground italic">Nenhum post encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}