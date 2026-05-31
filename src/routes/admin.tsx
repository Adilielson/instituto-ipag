import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { LayoutDashboard, FolderKanban, Calendar, FileText, Users, Newspaper, Building2, ShieldCheck, LogOut, ChevronRight, Menu, X } from "lucide-react";
import { ADMIN_MASTER } from "@/lib/admin-mock";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Dashboard — IPAG" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLayout,
});

const ADMIN_NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/projetos", label: "Projetos", icon: FolderKanban },
  { to: "/admin/eventos", label: "Eventos", icon: Calendar },
  { to: "/admin/blog", label: "Blog", icon: Newspaper },
  { to: "/admin/parceiros", label: "Parceiros", icon: Building2 },
  { to: "/admin/transparencia", label: "Transparência", icon: FileText },
  { to: "/admin/usuarios", label: "Usuários", icon: Users },
] as const;

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col text-[#2A2A2B] overflow-hidden h-screen">
      {/* Top Header - Full Width */}
      <header className="h-20 bg-gradient-to-r from-[#f97316] to-white border-b border-black/5 flex items-center justify-between px-8 shrink-0 z-[60] shadow-sm">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-[#f97316] shadow-sm group-hover:scale-105 transition-transform">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <span className="font-heading font-black text-xl tracking-tight block leading-none text-white">IPAG</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Painel Admin</span>
            </div>
          </Link>
          
          <div className="h-8 w-px bg-white/20 mx-2 hidden lg:block" />

          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden text-white hover:bg-white/10" 
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h2 className="font-heading font-black text-lg uppercase tracking-tight text-white lg:text-[#2A2A2B]/80 mix-blend-multiply lg:mix-blend-normal">
              Painel Administrativo
            </h2>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end text-right mr-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#2A2A2B]">{ADMIN_MASTER.name}</span>
            <span className="text-[10px] font-bold text-muted-foreground">{ADMIN_MASTER.email}</span>
          </div>
          <div className="h-10 w-10 rounded-xl bg-white border border-black/5 flex items-center justify-center shadow-sm">
            <Users className="h-5 w-5 text-[#f97316]" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden gap-16">
        {/* Sidebar - Positioned below header */}
        <aside 
          className={`fixed top-24 bottom-6 left-6 z-50 w-72 bg-[#2A2A2B] border border-white/5 transition-transform duration-300 lg:relative lg:top-0 lg:bottom-0 lg:left-0 lg:translate-x-0 lg:my-6 rounded-[40px] shadow-premium-utility ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-[calc(100%+64px)]"
          }`}
        >
          <div className="flex flex-col h-full p-6 text-white">
            <div className="lg:hidden mb-6 flex justify-end">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/10" 
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* User Profile Summary */}
            <div className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                  <Users className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">Master Admin</p>
                  <p className="text-sm font-black truncate text-white">{ADMIN_MASTER.name.split(' ')[0]}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1">
              <p className="px-4 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Menu Principal</p>
              {ADMIN_NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  activeOptions={{ exact: n.to === "/admin" }}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-white/60 transition-all duration-200 hover:bg-white/5 hover:text-white group"
                  activeProps={{ 
                    className: "bg-primary text-white shadow-warm-utility hover:bg-primary hover:text-white" 
                  }}
                >
                  <n.icon className={`h-5 w-5 transition-transform group-hover:scale-110`} /> 
                  <span className="flex-1">{n.label}</span>
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-40 transition-opacity" />
                </Link>
              ))}
            </nav>

            {/* Footer Nav */}
            <div className="mt-auto pt-6 border-t border-white/5">
              <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-destructive hover:bg-destructive/10 transition-colors">
                <LogOut className="h-5 w-5" /> Sair do Painel
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto scrollbar-hide p-6">
          <div className="w-full max-w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}