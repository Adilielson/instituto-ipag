import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lfbghwoaswxvflxaiwrv.supabase.co";
const supabaseKey = "sb_publishable_d4WcFRY3BBQ0kJxo3cB5UA_hB1Hp4hS";

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabase() {
  console.log("=== DIAGNÓSTICO DO SUPABASE ===");
  
  // Teste 1: Tabela de Projetos
  console.log("\n1. Consultando tabela 'projetos'...");
  const projetosRes = await supabase.from("projetos").select("*");
  if (projetosRes.error) {
    console.error("Erro na tabela 'projetos':", projetosRes.error);
  } else {
    console.log(`Sucesso! Encontrados ${projetosRes.data.length} projetos.`);
    console.log("Projetos cadastrados:", projetosRes.data.map(p => ({
      id: p.id,
      titulo: p.titulo,
      slug: p.slug,
      status: p.status
    })));
  }

  // Teste 2: Tabela de Posts (Blog)
  console.log("\n2. Consultando tabela 'posts'...");
  const postsRes = await supabase.from("posts").select("*");
  if (postsRes.error) {
    console.error("Erro na tabela 'posts':", postsRes.error);
  } else {
    console.log(`Sucesso! Encontrados ${postsRes.data.length} posts.`);
    console.log("Posts cadastrados:", postsRes.data.map(p => ({
      id: p.id,
      titulo: p.titulo,
      slug: p.slug,
      status: p.status
    })));
  }

  // Teste 3: Tabela de Eventos
  console.log("\n3. Consultando tabela 'eventos'...");
  const eventosRes = await supabase.from("eventos").select("*");
  if (eventosRes.error) {
    console.error("Erro na tabela 'eventos':", eventosRes.error);
  } else {
    console.log(`Sucesso! Encontrados ${eventosRes.data.length} eventos.`);
    console.log("Eventos cadastrados:", eventosRes.data.map(e => ({
      id: e.id,
      titulo: e.titulo,
      slug: e.slug,
      status: e.status,
      data_evento: e.data_evento
    })));
  }
}

testDatabase();
