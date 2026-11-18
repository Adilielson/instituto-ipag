// Runs entirely in disposable PostgreSQL (PGlite), never against production.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const { PGlite } = await import(process.env.PGLITE_MODULE || "@electric-sql/pglite");
const db = new PGlite();
const admin = "11111111-1111-4111-8111-111111111111";
const member = "22222222-2222-4222-8222-222222222222";
await db.exec(`
 CREATE ROLE anon; CREATE ROLE authenticated; CREATE ROLE service_role;
 CREATE SCHEMA auth; CREATE SCHEMA storage;
 CREATE TABLE auth.users(id uuid PRIMARY KEY, email_confirmed_at timestamptz);
 CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql STABLE AS $$ SELECT nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
 GRANT USAGE ON SCHEMA auth, public, storage TO anon, authenticated;
 CREATE TYPE public.app_role AS ENUM ('admin','moderator','user');
 CREATE TABLE public.user_roles(user_id uuid REFERENCES auth.users, role public.app_role);
 ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
 CREATE POLICY own_role ON public.user_roles FOR SELECT TO authenticated USING (user_id=auth.uid());
 CREATE FUNCTION public.has_role(_user_id uuid,_role public.app_role) RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$ SELECT EXISTS (SELECT 1 FROM user_roles WHERE user_id=_user_id AND role=_role) $$;
 CREATE TABLE public.projetos(id int PRIMARY KEY, status text);
 CREATE TABLE public.posts(LIKE public.projetos INCLUDING ALL);
 CREATE TABLE public.eventos(LIKE public.projetos INCLUDING ALL);
 CREATE TABLE public.blog_categories(LIKE public.projetos INCLUDING ALL);
 CREATE TABLE public.donations(id int PRIMARY KEY);
 CREATE TABLE storage.objects(id int PRIMARY KEY,bucket_id text);
 ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
 GRANT ALL ON ALL TABLES IN SCHEMA public,storage TO anon,authenticated;
 CREATE POLICY legacy_open_storage ON storage.objects FOR ALL TO anon,authenticated USING (true) WITH CHECK (true);
 INSERT INTO projetos VALUES(1,'publicado'),(2,'rascunho');
 INSERT INTO posts SELECT * FROM projetos; INSERT INTO eventos SELECT * FROM projetos;
 INSERT INTO blog_categories VALUES(1,'publicado');
 INSERT INTO storage.objects VALUES(1,'blog'),(2,'event-assets'),(3,'other');
`);
const migration = await readFile(
  new URL("../supabase/migrations/20261113150000_secure_admin_access.sql", import.meta.url),
  "utf8",
);
await assert.rejects(db.exec(migration), /Provision a verified administrator/);
await db.exec("ROLLBACK");
await db.exec(
  `INSERT INTO auth.users VALUES('${admin}',now()),('${member}',now()); INSERT INTO user_roles VALUES('${admin}','admin'),('${member}','user');`,
);
await db.exec(migration);
let checks = 1;
async function as(role, id, sql) {
  await db.exec(
    `BEGIN; SET LOCAL ROLE ${role}; SELECT set_config('request.jwt.claim.sub','${id || ""}',true);`,
  );
  try {
    return await db.query(sql);
  } finally {
    await db.exec("ROLLBACK");
  }
}
for (const [role, id] of [
  ["anon", ""],
  ["authenticated", member],
]) {
  for (const table of ["projetos", "posts", "eventos"]) {
    assert.deepEqual((await as(role, id, `SELECT id FROM ${table} ORDER BY id`)).rows, [{ id: 1 }]);
    checks++;
    await assert.rejects(as(role, id, `INSERT INTO ${table} VALUES(99,'publicado')`));
    checks++;
    const update = await as(
      role,
      id,
      `UPDATE ${table} SET status='publicado' WHERE id=2 RETURNING id`,
    ).catch(() => ({ rows: [] }));
    assert.equal(update.rows.length, 0);
    checks++;
    const deletion = await as(role, id, `DELETE FROM ${table} WHERE id=1 RETURNING id`).catch(
      () => ({ rows: [] }),
    );
    assert.equal(deletion.rows.length, 0);
    checks++;
  }
  await assert.rejects(as(role, id, `INSERT INTO user_roles VALUES('${member}','admin')`));
  checks++;
  await assert.rejects(as(role, id, `INSERT INTO donations VALUES(99)`));
  checks++;
  await assert.rejects(as(role, id, `INSERT INTO blog_categories VALUES(99,'publicado')`));
  checks++;
  for (const bucket of ["blog", "event-assets"]) {
    await assert.rejects(as(role, id, `INSERT INTO storage.objects VALUES(99,'${bucket}')`));
    checks++;
    assert.equal(
      (await as(role, id, `DELETE FROM storage.objects WHERE bucket_id='${bucket}' RETURNING id`))
        .rows.length,
      0,
    );
    checks++;
    assert.equal(
      (
        await as(
          role,
          id,
          `UPDATE storage.objects SET bucket_id='other' WHERE bucket_id='${bucket}' RETURNING id`,
        )
      ).rows.length,
      0,
    );
    checks++;
    await assert.rejects(
      as(role, id, `UPDATE storage.objects SET bucket_id='${bucket}' WHERE id=3`),
    );
    checks++;
  }
}
for (const table of ["projetos", "posts", "eventos", "blog_categories"]) {
  assert.ok((await as("authenticated", admin, `SELECT * FROM ${table}`)).rows.length);
  checks++;
  await as("authenticated", admin, `INSERT INTO ${table} VALUES(99,'rascunho')`);
  checks++;
  assert.equal(
    (
      await as(
        "authenticated",
        admin,
        `UPDATE ${table} SET status='rascunho' WHERE id=1 RETURNING id`,
      )
    ).rows.length,
    1,
  );
  checks++;
  assert.equal(
    (await as("authenticated", admin, `DELETE FROM ${table} WHERE id=1 RETURNING id`)).rows.length,
    1,
  );
  checks++;
}
for (const bucket of ["blog", "event-assets"]) {
  await as("authenticated", admin, `INSERT INTO storage.objects VALUES(99,'${bucket}')`);
  checks++;
  assert.equal(
    (
      await as(
        "authenticated",
        admin,
        `DELETE FROM storage.objects WHERE bucket_id='${bucket}' RETURNING id`,
      )
    ).rows.length,
    1,
  );
  checks++;
}
// Removing an admin role takes effect on subsequent requests.
await db.exec(`DELETE FROM user_roles WHERE user_id='${admin}';`);
await assert.rejects(as("authenticated", admin, `INSERT INTO projetos VALUES(99,'publicado')`));
checks++;
// Phase 2: delegation uses fresh database permissions, never JWT metadata.
await db.exec(
  `INSERT INTO user_roles VALUES('${admin}','admin'); ALTER TABLE storage.objects ADD COLUMN owner_id text;`,
);
await db.exec(
  await readFile(
    new URL("../supabase/migrations/20261118120000_user_access.sql", import.meta.url),
    "utf8",
  ),
);
await assert.rejects(
  as("authenticated", member, `SELECT manage_site_access('${member}','Intruso',true,true,'{}')`),
);
checks++;
await assert.rejects(
  as(
    "authenticated",
    member,
    `INSERT INTO site_access VALUES('${member}','Intruso',true,true,'{}')`,
  ),
);
checks++;
await assert.rejects(
  as("authenticated", admin, `SELECT manage_site_access('${admin}','Admin',false,true,'{}')`),
);
checks++;
await assert.rejects(
  as("authenticated", admin, `SELECT manage_site_access('${admin}','Admin',true,false,'{}')`),
);
checks++;
await assert.rejects(
  as("authenticated", admin, `SELECT manage_site_access('${admin}','Admin',true,true,'{}',true)`),
);
checks++;
await assert.rejects(
  as(
    "authenticated",
    admin,
    `SELECT manage_site_access('${member}','Membro',false,true,'{usuarios}')`,
  ),
);
checks++;
// Commit a real delegated grant as the administrator.
await db.exec(
  `BEGIN; SET LOCAL ROLE authenticated; SELECT set_config('request.jwt.claim.sub','${admin}',true); SELECT manage_site_access('${member}','Editor',false,true,'{projetos}'); COMMIT;`,
);
assert.equal(
  (await as("authenticated", member, `SELECT can_access('projetos') AS allowed`)).rows[0].allowed,
  true,
);
checks++;
assert.equal(
  (await as("authenticated", member, `SELECT can_access('usuarios') AS allowed`)).rows[0].allowed,
  false,
);
checks++;
assert.equal(
  (await as("authenticated", member, `SELECT count(*)::int AS n FROM site_access`)).rows[0].n,
  1,
);
checks++;
assert.equal(
  (await as("authenticated", member, `SELECT count(*)::int AS n FROM projetos`)).rows[0].n,
  2,
);
checks++;
await as("authenticated", member, `INSERT INTO projetos VALUES(90,'rascunho')`);
checks++;
await as("authenticated", member, `UPDATE projetos SET status='rascunho' WHERE id=1 RETURNING id`);
checks++;
assert.equal(
  (await as("authenticated", member, `DELETE FROM projetos WHERE id=2 RETURNING id`)).rows.length,
  1,
);
checks++;
for (const table of ["posts", "eventos", "blog_categories"]) {
  await assert.rejects(as("authenticated", member, `INSERT INTO ${table} VALUES(90,'rascunho')`));
  checks++;
  assert.equal(
    (await as("authenticated", member, `DELETE FROM ${table} WHERE id=1 RETURNING id`)).rows.length,
    0,
  );
  checks++;
}
await as(
  "authenticated",
  member,
  `INSERT INTO storage.objects(id,bucket_id,owner_id) VALUES(99,'blog','${member}')`,
);
checks++;
await assert.rejects(
  as(
    "authenticated",
    member,
    `INSERT INTO storage.objects(id,bucket_id,owner_id) VALUES(99,'event-assets','${member}')`,
  ),
);
checks++;
await db.exec(`UPDATE storage.objects SET owner_id='${admin}' WHERE bucket_id='blog'`);
assert.equal(
  (
    await as(
      "authenticated",
      member,
      `DELETE FROM storage.objects WHERE bucket_id='blog' RETURNING id`,
    )
  ).rows.length,
  0,
);
checks++;
// Revocation works even with the same user/session, on the next request.
await db.exec(
  `BEGIN; SET LOCAL ROLE authenticated; SELECT set_config('request.jwt.claim.sub','${admin}',true); SELECT manage_site_access('${member}','Editor',false,false,'{projetos}'); COMMIT;`,
);
await assert.rejects(as("authenticated", member, `INSERT INTO projetos VALUES(90,'rascunho')`));
checks++;
assert.equal(
  (await as("authenticated", member, `SELECT can_access('projetos') AS allowed`)).rows[0].allowed,
  false,
);
checks++;
// Promotion and demotion also keep legacy admin roles synchronized.
await db.exec(
  `BEGIN; SET LOCAL ROLE authenticated; SELECT set_config('request.jwt.claim.sub','${admin}',true); SELECT manage_site_access('${member}','Editor',true,true,'{}'); COMMIT;`,
);
assert.equal(
  (await as("authenticated", member, `SELECT can_access('usuarios') AS allowed`)).rows[0].allowed,
  true,
);
checks++;
await db.exec(
  `BEGIN; SET LOCAL ROLE authenticated; SELECT set_config('request.jwt.claim.sub','${admin}',true); SELECT manage_site_access('${member}','Editor',false,false,'{}',true); COMMIT;`,
);
assert.equal(
  (await as("authenticated", member, `SELECT can_access('usuarios') AS allowed`)).rows[0].allowed,
  false,
);
checks++;
assert.equal(
  (
    await as(
      "authenticated",
      member,
      `SELECT count(*)::int AS n FROM user_roles WHERE role='admin'`,
    )
  ).rows[0].n,
  0,
);
checks++;
// The client route filter must agree with database areas, including direct URLs.
const { canVisit, firstArea } = await import("../src/lib/auth/areas.ts");
const editor = {
  user_id: member,
  name: "Editor",
  is_admin: false,
  active: true,
  areas: ["projetos"],
};
assert.equal(canVisit(editor, "/admin/projetos"), true);
checks++;
assert.equal(canVisit(editor, "/admin/projetos/"), true);
checks++;
assert.equal(canVisit(editor, "/admin/usuarios"), false);
checks++;
assert.equal(canVisit(editor, "/admin/integracoes"), false);
checks++;
assert.equal(canVisit(editor, "/admin"), false);
checks++;
assert.equal(firstArea(editor), "/admin/projetos");
checks++;
assert.equal(canVisit({ ...editor, active: false }, "/admin/projetos"), false);
checks++;
assert.equal(canVisit({ ...editor, is_admin: true }, "/admin/usuarios"), true);
checks++;
await db.close();
console.log(`${checks} security checks passed (isolated PostgreSQL).`);
