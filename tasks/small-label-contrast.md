# Contraste dos rótulos de 11 px

**Slug:** `small-label-contrast`
**Branch:** `fix/small-label-contrast`
**Área:** hero, Sobre (band, texto, linha do tempo), header · **Dono:** Lucas
**Status:** Planning
**Gate S2:** Livre

---

## Stage 1 — Scope Analysis

### Documentos
- **PRD:** seção 5 (WCAG 2.2 AA), seção 10, Fase 1 ("Rótulos de 11 px com contraste de 4,5:1"), D21
- **ROADMAP:** Fase 1, "Contraste dos rótulos de 11 px"
- **DESIGN.md:** seção 3 (paleta e contraste verificado), seção 4 (nada abaixo de 11 px, e 11 px só com contraste AA)
- **FDD:** nenhum muda. Nenhuma seção muda de comportamento, só a cor de texto secundário; cor é do DESIGN.md
- **Precedente:** `tasks/footer-and-menu-anchors.md` e `docs/fdd/contato.md`, regra 4: no rodapé o secundário já usa `dark-base` a 70%, medido em 6,14:1
- **ADR relacionado:** nenhum

### Objetivo
- Todo texto secundário do site passar em 4,5:1, medido no navegador. Os rótulos de 11 px em caixa-alta usam `dark-55` (3,79:1), e por isso não passam no AA.

### Triagem
1. **Seções:** hero, Sobre (band, texto, linha do tempo) e header. Nenhum conteúdo da doutora é necessário: nenhum texto muda.
2. **Regras de fora:** nenhuma regra é tocada. "Cirurgiã-Dentista" no header fica mais legível, o que só ajuda a identificação (art. 43); o mínimo continua no rodapé.
3. **Trivial?** Não: sete arquivos de código e docs, e uma regra do design system muda (texto secundário).
4. **Stack ou arquitetura:** não muda. Só classes do Tailwind; nenhuma API do Next é tocada.
5. **PRD:** cobre (AA na seção 5, critério na seção 10). Não há decisão de produto nova.
6. **ROADMAP:** está, Fase 1.

### Escopo e não-escopo
- **Dentro:**
  - Hero: o `muted` das duas peles (`light` em uso, `dark` guardada atrás do `TONE`). Corrige os dois rótulos de 11 px e também o parágrafo de 15 px, que usa o mesmo `muted` e também não passa.
  - Sobre, band: rótulo "A dentista", no empilhado (sobre `light-base`) e no `beside:` (sobre o gradiente `BACKDROP`, tirado da parede da foto).
  - Sobre, texto: rótulo do topo.
  - Sobre, linha do tempo: rótulo "Formação e trajetória".
  - Header: "Cirurgiã-Dentista" em `opacity-50`, também um rótulo de 11 px que não passa. O ROADMAP lista só os tokens, mas o item é "rótulos de 11 px", e este é um deles.
  - Tokens: sair `dark-55` e `light-40` do `globals.css`, que ficam sem uso.
  - Docs: DESIGN.md, `.claude/commands/ui.md`, `docs/fdd/contato.md` (os três citam `dark-55`), PRD e ROADMAP.
- **Fora:**
  - A citação da band em `light-base` sobre o `BACKDROP`, no `beside:`. Pela conta, dá cerca de 2,4 a 2,6:1, abaixo até dos 3:1 de texto grande. Corrigir isso muda o visual da band, e a decisão é do Lucas. Aqui ela só é medida e registrada (item 7).
  - Header ancorado sobre vídeo ou foto: o véu translúcido com desfoque fica por cima de mídia, e o contraste varia com o quadro. Mede-se só sobre `light-base`, no topo da página.
  - Links do header (13 px, `opacity-70`): já passam sobre `light-base` (6,14).
  - `dark-40` e `dark-10`: são traço, não texto.

### Conteúdo e regras de fora
- Conteúdo da doutora necessário: nenhum.
- Regras do CFO e do CRO-AL que tocam esta entrega: nenhuma em conflito. Nenhum texto muda.

### Critérios de aceite (testáveis)
1. Rótulos do hero, do texto do Sobre e da linha do tempo, e o parágrafo de 15 px do hero, medem 4,5:1 ou mais sobre `light-base`, em 390 px, iPad retrato e computador.
2. O rótulo "A dentista" mede 4,5:1 ou mais nos dois arranjos: empilhado, sobre `light-base`; e no `beside:` (computador), sobre a cor do `BACKDROP` na altura do rótulo, com a band aberta e o texto em opacidade 1.
3. "Cirurgiã-Dentista" no header mede 4,5:1 ou mais sobre `light-base`, com o header flutuando no topo da página.
4. A pele `dark` do hero, trocada só localmente (`TONE = "dark"`, sem commit), mede 4,5:1 ou mais nos rótulos e no parágrafo sobre `forest-900`.
5. `dark-55` e `light-40` não aparecem mais em `src/` nem em `globals.css`.
6. Nenhuma mudança de layout, tamanho, peso ou movimento: só a cor desses textos.
7. Com `prefers-reduced-motion`, o estado final continua legível e medido igual (a cor não depende de movimento).
8. DESIGN.md, seção 3: valores medidos, a regra do texto secundário escrita e a nota de pendência removida. A medida da citação da band fica registrada.
9. Lint, typecheck e build verdes.

**Método de medida** (o mesmo do rodapé): cor computada do texto, misturada sobre a cor do fundo real atrás dele, e razão WCAG 2.x calculada no navegador pelo MCP do Chrome DevTools. Na band, o fundo é a cor do gradiente na altura do rótulo.

### Perguntas bloqueadoras
- Nenhuma.

### Premissas
- O `TONE` do hero continua `"light"`. A pele `dark` é corrigida para que trocar o `TONE` não traga a falha de volta.
- Os números deste plano são contas feitas a partir dos valores do código. Quem decide é a medida do `/exec`.
- 70% de opacidade é o mesmo degrau já aprovado no rodapé. O texto secundário fica um pouco mais escuro, e a hierarquia continua a mesma: serifa grande contra rótulo pequeno em caixa-alta.

---

## Stage 2 — Evidence Gathering

| Arquivo | Evidência |
|---|---|
| `docs/design/DESIGN.md` | Seção 3: `dark-55` sobre `light-base` dá 3,79 e `light-40` sobre `dark-base` dá 3,52, ambos "só texto grande". `dark-base` a 70% sobre `light-base` dá 6,14, medido no rodapé. Linha 74: a pendência que este plano fecha |
| `src/app/globals.css` | `--c-dark-55` (0,55) e `--c-light-40` (0,4) em `:root`, expostos em `@theme inline`. Não há outro uso fora dos pontos abaixo |
| `src/components/hero.tsx` | `PALETTE.light.muted = "text-dark-55"` e `PALETTE.dark.muted = "text-light-40"`. `skin.muted` aparece em três lugares: rótulo "Odontologia estética e restauradora" (11 px), parágrafo (15 px) e "Role para conhecer" (11 px). `TONE = "light"` |
| `src/components/about.tsx` | Rótulo "A dentista" em `text-dark-55`. No `beside:`, o texto fica sobre o `BACKDROP` (gradiente de `rgb(173,158,138)` a `rgb(114,97,78)`), e a citação passa a `light-base` |
| `src/components/about-text.tsx` | Rótulo do topo em `text-dark-55`, sobre `bg-light-base` |
| `src/components/about-timeline.tsx` | `h3` "Formação e trajetória" em `text-dark-55`, sobre `bg-light-base` |
| `src/components/header.tsx` | "Cirurgiã-Dentista" em `opacity-50`, 11 px; a cor vem do `style` (`dark-base` no tom claro). Os links do menu já usam `opacity-70` |

### Fluxo atual

Contas feitas a partir dos valores do código. O `/exec` confirma com medida.

| Texto | Fundo | Hoje | Com a mudança |
|---|---|---|---|
| Rótulos e parágrafo do hero, rótulos do Sobre (`dark-55`) | `light-base` | 3,79 | `dark-base/70`: 6,14 (medido no rodapé) |
| "A dentista" no `beside:` (`dark-55`) | `BACKDROP` na altura do rótulo | ~2,7 | `dark-base` a 100%: ~6,0. A 70% daria ~3,6, e não serve |
| "Cirurgiã-Dentista" no header (`opacity-50`) | `light-base` | ~3,25 | `opacity-70`: 6,14 |
| Pele `dark` do hero (`light-40`) | `forest-900` | ~3,3 | `light-base/70`: ~7,0 |
| Citação da band (`light-base`), fora do escopo | `BACKDROP` | ~2,4 a 2,6 | sem mudança; só medir |

---

## Stage 3 — Architecture Planning

### Source of Truth
1. **Regra do texto secundário** (DESIGN.md, seção 3): `dark-base` a 70% sobre fundo claro, `light-base` a 70% sobre fundo escuro. Sobre foto ou gradiente de foto, cor cheia. Nenhum texto abaixo de 70%.
2. **Tokens** (`globals.css`): saem `dark-55` e `light-40`. O secundário é o token-base com o modificador `/70` do Tailwind, como o rodapé já faz.
3. **Pontos de uso:** `hero.tsx` (`PALETTE.*.muted`), `about.tsx`, `about-text.tsx`, `about-timeline.tsx`, `header.tsx`.
4. **Docs:** DESIGN.md (seção 3), `.claude/commands/ui.md`, `docs/fdd/contato.md`, PRD (seção 10) e ROADMAP.

### Decisão única
- Trocar a cor nos pontos de uso pelo padrão já medido e aprovado no rodapé (`dark-base/70` e `light-base/70`; no header, `opacity-70`, como os links ao lado), e remover os dois tokens que não passam. Na band aberta, o rótulo vai a `dark-base` cheio, porque 70% sobre o gradiente não chega a 4,5:1.
- Por que não só subir o valor dos tokens: `dark-55` valendo 70% mentiria no nome. E um `dark-70` novo duplicaria o `dark-base/70` que o rodapé já usa. Sem o token, também não sobra atalho para texto pequeno que não passa.

### Checklist de arquitetura
- [x] Convenção da stack: só classes do Tailwind 4 com tokens existentes (`dark-base`, `light-base`); nenhum hex solto; nenhuma API do Next tocada.
- [x] Layout por proporção: o rótulo da band usa a variante `beside:` que já existe, sem breakpoint em pixel.
- [x] Interface: textos não mudam (pt-BR); toque e foco não mudam; conferir em 390 px, iPad retrato e computador.
- [x] Movimento: nenhum muda. A cor não anima; as máscaras e opacidades de entrada continuam como estão.
- [x] `prefers-reduced-motion`: o estado final continua legível; a cor é a mesma com e sem movimento.
- [x] Não cria momento novo dirigido por scroll.
- [x] Regras de fora: nenhum texto, foto ou vídeo muda.
- [x] Remoção de token só depois de trocar todos os usos, para nenhum commit intermediário renderizar texto sem cor definida.
- [x] Pele `dark` do hero corrigida junto, para trocar o `TONE` não reabrir a falha.

---

## Stage 4 — Execution Planning

Um commit cada, nesta ordem. Não há FDD a escrever nem token novo. A remoção dos tokens vem depois dos componentes, para nenhum commit deixar classe sem cor.

1. [ ] **Hero:** `PALETTE.light.muted` vira `text-dark-base/70` e `PALETTE.dark.muted` vira `text-light-base/70`. `fix(hero): lift secondary text to pass AA contrast`
2. [ ] **Sobre, band:** rótulo "A dentista" em `text-dark-base/70 beside:text-dark-base`, com comentário curto do porquê (o gradiente da foto escurece o 70%). `fix(about): keep the band label legible over the backdrop`
3. [ ] **Sobre, texto e linha do tempo:** os dois rótulos em `text-dark-base/70`. `fix(about): lift the section labels to pass AA contrast`
4. [ ] **Header:** "Cirurgiã-Dentista" de `opacity-50` para `opacity-70`. `fix(header): lift the profession label to pass AA contrast`
5. [ ] **Tokens:** conferir com `grep` que não sobrou uso e tirar `--c-dark-55`, `--c-light-40`, `--color-dark-55` e `--color-light-40` do `globals.css`. `refactor(styles): drop the secondary tokens that fail AA`
6. [ ] **Medida no navegador** (sem commit): os critérios 1 a 4 e 7 em 390 px, iPad retrato e computador; a pele `dark` com o `TONE` trocado só localmente e revertido; a citação da band no `beside:`. Os números vão para o item 7 e para o Stage 7.
7. [ ] **DESIGN.md, seção 3:** tirar as linhas de `dark-55` e `light-40` da paleta; registrar a regra do texto secundário; a tabela de contraste com os pares medidos (`dark-base/70` sobre `light-base`, `dark-base` sobre o `BACKDROP`, `light-base/70` sobre `forest-900`, citação da band); trocar a nota da linha 74 pelo resultado. `docs(design): record the secondary text rule and measured contrast`
8. [ ] **Docs que citam `dark-55`:** `.claude/commands/ui.md` (atenção a texto secundário abaixo de 70%) e `docs/fdd/contato.md`, regra 4. `docs: point the secondary text rule at dark-base/70`
9. [ ] **PRD e ROADMAP:** marcar o critério da seção 10; no ROADMAP, a linha da Fase 1 aponta para este arquivo como feita. Se a citação da band medir abaixo de 3:1, uma linha nova na Fase 1, junto da barra técnica, para o Lucas decidir o visual. `docs(roadmap): close the small label contrast item`
10. [ ] **Verificação:** lint, typecheck e build; Stages 6 a 8 deste arquivo. `docs(tasks): record small-label-contrast execution`

---

## Stage 5 — Plan Verification

- [x] Regras nas camadas certas: cor no DESIGN.md e no `globals.css`; uso nos componentes; critério no PRD e no ROADMAP.
- [x] FDD: não se aplica, porque nenhuma seção muda de comportamento. A regra de cor mora no DESIGN.md, e o `contato.md` só tem a referência atualizada.
- [x] Decisão de produto coberta pelo PRD (seção 5, AA; seção 10, critério da Fase 1). O visual da citação da band fica fora e vai para o Lucas.
- [x] Checklist com 9 itens (até 10), SoT com 4 blocos, decisão única, 7 arquivos de evidência.
- [x] Nenhum conteúdo da doutora e nenhuma regra de fora tocados.

**Gate S2:** Livre

---

## Stage 6 — Code Execution

*(Preenchido pelo exec.)*

| # | Camada | Arquivo | Status |
|---|---|---|---|

### Desvios do plano
- Nenhum | …

---

## Stage 7 — Tests

*(Preenchido pelo exec.)*

| Critério de aceite | Como foi verificado |
|---|---|

---

## Stage 8 — Verification

*(Preenchido pelo exec.)*

- **lint:** Pass | Fail
- **typecheck:** Pass | Fail
- **test:** Pass | Fail | n/a
- **build:** Pass | Fail
- **Navegador (390 px e computador):** Pass | Fail

---

## Stage 9 — Walkthrough

*(Preenchido pelo walkthrough.)*
