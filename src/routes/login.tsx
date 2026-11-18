import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getAdminUser } from "@/lib/auth/admin-session";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Entrar — IPAG" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: Login,
});
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recovery, setRecovery] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setMessage("");
    try {
      if (recovery) {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${window.location.origin}/redefinir-senha`,
        });
        if (error) throw error;
        setMessage("Se o e-mail estiver cadastrado, você receberá um link para redefinir a senha.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) {
          setMessage("Não foi possível entrar. Confira seu e-mail e senha.");
          return;
        }
        if (!(await getAdminUser())) {
          await supabase.auth.signOut({ scope: "local" });
          setMessage(
            "Sua conta não possui acesso administrativo. Contate o responsável pelo instituto.",
          );
          return;
        }
        await navigate({ to: "/admin", replace: true });
      }
    } catch {
      setMessage("Não foi possível concluir. Tente novamente em instantes.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="min-h-screen bg-muted flex items-center justify-center p-5">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-3xl border bg-background p-6 sm:p-9 shadow-lg space-y-5"
      >
        <p className="text-primary font-bold">IPAG · Área administrativa</p>
        <h1 className="text-2xl font-bold">{recovery ? "Recuperar acesso" : "Entrar no painel"}</h1>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {!recovery && (
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}
        {message && (
          <p role="status" className="text-sm">
            {message}
          </p>
        )}
        <Button className="w-full" disabled={busy}>
          {busy ? "Aguarde…" : recovery ? "Enviar link de recuperação" : "Entrar"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="w-full"
          disabled={busy}
          onClick={() => {
            setRecovery(!recovery);
            setMessage("");
            setPassword("");
          }}
        >
          {recovery ? "Voltar ao login" : "Esqueci minha senha"}
        </Button>
        <Link to="/" className="block text-center text-sm underline">
          Voltar ao site
        </Link>
      </form>
    </main>
  );
}
