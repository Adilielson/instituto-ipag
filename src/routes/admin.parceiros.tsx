import { createFileRoute } from "@tanstack/react-router";
import { PARTNERS } from "@/data/site";

export const Route = createFileRoute("/admin/parceiros")({ component: AdminParceiros });

function AdminParceiros() {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 shadow-card-utility">
      <h1 className="text-2xl font-extrabold">Parceiros</h1>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {PARTNERS.map((p) => (
          <div key={p} className="rounded-lg border border-border px-4 py-3 text-sm font-medium">{p}</div>
        ))}
      </div>
    </div>
  );
}
