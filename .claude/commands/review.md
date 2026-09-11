---
description: Revisa o código não commitado contra as regras do projeto — corrige blockers e reporta o resto por severidade.
argument-hint: '[opcional] foco específico, ex.: acessibilidade do carrossel'
---

Revise o código não commitado do diretório de trabalho.

Foco adicional pedido pelo usuário, se houver: **$ARGUMENTS**

## Passo 1 — Levantar o escopo

Descubra o que mudou antes de chamar o revisor:

```bash
git status --short
git diff
git diff --staged
```

Arquivo untracked não aparece em `git diff` — leia o conteúdo com `Read`.

Se **nada** mudou, diga isso e pare. Não invente uma revisão sobre código já commitado
a menos que o usuário peça explicitamente.

## Passo 2 — Revisar

Chame o agente `reviewer` com a lista de arquivos alterados e o foco pedido, se houver.

Este comando existe principalmente para o código que **o usuário escreveu à mão**, fora
do pipeline. Nesse caso não há relatório de `writer` para repassar — diga ao revisor que
ele está revisando código sem contexto de entrega prévio, para que não cobre a ausência
de uma seção `## Deliberadamente fora de escopo`.

## Passo 3 — Entregar

Apresente o resultado organizado por severidade:

- **Blockers** — o que o revisor já corrigiu.
- **Should** — sugestões que ele deixou para o usuário decidir.
- **Nits** — observações menores.

Se houver `should` que o usuário queira aplicar, ele pede — não aplique por iniciativa
própria. O revisor tem **uma** rodada de correção automática, limitada a blockers, e
isso é proposital: evita ping-pong infinito e mantém o controle do que entra na base
com o usuário.

Termine lembrando que `/commit` está disponível.

## Nota

Este comando valida as regras deste projeto: `CLAUDE.md`, `docs/design.md`, fronteiras
entre `ui`/`layout`/`sections`, tokens e acessibilidade.

É diferente do `/code-review` embutido do Claude Code, que caça bugs de correção. Os
dois se complementam — rodar ambos em código importante é uma escolha razoável.
