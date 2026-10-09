# ADR 0002: Motion e Lenis para o movimento, `requestAnimationFrame` próprio nas peças dirigidas por scroll

Status: aceito
Data: 2026-08-18 (registrado em 2026-10-09)

## Contexto

O movimento é o centro do site: preloader que desenha o monograma e voa para o header, hero que abre de um painel para a tela cheia com o scroll, band do Sobre que cresce, roleta de anos. No Windows, a roda do mouse entrega o scroll em saltos, e uma peça presa ao scroll fica aos trancos.

## Decisão

- **Motion** (ex-Framer Motion) para animações de entrada, saída e layout: preloader, `layoutId` do monograma, menu, texto do Sobre (`whileInView`, uma vez).
- **Lenis** para suavizar o scroll no computador. Ele move a posição real de scroll, então listeners e `getBoundingClientRect` continuam funcionando. Desligado no toque (o aparelho já suaviza) e com `prefers-reduced-motion`.
- **`requestAnimationFrame` com a conta escrita à mão** nas peças dirigidas por scroll com muitos valores derivados (hero, band, roleta), escrevendo `transform`, `opacity` e, na roleta, `filter` direto no estilo.

## Alternativas consideradas

- GSAP com ScrollTrigger: resolve scroll muito bem, mas duplicaria o papel do Motion e entraria uma segunda API de animação.
- `useScroll` e `useTransform` do Motion em tudo: bom para um valor; na roleta são doze elementos com posição, escala, rotação, opacidade e desfoque derivados do mesmo ângulo a cada quadro, e passar isso por motion values custa mais e esconde a conta.
- Sem Lenis: o hero preso ao scroll anda aos saltos no Windows.

## Consequências

- Duas formas de animar convivem; a regra é Motion para eventos (entrar, sair, abrir) e rAF próprio para o que é função contínua do scroll.
- Toda peça de rAF precisa de um estado final parado, usado com `prefers-reduced-motion` e quando a peça não cabe na tela.
- O desfoque da roleta é exceção à regra de animar só `transform` e `opacity`, registrada no DESIGN.md.
