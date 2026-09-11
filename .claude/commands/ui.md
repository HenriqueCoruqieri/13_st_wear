---
description: Ajusta o visual — tokens, tipografia, espaçamento ou responsividade — a partir do design system. Para no reviewer.
argument-hint: <o ajuste, ex.: o título do hero está pequeno no mobile>
---

Ajuste o visual: **$ARGUMENTS**

Leia `CLAUDE.md` e `docs/design.md` antes de começar.

## O ponto de partida é o design system

A identidade visual **já existe** e está em `docs/design.md`. Este comando a aplica ou
a corrige — nunca a reinventa.

Por isso não há arquiteto aqui: mudança visual não decide estrutura de pastas nem
contrato de dados. Começa no design.

## Passo 1 — Especificar

Chame o agente `ui-designer`. Ele é o dono de `src/index.css` e do bloco `@theme`.

Deixe claro no prompt qual dos dois casos é:

- **Aplicar** o que já está especificado em `docs/design.md`.
- **Corrigir** o que está especificado — nesse caso ele atualiza `docs/design.md`
  **e** o token, mantendo os dois em sincronia.

Lembre-o de que valor arbitrário (`text-[#ff0000]`, `mt-[13px]`) é proibido: se a cor
ou o espaçamento não existe, cria-se o token.

## Passo 2 — Decidir se precisa do writer

- **Mudança resolvida só em token ou em `src/index.css`?** O `ui-designer` já fez.
  Pule para o passo 4.
- **Precisa alterar JSX de componente?** O designer não escreve lógica de componente —
  siga para o passo 3 com a spec dele.

## Passo 3 — Implementar

Chame o agente `writer` com a spec do designer colada na íntegra.

## Passo 4 — Revisar

Chame o agente `reviewer`, pedindo atenção a:

- **Mobile-first**: estilo base para tela pequena, `sm:`/`md:`/`lg:` só para subir.
- **Token, nunca valor arbitrário.**
- **Contraste AA** e foco visível — o design não tem `outline` nativo em lugar nenhum,
  então ele precisa ser desenhado de propósito.
- **Sem layout shift**: imagem com dimensão ou `aspect-ratio` reservando espaço.
- Consistência com as outras seções: o mesmo cinza, o mesmo degrau de espaçamento.

## Passo 5 — Parar

**Não chame o `commit-writer`.** Ajuste visual costuma pedir uma olhada no navegador
antes de virar commit — o usuário roda `/commit` quando tiver aprovado com os olhos.

Avise se algum valor de `docs/design.md` foi alterado: isso muda a referência para todo
o resto do projeto e merece confirmação explícita dele.
