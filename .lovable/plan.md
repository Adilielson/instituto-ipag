## Objetivo

No painel do Asaas, o campo **Identificador Externo (externalReference)** hoje mostra um código técnico como `proj:uuid|t:O`. Você quer que apareça apenas o nome do projeto que recebe a doação (sem códigos).

## Alteração

Arquivo único: `src/routes/api/public/donations/create.ts`

**Como está hoje:**
```ts
const refRaw = `proj:${data.project_id || "geral"}|t:${data.type === "MONTHLY" ? "M" : "O"}`;
const externalReference = refRaw.slice(0, 100);
```
Resultado no Asaas: `proj:5f9a-...|t:O`

**Como ficará:**
```ts
const projectLabel = data.campaign || "Doação Geral";
const externalReference = projectLabel.slice(0, 100);
```
Resultado no Asaas:
- Quando a doação vier da página de um projeto: o **nome do projeto** (ex: "Música que Transforma")
- Quando for doação livre (sem projeto vinculado): **"Doação Geral"**

O limite de 100 caracteres do Asaas continua respeitado.

## Observações

- Não afeta doações já existentes — só vale para novas cobranças criadas após a mudança.
- O campo `description` (descrição da cobrança no Asaas) continua trazendo projeto + nome do doador, sem alteração.
- A informação técnica do projeto continua salva no banco no campo `project_id` da tabela `donations` — nada é perdido, só fica mais legível dentro do Asaas.
