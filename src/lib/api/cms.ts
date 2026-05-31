import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

export const getProjetos = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabase
    .from("projetos")
    .select("*")
    .eq("status", "publicado")
    .order("created_at", { ascending: false });
  
  if (error) throw error;
  return data;
});

export const getProjetoBySlug = createServerFn({ method: "GET" })
  .inputValidator(z.object({ slug: z.string() }))
  .handler(async ({ data }) => {
    const { data: project, error } = await supabase
      .from("projetos")
      .select("*")
      .eq("slug", data.slug)
      .eq("status", "publicado")
      .single();
    
    if (error) throw error;
    return project;
  });

export const getPosts = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "publicado")
    .order("data_publicacao", { ascending: false });
  
  if (error) throw error;
  return data;
});

export const getPostBySlug = createServerFn({ method: "GET" })
  .inputValidator(z.object({ slug: z.string() }))
  .handler(async ({ data }) => {
    const { data: post, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", data.slug)
      .eq("status", "publicado")
      .single();
    
    if (error) throw error;
    return post;
  });

export const getEventos = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabase
    .from("eventos")
    .select("*")
    .eq("status", "publicado")
    .order("data_evento", { ascending: true });
  
  if (error) throw error;
  return data;
});

export const getEventoBySlug = createServerFn({ method: "GET" })
  .inputValidator(z.object({ slug: z.string() }))
  .handler(async ({ data }) => {
    const { data: evento, error } = await supabase
      .from("eventos")
      .select("*")
      .eq("slug", data.slug)
      .eq("status", "publicado")
      .single();
    
    if (error) throw error;
    return evento;
  });

export const createEvento = createServerFn({ method: "POST" })
  .inputValidator(z.object({
    titulo: z.string(),
    slug: z.string(),
    data_evento: z.string(),
    local: z.string(),
    descricao: z.string().optional(),
    status: z.string().default("publicado"),
    imagem_destaque: z.string().optional(),
    galeria: z.array(z.string()).optional(),
    video_url: z.string().optional()
  }))
  .handler(async ({ data }) => {
    const { data: evento, error } = await supabase
      .from("eventos")
      .insert([data])
      .select()
      .single();
    
    if (error) throw error;
    return evento;
  });

export const updateEvento = createServerFn({ method: "POST" })
  .inputValidator(z.object({
    id: z.string(),
    titulo: z.string(),
    slug: z.string(),
    data_evento: z.string(),
    local: z.string(),
    descricao: z.string().optional(),
    status: z.string(),
    imagem_destaque: z.string().optional(),
    galeria: z.array(z.string()).optional(),
    video_url: z.string().optional()
  }))
  .handler(async ({ data }) => {
    const { id, ...updates } = data;
    const { data: evento, error } = await supabase
      .from("eventos")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    
    if (error) throw error;
    return evento;
  });

export const deleteEvento = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const { error } = await supabase
      .from("eventos")
      .delete()
      .eq("id", data.id);
    
    if (error) throw error;
    return { success: true };
  });
