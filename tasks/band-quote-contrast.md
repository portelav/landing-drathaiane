# Contraste da citação da band

**Slug:** `band-quote-contrast`
**Branch:** `fix/band-quote-contrast`
**Área:** Sobre (band aberta) · **Dono:** Lucas
**Status:** Done (PR #11 mergeado em 2026-10-11)
**Gate S2:** Livre

---

## Stage 1 — Scope Analysis

### Objetivo
- A citação da band aberta do Sobre passar em 3:1 (texto grande, WCAG AA). Em `light-base` sobre o gradiente media de 2,52 a 3,00 (DESIGN.md, seção 3).

### Escopo
- **Dentro:** cor da citação no `beside:` (computador) em `src/components/about.tsx`; DESIGN.md e ROADMAP.
- **Fora:** o gradiente `BACKDROP`, que é tirado da parede da foto; mexer nele quebra a emenda. Nenhum texto muda, nenhuma regra do CFO é tocada.

### Critérios de aceite
1. Nas quatro linhas da citação, 3:1 ou mais, medido no navegador com a band aberta (1440×900).
2. Empilhado (390 px, iPad retrato) nada muda: a citação já é `dark-base` sobre `light-base`.
3. Lint, typecheck e build verdes.

---

## Stage 4 — Plano de execução

1. [x] Citação em `dark-base` cheio, como o rótulo "A dentista" (tira o `beside:text-light-base`). `fix(about): darken the band quote for contrast`
2. [x] Medir no navegador: de 5,34 a 6,13 nas quatro linhas.
3. [x] DESIGN.md, seção 3, e ROADMAP. `docs(design): record the band quote contrast`
