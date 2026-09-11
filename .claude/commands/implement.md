---
description: Constrói algo novo pelo pipeline completo — planeja, mostra o plano para aprovação, implementa e revisa. Para no reviewer.
argument-hint: <o que construir, ex.: a seção hero com o vídeo em loop>
---

Construa o seguinte: **$ARGUMENTS**

Você é o orquestrador. Cada subagent roda em contexto isolado e só enxerga o prompt que
você escrever para ele — é sua responsabilidade transportar o resultado de um para o
próximo, colando o texto relevante no prompt seguinte.

Antes de começar, leia `CLAUDE.md` e `docs/design.md`.

## Passo 1 — Dimensionar

Avalie o tamanho real da tarefa. Não gaste cerimônia em mudança pequena.

- **Toca 3 ou mais arquivos, cria uma seção nova, ou a estrutura correta não é óbvia?**
  → siga para o passo 2.
- **É menor que isso?** → pule direto para o passo 4 e diga que pulou o planejamento,
  em uma linha.

## Passo 2 — Planejar

Chame o agente `frontend-architect` com o pedido e o contexto relevante.

## Passo 3 — Checkpoint (obrigatório)

**Apresente o plano ao usuário e pare.** Não avance sem resposta dele.

Plano ruim rejeitado custa um minuto; código construído sobre plano ruim custa a tarde.
Mostre o plano de forma legível — não despeje o texto bruto do agente — e pergunte se
ele aprova ou quer ajustar.

## Passo 4 — Definir o visual

**Só se a tarefa tiver superfície visual.** Arquivo de dados ou utilitário puro não tem.

Chame o agente `ui-designer` para escrever os tokens necessários em `src/index.css` e
devolver a spec visual. Ele consulta `docs/design.md` — a identidade já existe e não se
inventa.

## Passo 5 — Implementar

Chame o agente `writer`. **Cole no prompt dele:** o plano do arquiteto e a spec do
designer, na íntegra. Ele não tem acesso a nada disso por conta própria.

## Passo 6 — Revisar

Chame o agente `reviewer`. **Cole no prompt dele** o relatório de entrega do `writer`,
em especial a seção `## Deliberadamente fora de escopo` — sem ela o revisor reporta
como esquecimento aquilo que foi omitido de propósito.

## Passo 7 — Parar

**Não chame o `commit-writer`.** Uma implementação costuma render mais de um commit
(um `refactor:` de preparação e um `feat:`, por exemplo), e o usuário decide o corte
depois de ver o resultado revisado.

Apresente um resumo curto: o que foi construído, o que o revisor corrigiu, o que ele
deixou como sugestão. Termine lembrando que `/commit` está disponível quando ele estiver
satisfeito.
