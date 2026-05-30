import { createFileRoute } from "@tanstack/react-router";
import { FolderKanban, Calendar, Newspaper, Users } from "lucide-react";
import { ADMIN_MASTER } from "@/lib/admin-mock";

export const Route = createFileRoute("/admin/")({
  component: AdminHome,
});

function AdminHome() {
  const stats = [
    { label: "Projetos ativos", value: 6, icon: FolderKanban },
    { label: "Eventos agendados", value: 3, icon: Calendar },
    { label: "Posts publicados", value: 12, icon: Newspaper },
    { label: "Voluntários", value: 80, icon: Users },
  ];
  return (
    <div>
      <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">Painel administrativo</p>
        <h1 className="mt-2 text-3xl font-extrabold">Bem-vindo, {ADMIN_MASTER.name}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Estrutura preparada para gestão de conteúdo. Autenticação será implementada em fase posterior.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-background p-5 shadow-card">
            <s.icon className="h-6 w-6 text-primary" />
            <p className="mt-4 text-3xl font-extrabold">{s.value}</p>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-border bg-background/50 p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Esta área será populada com gestão de conteúdo (CRUD de projetos, eventos, posts e parceiros) na próxima fase.
        </p>
      </div>
    </div>
  );
}
