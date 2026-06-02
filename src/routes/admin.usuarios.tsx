import { createFileRoute } from "@tanstack/react-router";
import { ADMIN_MASTER } from "@/lib/admin-mock";
import { User, Mail, Shield } from "lucide-react";

export const Route = createFileRoute("/admin/usuarios")({ component: AdminUsuarios });

function AdminUsuarios() {
  return (
    <div className="rounded-[32px] border border-black/5 bg-background p-6 sm:p-8 shadow-premium-utility animate-in fade-in duration-500">
      <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#2A2A2B]">Gestão de Usuários</h1>
      <p className="text-xs sm:text-sm font-medium text-[#8E8E8F] mt-1 mb-8">Administradores com acesso ao painel IPAG.</p>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left text-sm">
            <thead>
            <tr className="border-b border-black/5 text-[10px] font-black uppercase tracking-[0.2em] text-[#8E8E8F]">
                <th className="pb-4">Nome do Usuário</th>
                <th className="pb-4">E-mail</th>
                <th className="pb-4">Nível de Acesso</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.03]">
            <tr className="group hover:bg-[#F7F8FA] transition-all">
                <td className="py-5 font-black text-[#2A2A2B] uppercase tracking-tight">{ADMIN_MASTER.name}</td>
                <td className="py-5 font-bold text-[#8E8E8F]">{ADMIN_MASTER.email}</td>
                <td className="py-5">
                <span className="rounded-xl bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest">
                    Administrador Master
                </span>
                </td>
            </tr>
            </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-4">
          <div className="bg-[#F7F8FA] rounded-2xl p-6 border border-black/5 shadow-sm space-y-4">
              <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-white border border-black/5 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                      <h3 className="font-black text-sm text-[#2A2A2B] uppercase tracking-tight">{ADMIN_MASTER.name}</h3>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#8E8E8F]">
                          <Mail className="h-3 w-3" /> {ADMIN_MASTER.email}
                      </div>
                  </div>
              </div>
              <div className="pt-4 border-t border-black/5">
                  <div className="flex items-center gap-2 text-primary">
                      <Shield className="h-4 w-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Acesso Master</span>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}