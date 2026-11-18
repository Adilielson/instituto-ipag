# Central de doações — etapas 1 e 2

## Escopo entregue

- Ledger de pagamentos independente das assinaturas e dos registros legados. Doador identificado por ambiente + cliente Asaas; parcela por ambiente + pagamento Asaas.
- Histórico por doador, recorrências, filtros por projeto, período (criação/vencimento/pagamento), método e situação.
- Totais SQL sobre todos os registros do recorte; tabela paginada em 50 itens. CSV consistente em uma consulta, até 20.000 registros; acima disso exige reduzir o período, sem exportar arquivo truncado. Proteção contra fórmulas em CSV.
- Recebido, líquido, taxas da cobrança, confirmado a liberar, pendente, vencido, recebido fora do Asaas e estornado separados. Isso não é o saldo da conta nem substitui o extrato contábil.
- Estornos parciais/contestações e estados não reconhecidos ficam sinalizados para análise e fora dos totais de recebimento. O líquido após esses ajustes exige conciliação do extrato, fora desta entrega.
- Webhook exige segredo, consulta estado atual na API e não confirma recebimento só porque uma assinatura está ativa. Erros de persistência retornam 503. Eventos concluídos têm chave única; snapshots antigos não substituem mais recentes.
- Pagamentos não vinculados ao IPAG são registrados como eventos UNMATCHED, sem inventar vínculo por nome de campanha nem bloquear a fila Asaas inteira.
- Substituído o botão de confirmação local pela verificação real no Asaas. A antiga função de confirmação também foi alterada, não apenas escondida.
- Conciliação manual por lotes de cinco registros IPAG; reinício não duplica pagamentos. Percorre as páginas de cobranças mensais; limite de 10.000 parcelas por assinatura gera pendência explícita.
- Endpoint de conciliação agendada com segredo de servidor e cursor persistido. Não cria cobranças, não cancela assinaturas e não dispara campanhas.
- Preservado o primeiro e-mail de confirmação, apenas com pagamento verificado. Campanhas por parcela são etapa 3. A entrega de e-mail não é transacional com o provedor: falha após envio/antes de confirmação pode exigir revisão; não há promessa de exactly-once para e-mails.

## Preparação e ativação no Lovable Cloud

1. Backup antes de aplicar o SQL. Confirmar que as migrações de autenticação/permissões anteriores já foram aplicadas.
2. Aplicar **uma única vez** `supabase/migrations/20261118160000_donation_ledger.sql`, OU a cópia equivalente `drizzle/migrations/0003_donation_ledger.sql` pelo pipeline Drizzle. Não executar as duas cópias sobre o mesmo banco. O journal Drizzle inclui 0003; o SQL é a fonte de verdade desta alteração. Não regenerar tabelas a partir de `drizzle/schema.ts`, que o projeto mantém vazio.
3. As novas tabelas e RPCs são exclusivas do servidor (service role). O frontend usa funções autenticadas com `requireArea('doacoes')`. Regenerar tipos do Cloud após a aplicação; o acesso às tabelas novas está isolado no módulo server.
4. Configurar/confirmar `ASAAS_ENV`, `ASAAS_API_KEY`, `ASAAS_WEBHOOK_TOKEN` no backend correto. Nunca colocar chaves privadas no frontend. O token do webhook é obrigatório; sua ausência retorna 503.
5. Publicar o backend e frontend após o banco. Configurar o webhook do Asaas para POST `/api/public/donations/webhook` com `asaas-access-token`; incluir eventos de pagamentos e assinaturas. Conferir logs e fila no Asaas.
6. Em sandbox, abrir Doações e executar **Conciliar histórico Asaas**. Importa apenas cobranças/assinaturas vinculadas aos registros de doação IPAG já existentes. Não importa indiscriminadamente a conta Asaas. Histórico sem vínculo exige análise dos eventos e associação controlada antes da importação.
7. Conferir as pendências persistidas, os totais e amostras de parcelas no Asaas antes de ativar produção. Os registros antigos não são copiados como valores recebidos: só entram após consulta ao provedor.
8. Para conciliação periódica, configurar o agendador para POST `/api/public/donations/reconcile`, enviando `x-cron-secret` com o segredo existente `REMINDERS_CRON_SECRET`, exclusivamente servidor-servidor. Sugestão operacional: a cada 15 minutos. Cada chamada processa cinco registros e avança o cursor; ao terminar, a próxima reinicia a varredura. Ajustar frequência ao volume e limites da conta. Não há agendamento novo habilitado nesta branch.
9. Testar produção inicialmente somente com consultas. Importar histórico não deve criar pagamentos ou enviar lembretes.

## Homologação obrigatória

- Administrador e colaborador autorizado acessam; usuário sem área e visitante não conseguem consultar funções/tabelas/RPCs.
- Assinatura ativa sem parcelas pagas não aumenta arrecadação.
- Duas parcelas de R$ 50 aparecem separadas e somam R$ 100 recebidos quando ambos os estados são RECEIVED.
- Webhook repetido não duplica parcela; evento atrasado consulta o estado atual; falha de banco retorna erro e pode ser reprocessada.
- Ambiente sandbox não alimenta números públicos; o total público conta somente pagamentos de produção verificados.
- Mais de 500 pagamentos entram no total; filtros, paginação, busca, detalhe do doador e CSV refletem o mesmo recorte.
- Estorno integral e contestação saem de recebido; parcial é sinalizado para revisão, sem apresentar um líquido ajustado inventado.
- Validar no celular, conferir convites/permissões existentes e o checkout público.

## Testes locais

`npm run test:donations` — PostgreSQL descartável com migração real e testes do handler de webhook com provedor simulado.

`npm run test:security` — permissões administrativas anteriores.

`npx tsc --noEmit` e `npm run build`.

Nenhuma cobrança foi criada, nenhuma migração foi aplicada em produção e nenhum e-mail foi enviado pelos testes. O teste local não certifica credenciais, configuração do webhook, agendador ou entrega de e-mail do Lovable Cloud.

## Reversão

Não remover o ledger nem reativar a confirmação manual. Se houver falha, suspender o agendador novo e corrigir o backend mantendo os dados e as permissões. Registrar a versão anterior de deploy; nunca executar migrations antigas de escrita pública como rollback.
