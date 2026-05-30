import { createFileRoute } from "@tanstack/react-router";
import { PROJECTS } from "@/data/site";

export const Route = createFileRoute("/admin/projetos")({ component: AdminProjetos });

function AdminProjetos() {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 shadow-card-utility">
      <h1 className="text-2xl font-extrabold">Projetos</h1>
      <p className="mt-1 text-sm text-muted-foreground">Lista mockada — CRUD virá na próxima fase.</p>
      <ul className="mt-6 divide-y divide-border">
        {PROJECTS.map((p) => (
          <li key={p.slug} className="flex items-center justify-between gap-4 py-4">
            <div>
              <p className="font-semibold">{p.title}</p>
              <p className="text-xs text-muted-foreground">/projetos/{p.slug}</p>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Ativo</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
