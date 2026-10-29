# FDD: Header

Status: implementado
PRD: seção 6; D48

Construído antes da regra dos FDDs; este documento nasceu na revisão do esconder e voltar (`tasks/mobile-reading-warmth.md`) e cobre só o comportamento com o scroll. Menu, tema e monograma estão no código e no DESIGN.md, seções 6 e 7.

## Objetivo

Sair do caminho de quem rola a página sem levar junto o WhatsApp: quem para para ler encontra o header de volta.

## Comportamento

`src/components/header.tsx`, `useSectionTone`. Tudo sai de um listener de `scroll` passivo, medido uma vez por quadro.

- **Ancorado:** passados 60 px (`ANCHOR_AFTER`), o header ganha fundo próprio com desfoque.
- **Esconde:** passados 140 px (`HIDE_AFTER`), uma rolagem para baixo sobe o header para fora da tela (`translateY(-105%)`).
- **Volta ao subir:** qualquer rolagem para cima o traz de volta.
- **Volta ao parar** (D48): 400 ms (`SETTLE_MS`) depois do último evento de `scroll`, ele volta. A espera recomeça a cada evento, então a inércia do dedo e a do Lenis contam como rolagem até pararem de fato.
- **Exceção:** se o elemento sob o ponto de leitura do header (`PROBE_Y`, 40 px) tem `data-header-hold`, ele não volta ao parar, só ao subir. Levam a marca o hero (`hero.tsx`), a band (`about.tsx`) e a linha do tempo (`about-timeline.tsx`): são os palcos dirigidos por scroll, e um header parado por cima cobriria o momento.
- Com o menu aberto, o header nunca se esconde.

## Movimento

`transform` em 500 ms, `ease-out-quint`. A volta ao parar é mais lenta e mais macia, 900 ms com ease-out cúbico (`cubic-bezier(0.33, 1, 0.68, 1)`): ninguém pediu por ela, então ela chega devagar em vez de saltar (Lucas, 2026-10-29). Com `prefers-reduced-motion`, sem transição: o header some e volta direto, e as trocas de cor e fundo também são diretas.

## Regras

1. O WhatsApp e o Instagram do header usam as cores do site (DESIGN.md, seção 3, `forest-900`), sem cor de marca.
2. Sem botão flutuante: voltar ao parar é a resposta para o WhatsApp sumir ao descer (decisão de 2026-10-28).

## Acessibilidade

- Escondido, o header continua no DOM e no foco: o teclado chega nele, e ao subir ou parar ele volta à vista.
- Toque de 44 px nos ícones e no botão do menu.

## Critérios de aceite

Verificáveis em 390 px, iPad retrato e computador:

- [x] Rolar para baixo em Serviços, no Contato ou no texto do Sobre esconde o header, que volta cerca de 0,4 s depois de parar.
- [x] Parado sobre o hero, a band ou a linha do tempo, ele continua escondido e volta ao rolar para cima.
- [x] Com `prefers-reduced-motion`, some e volta sem transição.
- [ ] Testado no celular com o dedo (inércia nativa) e no computador com o Lenis.
