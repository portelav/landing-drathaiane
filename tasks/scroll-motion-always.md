# Rolagem animada mesmo com movimento reduzido

**Branch:** `feat/scroll-motion-always` · **Status:** Planejado

## Objetivo
- As animações de rolagem (hero, band, texto do Sobre, linha do tempo) passam a rodar mesmo quando o sistema pede menos movimento. Num Windows em modo desempenho, o Chrome e o Firefox mostravam o site parado (Lucas, 2026-10-30).

## Escopo
- **Dentro:**
  - `hero.tsx`: o palco travado e a panorâmica no `wide:` e no estreito deixam de olhar `prefers-reduced-motion` (sai o `stillness` do efeito e os `motion-reduce:h-auto`).
  - `about.tsx`: a band (palco no `beside:` e chegada no celular) idem.
  - `about-text.tsx`: a entrada das linhas do texto idem (`useStillness`).
  - `about-timeline.tsx`: a roleta no `beside:` e a "foto em foco" no celular idem; sai a lista empilhada como versão de movimento reduzido.
  - Docs: PRD (D52 e a linha de acessibilidade da seção 8), DESIGN.md (regra de `prefers-reduced-motion`), FDDs do hero e do Sobre.
- **Fora (continua seguindo a preferência):** vídeos em loop parados no poster, preloader curto, Lenis desligado, transições de clique e de toque (header, menu, casos de Serviços, voltar ao topo). Nada disso é animação de rolagem.

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
1. [ ] Hero: tirar o `stillness` do efeito e os `motion-reduce:` do palco e da pista; o vídeo segue parado pelo `useLoopWhileVisible`.
2. [ ] Band: tirar o `stillness` dos dois efeitos e o `motion-reduce:beside:h-auto`.
3. [ ] Texto do Sobre: entrada por linhas sem olhar a preferência.
4. [ ] Linha do tempo: roleta e foto em foco sem olhar a preferência; tirar a lista de movimento reduzido.
5. [ ] Conferir pelo CDP, com movimento reduzido ligado, em 1920, 1440, iPad retrato e 390 px, com prints em vários pontos da rolagem e o console.
6. [ ] Conferir sem a preferência nos mesmos tamanhos.
7. [ ] PRD (D52, seção 8), DESIGN.md e FDDs.
8. [ ] Lint e typecheck. Parar para o Lucas conferir.

---

## Feito e verificado
<!-- Escrito pelo /exec. -->
