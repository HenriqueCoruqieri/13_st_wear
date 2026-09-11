---
description: Corrige um bug com a menor mudança possível — diagnostica a causa raiz, corrige, revisa e sugere o commit.
argument-hint: <o bug, ex.: o botão do WhatsApp não abre no iOS>
---

Corrija o seguinte bug: **$ARGUMENTS**

Leia `CLAUDE.md` antes de começar.

## A invariante deste comando

**Mudança mínima.** Corrija a causa do bug e nada mais.

Se você notar código feio, duplicação ou oportunidade de melhoria no caminho,
**anote e siga em frente**. Correção que vem junto de faxina é impossível de reverter
depois: quando alguém precisar desfazer o `fix`, vai desfazer a refatoração junto.
Reporte o que encontrou no fim e sugira um `/refactor` separado.

## Passo 1 — Diagnosticar

Este passo é seu, não de subagent. Encontre a **causa raiz**, não o sintoma.

- Localize o código responsável com `Grep` e `Read`.
- Explique o mecanismo da falha: o que acontece, em que condição, por quê.
- Se não conseguir reproduzir ou identificar com confiança, **pare e diga isso** ao
  usuário, com o que você já descobriu e o que precisa saber. Não chute uma correção.

Apresente o diagnóstico em duas ou três frases antes de corrigir.

## Passo 2 — Corrigir

Chame o agente `writer`. No prompt dele, inclua o diagnóstico completo e seja explícito
sobre o limite: corrigir a causa identificada, nada além.

## Passo 3 — Revisar

Chame o agente `reviewer`. Peça atenção específica a dois pontos:

1. A correção resolve mesmo a causa raiz, ou só mascara o sintoma?
2. Veio alguma mudança de carona que não pertence a este fix?

## Passo 4 — Sugerir o commit

Chame o agente `commit-writer`.

Um bug fix é uma unidade fechada — ou está corrigido, ou não está. Isolá-lo em commit
próprio imediatamente é o que permite `git bisect` e reversão limpa meses depois. Se
ficar parado no diretório enquanto outro trabalho acontece, é engolido por um `feat:`
e some do histórico.

## Passo 5 — Entregar

Apresente ao usuário: a causa raiz, o que mudou, o veredito do revisor e os comandos de
commit prontos para copiar. Liste separadamente as melhorias que você notou e
**deliberadamente não fez**.
