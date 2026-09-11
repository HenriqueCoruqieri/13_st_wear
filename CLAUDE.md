# 13st_wear — Guia do Projeto

> Fonte única de verdade das convenções. Todo agente em `.claude/agents/` obedece este
> arquivo. Se uma regra mudar, muda **aqui** — nunca duplicada dentro de um agente.
>
> A **identidade visual** tem documento próprio: [`docs/design.md`](docs/design.md) —
> paleta, tipografia, forma e a spec de cada seção. Decisão visual se resolve lá.

## 1. O produto

Landing page de **página única** para uma loja de roupas física. Funciona como um
**cartão postal digital** no link da bio do Instagram: apresentação da marca, produtos
em destaque e parcerias com marcas.

Consequências diretas disso, que valem mais que qualquer preferência de arquitetura:

- **O tráfego vem do Instagram, logo é esmagadoramente mobile.** Mobile-first não é
  estilo, é o caso de uso principal.
- **O julgamento acontece em ~2 segundos.** Peso da página e qualidade visual são
  requisitos, não polimento.
- **Não há backend, banco de dados, autenticação ou rotas — e nada disso deve ser
  construído agora.** O que se exige é que a **porta fique aberta**: conteúdo separado
  da apresentação (`src/data/` + props), para que trocar um array estático por uma
  chamada de API seja uma mudança local, não uma reescrita.
  Deixar o caminho aberto não é construir a estrada. Camada de serviço, cliente HTTP,
  roteador, provider de estado global ou tela de carregamento para dado estático são
  over-engineering e estão proibidos até a necessidade existir de verdade.
- **O projeto vai crescer.** Escreva de forma que a próxima pessoa (ou o próximo agente)
  consiga estender sem reescrever — mas veja a regra YAGNI na seção 4.

## 2. Stack

| Camada    | Ferramenta                               | Observações                                 |
| --------- | ---------------------------------------- | ------------------------------------------- |
| Build     | Vite 8                                   | `npm run dev`, `npm run build`              |
| UI        | React 19                                 | **JavaScript, não TypeScript.** Sem `.tsx`  |
| Estilo    | Tailwind CSS **v4**                      | CSS-first. **Sem `tailwind.config.js`**     |
| Lint      | ESLint 10 (flat config)                  | `npm run lint`                              |
| Formato   | Prettier + `prettier-plugin-tailwindcss` | `npm run format`                            |
| Imports   | `eslint-plugin-simple-import-sort`       | ordenação é erro de lint                    |
| Git hooks | Husky                                    | `pre-commit` lint · `commit-msg` commitlint |
| Commits   | Conventional Commits                     | `@commitlint/config-conventional`           |

**Não há infraestrutura de testes** (sem Vitest, sem Testing Library). Decisão
consciente: não exija testes nem crie arquivos de teste até que a infra exista.

### Tailwind v4 — atenção

A configuração é feita **em CSS**, não em JS. Tokens de design vivem no bloco `@theme`
dentro de `src/index.css`:

```css
@import 'tailwindcss';

@theme {
  --color-brand-500: #000000;
  --font-display: 'Alguma Fonte', sans-serif;
}
```

Nunca crie um `tailwind.config.js`. Nunca use sintaxe da v3 (`theme.extend`, diretivas
`@tailwind base/components/utilities`).

## 3. Estrutura de pastas

```
src/
├── main.jsx              # entrada, monta o React
├── App.jsx               # compõe as seções na ordem da página
├── index.css             # @import tailwindcss + @theme (tokens) + estilos base
├── components/
│   ├── ui/               # primitivos reutilizáveis e sem contexto (Button, Card, Tag)
│   ├── layout/           # estrutura da página (Header, Footer, Container, Section)
│   └── sections/         # blocos da landing (Hero, Products, Brands, About, Contact)
├── data/                 # conteúdo estático em JS (products.js, brands.js, social.js)
├── hooks/                # hooks customizados, só quando houver reuso real
├── lib/                  # funções puras e utilitários (cn.js, format.js)
└── assets/               # imagens e mídia importadas pelo bundler
```

Regras de fronteira:

- `components/ui` **não conhece o domínio.** Um `Button` não sabe o que é um produto.
- `components/sections` compõe `ui` + `layout` e consome `data/`.
- **Conteúdo nunca é hardcoded dentro do JSX de uma seção.** Textos, listas de produtos
  e marcas moram em `src/data/`, para que editar conteúdo não exija tocar em componente.
- `lib/` só tem funções puras — sem React, sem side effects.

### Imports

Use o alias `@/` para tudo dentro de `src/`. Relativo apenas para irmão direto.

```js
import { Button } from '@/components/ui/Button'; // correto
import { products } from '@/data/products'; // correto
import { Button } from '../../components/ui/Button'; // errado
```

## 4. Princípios de código

### A regra de desempate (leia antes das outras)

Escalabilidade e simplicidade entram em conflito. **Quando entrarem, a simplicidade
ganha.** O erro que este projeto quer evitar não é falta de abstração — é abstração
demais cedo demais.

- **YAGNI.** Não construa para um requisito que não existe hoje. "Pode ser que um dia"
  não é justificativa.
- **Regra de Três.** Só extraia uma abstração na **terceira** repetição real. Duas
  ocorrências parecidas ficam duplicadas, e tudo bem.
- **DRY é sobre conhecimento, não sobre caracteres.** Dois trechos parecidos que mudam
  por motivos diferentes **devem** permanecer separados. Unificá-los é acoplamento,
  não reuso.
- Se explicar a abstração leva mais tempo do que ler o código duplicado, ela está errada.

### SOLID traduzido para React

SOLID nasceu em OO com classes e interfaces. Aplicado literalmente em componentes
funcionais, produz exatamente o over-engineering que a regra acima proíbe. Nesta base,
os princípios significam:

- **SRP** — um componente tem **uma** responsabilidade visual. Se o nome precisa de
  "and" para descrever o que ele faz, quebre em dois. Um arquivo, um componente
  exportado.
- **OCP** — estenda por **composição** (`children`, slots como props), não adicionando
  flags booleanas. Três ou mais booleanos de aparência (`isLarge`, `isDark`,
  `isOutlined`) é sinal de que deveria ser uma prop `variant` ou dois componentes.
- **LSP** — um componente de `ui` aceita e repassa os atributos nativos esperados
  (`...rest`, `className`, `onClick`, `aria-*`). Um `<Button>` que engole `type` ou
  `disabled` quebra a expectativa de quem o usa.
- **ISP** — props mínimas. Passe o que o componente usa, não o objeto inteiro "por via
  das dúvidas".
- **DIP** — componentes recebem dados por **props**; não importam de `@/data`
  diretamente nem buscam nada por conta própria. Quem injeta é a seção ou o `App`.

### Componentes React

- Sempre função nomeada e declarada; nada de `export default () => {}` anônimo.
- **Sem lógica complexa dentro do JSX.** Cálculo, formatação e condição composta são
  computados acima do `return`, em variável com nome descritivo.
- Condicional em JSX: `&&` para mostrar/esconder, ternário para escolher entre dois.
  **Nunca ternário aninhado.**
- `key` de lista é ID estável do dado. Índice do array só quando não existe alternativa.
- Listas **sempre** vêm de `.map()` sobre `@/data`, nunca de JSX repetido na mão.
- Early return para estados vazios, em vez de aninhar o corpo inteiro num `if`.
- Hook customizado só quando a **lógica com estado** se repete em dois lugares de fato.

### Nomes

- Componentes e arquivos de componente: `PascalCase.jsx` (`ProductCard.jsx`).
- Funções, variáveis, utilitários e arquivos de dados: `camelCase.js` (`products.js`).
- Booleanos: prefixo `is` / `has` / `should` (`isFeatured`).
- Handlers: `handle` + evento no componente (`handleSubmit`); a prop correspondente é
  `on` + evento (`onSubmit`).
- **Todo identificador em inglês.** Código, nomes de arquivo, commits e comentários de
  código em inglês. A conversa com o usuário é em português.

### Comentários

**O padrão é não comentar.** Código bem escrito se explica — se você sentiu vontade de
comentar _o que_ uma linha faz, o problema é o nome da variável ou o tamanho da função.
Corrija a causa, não adicione a legenda.

A exceção é estreita e existe: quando o código é **deliberadamente não óbvio** e remover
essa estranheza quebraria algo. Fallback de compatibilidade, contorno de bug de
navegador, `eslint-disable` pontual. Aí o comentário registra **por que não pode ser
simplificado** — e é justamente o que impede alguém de "limpar" e quebrar.

Comentário que descreve o que o código faz, código comentado "para depois" e `TODO` sem
dono não entram na base.

## 5. Estilo e UI

- **Mobile-first sempre.** Escreva o estilo base para telas pequenas e suba com `sm:`
  `md:` `lg:`. Nunca o contrário.
- **Toda decisão visual vem de [`docs/design.md`](docs/design.md).** Cor, fonte,
  espaçamento e comportamento de seção estão especificados lá. Não improvise visual.
- Cores, fontes e espaçamentos vêm de **tokens do `@theme`**. Valores arbitrários
  (`text-[#ff0000]`, `mt-[13px]`) são proibidos fora de caso justificado por escrito.
- Classes utilitárias direto no JSX. Só extraia para componente quando a **estrutura**
  se repetir — não para encurtar a string de classes.
- Imagens: dimensões explícitas (`width`/`height` ou `aspect-ratio`) para evitar layout
  shift, `loading="lazy"` fora da primeira dobra, e `alt` descritivo sempre.
- Acessibilidade é requisito: HTML semântico (`<header>`, `<main>`, `<section>`,
  `<nav>`, `<footer>`), um único `<h1>`, hierarquia de heading sem pular nível,
  contraste mínimo AA e foco visível em tudo que é interativo.
- Links externos: `target="_blank"` sempre acompanhado de `rel="noopener noreferrer"`.

## 6. Definition of Done

Nenhuma tarefa está pronta sem os passos abaixo **executados de verdade**, não
presumidos:

```bash
npm run lint            # precisa passar limpo, zero warnings
npx prettier --check .  # precisa passar limpo
npm run build           # precisa compilar
```

Além disso: nada de `console.log` esquecido, nada de import não usado, nada de código
morto ou comentado "para depois".

## 7. Git

- Conventional Commits, em **inglês**, validado pelo commitlint no hook `commit-msg`.
- Tipos válidos: `feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `perf`, `test`,
  `build`, `ci`, `revert`.
- `pre-commit` roda `npm run lint` — commit com lint quebrado é bloqueado pelo hook.
- **Nunca `git add .`** — stage explícito, arquivo por arquivo.
- Repositório: https://github.com/HenriqueCoruqieri/13_st_wear

## 8. Como os agentes trabalham juntos

Pipeline padrão. Nem toda tarefa passa por todas as etapas — tarefas pequenas pulam o
arquiteto.

```
frontend-architect → ui-designer → writer → reviewer → commit-writer
    (planeja)      (define visual) (escreve) (valida)  (sugere commit)
```

Fronteiras que ninguém atravessa:

| Agente               | Pode                                     | Não pode                                  |
| -------------------- | ---------------------------------------- | ----------------------------------------- |
| `frontend-architect` | ler, planejar                            | escrever código                           |
| `ui-designer`        | tokens, `index.css`, specs visuais       | lógica de componente                      |
| `writer`             | criar e editar código                    | commitar, revisar o próprio trabalho      |
| `reviewer`           | ler, rodar lint/build, corrigir blockers | criar features novas                      |
| `commit-writer`      | ler git, propor mensagens                | **executar qualquer comando que escreve** |

**Decisões de produto e o commit final são sempre do usuário.** Nenhum agente commita.

### Formato de entrega (todo agente termina assim)

O contexto de um subagent é isolado — o próximo agente só enxerga o que ficou escrito.
Por isso todo agente encerra com:

```markdown
## Resumo

<uma ou duas frases sobre o que foi feito>

## Arquivos

- `caminho/do/arquivo` — o que mudou e por quê

## Decisões

- <escolha tomada e o motivo, quando havia mais de um caminho>

## Deliberadamente fora de escopo

- <o que foi deixado de fora de propósito, para o revisor não cobrar>

## Verificação

- `npm run lint` → <resultado real>
- `npx prettier --check .` → <resultado real>
```
