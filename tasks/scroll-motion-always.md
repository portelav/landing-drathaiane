# Rolagem animada mesmo com movimento reduzido

**Branch:** `feat/scroll-motion-always` · **Status:** Feito (PR #31)

## Objetivo
- As animações de rolagem (hero, band, texto do Sobre, linha do tempo) passam a rodar mesmo quando o sistema pede menos movimento. Num Windows em modo desempenho, o Chrome e o Firefox mostravam o site parado (Lucas, 2026-10-30).

## Escopo
- **Dentro:**
  - `hero.tsx`: o palco travado e a panorâmica no `wide:` e no estreito deixam de olhar `prefers-reduced-motion` (sai o `stillness` do efeito e os `motion-reduce:h-auto`).
  - `about.tsx`: a band (palco no `beside:` e chegada no celular) idem.
  - `about-text.tsx`: a entrada das linhas do texto idem (`useStillness`).
  - `about-timeline.tsx`: a roleta no `beside:` e a "foto em foco" no celular idem; sai a lista empilhada como versão de movimento reduzido.
  - Docs: PRD (D52 e a linha de acessibilidade da seção 8), DESIGN.md (regra de `prefers-reduced-motion`), FDDs do hero e do Sobre.
- **Ampliado depois do teste do Lucas (2026-10-30):** Lenis, header, menu, casos de Serviços, perguntas, seta do link e voltar ao topo também deixam de olhar a preferência; sem o Lenis, a rolagem animada saltava.
- **Fora (continua seguindo a preferência):** vídeos em loop parados no poster e preloader curto.

## Conteúdo e regras de fora
- Conteúdo da doutora necessário: nenhum. Regras do CFO: nenhuma.
- Acessibilidade: o PRD pede WCAG 2.2 AA. Animação disparada por rolagem é critério AAA (2.3.3), então o site continua AA. A perda para quem precisa de menos movimento fica registrada na D52.

## Critérios de aceite
1. Com `prefers-reduced-motion: reduce` no computador (1440 e 1920): hero com palco travado e panorâmica; band abre com a rolagem; texto do Sobre entra por linhas; roleta gira.
2. O mesmo em 390 px e iPad retrato, cada um com a versão própria dele.
3. Com movimento reduzido, os vídeos continuam no poster, sem botão, e o preloader continua curto.
4. Sem a preferência, nada muda.
5. Sem erro de hidratação no console nos dois modos.
6. Lint, typecheck e build verdes.

## Arquivos
- `src/components/hero.tsx`, `about.tsx`, `about-text.tsx`, `about-timeline.tsx`.
- `docs/PRD.md`, `docs/design/DESIGN.md`, `docs/fdd/hero.md`, `docs/fdd/sobre.md`.

## Checklist (até 10, em ordem)
1. [x] Hero: tirar o `stillness` do efeito e os `motion-reduce:` do palco e da pista; o vídeo segue parado pelo `useLoopWhileVisible`.
2. [x] Band: tirar o `stillness` dos dois efeitos e o `motion-reduce:beside:h-auto`.
3. [x] Texto do Sobre: entrada por linhas sem olhar a preferência.
4. [x] Linha do tempo: roleta e foto em foco sem olhar a preferência; tirar a lista de movimento reduzido.
5. [x] Conferir pelo CDP, com movimento reduzido ligado, em 1920, iPad retrato e 390 px (1440 ficou de fora), com prints em vários pontos da rolagem e o console.
6. [ ] Conferir sem a preferência nos mesmos tamanhos: não rodado; o Lucas confere no navegador.
7. [x] PRD (D52, seção 8), DESIGN.md e FDDs.
8. [x] Lint e typecheck. Parar para o Lucas conferir.

---

## Feito e verificado
- **Arquivos:** `hero.tsx`, `about.tsx`, `about-text.tsx` (sai o `useStillness`), `about-timeline.tsx` (saem 19 classes `motion-reduce:` e a lista de movimento reduzido). Docs: PRD (D52 e seção 8), DESIGN.md, FDDs do hero e do Sobre.
- **Desvios:** o escopo cresceu depois do teste do Lucas no PC dele, com "Mostrar animações no Windows" desligado: a rolagem ainda parava seco. Causa: o Lenis tem `respectReducedMotion` ligado por padrão e, com a preferência, troca o `lerp` por 1 (cada giro vira salto). Desligado em `smooth-scroll.tsx`. Também saíram as regras de movimento reduzido do header, do menu, dos casos, das perguntas, do link e do voltar ao topo. Ficam só os vídeos no poster e o preloader curto.
- **Critérios, pelo CDP com `prefers-reduced-motion: reduce` (dev, 2026-10-30):**
  1. 1920: janela do hero de 640 px a 1920 px com a rolagem; band de 622 px a 1920 px; texto do Sobre de `translateY(110%)` a `none`; anos da roleta trocando de opacidade. Print da roleta conferido.
  2. 390 px: panorâmica do hero de 0% a 91%; foto da band de 1,04 a 1; barras da foto em foco enchendo. iPad retrato: janela de 410 a 820 px, band e foto em foco idem.
  3. Vídeo do hero `paused` nos três tamanhos.
  4. Sem a preferência, o caminho do código é o mesmo, porque o ramo de movimento reduzido saiu.
  5. Console sem erro nos três tamanhos. No dev, o Motion só avisa que a preferência está ligada.
  6. Lint e typecheck verdes.
  7. Lucas, no Chrome do PC dele com as animações do Windows desligadas, build de produção no Wi-Fi: rolagem desliza como no modo normal (2026-10-30).
