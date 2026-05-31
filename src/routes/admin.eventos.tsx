import { createFileRoute } from "@tanstack/react-router";
import { EVENTS } from "@/data/site";
import { Plus, Search, Calendar, MapPin, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/admin/eventos")({ component: AdminEventos });

function AdminEventos() {
  return (
    <div className="rounded-[40px] bg-white border border-black/5 p-8 shadow-premium-utility animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-[#2A2A2B]">Calendário de Eventos</h1>
          <p className="text-sm font-medium text-[#8E8E8F]">Gerencie os workshops, concertos e reuniões do IPAG.</p>
        </div>
        <Button className="gf-button-primary shadow-warm-utility hover:scale-105 transition-transform w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Novo Evento
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8E8E8F]" />
          <Input placeholder="Buscar eventos por nome..." className="pl-10 h-11 bg-[#F7F8FA] border-black/5 rounded-xl" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-black/5 text-[10px] font-black uppercase tracking-[0.2em] text-[#8E8E8F]">
              <th className="pb-4 pr-4">Evento / Detalhes</th>
              <th className="pb-4 pr-4">Data e Hora</th>
              <th className="pb-4 pr-4">Local</th>
              <th className="pb-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.03]">
            {EVENTS.map((e) => (
              <tr key={e.title} className="group hover:bg-[#F7F8FA] transition-all duration-200">
                <td className="py-5 pr-4">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 shrink-0 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-black text-sm text-[#2A2A2B] truncate uppercase tracking-tight group-hover:text-primary transition-colors">{e.title}</p>
                      <p className="text-[10px] font-bold text-[#8E8E8F] truncate uppercase tracking-widest">Geral</p>
                    </div>
                  </div>
                </td>
                <td className="py-5 pr-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-[#2A2A2B]">{e.date}</span>
                    <span className="text-[10px] font-bold text-[#8E8E8F] uppercase tracking-wider">14:00</span>
                  </div>
                </td>
                <td className="py-5 pr-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#2A2A2B]">
                    <MapPin className="h-3 w-3 text-primary" />
                    <span className="truncate max-w-[150px]">{e.place}</span>
                  </div>
                </td>
                <td className="py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-destructive hover:bg-destructive/10 transition-colors">
                      <Trash2 className="h-4 w-4" />
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