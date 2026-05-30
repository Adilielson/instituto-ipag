import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/transparencia")({ component: AdminTransp });

function AdminTransp() {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
      <h1 className="text-2xl font-extrabold">Transparência</h1>
      <p className="mt-2 text-sm text-muted-foreground">Upload e gestão de documentos virá na próxima fase.</p>
    </div>
  );
}
