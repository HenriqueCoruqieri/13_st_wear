---
description: Refatora código sem alterar comportamento — melhora a estrutura, valida que nada mudou e sugere o commit isolado.
argument-hint: <o alvo, ex.: extrair o card de produto do carrossel>
---

Refatore o seguinte: **$ARGUMENTS**

Leia `CLAUDE.md` antes de começar.

## A invariante deste comando

**Comportamento idêntico. Zero mudança funcional.**

Depois da refatoração, a página renderiza exatamente o mesmo resultado, com os mesmos
dados e as mesmas interações. Nada de "já que estou aqui": corrigir um bug, adicionar
uma prop, ajustar um espaçamento. Se o comportamento mudou, não é refatoração — é
`/fix` ou `/implement`, e deve ser feito separado.

## Passo 1 — Justificar

Antes de mexer, responda em duas ou três frases: **qual problema concreto isso resolve?**

Refatoração sem problema real é churn — risco sem retorno. Aplique a régua da seção 4
do `CLAUDE.md`:

- A duplicação já chegou na **terceira** ocorrência? Duas ficam duplicadas.
- A abstração proposta é mais fácil de entender que o código atual, ou só mais curta?
- **Abstração prematura existente também é alvo legítimo:** wrapper de uma linha,
  componente com sete flags, hook que envolve um `useState`. Refatorar para _remover_
  indireção é tão válido quanto criar.

Se você não encontrar justificativa que se sustente, **diga isso e não refatore.**
Recomendar não mexer é uma resposta correta.

## Passo 2 — Refatorar

Chame o agente `writer`. Deixe a invariante explícita no prompt: preservar
comportamento, sem exceção.

## Passo 3 — Validar

Chame o agente `reviewer` com uma tarefa **diferente da revisão normal**. Diga a ele
que o trabalho aqui não é procurar melhorias, e sim confirmar que a refatoração não
mudou nada por acidente. Peça verificação de:

- Props repassadas, valores padrão e comportamento condicional idênticos.
- Nada removido que era usado; nada renderizado a mais ou a menos.
- Classes de estilo preservadas — uma utilitária perdida muda o visual em silêncio.
- `npm run check` passando.

## Passo 4 — Sugerir o commit

Chame o agente `commit-writer`, indicando que o tipo é `refactor:`.

Refatoração **precisa** ser commit próprio: é o que permite reverter a faxina sem
reverter funcionalidade. Quanto mais tempo convive com código não commitado, maior a
chance de ser absorvida por um `feat:` — e aí o histórico perde a rastreabilidade.

## Passo 5 — Entregar

Apresente: a justificativa, o que mudou estruturalmente, a confirmação do revisor de
que o comportamento se manteve, e os comandos de commit prontos.
