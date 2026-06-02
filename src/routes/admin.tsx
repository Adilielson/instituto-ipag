import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, FolderKanban, Calendar, FileText, Users, Newspaper, Building2, ShieldCheck, LogOut, ChevronRight, Menu, X, MoreHorizontal } from "lucide-react";
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
] as const;

const MORE_NAV = [
  { to: "/admin/parceiros", label: "Parceiros", icon: Building2 },
  { to: "/admin/transparencia", label: "Transparência", icon: FileText },
  { to: "/admin/usuarios", label: "Usuários", icon: Users },
] as const;

function AdminLayout() {
  const [isMoreSheetOpen, setIsMoreSheetOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col text-[#2A2A2B] h-screen overflow-hidden">
      {/* Top Header - Mobile and Desktop */}
      <header className="h-14 lg:h-20 bg-gradient-to-r from-[#f97316] to-white border-b border-black/5 flex items-center justify-between px-4 lg:px-8 shrink-0 z-[300] shadow-sm">
        <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-white lg:text-[#f97316]" />
            <h2 className="font-heading font-black text-lg uppercase tracking-tight text-white lg:text-[#2A2A2B]/80 truncate max-w-[200px]">
              Painel Admin
            </h2>
        </div>
        <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end text-right mr-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#2A2A2B]">{ADMIN_MASTER.name}</span>
            </div>
            <div className="h-10 w-10 rounded-xl bg-white border border-black/5 flex items-center justify-center shadow-sm">
                <Users className="h-5 w-5 text-[#f97316]" />
            </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop only */}
        <aside className="hidden lg:flex flex-col w-72 bg-[#2A2A2B] border border-white/5 my-6 ml-6 rounded-[40px] shadow-premium-utility shrink-0">
            <div className="flex flex-col h-full p-6 text-white">
                <div className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">Master Admin</p>
                <p className="text-sm font-black truncate text-white">{ADMIN_MASTER.name}</p>
                </div>
                <nav className="flex-1 space-y-1">
                {[...ADMIN_NAV, ...MORE_NAV].map((n) => (
                    <Link key={n.to} to={n.to} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-white/60 hover:bg-white/5 hover:text-white transition-all" activeProps={{ className: "bg-primary text-white shadow-warm-utility" }} activeOptions={{ exact: n.to === "/admin" }}>
                    <n.icon className="h-5 w-5" /> {n.label}
                    </Link>
                ))}
                </nav>
                <div className="mt-auto pt-6 border-t border-white/5">
                <Link to="/" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-destructive hover:bg-destructive/10 transition-colors">
                    <LogOut className="h-5 w-5" /> Sair do Painel
                </Link>
                </div>
            </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto scrollbar-hide p-4 sm:p-6 pb-24 lg:pb-6">
            <Outlet />
        </main>
      </div>

      {/* Bottom Nav - Mobile only */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#2A2A2B] border-t border-white/10 z-[300] flex justify-around items-center px-2">
        {ADMIN_NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/admin" }} className="flex flex-col items-center justify-center gap-1 w-full h-full text-[10px] font-bold text-white/60" activeProps={{ className: "text-primary" }}>
                <n.icon className="h-6 w-6" />
                {n.label}
            </Link>
        ))}
        <button onClick={() => setIsMoreSheetOpen(true)} className="flex flex-col items-center justify-center gap-1 w-full h-full text-[10px] font-bold text-white/60">
            <MoreHorizontal className="h-6 w-6" />
            Mais
        </button>
      </nav>

      {/* Bottom Sheet - Mobile only */}
      {isMoreSheetOpen && (
        <div className="lg:hidden">
            <div className="fixed inset-0 bg-black/60 z-[400] animate-in fade-in" onClick={() => setIsMoreSheetOpen(false)} />
            <div className="fixed inset-x-0 bottom-0 z-[500] bg-[#2A2A2B] rounded-t-[32px] p-8 pb-12 animate-in slide-in-from-bottom duration-300">
                <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-8" />
                <div className="space-y-2">
                    {[...MORE_NAV].map((n) => (
                        <Link key={n.to} to={n.to} onClick={() => setIsMoreSheetOpen(false)} className="flex items-center gap-4 py-4 px-4 rounded-2xl text-white text-base font-bold hover:bg-white/5 transition-colors">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <n.icon className="h-6 w-6 text-primary" />
                            </div>
                            {n.label}
                        </Link>
                    ))}
                    <div className="h-px bg-white/5 my-4" />
                    <Link to="/" className="flex items-center gap-4 py-4 px-4 rounded-2xl text-destructive text-base font-bold hover:bg-destructive/10 transition-colors">
                        <div className="h-10 w-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                            <LogOut className="h-6 w-6" />
                        </div>
                        Sair do Painel
                    </Link>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}