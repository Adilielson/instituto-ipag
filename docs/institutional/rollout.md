# Parceiros e Transparência — ativação

Implementação independente do PR de doações. Preserva o cabeçalho e os cartões públicos existentes e substitui os dados demonstrativos por registros reais.

## Banco e arquivos

1. Fazer backup e confirmar as migrações anteriores de autenticação/áreas (`can_access`).
2. Aplicar uma vez `supabase/migrations/20261118190000_partners_transparency.sql` no Lovable Cloud. Se o projeto gerencia o histórico pelo Drizzle, registrar essa migração no próximo índice disponível do pipeline, sem sobrescrever o journal em atualização pelo PR de doações. Não executar o mesmo SQL duas vezes.
3. A migração cria `site_partners`, `transparency_documents` e os buckets privados `partner-logos` (PNG/JPG/WEBP, até 5 MB) e `transparency-pdfs` (PDF, até 20 MB).
4. RLS permite escrita apenas na área concedida. Políticas restritivas impedem acesso indevido aos novos buckets mesmo que exista uma política antiga permissiva. Publicação padrão: rascunho.
5. Publicar o código após a migração. Administrador já existente mantém acesso a ambos os módulos.

## Funcionalidades

Parceiros: nome obrigatório, upload/substituição de logomarca, ordem, publicação, listagem, edição e exclusão com confirmação. Logomarca exibida em suas proporções e cores originais, sem recorte. Cadastros publicados alimentam o carrossel da Home e a página `/parceiros`. Movimento pode ser pausado e respeita redução de movimento.

Transparência: título, ano, PDF, ordem e publicação. Cartões públicos seguem o layout anterior e abrem modal dentro do aplicativo com leitor PDF do navegador. Também há prévia no administrador. Navegadores sem leitor embutido têm link alternativo; esse fallback deve ser homologado em iOS/Android. URLs públicas de PDF duram cinco minutos e podem ser renovadas pelo botão Recarregar PDF; arquivos abertos anteriormente podem continuar em cache depois de despublicados.

Uploads usam caminhos únicos por usuário; substituições não sobrescrevem os arquivos antigos. O arquivo anterior é removido após salvar o novo cadastro, se não tiver outra referência. Em falha de limpeza, o cadastro permanece salvo e o painel avisa. Uploads abandonados podem permanecer privados; limpeza periódica de órfãos não foi habilitada nesta entrega.

Não foram inventadas logomarcas nem documentos. Cadastros começam vazios; o administrador deve fornecer os arquivos reais.

## Testar antes de publicar

- Criar parceiro em rascunho, salvar, editar, trocar logomarca, publicar, conferir Home e `/parceiros`, despublicar e excluir.
- Criar documento com título/ano/PDF, visualizar no admin, publicar, abrir pelo cartão público, substituir o PDF e confirmar que abre o novo arquivo.
- Cancelar uma edição com alterações e conferir o aviso.
- Tentar upload de formato/tamanho inválido e validar mensagens de erro.
- Testar usuário com apenas Parceiros, com apenas Transparência e sem ambos. Rascunhos não podem aparecer para visitantes.
- Conferir desktop e celular, foco/fechamento dos modais e visualização de PDF. Cache de página já aberta pode exigir atualização para refletir novas publicações.

Validação local: `node tests/institutional-cms.mjs`, `npx tsc --noEmit`, `npm run build`. O teste SQL usa banco descartável; não substitui upload e visualização no Storage real.

Nenhuma migração, upload, edição ou exclusão de dados reais foi realizada nesta entrega.

## Atualização do upload de logomarcas (19/11/2026)

- O formulário aceita PNG, JPG e WEBP até 5 MB. Recomenda PNG transparente de 600 × 300 px. A imagem é decodificada e centralizada em uma tela PNG transparente de 600 × 300 px, preservando proporção, sem corte e sem ampliar originais pequenos. Imagens acima de 40 MP/16.000 px por lado são rejeitadas.
- A Home passa a usar `/api/public/partners/{id}/logo?v={caminho}` no mesmo domínio. O servidor confere publicação e lê o Storage privado; não utiliza URLs temporárias no HTML público nem arquivos no disco temporário da Vercel. Substituições têm novo caminho e nova chave de cache. Cache máximo de 60 segundos após despublicação; erros não são armazenados.
- No deploy da Vercel, conferir SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no servidor, apontando ao MESMO Lovable Cloud usado pelo formulário (VITE_SUPABASE_URL). Nunca expor service role em VITE_*. A aplicação depende do runtime de servidor; não publicar como exportação estática.
- Após integrar, testar upload/publicação/substituição no domínio final, abrir o endereço da imagem e confirmar HTTP 200 com Content-Type de imagem. Repetir após nova implantação e verificar que a Home continua exibindo o arquivo. Não atribuir a falha à Vercel sem conferir logs/env/rede.
- O print enviado mostra um formulário diferente do código main disponível nesta sessão. O PR #3 ainda estava aberto durante esta atualização. Ao incorporar no Lovable, preservar campos adicionais do formulário atual (por exemplo, Site) e adaptar ao schema real; não criar uma segunda lista de parceiros em paralelo se o Cloud já implementou outra tabela.
