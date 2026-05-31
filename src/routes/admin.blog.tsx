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
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase.from("posts").select("*").order("data_publicacao", { ascending: false });
    if (data) setPosts(data);
  };

  const deletePost = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir?")) return;
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
      categoria: "Social",
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

  const savePost = async () => {
    setLoading(true);
    const postToSave = { ...currentPost };
    
    // Ensure slug is generated if missing
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
      <div className="rounded-2xl border border-border bg-background p-8 shadow-card-utility space-y-8 max-w-5xl mx-auto">
        <div className="flex items-center justify-between border-b pb-4">
          <h1 className="text-2xl font-black uppercase tracking-tight">
            {currentPost.id ? "Editar Post" : "Novo Post"}
          </h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}><X className="mr-2 h-4 w-4" /> Cancelar</Button>
            <Button size="sm" onClick={savePost} disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Salvar Post
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Título do Post</Label>
              <Input 
                value={currentPost.titulo} 
                onChange={(e) => setCurrentPost({...currentPost, titulo: e.target.value})}
                placeholder="Ex: Como a música ajuda..."
              />
            </div>

            <div className="space-y-2">
              <Label>Slug (URL amigável)</Label>
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select value={currentPost.categoria} onValueChange={(v) => setCurrentPost({...currentPost, categoria: v})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Educação">Educação</SelectItem>
                    <SelectItem value="Social">Social</SelectItem>
                    <SelectItem value="Música e cultura">Música e cultura</SelectItem>
                    <SelectItem value="Solidariedade">Solidariedade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={currentPost.status} onValueChange={(v) => setCurrentPost({...currentPost, status: v})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rascunho">Rascunho</SelectItem>
                    <SelectItem value="publicado">Publicado</SelectItem>
                    <SelectItem value="arquivado">Arquivado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Autor</Label>
              <Input value={currentPost.autor} onChange={(e) => setCurrentPost({...currentPost, autor: e.target.value})} />
            </div>

            <div className="space-y-2">
              <Label>Imagem de Destaque (URL)</Label>
              <div className="flex gap-2">
                <Input value={currentPost.imagem_destaque} onChange={(e) => setCurrentPost({...currentPost, imagem_destaque: e.target.value})} placeholder="https://..." />
                <div className="h-10 w-10 shrink-0 rounded border overflow-hidden bg-muted">
                  {currentPost.imagem_destaque && <img src={currentPost.imagem_destaque} className="h-full w-full object-cover" alt="Preview" />}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Resumo Curto (Excerpt)</Label>
              <Textarea 
                value={currentPost.resumo} 
                onChange={(e) => setCurrentPost({...currentPost, resumo: e.target.value})} 
                rows={3}
                placeholder="Uma breve descrição que aparece na listagem..."
              />
            </div>

            <div className="space-y-4 border rounded-xl p-4 bg-muted/30">
              <h3 className="text-sm font-bold uppercase flex items-center gap-2"><Globe className="h-4 w-4" /> Configurações de SEO</h3>
              <div className="space-y-2">
                <Label className="text-xs">SEO Title</Label>
                <Input value={currentPost.seo_title} onChange={(e) => setCurrentPost({...currentPost, seo_title: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">SEO Description</Label>
                <Textarea value={currentPost.seo_description} onChange={(e) => setCurrentPost({...currentPost, seo_description: e.target.value})} rows={2} />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Conteúdo Completo (HTML aceito)</Label>
          <Textarea 
            value={currentPost.conteudo} 
            onChange={(e) => setCurrentPost({...currentPost, conteudo: e.target.value})} 
            rows={15}
            className="font-mono text-sm"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-background p-6 shadow-card-utility">
      <div className="flex items-center justify-between mb-8 border-b pb-6">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight">Gestão do Blog</h1>
          <p className="text-sm text-muted-foreground">Crie, edite e gerencie os artigos do IPAG.</p>
        </div>
        <Button onClick={handleCreate} className="gf-button-primary"><Plus className="mr-2 h-4 w-4" /> Novo Post</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-xs font-black uppercase tracking-widest text-muted-foreground">
              <th className="pb-4 pr-4">Post</th>
              <th className="pb-4 pr-4">Categoria</th>
              <th className="pb-4 pr-4">Data</th>
              <th className="pb-4 pr-4">Status</th>
              <th className="pb-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {posts.map((p) => (
              <tr key={p.id} className="group hover:bg-muted/50 transition-colors">
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-16 shrink-0 rounded-lg overflow-hidden bg-muted shadow-sm">
                      {p.imagem_destaque ? (
                        <img src={p.imagem_destaque} className="h-full w-full object-cover" alt="" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center"><ImageIcon className="h-4 w-4 opacity-20" /></div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-sm truncate uppercase tracking-tight">{p.titulo}</p>
                      <p className="text-[10px] text-muted-foreground truncate italic">{p.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 pr-4">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {p.categoria}
                  </span>
                </td>
                <td className="py-4 pr-4 text-xs font-medium">
                  {new Date(p.data_publicacao).toLocaleDateString('pt-BR')}
                </td>
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${p.status === 'publicado' ? 'bg-green-500' : p.status === 'rascunho' ? 'bg-yellow-500' : 'bg-gray-400'}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-70">{p.status}</span>
                  </div>
                </td>
                <td className="py-4 text-right">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(p)}><Edit2 className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => deletePost(p.id)} className="text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></Button>
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