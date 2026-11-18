# Etapa 1 — autenticação e proteção administrativa

## Estado desta entrega

Branch de implementação, sem aplicar migrações em produção. A mudança exige preparação do Supabase antes de publicar. Não basta mesclar o código: as permissões atuais do banco continuam vigentes até aplicar a migração.

Inclui login por Supabase Auth, recuperação e troca de senha, saída real, bloqueio do painel para contas sem papel `admin`, verificação de sessão/perfil nas funções administrativas, políticas RLS para conteúdo e mídia e segredo privado para os lembretes. As operações sensíveis de integrações, doações e e-mails mantêm a senha adicional existente, além da sessão administrativa.

Não inclui gerenciamento completo de usuários, correções dos formulários de conteúdo ou homologação de pagamentos (etapas seguintes). Nenhum usuário é promovido automaticamente por nome, e-mail ou metadados editáveis.

## Preparação obrigatória

1. Fazer backup do banco e registrar a versão atual do deploy. Não executar a antiga migração `allow_public_write` como rollback.
2. No projeto Supabase correto, verificar os usuários existentes. Criar/convidar o administrador inicial pelo painel Auth, conferir sua identidade e concluir a confirmação de e-mail. Não usar senha compartilhada ou versionada. O convite inicial é uma ação explícita do operador; a aplicação não envia convites automaticamente.
3. Conferir o UUID real da conta e atribuir o papel em sessão administrativa de banco:

```sql
-- Substituir pelo UUID conferido no painel Auth. Nunca usar um UUID presumido.
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role FROM auth.users
WHERE id = 'UUID-CONFERIDO-DO-ADMINISTRADOR'::uuid
  AND email_confirmed_at IS NOT NULL
ON CONFLICT (user_id, role) DO NOTHING;
```

4. Configurar `SITE_URL`, `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY` e `SUPERADMIN_PASSWORD` no servidor. Somente URL e chave publicável podem estar em variáveis `VITE_*`. A URL/chave pública do frontend devem apontar para o mesmo projeto do servidor.
5. Criar `REMINDERS_CRON_SECRET` aleatório de alta entropia, exclusivamente no servidor/gerenciador de segredos. Atualizar o agendamento para enviar `x-cron-secret`; `apikey` pública e `x-admin-password` deixam de autorizar essa rota. Não inserir o segredo no repositório.
6. Em Auth → URL Configuration, cadastrar as URLs exatas de `/redefinir-senha` dos domínios autorizados e do preview controlado. Conferir SMTP, limites de envio e política de senha (recomendado mínimo 12 caracteres). Não usar wildcard amplo de previews.
7. Desabilitar cadastro público de novas contas, caso não haja outro produto usando Auth no mesmo projeto. O aplicativo não oferece cadastro aberto.

## Homologação e publicação

- Primeiro executar em ambiente de homologação com os próprios dados fictícios e variáveis desse ambiente.
- Verificar login, recuperação de senha com e-mail de teste autorizado, senha nova, logout, expiração/revogação e conta sem papel administrativo.
- Aplicar `20261113150000_secure_admin_access.sql`. A migração é transacional e aborta se não encontrar administrador confirmado; isso evita desativar a escrita pública sem existir uma conta administrativa inicial.
- Testar leitura pública de publicados e bloqueio de rascunhos. Verificar criação, edição e upload por admin e rejeição das mesmas operações por anon/usuário comum.
- Publicar o frontend/backend após preparar a conta e aplicar as políticas. Durante a transição, a versão antiga pode perder temporariamente a capacidade de editar; isso é preferível a manter escrita pública.
- Conferir o login e os módulos no domínio final. Revogar o papel de um usuário deve bloquear a próxima operação de banco/servidor, mesmo com token ainda válido.
- Validar também as políticas reais com o Supabase; o teste automatizado usa PostgreSQL isolado com schemas representativos, não inspeciona o banco remoto.

## Testes reproduzíveis

```sh
npm ci
npm run test:security
npm run build
npx tsc --noEmit
```

O teste de segurança executa a migração real em PostgreSQL descartável (PGlite) e verifica leitura pública, escrita/remoção bloqueadas, papéis, mídia, bloqueio de promoção de conta, revogação de papel e precondição de admin. Não usa credenciais nem conexão de produção.

A base original tem cinco erros TypeScript em arquivos fora desta etapa (`$.tsx`, `blog.index.tsx`, `eventos.index.tsx`, `doar.tsx`). Separar erros preexistentes de regressões desta entrega.

## Reversão segura

Se houver falha de publicação, retornar à versão anterior somente para leitura pública, mantendo as políticas RLS. Corrigir o acesso pelo painel Supabase usando conta de operador autorizada. Não reativar autenticação simulada, escrita anônima nem autorização por chave publicável. Preservar backup e observar o resultado de cada operação antes de seguir.
