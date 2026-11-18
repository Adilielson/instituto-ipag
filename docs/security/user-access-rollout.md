# Usuários e permissões por área — IPAG

Implementação preparada sobre a etapa de autenticação (`ac6168c`). Ainda não aplicada no Lovable Cloud nem publicada. O GitHub recusou a criação de branch com HTTP 403 em 18/11/2026.

## Funcionalidade

- Listagem paginada das contas reais do Auth, com busca na página, confirmação e situação de acesso.
- Criação por convite enviado pelo Auth; o destinatário define sua senha no link.
- Edição de nome, perfil, áreas e suspensão/reativação. O e-mail é a identidade de login e fica somente leitura na edição.
- Exclusão com confirmação: revoga permissões primeiro e depois exclui a conta Auth. Se vínculos impedirem a exclusão, informa a falha e mantém o acesso revogado.
- Administrador: todas as áreas e gestão de usuários. Colaborador: CRUD somente nas áreas selecionadas.
- Áreas: projetos, eventos, blog, doações, e-mails, integrações, parceiros e transparência. Estas duas últimas continuam com os recursos limitados já existentes: liberar acesso não implementa seu CMS.
- Dashboard agregado e gestão de usuários exclusivos de administradores. Colaboradores entram na primeira área liberada.
- Não permite remover, suspender ou rebaixar o próprio administrador. Operações serializadas no banco e proteção do último administrador ativo.
- Permissões consultadas no banco por operação; revogação bloqueia novas operações sem aguardar expiração do JWT. Interface confere novamente ao ganhar foco e a cada 30 segundos. Conteúdo já carregado no navegador não pode ser apagado remotamente.
- Upload no bucket existente compartilhado por projetos/blog; edição e remoção de mídia de colaboradores exigem propriedade. Admin pode gerenciar todas as mídias.
- Doações, integrações e e-mails mantêm a senha adicional já exigida, além da permissão da área.

## Ativação no Lovable Cloud

1. Conferir o administrador inicial confirmado e seu papel `admin` em `user_roles`, conforme `phase-1-rollout.md`. Não promover conta por e-mail presumido ou metadados editáveis.
2. Fazer backup e aplicar, nessa ordem, as migrações `20261113150000_secure_admin_access.sql` e `20261118120000_user_access.sql`. A segunda importa os administradores existentes para `site_access`.
3. Manter as variáveis de servidor da etapa 1 e adicionar `APP_URL` com a origem HTTPS canônica do site (sem caminho). URL/chaves do navegador e servidor devem apontar para o mesmo backend Lovable Cloud. Nunca usar service role em `VITE_*`.
4. Autorizar a URL exata `APP_URL/redefinir-senha` nos redirecionamentos de Auth e conferir entrega/limites de e-mail. Não usar wildcard amplo.
5. Publicar frontend e servidor juntos. A versão nova depende da tabela e funções da segunda migração. Gerenciar acessos via painel/RPC depois dela; editar só `user_roles` não altera `site_access`.
6. Testar com contas controladas: convite recebido, definição de senha, login, mudança de nome, colaborador apenas em projetos, bloqueio de URL de usuários, CRUD de projeto, bloqueio de eventos, suspensão com sessão aberta, reativação e exclusão. Verificar mensagens de falha e recuperação de senha.

Convites dependem da configuração real de e-mail e não foram enviados nesta implementação. Não foram criados/excluídos usuários nem modificados dados de produção.

## Validação

`npm run test:security`: PostgreSQL descartável (PGlite), migrações reais e regras de navegação; inclui concessão, remoção, suspensão, promoção, privacidade e propriedade de mídia.

`npm run build`: build de produção.

`npx tsc --noEmit`: permanecem cinco erros anteriores em `$.tsx`, `blog.index.tsx`, `eventos.index.tsx` e `doar.tsx`; nenhum erro novo nos arquivos desta implementação.

O teste isolado não substitui o ciclo de convite/login/CRUD no backend remoto. Ainda falta homologação visual e ponta a ponta com Lovable Cloud.
