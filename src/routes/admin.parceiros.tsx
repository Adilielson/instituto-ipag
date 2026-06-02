import { createFileRoute } from "@tanstack/react-router";
import { PARTNERS } from "@/data/site";

export const Route = createFileRoute("/admin/parceiros")({ component: AdminParceiros });

function AdminParceiros() {
  return (
    <div className="rounded-[32px] border border-black/5 bg-background p-6 sm:p-8 shadow-premium-utility animate-in fade-in duration-500">
      <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#2A2A2B]">Nossos Parceiros</h1>
      <p className="text-xs sm:text-sm font-medium text-[#8E8E8F] mt-1 mb-8">Visualize as empresas e instituições parceiras.</p>
      
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {PARTNERS.map((p) => (
          <div key={p} className="rounded-xl border border-black/5 bg-[#F7F8FA] px-5 py-4 text-sm font-black uppercase tracking-tight text-[#2A2A2B] shadow-sm hover:border-primary/20 transition-colors flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-primary" />
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}