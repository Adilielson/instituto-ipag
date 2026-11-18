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
