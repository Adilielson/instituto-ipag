import { createFileRoute } from "@tanstack/react-router";
import { PROJECTS } from "@/data/site";
import { Plus, Search, Filter, MoreHorizontal, Edit2, Trash2, FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/admin/projetos")({ component: AdminProjetos });

function AdminProjetos() {
  return (
    <div className="rounded-[40px] bg-white border border-black/5 p-8 shadow-premium-utility animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-[#2A2A2B]">Gestão de Projetos</h1>
          <p className="text-sm font-medium text-[#8E8E8F]">Gerencie as iniciativas e projetos sociais do IPAG.</p>
        </div>
        <Button className="gf-button-primary shadow-warm-utility hover:scale-105 transition-transform w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Novo Projeto
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8E8E8F]" />
          <Input placeholder="Buscar projetos..." className="pl-10 h-11 bg-[#F7F8FA] border-black/5 rounded-xl" />
        </div>
        <Button variant="outline" className="h-11 rounded-xl border-black/5 bg-white font-bold text-xs uppercase tracking-widest">
          <Filter className="mr-2 h-3 w-3" /> Filtrar
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-black/5 text-[10px] font-black uppercase tracking-[0.2em] text-[#8E8E8F]">
              <th className="pb-4 pr-4">Projeto</th>
              <th className="pb-4 pr-4">Status</th>
              <th className="pb-4 pr-4">Impacto</th>
              <th className="pb-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.03]">
            {PROJECTS.map((p) => (
              <tr key={p.slug} className="group hover:bg-[#F7F8FA] transition-all duration-200">
                <td className="py-5 pr-4">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 shrink-0 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <FolderKanban className="h-6 w-6 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-black text-sm text-[#2A2A2B] truncate uppercase tracking-tight group-hover:text-primary transition-colors">{p.title}</p>
                      <p className="text-[10px] font-bold text-[#8E8E8F] truncate italic">/projetos/{p.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="py-5 pr-4">
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl bg-green-500/10 text-green-600 border border-green-500/20">
                    Ativo
                  </span>
                </td>
                <td className="py-5 pr-4">
                  <p className="text-xs font-bold text-[#2A2A2B]">150+ Atendidos</p>
                  <p className="text-[10px] text-[#8E8E8F] font-bold uppercase tracking-wider">Impacto Direto</p>
                </td>
                <td className="py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-black/5">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}