import { createFileRoute } from "@tanstack/react-router";
import { ADMIN_MASTER } from "@/lib/admin-mock";

export const Route = createFileRoute("/admin/usuarios")({ component: AdminUsuarios });

function AdminUsuarios() {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 shadow-card-utility">
      <h1 className="text-2xl font-extrabold">Usuários</h1>
      <table className="mt-6 w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
            <th className="py-3">Nome</th>
            <th className="py-3">E-mail</th>
            <th className="py-3">Papel</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border">
            <td className="py-4 font-semibold">{ADMIN_MASTER.name}</td>
            <td className="py-4">{ADMIN_MASTER.email}</td>
            <td className="py-4">
              <span className="rounded-full gradient-flame px-3 py-1 text-xs font-semibold text-primary-foreground">
                Administrador Master
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
