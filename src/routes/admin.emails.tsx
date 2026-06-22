import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  listEmailTemplates,
  createEmailTemplate,
  updateEmailTemplate,
  deleteEmailTemplate,
  sendTestEmail,
} from "@/lib/email-templates.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Mail,
  Loader2,
  Plus,
  Trash2,
  Save,
  Send,
  Eye,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import { FileUpload } from "@/components/admin/FileUpload";

export const Route = createFileRoute("/admin/emails")({
  head: () => ({
    meta: [{ title: "Templates de Email — Admin" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminEmails,
});

type Template = {
  id: string;
  slug: string;
  name: string;
  subject: string;
  header_image_url: string | null;
  body_html: string;
  footer_html: string | null;
  is_active: boolean;
  variables: string[] | unknown;
  created_at: string;
  updated_at: string;
};

const EMPTY: Omit<Template, "id" | "created_at" | "updated_at"> = {
  slug: "",
  name: "",
  subject: "",
  header_image_url: "",
  body_html: "",
  footer_html: "",
  is_active: true,
  variables: [],
};

function AdminEmails() {
  const listFn = useServerFn(listEmailTemplates);
  const createFn = useServerFn(createEmailTemplate);
  const updateFn = useServerFn(updateEmailTemplate);
  const deleteFn = useServerFn(deleteEmailTemplate);
  const testFn = useServerFn(sendTestEmail);

  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [editing, setEditing] = useState<Template | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [preview, setPreview] = useState(false);
  const [testEmail, setTestEmail] = useState("");

  async function refresh(pwd: string) {
    const r = await listFn({ data: { password: pwd } });
    setTemplates(r.templates as Template[]);
  }

  async function unlock(e: React.FormEvent) {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    try {
      await refresh(password);
      setUnlocked(true);
    } catch (e: any) {
      toast.error(e?.message || "Erro");
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setForm(EMPTY);
    setEditing(null);
    setCreating(true);
    setPreview(false);
  }

  function openEdit(t: Template) {
    setEditing(t);
    setCreating(false);
    setPreview(false);
    setForm({
      slug: t.slug,
      name: t.name,
      subject: t.subject,
      header_image_url: t.header_image_url || "",
      body_html: t.body_html,
      footer_html: t.footer_html || "",
      is_active: t.is_active,
      variables: Array.isArray(t.variables) ? (t.variables as string[]) : [],
    });
  }

  function closeEditor() {
    setEditing(null);
    setCreating(false);
    setPreview(false);
  }

  async function save() {
    setLoading(true);
    try {
      const payload = {
        slug: form.slug.trim(),
        name: form.name.trim(),
        subject: form.subject,
        header_image_url: form.header_image_url ? form.header_image_url.trim() : null,
        body_html: form.body_html,
        footer_html: form.footer_html || null,
        is_active: form.is_active,
        variables: Array.isArray(form.variables) ? (form.variables as string[]) : [],
      };
      if (editing) {
        await updateFn({ data: { password, id: editing.id, template: payload } });
        toast.success("Template atualizado");
      } else {
        await createFn({ data: { password, template: payload } });
        toast.success("Template criado");
      }
      await refresh(password);
      closeEditor();
    } catch (e: any) {
      toast.error(e?.message || "Erro ao salvar");
    } finally {
      setLoading(false);
    }
  }

  async function remove(t: Template) {
    if (!confirm(`Excluir o template "${t.name}"? Esta ação é permanente.`)) return;
    setLoading(true);
    try {
      await deleteFn({ data: { password, id: t.id } });
      toast.success("Template excluído");
      await refresh(password);
    } catch (e: any) {
      toast.error(e?.message || "Erro");
    } finally {
      setLoading(false);
    }
  }

  async function sendTest() {
    if (!editing) return;
    if (!testEmail) {
      toast.error("Informe um email para envio de teste");
      return;
    }
    setLoading(true);
    try {
      await testFn({ data: { password, id: editing.id, to: testEmail } });
      toast.success(`Email de teste enviado para ${testEmail}`);
    } catch (e: any) {
      toast.error(e?.message || "Erro ao enviar teste");
    } finally {
      setLoading(false);
    }
  }

  if (!unlocked) {
    return (
      <div className="max-w-md mx-auto mt-12">
        <div className="bg-white rounded-3xl p-8 shadow-premium-utility border border-black/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="font-heading font-black text-xl">Templates de Email</h1>
              <p className="text-xs text-muted-foreground">Acesso restrito</p>
            </div>
          </div>
          <form onSubmit={unlock} className="space-y-4">
            <div>
              <Label>Senha de superadministrador</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Entrar"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  if (creating || editing) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={closeEditor}
            className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar
          </button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setPreview((p) => !p)}>
              <Eye className="h-4 w-4 mr-2" /> {preview ? "Editar" : "Pré-visualizar"}
            </Button>
            <Button onClick={save} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              Salvar
            </Button>
          </div>
        </div>

        {preview ? (
          <PreviewPane form={form} />
        ) : (
          <div className="bg-white rounded-3xl p-6 shadow-premium-utility border border-black/5 space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Nome interno</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ex: Confirmação de doação"
                />
              </div>
              <div>
                <Label>Slug (identificador)</Label>
                <Input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="ex: donation_confirmation_donor"
                  disabled={!!editing}
                />
              </div>
            </div>
            <div>
              <Label>Assunto do email</Label>
              <Input
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="Use {{variavel}} para inserir dados"
              />
            </div>
            <div>
              <Label>Imagem do topo (banner)</Label>
              <p className="text-xs text-muted-foreground mb-2">
                Tamanho ideal: <strong>560 × 200 px</strong> (ou 1120 × 400 px para retina). PNG ou JPG.
              </p>
              <FileUpload
                label=""
                value={form.header_image_url || ""}
                onUploadComplete={(url) => setForm({ ...form, header_image_url: url })}
                onRemove={() => setForm({ ...form, header_image_url: "" })}
                bucket="event-assets"
                type="image"
                accept="image/*"
              />
              <Input
                className="mt-2"
                value={form.header_image_url || ""}
                onChange={(e) => setForm({ ...form, header_image_url: e.target.value })}
                placeholder="Ou cole uma URL de imagem (opcional)"
              />
            </div>
            <div>
              <Label>Corpo HTML</Label>
              <Textarea
                value={form.body_html}
                onChange={(e) => setForm({ ...form, body_html: e.target.value })}
                rows={14}
                className="font-mono text-xs"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Variáveis disponíveis:{" "}
                <code className="text-primary">
                  {"{{donor_name}} {{project}} {{amount}} {{date}} {{type}} {{payment_method}} {{donor_email}} {{asaas_id}}"}
                </code>
              </p>
            </div>
            <div>
              <Label>Rodapé</Label>
              <Textarea
                value={form.footer_html || ""}
                onChange={(e) => setForm({ ...form, footer_html: e.target.value })}
                rows={3}
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={form.is_active}
                onCheckedChange={(v) => setForm({ ...form, is_active: v })}
              />
              <Label>Template ativo (será usado nos envios reais)</Label>
            </div>

            {editing && (
              <div className="border-t pt-5">
                <Label>Enviar email de teste</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="seu-email@exemplo.com"
                  />
                  <Button variant="outline" onClick={sendTest} disabled={loading}>
                    <Send className="h-4 w-4 mr-2" /> Enviar teste
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="font-heading font-black text-xl">Templates de Email</h1>
            <p className="text-xs text-muted-foreground">
              Edite os modelos enviados pelo sistema
            </p>
          </div>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" /> Novo template
        </Button>
      </div>

      <div className="bg-white rounded-3xl border border-black/5 shadow-premium-utility overflow-hidden">
        {templates.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            Nenhum template ainda. Clique em "Novo template".
          </div>
        ) : (
          <ul className="divide-y divide-black/5">
            {templates.map((t) => (
              <li key={t.id} className="flex items-center justify-between p-4 hover:bg-black/[0.02]">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold truncate">{t.name}</span>
                    {!t.is_active && (
                      <span className="text-[10px] font-black uppercase bg-muted text-muted-foreground px-2 py-0.5 rounded">
                        inativo
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    <code>{t.slug}</code> · {t.subject}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0 ml-3">
                  <Button size="sm" variant="outline" onClick={() => openEdit(t)}>
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => remove(t)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function PreviewPane({ form }: { form: typeof EMPTY }) {
  const sample: Record<string, string> = {
    donor_name: "João Silva",
    donor_email: "joao@exemplo.com",
    project: "Educação para Todos",
    amount: "R$ 150,00",
    date: new Date().toLocaleString("pt-BR"),
    type: "Doação única",
    payment_method: "PIX",
    asaas_id: "pay_EXEMPLO_123",
  };
  const render = (s: string) =>
    s.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_, k) => sample[k] ?? "");

  const header = form.header_image_url
    ? `<img src="${form.header_image_url}" style="display:block;width:100%;max-width:560px;height:auto"/>`
    : `<div style="padding:24px 28px;background:#0f3460;color:#fff"><h1 style="margin:0;font-size:20px">Instituto IPAG</h1></div>`;
  const footer = form.footer_html
    ? `<div style="padding:16px 28px;background:#fafafa;color:#888;font-size:12px;text-align:center">${render(form.footer_html)}</div>`
    : `<div style="padding:16px 28px;background:#fafafa;color:#888;font-size:12px;text-align:center">Email automático do Instituto IPAG.</div>`;

  const html = `<div style="background:#f6f7f9;padding:24px;font-family:Arial,sans-serif"><div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #eaeaea">${header}<div style="padding:28px;color:#1a1a1a">${render(form.body_html)}</div>${footer}</div></div>`;

  return (
    <div className="bg-white rounded-3xl border border-black/5 shadow-premium-utility overflow-hidden">
      <div className="p-3 border-b text-xs font-bold text-muted-foreground">
        Pré-visualização · Assunto: <span className="text-foreground">{render(form.subject)}</span>
      </div>
      <iframe
        title="Preview"
        srcDoc={html}
        className="w-full"
        style={{ height: 600, border: 0 }}
      />
    </div>
  );
}
