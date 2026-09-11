---
description: Analisa o trabalho feito, julga se é hora de commitar e entrega as mensagens em Conventional Commits prontas para copiar.
argument-hint: '[opcional] contexto extra, ex.: só o que está na staged area'
---

Analise o estado do repositório e proponha os commits.

Contexto adicional do usuário, se houver: **$ARGUMENTS**

## Execução

Chame o agente `commit-writer`. Ele faz todo o trabalho: lê `git status`, `git diff`,
`git diff --staged` e `git log`, avalia o que mudou e decide.

Não faça a análise você mesmo — o agente carrega os critérios de fragmentação e o
estilo do histórico deste repositório.

## O que ele vai responder

Uma de duas coisas:

- **"Ainda não é hora"** — quando o que está no diretório é meio de uma unidade lógica.
  Ele diz o que falta para fechar.
- **"Pronto para commit"** — com os comandos `git add` (arquivos explícitos, nunca
  `git add .`) e `git commit -m` prontos para copiar.

Ouvir "ainda não" é um resultado útil, não um comando desperdiçado. É justamente por
isso que vale chamar este comando com frequência durante o trabalho, em vez de acumular
vinte arquivos alterados e tentar desembaraçar tudo no fim.

## A regra que não se quebra

**Nem você nem o agente executam o commit.** Você entrega os comandos; quem roda é o
usuário. Isso vale mesmo que ele peça para você commitar dentro deste comando — nesse
caso, entregue os comandos e explique que a execução é dele.

O motivo: o commit é o registro permanente do projeto, e a decisão sobre o que entra
no histórico é do dono do repositório.

## Entrega

Repasse a resposta do agente de forma legível. Se ele propôs mais de um commit,
mantenha a **ordem** — cada commit precisa deixar a base funcionando, e a ordem é o
que garante isso.

Se o agente avisar que o lint está falhando, destaque: o hook `pre-commit` roda
`npm run lint` e vai bloquear o commit antes que ele aconteça.
