# ADR 0004: Vídeos carregam depois da primeira tela; poster do hero com prioridade alta

Status: aceito
Data: 2026-10-10

## Contexto

A barra técnica da Fase 1 pede LCP abaixo de 2,5 s no celular, no 4G (PRD, seção 5). A medição de partida, em 2026-10-10, deu 3,2 s no Lighthouse simulado e 4,3 s com throttling real de 4G (`tasks/technical-bar.md`, Stage 1). O elemento do LCP é o poster do hero.

O poster tem 64 KB, mas no 4G leva 3,4 s para chegar, porque divide a banda com tudo o que a página pede ao mesmo tempo:

- **O começo dos dois vídeos:** cerca de 270 KB, pedidos pelo `preload="metadata"` da ADR 0003.
- **O poster do kit:** 47 KB, numa seção bem abaixo da dobra.
- **Os scripts:** cerca de 205 KB.
- **As fontes:** cerca de 75 KB.

Na hidratação, o hero já está na tela, e o `play()` começa a baixar o vídeo inteiro (cerca de 2 MB) ainda durante o carregamento.

## Decisão

- **Vídeos:** os dois começam com `preload="none"`. O hook compartilhado (`useLoopWhileVisible`, em `src/components/video-toggle.tsx`) só chama `play()`, que é quando o vídeo começa a baixar, depois do evento `load` da página e com o vídeo na tela. Substitui o `preload="metadata"` da ADR 0003.
- **Poster do hero:** continua no atributo `poster` e é a primeira pintura. Ganha um `ReactDOM.preload` com `fetchPriority: "high"` em `src/app/page.tsx`, o caminho que a documentação do Next 16 indica para `<link rel="preload">`.
- **Poster do kit:** sai do atributo `poster` e vira um `next/image` com carregamento preguiçoso, atrás do vídeo, no tamanho de exibição. Antes do primeiro quadro, o vídeo sem poster é transparente e deixa a imagem aparecer.

O resto da ADR 0003 continua valendo: arquivos próprios, VP9 e H.264 nível 4.0, `muted` e `playsInline`, novas tentativas do `play()`, poster com movimento reduzido.

## Alternativas consideradas

- **Manter `preload="metadata"` e só dar prioridade ao poster:** o começo dos vídeos continuaria disputando a banda da primeira tela.
- **Esperar o vídeo do hero até o navegador ficar ocioso (`requestIdleCallback`):** o Safari não tem essa API, e o evento `load` já marca o fim do que a primeira tela precisa.
- **Atribuir o `poster` do kit por JavaScript quando ele chega perto da tela:** sem JavaScript o quadro ficaria vazio. O `loading="lazy"` do `next/image` é nativo e ainda entrega o tamanho de exibição.
- **Tirar o vídeo do hero no celular:** muda o design, e a medição mostrou que o problema é a ordem de carregamento, não a existência do vídeo.

## Consequências

- O vídeo do hero começa a tocar depois do `load` da página. Até lá, fica o poster, que já é a primeira pintura.
- Vídeo novo usa o mesmo hook e começa com `preload="none"`. Poster de vídeo abaixo da dobra vai por `next/image` preguiçoso, não pelo atributo `poster`.
- O poster do kit passa pela otimização de imagem do Next (qualidade 75, largura de exibição).
- Com movimento reduzido nada muda: os vídeos não carregam nem tocam, e os posters aparecem.
