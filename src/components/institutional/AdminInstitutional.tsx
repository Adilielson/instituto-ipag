import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useRouter } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import {
  listPartners,
  listDocuments,
  savePartner,
  saveDocument,
  deletePartner,
  deleteDocument,
} from "@/lib/institutional/functions";
import type { InstitutionalItem, ModuleKind } from "@/lib/institutional/functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PdfViewer } from "./PdfViewer";
import { toast } from "sonner";
import { Plus, FileText, Loader2 } from "lucide-react";

export function AdminInstitutional({ kind }: { kind: ModuleKind }) {
  const isPartner = kind === "partners";
  const router = useRouter();
  const listP = useServerFn(listPartners),
    listD = useServerFn(listDocuments),
    saveP = useServerFn(savePartner),
    saveD = useServerFn(saveDocument),
    deleteP = useServerFn(deletePartner),
    deleteD = useServerFn(deleteDocument);
  const [rows, setRows] = useState<InstitutionalItem[]>([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState<Partial<InstitutionalItem> | null>(null),
    [file, setFile] = useState<File | null>(null),
    [preview, setPreview] = useState(""),
    [dirty, setDirty] = useState(false),
    [pendingDelete, setPendingDelete] = useState<InstitutionalItem | null>(null),
    [pdf, setPdf] = useState<{ title: string; url: string } | null>(null);
  const uploaded = useRef<{ file: File; path: string } | null>(null);
  async function load() {
    setLoading(true);
    setError("");
    try {
      setRows(await (isPartner ? listP() : listD()));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    void load();
  }, [kind]);
  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  useEffect(() => {
    if (!file || !isPartner) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file, isPartner]);
  function close() {
    if (busy) return;
    if (dirty && !window.confirm("Descartar as alterações não salvas?")) return;
    setEditing(null);
    setFile(null);
    setDirty(false);
    uploaded.current = null;
  }
  function edit(row?: InstitutionalItem) {
    setEditing(
      row
        ? { ...row }
        : { name: "", title: "", year: new Date().getFullYear(), published: false, sort_order: 0 },
    );
    setFile(null);
    setDirty(false);
    uploaded.current = null;
  }
  async function selectFile(f: File | undefined) {
    if (!f) return;
    const max = isPartner ? 5 : 20;
    const mime = isPartner ? ["image/png", "image/jpeg", "image/webp"] : ["application/pdf"];
    if (!mime.includes(f.type) || !f.size || f.size > max * 1024 * 1024) {
      toast.error(`Selecione ${isPartner ? "PNG, JPG ou WEBP de até 5 MB" : "PDF de até 20 MB"}.`);
      return;
    }
    const bytes = new Uint8Array(await f.slice(0, 12).arrayBuffer());
    const text = new TextDecoder().decode(bytes);
    const valid = isPartner
      ? f.type === "image/png"
        ? bytes[0] === 137 && text.slice(1, 4) === "PNG"
        : f.type === "image/jpeg"
          ? bytes[0] === 255 && bytes[1] === 216
          : text.startsWith("RIFF") && text.slice(8, 12) === "WEBP"
      : text.startsWith("%PDF-");
    if (!valid) {
      toast.error("O conteúdo do arquivo não corresponde ao formato informado.");
      return;
    }
    setFile(f);
    setDirty(true);
    uploaded.current = null;
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setBusy(true);
    try {
      let path = editing.file_path;
      if (file) {
        if (uploaded.current?.file === file) path = uploaded.current.path;
        else {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (!user) throw new Error("Entre novamente.");
          const ext = isPartner
            ? (
                { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp" } as Record<
                  string,
                  string
                >
              )[file.type]
            : "pdf";
          path = `${user.id}/${crypto.randomUUID()}.${ext}`;
          const result = await supabase.storage
            .from(isPartner ? "partner-logos" : "transparency-pdfs")
            .upload(path, file, { contentType: file.type, upsert: false });
          if (result.error)
            throw new Error(
              "Não foi possível enviar o arquivo. Confira tamanho, permissões e conexão.",
            );
          uploaded.current = { file, path };
        }
      }
      if (!path) throw new Error(isPartner ? "Envie a logomarca." : "Envie o PDF.");
      const shared = {
        id: editing.id,
        file_path: path,
        published: !!editing.published,
        sort_order: Number(editing.sort_order || 0),
      };
      const result = isPartner
        ? await saveP({ data: { ...shared, name: editing.name || "" } })
        : await saveD({
            data: { ...shared, title: editing.title || "", year: Number(editing.year) },
          });
      toast.success("Registro salvo.");
      if (result.cleanupPending)
        toast.warning("O registro foi salvo; a limpeza do arquivo anterior ficou pendente.");
      setEditing(null);
      setFile(null);
      setDirty(false);
      uploaded.current = null;
      await load();
      await router.invalidate();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  }
  async function remove() {
    if (!pendingDelete) return;
    setBusy(true);
    try {
      const result = await (isPartner
        ? deleteP({ data: { id: pendingDelete.id } })
        : deleteD({ data: { id: pendingDelete.id } }));
      toast.success("Registro excluído.");
      if (result.cleanupPending) toast.warning("Limpeza do arquivo pendente.");
      setPendingDelete(null);
      await load();
      await router.invalidate();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap gap-3 justify-between items-center">
        <div>
          <h1 className="text-2xl font-black">{isPartner ? "Parceiros" : "Transparência"}</h1>
          <p className="text-sm text-muted-foreground">
            {isPartner
              ? "Nome e logomarca para o carrossel e a página de parceiros."
              : "Documentos institucionais com leitura dentro do aplicativo."}
          </p>
        </div>
        <Button onClick={() => edit()}>
          <Plus className="size-4 mr-2" />
          {isPartner ? "Novo parceiro" : "Novo documento"}
        </Button>
      </header>
      {loading ? (
        <p role="status">Carregando…</p>
      ) : error ? (
        <div role="alert" className="p-4 bg-red-50 rounded-xl">
          {error}
          <Button variant="outline" onClick={load}>
            Tentar novamente
          </Button>
        </div>
      ) : rows.length === 0 ? (
        <div className="p-10 border rounded-2xl text-center">
          Nenhum {isPartner ? "parceiro" : "documento"} cadastrado. Clique no botão acima para
          começar.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {rows.map((row) => (
            <article key={row.id} className="rounded-2xl border bg-white p-5 space-y-3">
              {isPartner ? (
                <img src={row.url} alt={row.name} className="h-24 w-full object-contain" />
              ) : (
                <FileText className="size-10 text-primary" />
              )}
              <h2 className="font-bold break-words">{row.name || row.title}</h2>
              <p className="text-sm text-muted-foreground">
                {!isPartner && `${row.year} · `}
                {row.published ? "Publicado" : "Rascunho"} · Ordem {row.sort_order}
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => edit(row)}>
                  Editar
                </Button>
                {!isPartner && row.url && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPdf({ title: row.title!, url: row.url! })}
                  >
                    Visualizar PDF
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={() => setPendingDelete(row)}>
                  Excluir
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
      <Dialog
        open={!!editing}
        onOpenChange={(open) => {
          if (!open) close();
        }}
      >
        <DialogContent className="max-h-[90dvh] overflow-y-auto">
          <DialogTitle>
            {editing?.id ? "Editar" : "Cadastrar"} {isPartner ? "parceiro" : "documento"}
          </DialogTitle>
          <DialogDescription>
            {isPartner
              ? "A imagem será exibida sem recortar ou distorcer a logomarca."
              : "Título e ano aparecerão no cartão da página Transparência."}
          </DialogDescription>
          {editing && (
            <form onSubmit={submit} className="space-y-4">
              <label className="block text-sm font-medium">
                {isPartner ? "Nome do parceiro" : "Título do documento"}
                <Input
                  required
                  minLength={2}
                  maxLength={isPartner ? 120 : 160}
                  value={(isPartner ? editing.name : editing.title) || ""}
                  onChange={(e) => {
                    setEditing({ ...editing, [isPartner ? "name" : "title"]: e.target.value });
                    setDirty(true);
                  }}
                  disabled={busy}
                />
              </label>
              {!isPartner && (
                <label className="block text-sm font-medium">
                  Ano
                  <Input
                    required
                    type="number"
                    min={1900}
                    max={2200}
                    value={editing.year || ""}
                    onChange={(e) => {
                      setEditing({ ...editing, year: Number(e.target.value) });
                      setDirty(true);
                    }}
                    disabled={busy}
                  />
                </label>
              )}
              <label className="block text-sm font-medium">
                {isPartner ? "Logomarca · PNG, JPG ou WEBP, até 5 MB" : "Documento PDF · até 20 MB"}
                <Input
                  type="file"
                  accept={isPartner ? "image/png,image/jpeg,image/webp" : "application/pdf"}
                  onChange={(e) => void selectFile(e.target.files?.[0])}
                  disabled={busy}
                />
              </label>
              {isPartner && (preview || editing.url) && (
                <img
                  alt="Prévia da logomarca"
                  src={preview || editing.url}
                  className="h-28 w-full object-contain rounded-xl border p-3"
                />
              )}
              <p className="text-xs text-muted-foreground">
                {file
                  ? `Selecionado: ${file.name}`
                  : editing.file_path
                    ? "Arquivo atual mantido. Escolha outro para substituir."
                    : "Selecione um arquivo para continuar."}
              </p>
              <label className="block text-sm font-medium">
                Ordem de exibição
                <Input
                  type="number"
                  min={0}
                  max={99999}
                  required
                  value={editing.sort_order ?? 0}
                  onChange={(e) => {
                    setEditing({ ...editing, sort_order: Number(e.target.value) });
                    setDirty(true);
                  }}
                  disabled={busy}
                />
              </label>
              <label className="flex gap-2 items-center text-sm">
                <input
                  type="checkbox"
                  checked={!!editing.published}
                  onChange={(e) => {
                    setEditing({ ...editing, published: e.target.checked });
                    setDirty(true);
                  }}
                  disabled={busy}
                />
                Publicado no site
              </label>
              <p className="text-xs text-muted-foreground">
                Rascunhos ficam disponíveis somente no painel autorizado.
              </p>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={close} disabled={busy}>
                  Cancelar
                </Button>
                <Button disabled={busy}>
                  {busy && <Loader2 className="size-4 animate-spin mr-2" />}Salvar
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={!!pendingDelete}
        onOpenChange={(open) => {
          if (!open && !busy) setPendingDelete(null);
        }}
      >
        <DialogContent>
          <DialogTitle>Excluir {isPartner ? "parceiro" : "documento"}?</DialogTitle>
          <DialogDescription>
            “{pendingDelete?.name || pendingDelete?.title}” deixará de aparecer no site. Esta ação
            não pode ser desfeita.
          </DialogDescription>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" disabled={busy} onClick={() => setPendingDelete(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" disabled={busy} onClick={remove}>
              Excluir
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <PdfViewer file={pdf} onClose={() => setPdf(null)} />
    </div>
  );
}
