import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search, Calendar, MapPin, Edit2, Trash2, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { getEventos, createEvento, updateEvento, deleteEvento } from "@/lib/api/cms";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/eventos")({ 
  component: AdminEventos 
});

function AdminEventos() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvento, setEditingEvento] = useState<any>(null);

  // Form states
  const [formData, setFormData] = useState({
    titulo: "",
    data_evento: "",
    local: "",
    descricao: "",
    status: "publicado",
    imagem_destaque: "",
    galeria: [] as string[]
  });

  const { data: eventos, isLoading } = useQuery({
    queryKey: ["eventos"],
    queryFn: () => getEventos(),
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => createEvento({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventos"] });
      toast.success("Evento criado com sucesso!");
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      console.error(error);
      toast.error("Erro ao criar evento.");
    }
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) => updateEvento({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventos"] });
      toast.success("Evento atualizado com sucesso!");
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      console.error(error);
      toast.error("Erro ao atualizar evento.");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteEvento({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventos"] });
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
      status: "publicado"
    });
    setEditingEvento(null);
  };

  const handleEdit = (evento: any) => {
    setEditingEvento(evento);
    setFormData({
      titulo: evento.titulo,
      data_evento: new Date(evento.data_evento).toISOString().slice(0, 16),
      local: evento.local,
      descricao: evento.descricao || "",
      status: evento.status
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w ]+/g, '').replace(/ +/g, '-');
    
    if (editingEvento) {
      updateMutation.mutate({
        id: editingEvento.id,
        ...formData,
        slug
      });
    } else {
      createMutation.mutate({
        ...formData,
        slug
      });
    }
  };

  const filteredEventos = useMemo(() => {
    if (!eventos) return [];
    return eventos.filter((e: any) => 
      e.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.local.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [eventos, searchTerm]);

  return (
    <div className="rounded-[40px] bg-white border border-black/5 p-8 shadow-premium-utility animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-[#2A2A2B]">Calendário de Eventos</h1>
          <p className="text-sm font-medium text-[#8E8E8F]">Gerencie os workshops, concertos e reuniões do IPAG.</p>
        </div>
        <Button 
          onClick={() => { resetForm(); setIsDialogOpen(true); }}
          className="gf-button-primary shadow-warm-utility hover:scale-105 transition-transform w-full md:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" /> Novo Evento
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8E8E8F]" />
          <Input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar eventos por nome ou local..." 
            className="pl-10 h-11 bg-[#F7F8FA] border-black/5 rounded-xl" 
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-black/5 text-[10px] font-black uppercase tracking-[0.2em] text-[#8E8E8F]">
              <th className="pb-4 pr-4">Evento / Detalhes</th>
              <th className="pb-4 pr-4">Imagens</th>
              <th className="pb-4 pr-4">Data e Hora</th>
              <th className="pb-4 pr-4">Local</th>
              <th className="pb-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.03]">
              {filteredEventos.map((e: any) => (
                <tr key={e.id} className="group hover:bg-[#F7F8FA] transition-all duration-200">
                  <td className="py-5 pr-4">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 shrink-0 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-black text-sm text-[#2A2A2B] truncate uppercase tracking-tight group-hover:text-primary transition-colors">{e.titulo}</p>
                        <p className="text-[10px] font-bold text-[#8E8E8F] truncate uppercase tracking-widest">{e.status}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 pr-4">
                    <div className="flex -space-x-2">
                      {e.galeria?.slice(0, 3).map((img: string, idx: number) => (
                        <div key={idx} className="h-8 w-8 rounded-lg border-2 border-white overflow-hidden bg-gray-100">
                          <img src={img} className="h-full w-full object-cover" alt="" />
                        </div>
                      ))}
                      {e.galeria?.length > 3 && (
                        <div className="h-8 w-8 rounded-lg border-2 border-white bg-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-500">
                          +{e.galeria.length - 3}
                        </div>
                      )}
                      {(!e.galeria || e.galeria.length === 0) && (
                        <span className="text-[10px] text-gray-300 font-bold uppercase">Sem fotos</span>
                      )}
                    </div>
                  </td>
                  <td className="py-5 pr-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-[#2A2A2B]">
                        {new Date(e.data_evento).toLocaleDateString('pt-BR')}
                      </span>
                      <span className="text-[10px] font-bold text-[#8E8E8F] uppercase tracking-wider">
                        {new Date(e.data_evento).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </td>
                  <td className="py-5 pr-4">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#2A2A2B]">
                      <MapPin className="h-3 w-3 text-primary" />
                      <span className="truncate max-w-[150px]">{e.local}</span>
                    </div>
                  </td>
                  <td className="py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        onClick={() => handleEdit(e)}
                        variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        onClick={() => {
                          if (confirm("Tem certeza que deseja excluir este evento?")) {
                            deleteMutation.mutate(e.id);
                          }
                        }}
                        variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredEventos.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-20 text-center text-[#8E8E8F] font-medium">
                    Nenhum evento encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Dialog for Creating/Editing */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-[32px] p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black uppercase tracking-tight">
              {editingEvento ? "Editar Evento" : "Novo Evento"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="titulo" className="text-[10px] font-black uppercase tracking-widest text-[#8E8E8F]">Título do Evento</Label>
              <Input 
                id="titulo" 
                value={formData.titulo}
                onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                required 
                className="h-12 bg-[#F7F8FA] border-black/5 rounded-xl font-bold"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="data" className="text-[10px] font-black uppercase tracking-widest text-[#8E8E8F]">Data e Hora</Label>
                <Input 
                  id="data" 
                  type="datetime-local"
                  value={formData.data_evento}
                  onChange={(e) => setFormData({...formData, data_evento: e.target.value})}
                  required 
                  className="h-12 bg-[#F7F8FA] border-black/5 rounded-xl font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="local" className="text-[10px] font-black uppercase tracking-widest text-[#8E8E8F]">Local</Label>
                <Input 
                  id="local" 
                  value={formData.local}
                  onChange={(e) => setFormData({...formData, local: e.target.value})}
                  required 
                  className="h-12 bg-[#F7F8FA] border-black/5 rounded-xl font-bold"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="descricao" className="text-[10px] font-black uppercase tracking-widest text-[#8E8E8F]">Descrição</Label>
              <Textarea 
                id="descricao" 
                value={formData.descricao}
                onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                className="min-h-[100px] bg-[#F7F8FA] border-black/5 rounded-xl font-medium"
              />
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl font-bold uppercase tracking-wider text-xs">
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={createMutation.isPending || updateMutation.isPending}
                className="gf-button-primary shadow-warm-utility px-8 rounded-xl font-black uppercase tracking-widest text-xs"
              >
                {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingEvento ? "Salvar Alterações" : "Criar Evento"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}