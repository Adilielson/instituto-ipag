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
