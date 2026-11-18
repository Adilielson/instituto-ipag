import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { UserPlus, Search, ShieldCheck, Pencil, Trash2, Users } from "lucide-react";
import { toast } from "sonner";
import { Route as AdminRoute } from "./admin";
import { listUsers, saveUserAccess, inviteUser, deleteUser } from "@/lib/users.functions";
import { AREAS } from "@/lib/auth/areas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/usuarios")({ component: AdminUsuarios });
type UserRow = Awaited<ReturnType<typeof listUsers>>["users"][number];
type Form = {
  id?: string;
  name: string;
  email: string;
  is_admin: boolean;
  active: boolean;
  areas: string[];
};
const empty: Form = { name: "", email: "", is_admin: false, active: true, areas: [] };
function AdminUsuarios() {
  const { adminUser } = AdminRoute.useRouteContext();
  const list = useServerFn(listUsers),
    save = useServerFn(saveUserAccess),
    invite = useServerFn(inviteUser),
    remove = useServerFn(deleteUser);
  const cache = useQueryClient();
  const [page, setPage] = useState(1),
    [search, setSearch] = useState("");
  const [form, setForm] = useState<Form | null>(null),
    [deleting, setDeleting] = useState<UserRow | null>(null);
  const [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const query = useQuery({
    queryKey: ["admin-users", page],
    queryFn: () => list({ data: { page } }),
    retry: false,
  });
  const users = (query.data?.users || []).filter((u) =>
    `${u.name} ${u.email}`.toLowerCase().includes(search.toLowerCase()),
  );
  const self = form?.id === adminUser.id;
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form || busy) return;
    if (form.active && !form.is_admin && !form.areas.length) {
      setError("Selecione pelo menos uma área ou desative o acesso.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const payload = { ...form, areas: form.areas as (typeof AREAS)[number]["id"][] };
      if (form.id) await save({ data: { ...payload, id: form.id } });
      else await invite({ data: payload });
      toast.success(
        form.id
          ? "Usuário atualizado."
          : "Convite enviado. O usuário receberá um link para definir a senha.",
      );
      setForm(null);
      await cache.invalidateQueries({ queryKey: ["admin-users"] });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Não foi possível salvar.");
      await cache.invalidateQueries({ queryKey: ["admin-users"] });
    } finally {
      setBusy(false);
    }
  }
  async function confirmDelete() {
    if (!deleting || busy) return;
    setBusy(true);
    setError("");
    try {
      await remove({ data: { id: deleting.id } });
      setDeleting(null);
      toast.success("Usuário excluído e acesso removido.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Não foi possível excluir.");
    } finally {
      setBusy(false);
      await cache.invalidateQueries({ queryKey: ["admin-users"] });
    }
  }
  return (
    <section className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-wrap justify-between gap-4 items-start">
        <div>
          <p className="text-primary text-sm font-bold flex gap-2 items-center">
            <ShieldCheck size={18} /> Administração
          </p>
          <h1 className="text-2xl sm:text-3xl font-black mt-2">Usuários e acessos</h1>
          <p className="text-muted-foreground mt-2">
            Defina quem pode administrar cada área do IPAG.
          </p>
        </div>
        <Button
          onClick={() => {
            setForm({ ...empty });
            setError("");
          }}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Convidar usuário
        </Button>
      </div>
      <div className="rounded-2xl border bg-white p-4 text-sm text-muted-foreground">
        Administradores têm acesso completo e gerenciam usuários. Colaboradores podem consultar,
        criar, editar e excluir conteúdo apenas nas áreas liberadas. Doações, e-mails e integrações
        mantêm a senha adicional existente.
      </div>
      <div className="bg-white border rounded-3xl p-4 sm:p-6 space-y-5">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
          <Input
            aria-label="Buscar usuários nesta página"
            placeholder="Buscar nome ou e-mail nesta página"
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {query.isPending ? (
          <p role="status">Carregando usuários…</p>
        ) : query.isError ? (
          <div role="alert" className="space-y-3">
            <p>Não foi possível carregar usuários e permissões.</p>
            <Button variant="outline" onClick={() => query.refetch()}>
              Tentar novamente
            </Button>
          </div>
        ) : (
          <>
            {!users.length && (
              <div className="py-10 text-center text-muted-foreground">
                <Users className="mx-auto mb-3" />
                Nenhum usuário encontrado.
              </div>
            )}
            <div className="grid gap-3">
              {users.map((user) => (
                <article
                  key={user.id}
                  className="rounded-2xl border p-4 flex flex-wrap items-center gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold break-words">
                      {user.name}{" "}
                      {user.id === adminUser.id && (
                        <span className="text-xs text-primary">(você)</span>
                      )}
                    </h2>
                    <p className="text-sm text-muted-foreground break-all">{user.email}</p>
                    <p className="text-xs mt-2">
                      {user.is_admin
                        ? "Administrador · todas as áreas"
                        : user.areas.map((a) => AREAS.find((x) => x.id === a)?.label).join(" · ") ||
                          "Nenhuma área liberada"}
                    </p>
                  </div>
                  <div className="text-xs space-y-1">
                    <span
                      className={`inline-block rounded-full px-3 py-1 font-semibold ${user.active ? "bg-green-50 text-green-800" : "bg-gray-100 text-gray-600"}`}
                    >
                      {user.active ? "Acesso ativo" : "Sem acesso"}
                    </span>
                    <p className="text-muted-foreground">
                      {user.confirmed ? "Conta confirmada" : "Confirmação pendente"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      aria-label={`Editar ${user.name}`}
                      onClick={() => {
                        setForm({ ...user });
                        setError("");
                      }}
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={user.id === adminUser.id}
                      aria-label={`Excluir ${user.name}`}
                      onClick={() => {
                        setDeleting(user);
                        setError("");
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </article>
              ))}
            </div>
            <div className="flex items-center justify-between gap-3">
              <Button variant="outline" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                Anterior
              </Button>
              <span className="text-sm">Página {page}</span>
              <Button
                variant="outline"
                disabled={!query.data?.hasNext}
                onClick={() => setPage((p) => p + 1)}
              >
                Próxima
              </Button>
            </div>
          </>
        )}
      </div>
      <Dialog
        open={!!form}
        onOpenChange={(open) => {
          if (!open && !busy) setForm(null);
        }}
      >
        <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{form?.id ? "Editar usuário" : "Convidar usuário"}</DialogTitle>
            <DialogDescription>
              {form?.id
                ? "Atualize o nome, perfil e áreas de acesso."
                : "O convite será enviado por e-mail para definição da senha."}
            </DialogDescription>
          </DialogHeader>
          {form && (
            <form onSubmit={submit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="user-name">Nome</Label>
                <Input
                  id="user-name"
                  required
                  minLength={2}
                  maxLength={120}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-email">E-mail</Label>
                <Input
                  id="user-email"
                  type="email"
                  required
                  disabled={!!form.id}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-role">Perfil</Label>
                <select
                  id="user-role"
                  className="w-full border rounded-md p-2 bg-background"
                  disabled={self}
                  value={form.is_admin ? "admin" : "member"}
                  onChange={(e) => setForm({ ...form, is_admin: e.target.value === "admin" })}
                >
                  <option value="member">Colaborador — áreas selecionadas</option>
                  <option value="admin">Administrador — acesso completo</option>
                </select>
              </div>
              {!form.is_admin && (
                <fieldset className="space-y-3">
                  <legend className="font-semibold mb-3">Áreas liberadas</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {AREAS.map((a) => (
                      <label
                        key={a.id}
                        className="flex items-center gap-3 border rounded-xl p-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={form.areas.includes(a.id)}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              areas: e.target.checked
                                ? [...form.areas, a.id]
                                : form.areas.filter((x) => x !== a.id),
                            })
                          }
                        />
                        {a.label}
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Parceiros e Transparência ainda possuem telas sem gestão de conteúdo
                    implementada.
                  </p>
                </fieldset>
              )}
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.active}
                  disabled={self}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                />{" "}
                Acesso ativo ao painel
              </label>
              {self && (
                <p className="text-xs text-muted-foreground">
                  Você não pode suspender ou remover o próprio acesso administrativo.
                </p>
              )}
              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  disabled={busy}
                  onClick={() => setForm(null)}
                >
                  Cancelar
                </Button>
                <Button disabled={busy}>
                  {busy ? "Salvando…" : form.id ? "Salvar alterações" : "Enviar convite"}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={!!deleting}
        onOpenChange={(open) => {
          if (!open && !busy) setDeleting(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir usuário?</DialogTitle>
            <DialogDescription>
              A conta de {deleting?.email} será excluída e perderá o acesso. Para uma suspensão
              reversível, edite o usuário e desmarque “Acesso ativo”.
            </DialogDescription>
          </DialogHeader>
          {error && (
            <p role="alert" className="text-destructive text-sm">
              {error}
            </p>
          )}
          <div className="flex justify-end gap-3">
            <Button variant="outline" disabled={busy} onClick={() => setDeleting(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" disabled={busy} onClick={confirmDelete}>
              {busy ? "Excluindo…" : "Excluir usuário"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
