# 13 Street Wear — Referência de Design

> Derivado dos esboços em `docs/reference/`. Eles são o **ponto de partida** da
> identidade — não o destino da página.
>
> Este documento tem **duas camadas, com pesos diferentes** (regra completa na seção 5
> do [`CLAUDE.md`](../CLAUDE.md)):
>
> - **Sistema** — _Direção de arte_, _Tokens_ e _Acessibilidade_. É o vocabulário
>   visual da marca e é **vinculante**: nenhum agente inventa cor, fonte ou espaçamento
>   por conta própria.
> - **Seções** e _Dados_ — registram o que a página é **hoje**. São **derivados**:
>   acompanham as decisões de produto do usuário e são reescritos quando elas mudam.
>   Uma seção que não se parece mais com o esboço não é um defeito.
>
> **Status dos valores:** os tokens abaixo foram lidos a olho a partir de imagens, não
> exportados de uma ferramenta de design. Eles são uma aproximação fiel, não um
> absoluto. Quando o usuário corrigir um valor, **corrija aqui** — nunca no componente.

## Direção de arte

Estética **streetwear urbana**: alto contraste, tipografia display pesada, cantos
retos, muito respiro. Sem sombra, sem gradiente decorativo, sem cantos arredondados
grandes. O peso visual vem da tipografia e do contraste preto-sobre-creme, não de
ornamento.

## Tokens

Todos vivem no bloco `@theme` de `src/index.css`. Nomes seguem os namespaces do
Tailwind v4, então viram utilitárias automaticamente.

### Cores

| Token              | Valor     | Uso                                            |
| ------------------ | --------- | ---------------------------------------------- |
| `--color-ink`      | `#1a1a1a` | Texto principal, títulos, bordas, overlay      |
| `--color-ink-950`  | `#0d0d0d` | Fundo da seção institucional e do footer       |
| `--color-ink-soft` | `#8a8a85` | Texto secundário, categoria                    |
| `--color-bone`     | `#f5f3ef` | Fundo das seções claras                        |
| `--color-bone-dim` | `#e8e6e1` | Fundo de imagem secundário (sem uso hoje)      |
| `--color-paper`    | `#ffffff` | Badges, texto sobre o hero                     |
| `--color-whatsapp` | `#25d366` | **Apenas o ícone do WhatsApp.** Nunca em texto |

O verde do WhatsApp é o único ponto de cor da paleta e existe só para reconhecimento
do ícone. Não use como cor de marca, de botão preenchido nem de link.

### Tipografia

| Token              | Valor                                 | Uso                       |
| ------------------ | ------------------------------------- | ------------------------- |
| `--font-display`   | `'Anton', 'Arial Narrow', sans-serif` | Títulos                   |
| `--font-sans`      | `'Inter', system-ui, sans-serif`      | Corpo, labels             |
| `--tracking-label` | `0.18em`                              | Labels uppercase pequenos |

**A display é uma suposição.** Anton foi escolhida por ser a condensada pesada gratuita
que mais se aproxima dos esboços. Se o usuário confirmar outra, troque **só o token** —
nenhum componente deve nomear fonte.

Regras de uso:

- **Display** é sempre `uppercase`. Nunca use em texto corrido nem abaixo de 14px.
  Anton tem um único peso (400) — não aplique `font-bold` nela.
- **Labels pequenos** (ex.: `WHATSAPP` no CTA do Hero) são `font-sans`, `uppercase`,
  `text-xs`, `tracking-label`.
- **Corpo** (tagline do hero, parágrafo institucional) é `font-sans`, caixa normal, sem
  tracking extra.
- Carregue **no máximo dois pesos** da sans. Fonte é o item mais pesado de uma landing
  page e a primeira dobra depende dela.

### Forma e espaço

- **Raio de borda: 0** em botões e badges. Cards e imagens usam no máximo `2px`.
  Não existe canto arredondado grande neste design.
- **Borda: 1px sólido.** `ink` no tema claro, `paper` sobre o hero.
- **Sem sombra.** Separação vem de borda e de contraste de fundo.

## Seções

> Camada **derivada**. Esta é a página de hoje, não um alvo a ser defendido. Quando o
> usuário mudar uma seção, o `ui-designer` reescreve a spec aqui — reutilizando os
> tokens acima — e apaga o que saiu de cena. Seção sem spec não é convite a improvisar:
> é sinal de que a spec ainda não foi escrita.

### 1. Hero

Vídeo em loop ocupando a tela inteira, conteúdo ancorado na base à esquerda.

- Container `relative`, altura `100svh` (`svh`, não `vh` — a barra do navegador mobile
  quebra `vh`).
- `<video>` em `absolute inset-0`, `object-cover`, com `autoPlay muted loop playsInline`.
  Sem controles. `aria-hidden="true"` — é decorativo.
- **Sem `poster`, por decisão do usuário.** O loop em movimento é a apresentação da
  marca; um quadro estático descaracteriza. Consequência aceita: sob
  `prefers-reduced-motion: reduce` o vídeo é escondido e sobra o fundo `ink` sólido,
  não uma imagem. O texto mantém contraste de sobra sobre esse fundo.
- **Obrigatório:** sob `prefers-reduced-motion: reduce`, não reproduza o vídeo.
- Overlay escuro sobre o vídeo, mais denso na base, para garantir contraste AA do texto.
- Conteúdo, de cima para baixo:
  - `13` — display, `paper` sólido.
  - `STREET` / `WEAR` — display em duas linhas, **contorno vazado**: preenchimento
    transparente com `-webkit-text-stroke` em `paper`. Sempre defina um `color` de
    fallback para quem não suporta `text-stroke`, senão o texto some.
  - Tagline em duas linhas, `font-sans`, em `ink-soft`. Deliberadamente discreta: a
    hierarquia é título → CTA → tagline, então ela **encolhe** no desktop
    (`text-base` no mobile, `text-sm` a partir de `sm:`). Contraste ~5:1 sobre o
    overlay, dentro do AA.
  - CTA WhatsApp: retângulo com borda `paper` 1px, fundo transparente, ícone + texto
    `WHATSAPP` em uppercase com `tracking-label`. Preenche no hover.

### 2. Institucional

O carrossel de produtos foi cancelado pelo lojista: o tráfego vem do Instagram, então o
visitante já viu os produtos. No lugar entra um bloco de texto institucional puro — sem
heading, sem botão.

- Fundo `ink-950`, o preto mais escuro da paleta. Nenhuma borda ou marcação separa esta
  seção do Hero: o Hero já termina em `ink` sólido e opaco na base do seu overlay
  (`from-ink from-15%`), e o salto de `ink` para `ink-950` é pequeno o bastante para ler
  como transição contínua, não como corte.
- Conteúdo centralizado, coluna única, `max-w-2xl` (mais próximo do ~640px observado que
  os degraus vizinhos da escala padrão do Tailwind), com respiro vertical generoso.
- Parágrafo institucional: `font-sans`, `text-base`, `leading-relaxed`, cor
  `text-bone/80` sobre o fundo `ink-950` (contraste calculado ~11.3:1 — folga grande
  acima do AA de 4.5:1).
- Frase de destaque, um espaço abaixo do parágrafo: `font-sans`, `font-semibold` (600 —
  o único peso pesado que a Inter carrega neste projeto, nunca `font-bold`), `text-paper`
  sólido, `text-lg` no mobile subindo a `md:text-xl`. Contraste ~19.4:1.

### 3. Footer

Mesmo fundo `ink-950`, separado do que vem antes por `border-t border-paper/10` — traço
de 1px quase invisível, só para dar um limite visual entre o corpo do texto e o rodapé.

- Layout em linha única, `justify-between`, `items-center`, em todos os breakpoints:
  logo à esquerda, copyright à direita.
- Logo: `src/assets/logo-mark.png`, marca branca com alfa real, `<img>` normal (sem
  `mix-blend-mode`), dimensões intrínsecas `192×193`, exibida em `h-11` (44px) no
  mobile, `sm:h-12` (48px) — dentro da faixa 44–52px observada no print.
- Copyright: `© {ano atual} 13 Street Wear`, `font-sans`, `text-xs`, cor
  `text-bone/55` — o texto mais apagado da página (contraste calculado ~5.7:1, ainda
  acima do AA de 4.5:1, mas visivelmente mais baixo que o parágrafo institucional).
  O ano é calculado em runtime (`new Date().getFullYear()`), nunca fixo no dado.
- **Sem links de `WHATSAPP` e `INSTAGRAM`** — removidos por decisão do usuário. Se
  voltarem, é uma decisão de produto nova, não uma correção desta spec.

Todo link externo leva `target="_blank"` e `rel="noopener noreferrer"`.

## Dados

> Camada **derivada**, como as seções: cada shape aqui só existe enquanto a seção que o
> consome existir.

O conteúdo mora em `src/data/`, nunca no JSX. Shape esperado de cada seção atual:

```js
// src/data/about.js
{
  paragraph: 'Criada em 2019 e reinaugurada em 2022, a 13 Street Wear é referência...',
  highlight: 'A moda passa, o estilo permanece!',
}
```

```js
// src/data/footer.js
{
  brandName: '13 Street Wear',
}
```

O ano do copyright **não** entra no dado — é calculado no componente com
`new Date().getFullYear()`, para nunca ficar desatualizado.

## Acessibilidade — o que este design exige atenção

O visual escolhido tem três pontos de risco que precisam ser verificados, não presumidos:

1. **Texto sobre vídeo.** O overlay precisa garantir 4.5:1 em qualquer frame do loop,
   não só no frame que apareceu no esboço.
2. **Texto vazado (outline).** Contorno fino em fundo movimentado costuma reprovar em
   contraste. Verifique, e engrosse o stroke ou reforce o overlay se necessário.
3. **Labels com tracking largo e tamanho pequeno.** Não desça abaixo de 12px.

Além disso: alvo de toque mínimo de 44x44px nos botões, um único `<h1>` na página
(o do hero), e foco visível — o design não tem `outline` nativo em lugar nenhum, então
ele precisa ser desenhado de propósito.

## Imagens de referência

As imagens originais do esboço estão em `docs/reference/`, para que qualquer agente
possa abri-las com `Read` em vez de depender da descrição acima.

Elas servem para entender **de onde o sistema veio** — o peso da display, o contraste,
o respiro. Não são a especificação da página atual: quem manda sobre o que existe hoje
é a seção _Seções_ acima. Divergência entre print e página é esperada, e a página
ganha.
