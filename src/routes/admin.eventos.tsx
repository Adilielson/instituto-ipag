import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search, Calendar, MapPin, Edit2, Trash2, Loader2, X, Image as ImageIcon, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { FileUpload } from "@/components/admin/FileUpload";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/eventos")({ 
  component: AdminEventos 
});

function AdminEventos() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvento, setEditingEvento] = useState<any>(null);

  const [formData, setFormData] = useState({
    titulo: "",
    data_evento: "",
    local: "",
    descricao: "",
    status: "publicado",
    imagem_destaque: "",
    galeria: [] as string[],
    video_url: ""
  });

  const { data: eventos, isLoading } = useQuery({
    queryKey: ["eventos"],
    queryFn: async () => {
      const { data, error } = await supabase.from("eventos").select("*").order("data_evento", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { data: result, error } = await supabase.from("eventos").insert([data]).select().single();
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventos"] });
      toast.success("Evento criado com sucesso!");
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error: any) => {
      toast.error(`Erro: ${error.message}`);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      const { id, ...updates } = data;
      const { data: result, error } = await supabase.from("eventos").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventos"] });
      toast.success("Evento atualizado!");
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error: any) => {
      toast.error(`Erro: ${error.message}`);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("eventos").delete().eq("id", id);
      if (error) throw error;
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventos"] });
      toast.success("Evento excluído!");
    }
  });

  const resetForm = () => {
    setFormData({
      titulo: "", data_evento: "", local: "", descricao: "", status: "publicado",
      imagem_destaque: "", galeria: [], video_url: ""
    });
    setEditingEvento(null);
  };

  const handleEdit = (evento: any) => {
    setEditingEvento(evento);
    let formattedDate = "";
    if (evento.data_evento) {
      const date = new Date(evento.data_evento);
      const offset = date.getTimezoneOffset() * 60000;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w ]+/g, '').replace(/ +/g, '-');
    let formattedDate = formData.data_evento;
    if (formData.data_evento && !formData.data_evento.includes('Z')) {
      formattedDate = new Date(formData.data_evento).toISOString();
    }
    const payload = { ...formData, data_evento: formattedDate, slug };
    if (editingEvento) updateMutation.mutate({ id: editingEvento.id, ...payload });
    else createMutation.mutate(payload);
  };

  const filteredEventos = useMemo(() => {
    if (!eventos) return [];
    return eventos.filter((e: any) => 
      e.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.local.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [eventos, searchTerm]);

  return (
    <div className="rounded-[32px] sm:rounded-[40px] bg-white border border-black/5 p-4 sm:p-8 shadow-premium-utility animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 sm:mb-10 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#2A2A2B]">Calendário de Eventos</h1>
          <p className="text-xs sm:text-sm font-medium text-[#8E8E8F]">Gerencie os workshops e concertos.</p>
        </div>
        <Button onClick={() => { resetForm(); setIsDialogOpen(true); }} className="gf-button-primary shadow-warm-utility w-full sm:w-auto h-12 text-base">
          <Plus className="mr-2 h-5 w-5" /> Novo Evento
        </Button>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8E8E8F]" />
        <Input 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar eventos..." 
          className="pl-10 h-12 bg-[#F7F8FA] border-black/5 rounded-xl text-base" 
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <>
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-black/5 text-[10px] font-black uppercase tracking-[0.2em] text-[#8E8E8F]">
                        <th className="pb-4 pr-4">Evento</th>
                        <th className="pb-4 pr-4">Data e Hora</th>
                        <th className="pb-4 pr-4">Local</th>
                        <th className="pb-4 text-right">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.03]">
                    {filteredEventos.map((e: any) => (
                        <tr key={e.id} className="group hover:bg-[#F7F8FA] transition-all">
                            <td className="py-5 pr-4">
                                <p className="font-black text-sm text-[#2A2A2B] truncate uppercase tracking-tight">{e.titulo}</p>
                            </td>
                            <td className="py-5 pr-4 text-xs font-bold text-[#8E8E8F]">
                                {new Date(e.data_evento).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}
                            </td>
                            <td className="py-5 pr-4 text-xs font-bold text-[#2A2A2B]">{e.local}</td>
                            <td className="py-5 text-right">
                                <div className="flex justify-end gap-2">
                                    <Button onClick={() => handleEdit(e)} variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary"><Edit2 className="h-4 w-4" /></Button>
                                    <Button onClick={() => confirm("Excluir?") && deleteMutation.mutate(e.id)} variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>

          <div className="sm:hidden space-y-4">
            {filteredEventos.map((e: any) => (
              <div key={e.id} className="bg-[#F7F8FA] rounded-2xl p-4 border border-black/5 shadow-sm space-y-4">
                <div className="flex gap-4">
                  <div className="h-16 w-16 shrink-0 rounded-xl bg-white border border-black/5 flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-black text-sm text-[#2A2A2B] truncate uppercase tracking-tight">{e.titulo}</h3>
                    <div className="flex items-center gap-1.5 mt-1 text-[10px] font-bold text-[#8E8E8F]">
                        <Calendar className="h-3 w-3" />
                        {new Date(e.data_evento).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5 text-[10px] font-bold text-primary uppercase">
                        <MapPin className="h-3 w-3" /> {e.local}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 pt-2 border-t border-black/5">
                  <Button onClick={() => handleEdit(e)} variant="outline" className="flex-1 h-11 text-xs font-black uppercase tracking-widest bg-white">
                    <Edit2 className="mr-2 h-4 w-4" /> Editar
                  </Button>
                  <Button onClick={() => confirm("Excluir?") && deleteMutation.mutate(e.id)} variant="ghost" className="h-11 w-11 shrink-0 rounded-xl text-destructive hover:bg-destructive/10 border border-black/5">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-[32px] p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-black uppercase tracking-tight">
              {editingEvento ? "Editar Evento" : "Novo Evento"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-5 py-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Título do Evento</Label>
              <Input value={formData.titulo} onChange={(e) => setFormData({...formData, titulo: e.target.value})} required className="h-12 text-base font-bold bg-[#F7F8FA] border-black/5" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Data e Hora</Label>
                <Input type="datetime-local" value={formData.data_evento} onChange={(e) => setFormData({...formData, data_evento: e.target.value})} required className="h-12 text-base bg-[#F7F8FA] border-black/5" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Local</Label>
                <Input value={formData.local} onChange={(e) => setFormData({...formData, local: e.target.value})} required className="h-12 text-base bg-[#F7F8FA] border-black/5" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Descrição</Label>
              <Textarea value={formData.descricao} onChange={(e) => setFormData({...formData, descricao: e.target.value})} className="min-h-[100px] text-base bg-[#F7F8FA] border-black/5" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FileUpload label="Destaque" value={formData.imagem_destaque} onUploadComplete={(url) => setFormData({...formData, imagem_destaque: url})} onRemove={() => setFormData({...formData, imagem_destaque: ""})} type="image" />
              <FileUpload label="Vídeo" value={formData.video_url} onUploadComplete={(url) => setFormData({...formData, video_url: url})} onRemove={() => setFormData({...formData, video_url: ""})} type="video" accept="video/*" />
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="gf-button-primary h-12 text-base font-black uppercase tracking-widest w-full order-first sm:order-last">
                {editingEvento ? "Salvar" : "Criar"}
              </Button>
              <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="h-12 text-base font-bold w-full">Cancelar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}