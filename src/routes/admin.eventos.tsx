import { createFileRoute } from "@tanstack/react-router";
import { EVENTS } from "@/data/site";

export const Route = createFileRoute("/admin/eventos")({ component: AdminEventos });

function AdminEventos() {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 shadow-card-utility">
      <h1 className="text-2xl font-extrabold">Eventos</h1>
      <p className="mt-1 text-sm text-muted-foreground">Lista mockada.</p>
      <ul className="mt-6 divide-y divide-border">
        {EVENTS.map((e) => (
          <li key={e.title} className="py-4">
            <p className="font-semibold">{e.title}</p>
            <p className="text-xs text-muted-foreground">{e.date} — {e.place}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
