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
| `--color-ink-soft` | `#8a8a85` | Texto secundário, categoria, copyright         |
| `--color-bone`     | `#f5f3ef` | Fundo das seções claras                        |
| `--color-bone-dim` | `#e8e6e1` | Fundo de imagem de produto                     |
| `--color-paper`    | `#ffffff` | Badges, texto sobre o hero                     |
| `--color-whatsapp` | `#25d366` | **Apenas o ícone do WhatsApp.** Nunca em texto |

O verde do WhatsApp é o único ponto de cor da paleta e existe só para reconhecimento
do ícone. Não use como cor de marca, de botão preenchido nem de link.

### Tipografia

| Token              | Valor                                 | Uso                       |
| ------------------ | ------------------------------------- | ------------------------- |
| `--font-display`   | `'Anton', 'Arial Narrow', sans-serif` | Títulos, nome de produto  |
| `--font-sans`      | `'Inter', system-ui, sans-serif`      | Corpo, labels, preço      |
| `--tracking-label` | `0.18em`                              | Labels uppercase pequenos |

**A display é uma suposição.** Anton foi escolhida por ser a condensada pesada gratuita
que mais se aproxima dos esboços. Se o usuário confirmar outra, troque **só o token** —
nenhum componente deve nomear fonte.

Regras de uso:

- **Display** é sempre `uppercase`. Nunca use em texto corrido nem abaixo de 14px.
  Anton tem um único peso (400) — não aplique `font-bold` nela.
- **Labels pequenos** (`NOVA COLEÇÃO · 2026`, `CAMISETA`, `INTERESSE`, links do footer)
  são `font-sans`, `uppercase`, `text-xs`, `tracking-label`.
- **Corpo** (tagline do hero) é `font-sans`, caixa normal, sem tracking extra.
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

### 2. Em destaque

Fundo `bone`.

- Cabeçalho em uma linha: título `EM DESTAQUE` (display) à esquerda e o label
  `NOVA COLEÇÃO · 2026` à direita, alinhados pela base.
- **Carrossel com scroll horizontal**, no mobile e no desktop (confirmado pelo usuário):
  - `overflow-x-auto` com `scroll-snap-type: x mandatory`; cada card com
    `scroll-snap-align: start`.
  - Cards de **largura fixa** — o corte parcial do próximo card é intencional: é a
    dica visual de que há mais conteúdo. Não deixe o último card encostar na borda.
  - Esconda a barra de rolagem, mas **mantenha a navegação por teclado funcionando**.
  - O container precisa de rótulo acessível e ser focável para quem navega por teclado.
- Card de produto:
  - Imagem em caixa `bone-dim` com `aspect-ratio` fixo, evitando layout shift.
  - Badge (`DESTAQUE`, `NOVO`) sobreposto no topo à esquerda: fundo `paper`, texto
    `ink`, `text-xs`, uppercase, `tracking-label`. **Opcional** — nem todo produto tem.
  - Categoria — label pequeno em `ink-soft`.
  - Nome — display, uppercase, `ink`.
  - Preço — `font-sans`, `ink`.
  - Botão `INTERESSE` — borda `ink` 1px, fundo transparente, ícone WhatsApp + texto.

### 3. Footer

Mesmo fundo `bone`, separado por borda superior 1px.

- `13 STREET WEAR` em display pequena.
- Links `WHATSAPP` e `INSTAGRAM` como labels uppercase.
- `© 2026` em `ink-soft`.

Todo link externo leva `target="_blank"` e `rel="noopener noreferrer"`.

## Dados

> Camada **derivada**, como as seções: cada shape aqui só existe enquanto a seção que o
> consome existir.

O conteúdo mora em `src/data/`, nunca no JSX. Shape esperado de um produto:

```js
{
  id: 'urban-oversized-tee',   // string estável, usada como key
  name: 'Urban Oversized Tee',
  category: 'Camiseta',
  price: 89,                   // número; a formatação BRL é responsabilidade da view
  badge: 'destaque',           // 'destaque' | 'novo' | null
  image: '/products/tee.webp',
  alt: 'Camiseta oversized preta vista de frente',
}
```

Preço é **número**, não string. A formatação (`R$ 89`, sem centavos) fica em uma função
pura em `src/lib/`, para que o dado continue sendo dado.

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
