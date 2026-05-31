import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { LayoutDashboard, FolderKanban, Calendar, FileText, Users, Newspaper, Building2, ShieldCheck } from "lucide-react";
import { ADMIN_MASTER } from "@/lib/admin-mock";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — IPAG" },
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
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="flex w-full gap-6 px-4 py-8 md:px-8">
        <aside className="hidden w-64 shrink-0 rounded-2xl border border-border bg-background p-4 shadow-card-utility lg:block">
          <div className="rounded-xl gradient-flame p-4 text-primary-foreground">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" /> Admin Master
            </div>
            <p className="mt-2 text-sm font-bold">{ADMIN_MASTER.name}</p>
            <p className="text-xs opacity-90">{ADMIN_MASTER.email}</p>
          </div>
          <nav className="mt-4 flex flex-col gap-1">
            {ADMIN_NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/admin" }}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/70 hover:bg-muted hover:text-foreground"
                activeProps={{ className: "bg-primary/10 text-primary" }}
              >
                <n.icon className="h-4 w-4" /> {n.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
