import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export const Route = createFileRoute("/redefinir-senha")({
  head: () => ({
    meta: [{ title: "Redefinir senha — IPAG" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: ResetPassword,
});
function ResetPassword() {
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [message, setMessage] = useState("Validando o link…");
  useEffect(() => {
    let active = true;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) {
        setReady(!!session);
        setMessage(session ? "" : "Abra um link válido de recuperação ou solicite outro.");
      }
    });
    void supabase.auth.getSession().then(({ data }) => {
      if (active) {
        setReady(!!data.session);
        setMessage(data.session ? "" : "Abra um link válido de recuperação ou solicite outro.");
      }
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!ready || busy) return;
    if (password.length < 12) {
      setMessage("Use pelo menos 12 caracteres.");
      return;
    }
    if (password !== confirm) {
      setMessage("As senhas não coincidem.");
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      await supabase.auth.signOut({ scope: "local" });
      setPassword("");
      setConfirm("");
      setDone(true);
    } catch {
      setMessage("Não foi possível redefinir. Solicite um novo link e tente novamente.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="min-h-screen bg-muted flex items-center justify-center p-5">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-3xl border bg-background p-6 sm:p-9 space-y-5"
      >
        <h1 className="text-2xl font-bold">{done ? "Senha atualizada" : "Definir nova senha"}</h1>
        {done ? (
          <p>Entre novamente usando sua nova senha.</p>
        ) : (
          <>
            <p role="status">{message}</p>
            <Label htmlFor="new-password">Nova senha · mínimo 12 caracteres</Label>
            <Input
              id="new-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={12}
              disabled={!ready || busy}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Label htmlFor="confirm-password">Confirmar senha</Label>
            <Input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={12}
              disabled={!ready || busy}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <Button disabled={!ready || busy} className="w-full">
              {busy ? "Salvando…" : "Salvar nova senha"}
            </Button>
          </>
        )}
        <Link to="/login" className="block text-center underline">
          Ir para o login
        </Link>
      </form>
    </main>
  );
}
