import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireArea } from "@/lib/auth/admin.middleware";
import type { SupabaseClient } from "@supabase/supabase-js";
export type InstitutionalItem = {
  id: string;
  name?: string;
  title?: string;
  year?: number;
  file_path: string;
  published: boolean;
  sort_order: number;
  url?: string;
};
const settings = {
  partners: { table: "site_partners", bucket: "partner-logos", area: "parceiros" },
  documents: {
    table: "transparency_documents",
    bucket: "transparency-pdfs",
    area: "transparencia",
  },
} as const;
export type ModuleKind = keyof typeof settings;
const partnerSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(2).max(120),
  file_path: z.string().regex(/^[0-9a-f-]{36}\/[0-9a-f-]{36}\.(png|jpg|webp)$/),
  published: z.boolean(),
  sort_order: z.number().int().min(0).max(99999),
});
const documentSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(2).max(160),
  year: z.number().int().min(1900).max(2200),
  file_path: z.string().regex(/^[0-9a-f-]{36}\/[0-9a-f-]{36}\.pdf$/),
  published: z.boolean(),
  sort_order: z.number().int().min(0).max(99999),
});
function check<T extends { error: any }>(r: T): T {
  if (r.error)
    throw new Error("Não foi possível concluir a operação. Verifique a conexão e tente novamente.");
  return r;
}
async function adminDb() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin as SupabaseClient;
}
async function list(kind: ModuleKind, db: SupabaseClient, published = false) {
  let q = db
    .from(settings[kind].table)
    .select("*")
    .order("sort_order")
    .order("created_at")
    .order("id");
  if (published) q = q.eq("published", true);
  const rows: InstitutionalItem[] = [];
  for (let start = 0; ; start += 500) {
    const batch = check(await q.range(start, start + 499)).data || [];
    rows.push(...batch);
    if (batch.length < 500) break;
  }
  // Signing is server-only, after the authorized list query.
  const server = await adminDb();
  return Promise.all(
    rows.map(async (row) => ({
      ...row,
      url: check(
        await server.storage.from(settings[kind].bucket).createSignedUrl(row.file_path, 3600),
      ).data?.signedUrl,
    })),
  );
}
async function cleanup(kind: ModuleKind, path: string) {
  const db = await adminDb();
  const referenced = check(
    await db.from(settings[kind].table).select("id").eq("file_path", path).limit(1),
  ).data;
  if (referenced?.length) return;
  check(await db.storage.from(settings[kind].bucket).remove([path]));
}
async function save(kind: ModuleKind, data: any, db: SupabaseClient) {
  const conf = settings[kind];
  const { id, ...values } = data;
  const old = id ? check(await db.from(conf.table).select("*").eq("id", id).single()).data : null;
  const [folder, filename] = values.file_path.split("/");
  const files = check(
    await db.storage.from(conf.bucket).list(folder, { search: filename, limit: 100 }),
  ).data;
  if (!files?.some((f) => f.name === filename)) throw new Error("Envie o arquivo antes de salvar.");
  const result = id
    ? await db.from(conf.table).update(values).eq("id", id).select().single()
    : await db.from(conf.table).insert(values).select().single();
  const row = check(result).data;
  if (!row) throw new Error("Registro não encontrado ou acesso removido.");
  let cleanupPending = false;
  if (old?.file_path && old.file_path !== values.file_path) {
    try {
      await cleanup(kind, old.file_path);
    } catch {
      cleanupPending = true;
    }
  }
  return { item: row as InstitutionalItem, cleanupPending };
}
async function remove(kind: ModuleKind, id: string, db: SupabaseClient) {
  const deleted = check(
    await db.from(settings[kind].table).delete().eq("id", id).select("file_path").single(),
  ).data;
  if (!deleted) throw new Error("Registro não encontrado ou acesso removido.");
  let cleanupPending = false;
  try {
    await cleanup(kind, deleted.file_path);
  } catch {
    cleanupPending = true;
  }
  return { ok: true, cleanupPending };
}
export const publicPartners = createServerFn({ method: "GET" }).handler(async () =>
  list("partners", await adminDb(), true),
);
export const publicDocuments = createServerFn({ method: "GET" }).handler(async () => {
  const db = await adminDb();
  const rows: InstitutionalItem[] = [];
  for (let start = 0; ; start += 500) {
    const batch =
      check(
        await db
          .from("transparency_documents")
          .select("*")
          .eq("published", true)
          .order("sort_order")
          .order("year", { ascending: false })
          .order("id")
          .range(start, start + 499),
      ).data || [];
    rows.push(...batch);
    if (batch.length < 500) break;
  }
  return rows;
});
export const publicPdf = createServerFn({ method: "GET" })
  .inputValidator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    const db = await adminDb();
    const row = check(
      await db
        .from("transparency_documents")
        .select("file_path,title")
        .eq("id", data.id)
        .eq("published", true)
        .single(),
    ).data;
    if (!row) throw new Error("Documento indisponível.");
    return {
      title: row.title,
      url: check(await db.storage.from("transparency-pdfs").createSignedUrl(row.file_path, 300))
        .data!.signedUrl,
    };
  });
export const listPartners = createServerFn({ method: "POST" })
  .middleware([requireArea("parceiros")])
  .handler(async ({ context }) => list("partners", context.adminClient as SupabaseClient));
export const listDocuments = createServerFn({ method: "POST" })
  .middleware([requireArea("transparencia")])
  .handler(async ({ context }) => list("documents", context.adminClient as SupabaseClient));
export const savePartner = createServerFn({ method: "POST" })
  .middleware([requireArea("parceiros")])
  .inputValidator(partnerSchema)
  .handler(async ({ data, context }) =>
    save("partners", data, context.adminClient as SupabaseClient),
  );
export const saveDocument = createServerFn({ method: "POST" })
  .middleware([requireArea("transparencia")])
  .inputValidator(documentSchema)
  .handler(async ({ data, context }) =>
    save("documents", data, context.adminClient as SupabaseClient),
  );
export const deletePartner = createServerFn({ method: "POST" })
  .middleware([requireArea("parceiros")])
  .inputValidator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data, context }) =>
    remove("partners", data.id, context.adminClient as SupabaseClient),
  );
export const deleteDocument = createServerFn({ method: "POST" })
  .middleware([requireArea("transparencia")])
  .inputValidator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data, context }) =>
    remove("documents", data.id, context.adminClient as SupabaseClient),
  );
