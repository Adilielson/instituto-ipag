import { T as TSS_SERVER_FUNCTION, a as createServerFn } from "./server-CzbV9FqZ.mjs";
import { s as supabase } from "./client-CddS5Swf.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType, a as arrayType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getProjetos_createServerFn_handler = createServerRpc({
  id: "2762b8da27f2bd41156a91959174a23f06ac02d76e236a8a7ce4183978106d96",
  name: "getProjetos",
  filename: "src/lib/api/cms.ts"
}, (opts) => getProjetos.__executeServer(opts));
const getProjetos = createServerFn({
  method: "GET"
}).handler(getProjetos_createServerFn_handler, async () => {
  const {
    data,
    error
  } = await supabase.from("projetos").select("*").eq("status", "publicado").order("ordem", {
    ascending: true
  }).order("created_at", {
    ascending: false
  });
  if (error) throw error;
  return data;
});
const getProjetoBySlug_createServerFn_handler = createServerRpc({
  id: "37afd61c13ddc537b9953cec7cf45125716e17e27efbb9d531007363e891809f",
  name: "getProjetoBySlug",
  filename: "src/lib/api/cms.ts"
}, (opts) => getProjetoBySlug.__executeServer(opts));
const getProjetoBySlug = createServerFn({
  method: "GET"
}).inputValidator(objectType({
  slug: stringType()
})).handler(getProjetoBySlug_createServerFn_handler, async ({
  data
}) => {
  const {
    data: project,
    error
  } = await supabase.from("projetos").select("*").eq("slug", data.slug).eq("status", "publicado").single();
  if (error) throw error;
  return project;
});
const getPosts_createServerFn_handler = createServerRpc({
  id: "859a16cba0e4ad6ed215241c768a307f25f794946268666b7f3d1024bbf346d4",
  name: "getPosts",
  filename: "src/lib/api/cms.ts"
}, (opts) => getPosts.__executeServer(opts));
const getPosts = createServerFn({
  method: "GET"
}).handler(getPosts_createServerFn_handler, async () => {
  const {
    data,
    error
  } = await supabase.from("posts").select("*").eq("status", "publicado").order("data_publicacao", {
    ascending: false
  });
  if (error) throw error;
  return data;
});
const getPostBySlug_createServerFn_handler = createServerRpc({
  id: "52151ebfb2785144c8712316d5feb67e7e40b93d622550b027942d5f4eb136f0",
  name: "getPostBySlug",
  filename: "src/lib/api/cms.ts"
}, (opts) => getPostBySlug.__executeServer(opts));
const getPostBySlug = createServerFn({
  method: "GET"
}).inputValidator(objectType({
  slug: stringType()
})).handler(getPostBySlug_createServerFn_handler, async ({
  data
}) => {
  const {
    data: post,
    error
  } = await supabase.from("posts").select("*").eq("slug", data.slug).eq("status", "publicado").single();
  if (error) throw error;
  return post;
});
const getEventos_createServerFn_handler = createServerRpc({
  id: "02c8e6c07f1e4a843f06b74bbbae1cd39cc72679957fdc14917b7a6e79a8a680",
  name: "getEventos",
  filename: "src/lib/api/cms.ts"
}, (opts) => getEventos.__executeServer(opts));
const getEventos = createServerFn({
  method: "GET"
}).handler(getEventos_createServerFn_handler, async () => {
  const {
    data,
    error
  } = await supabase.from("eventos").select("*").order("data_evento", {
    ascending: true
  });
  if (error) throw error;
  return data;
});
const getEventoBySlug_createServerFn_handler = createServerRpc({
  id: "38b4af48470fcb55cad3f95e631c16d613eddb32eaf8c3142126847e6f92d65d",
  name: "getEventoBySlug",
  filename: "src/lib/api/cms.ts"
}, (opts) => getEventoBySlug.__executeServer(opts));
const getEventoBySlug = createServerFn({
  method: "GET"
}).inputValidator(objectType({
  slug: stringType()
})).handler(getEventoBySlug_createServerFn_handler, async ({
  data
}) => {
  const {
    data: evento,
    error
  } = await supabase.from("eventos").select("*").eq("slug", data.slug).maybeSingle();
  if (error) throw error;
  return evento;
});
const createEvento_createServerFn_handler = createServerRpc({
  id: "6cf556854356a6e613669a258c856f82f672a7538922a72168c47668d3a6b89f",
  name: "createEvento",
  filename: "src/lib/api/cms.ts"
}, (opts) => createEvento.__executeServer(opts));
const createEvento = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  titulo: stringType(),
  slug: stringType(),
  data_evento: stringType(),
  local: stringType(),
  descricao: stringType().optional(),
  status: stringType().default("publicado"),
  imagem_destaque: stringType().optional(),
  galeria: arrayType(stringType()).optional(),
  video_url: stringType().optional()
})).handler(createEvento_createServerFn_handler, async ({
  data
}) => {
  const {
    data: evento,
    error
  } = await supabase.from("eventos").insert([data]).select().single();
  if (error) throw error;
  return evento;
});
const updateEvento_createServerFn_handler = createServerRpc({
  id: "18902821ee7658dc416f6b845a2bbbfcdc69afc5690fe760c9b561a798836b1a",
  name: "updateEvento",
  filename: "src/lib/api/cms.ts"
}, (opts) => updateEvento.__executeServer(opts));
const updateEvento = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType(),
  titulo: stringType(),
  slug: stringType(),
  data_evento: stringType(),
  local: stringType(),
  descricao: stringType().optional(),
  status: stringType(),
  imagem_destaque: stringType().optional(),
  galeria: arrayType(stringType()).optional(),
  video_url: stringType().optional()
})).handler(updateEvento_createServerFn_handler, async ({
  data
}) => {
  const {
    id,
    ...updates
  } = data;
  const {
    data: evento,
    error
  } = await supabase.from("eventos").update(updates).eq("id", id).select().single();
  if (error) throw error;
  return evento;
});
const deleteEvento_createServerFn_handler = createServerRpc({
  id: "64e617df992cba1401fc93ec369d59df73b546fd35f1d332023cbb5e6bc7a8ee",
  name: "deleteEvento",
  filename: "src/lib/api/cms.ts"
}, (opts) => deleteEvento.__executeServer(opts));
const deleteEvento = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType()
})).handler(deleteEvento_createServerFn_handler, async ({
  data
}) => {
  const {
    error
  } = await supabase.from("eventos").delete().eq("id", data.id);
  if (error) throw error;
  return {
    success: true
  };
});
export {
  createEvento_createServerFn_handler,
  deleteEvento_createServerFn_handler,
  getEventoBySlug_createServerFn_handler,
  getEventos_createServerFn_handler,
  getPostBySlug_createServerFn_handler,
  getPosts_createServerFn_handler,
  getProjetoBySlug_createServerFn_handler,
  getProjetos_createServerFn_handler,
  updateEvento_createServerFn_handler
};
