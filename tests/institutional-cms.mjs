import {PGlite} from '@electric-sql/pglite';
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const db=new PGlite();let count=0;
const a='11111111-1111-4111-8111-111111111111';
const f='22222222-2222-4222-8222-222222222222';
await db.exec(`CREATE ROLE anon; CREATE ROLE authenticated; CREATE ROLE service_role;
CREATE SCHEMA auth; CREATE SCHEMA storage;
CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql STABLE AS $$ SELECT nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
CREATE FUNCTION public.can_access(area text) RETURNS boolean LANGUAGE sql STABLE AS $$ SELECT coalesce(current_setting('test.areas',true),'') IN ('all',area) $$;
CREATE FUNCTION storage.foldername(name text) RETURNS text[] LANGUAGE sql IMMUTABLE AS $$ SELECT string_to_array(name,'/') $$;
CREATE TABLE storage.buckets(id text PRIMARY KEY,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);
CREATE TABLE storage.objects(id int PRIMARY KEY,bucket_id text,name text);
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
CREATE POLICY legacy_open ON storage.objects FOR ALL USING(true) WITH CHECK(true);
GRANT USAGE ON SCHEMA public,auth,storage TO anon,authenticated;
GRANT ALL ON storage.objects TO anon,authenticated;`);
await db.exec(readFileSync('supabase/migrations/20261118190000_partners_transparency.sql','utf8'));
await db.exec(`INSERT INTO site_partners(id,name,file_path,published) VALUES('${a}','Parceiro A','${a}/${f}.png',true),('${f}','Rascunho','${a}/${a}.png',false);
INSERT INTO transparency_documents(id,title,year,file_path,published) VALUES('${a}','Estatuto',2017,'${a}/${f}.pdf',true),('${f}','Contas',2026,'${a}/${a}.pdf',false);
INSERT INTO storage.objects VALUES(1,'partner-logos','${a}/${f}.png'),(2,'transparency-pdfs','${a}/${f}.pdf');`);
async function as(role,area,sql){await db.exec(`BEGIN;SET LOCAL ROLE ${role};SELECT set_config('test.areas','${area}',true);SELECT set_config('request.jwt.claim.sub','${a}',true);`);try{return await db.query(sql);}finally{await db.exec('ROLLBACK');}}
const ok=(v,msg)=>{assert.ok(v,msg);count++;};
for(const [table,area] of [['site_partners','parceiros'],['transparency_documents','transparencia']]){
 ok((await as('anon','',`SELECT * FROM ${table}`)).rows.length===1,'public sees published only');
 ok((await as('authenticated','',`SELECT * FROM ${table}`)).rows.length===1,'unprivileged sees published only');
 ok((await as('authenticated',area,`SELECT * FROM ${table}`)).rows.length===2,'area editor sees drafts');
 ok((await as('authenticated','all',`SELECT * FROM ${table}`)).rows.length===2,'admin sees drafts');
 const wrong=area==='parceiros'?'transparencia':'parceiros';
 ok((await as('authenticated',wrong,`UPDATE ${table} SET published=false WHERE id='${a}' RETURNING id`)).rows.length===0,'cross area edit denied');
 ok((await as('authenticated',wrong,`DELETE FROM ${table} WHERE id='${a}' RETURNING id`)).rows.length===0,'cross area delete denied');
 ok((await as('authenticated',area,`UPDATE ${table} SET published=false WHERE id='${a}' RETURNING id`)).rows.length===1,'editor can unpublish');
 ok((await as('authenticated',area,`DELETE FROM ${table} WHERE id='${a}' RETURNING id`)).rows.length===1,'editor can delete');
 const insert=table==='site_partners'?`INSERT INTO site_partners(name,file_path) VALUES('Novo','${a}/${a}.webp') RETURNING published`:`INSERT INTO transparency_documents(title,year,file_path) VALUES('Novo PDF',2026,'${a}/${a}.pdf') RETURNING published`;
 ok((await as('authenticated',area,insert)).rows[0].published===false,'new records default draft');
 await assert.rejects(as('authenticated',wrong,insert));count++;
 for(const role of ['anon','authenticated']){await assert.rejects(as(role,'',insert));count++;}
}
for(const [bucket,area] of [['partner-logos','parceiros'],['transparency-pdfs','transparencia']]){
 ok((await as('anon','',`SELECT * FROM storage.objects WHERE bucket_id='${bucket}'`)).rows.length===0,'anonymous cannot access private files despite legacy policy');
 ok((await as('authenticated',area,`SELECT * FROM storage.objects WHERE bucket_id='${bucket}'`)).rows.length===1,'editor can read module files');
 const insert=`INSERT INTO storage.objects VALUES(3,'${bucket}','${a}/${f}.png') RETURNING id`;
 ok((await as('authenticated',area,insert)).rows.length===1,'own folder upload allowed');
 await assert.rejects(as('authenticated','',insert));count++;
 await assert.rejects(as('authenticated',area,`INSERT INTO storage.objects VALUES(3,'${bucket}','${f}/${f}.png')`));count++;
 ok((await as('authenticated',area,`DELETE FROM storage.objects WHERE bucket_id='${bucket}' RETURNING id`)).rows.length===0,'direct deletion blocked');
 ok((await as('authenticated',area,`UPDATE storage.objects SET name='changed' WHERE bucket_id='${bucket}' RETURNING id`)).rows.length===0,'overwrite blocked');
}
await assert.rejects(as('authenticated','transparencia',`INSERT INTO transparency_documents(title,year,file_path) VALUES('Bad',2026,'https://external.invalid/file.pdf')`));count++;
await assert.rejects(as('authenticated','parceiros',`INSERT INTO site_partners(name,file_path) VALUES('Bad','${a}/${f}.svg')`));count++;
ok((await db.query('SELECT public FROM storage.buckets')).rows.every(b=>b.public===false),'both buckets private');
await db.close();console.log(`${count} institutional CMS checks passed`);
