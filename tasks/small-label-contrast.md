# Contraste dos rótulos de 11 px

**Slug:** `small-label-contrast`
**Branch:** `fix/small-label-contrast`
**Área:** hero, Sobre (band, texto, linha do tempo), header · **Dono:** Lucas
**Status:** Walkthrough
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

1. [x] **Hero:** `PALETTE.light.muted` vira `text-dark-base/70` e `PALETTE.dark.muted` vira `text-light-base/70`. `fix(hero): lift secondary text to pass AA contrast`
2. [x] **Sobre, band:** rótulo "A dentista" em `text-dark-base/70 beside:text-dark-base`, com comentário curto do porquê (o gradiente da foto escurece o 70%). `fix(about): keep the band label legible over the backdrop`
3. [x] **Sobre, texto e linha do tempo:** os dois rótulos em `text-dark-base/70`. `fix(about): lift the section labels to pass AA contrast`
4. [x] **Header:** "Cirurgiã-Dentista" de `opacity-50` para `opacity-70`. `fix(header): lift the profession label to pass AA contrast`
5. [x] **Tokens:** conferir com `grep` que não sobrou uso e tirar `--c-dark-55`, `--c-light-40`, `--color-dark-55` e `--color-light-40` do `globals.css`. `refactor(styles): drop the secondary tokens that fail AA`
6. [x] **Medida no navegador** (sem commit): os critérios 1 a 4 e 7 em 390 px, iPad retrato e computador; a pele `dark` com o `TONE` trocado só localmente e revertido; a citação da band no `beside:`. Os números vão para o item 7 e para o Stage 7.
7. [x] **DESIGN.md, seção 3:** tirar as linhas de `dark-55` e `light-40` da paleta; registrar a regra do texto secundário; a tabela de contraste com os pares medidos (`dark-base/70` sobre `light-base`, `dark-base` sobre o `BACKDROP`, `light-base/70` sobre `forest-900`, citação da band); trocar a nota da linha 74 pelo resultado. `docs(design): record the secondary text rule and measured contrast`
8. [x] **Docs que citam `dark-55`:** `.claude/commands/ui.md` (atenção a texto secundário abaixo de 70%) e `docs/fdd/contato.md`, regra 4. `docs: point the secondary text rule at dark-base/70`
9. [x] **PRD e ROADMAP:** marcar o critério da seção 10; no ROADMAP, a linha da Fase 1 aponta para este arquivo como feita. Se a citação da band medir abaixo de 3:1, uma linha nova na Fase 1, junto da barra técnica, para o Lucas decidir o visual. `docs(roadmap): close the small label contrast item`
10. [x] **Verificação:** lint, typecheck e build; Stages 6 a 8 deste arquivo. `docs(tasks): record small-label-contrast execution`

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

| # | Camada | Arquivo | Status |
|---|---|---|---|
| 1 | Componente | `src/components/hero.tsx` (`PALETTE.light.muted` e `PALETTE.dark.muted`) | Feito (`dc8956b`) |
| 2 | Componente | `src/components/about.tsx` (rótulo "A dentista", com comentário) | Feito (`eabeda9`) |
| 3 | Componente | `src/components/about-text.tsx`, `src/components/about-timeline.tsx` | Feito (`5b82bb5`) |
| 4 | Componente | `src/components/header.tsx` ("Cirurgiã-Dentista") | Feito (`9645d43`) |
| 5 | Tokens | `src/app/globals.css` (saem `dark-55` e `light-40`) | Feito (`00f1833`) |
| 6 | Medida | navegador, sem commit | Feito |
| 7 | Docs | `docs/design/DESIGN.md`, seção 3 | Feito (`56fe438`) |
| 8 | Docs | `.claude/commands/ui.md`, `docs/fdd/contato.md` | Feito (`993ef84`) |
| 9 | Docs | `docs/PRD.md` (seção 10), `docs/ROADMAP.md` | Feito (`f124db9`) |
| 10 | Docs | este arquivo, Stages 6 a 8 | Feito |

### Desvios do plano
- **`prefers-reduced-motion` não foi emulado.** A ferramenta `emulate` do MCP do Chrome DevTools não tem essa opção. O critério 7 foi conferido no código (ver Stage 7), não no navegador.
- **Header mede 6,10, não 6,14.** A opacidade fica no `span`, e não na cor, e o arredondamento do alfa muda a segunda casa. Passa do mesmo jeito.
- **ROADMAP:** o critério da linha mudou de "`dark-55` e `light-40` em texto pequeno" para "texto secundário pequeno", porque os dois tokens não existem mais. O sentido é o mesmo.
- Nenhum outro.

---

## Stage 7 — Tests

Medida no navegador pelo MCP do Chrome DevTools, com `npm run dev`. Viewports: 390×844 (celular, toque), 1024×1366 (iPad retrato, toque) e 1440×900 (computador). Método: cor computada do texto (resolvida num canvas), alfa vezes a opacidade dos ancestrais, mistura sobre o primeiro fundo opaco atrás do ponto (`elementsFromPoint`) e razão WCAG 2.x. Na band, o fundo é a cor do `BACKDROP` interpolada na altura do texto, com a band aberta no fim da pista e o texto em opacidade 1.

| Critério de aceite | Como foi verificado |
|---|---|
| 1. Rótulos do hero, do texto do Sobre e da linha do tempo, e parágrafo do hero, 4,5:1 ou mais | Medido nos três viewports: 6,14 em todos (tinta `91,90,88` sobre `light-base`) |
| 2. "A dentista" 4,5:1 ou mais nos dois arranjos | Empilhado (390 px e iPad): 6,14 sobre `light-base`. `beside:` (1440×900): `dark-base` cheio sobre o gradiente a 38% da altura da band, de 6,31 a 6,36 entre o topo e a base do rótulo |
| 3. "Cirurgiã-Dentista" 4,5:1 ou mais | 6,10 sobre `light-base`, header flutuando no topo, nos três viewports |
| 4. Pele `dark` do hero 4,5:1 ou mais | `TONE = "dark"` trocado só localmente e revertido com `git checkout` (tree limpo depois). Rótulos e parágrafo: 7,08 sobre `forest-900`. Header no tom escuro: 7,05 |
| 5. `dark-55` e `light-40` fora de `src/` e do `globals.css` | `grep -rn "dark-55\|light-40" src/` sem resultado |
| 6. Só a cor muda | Diff dos componentes: só a classe de cor, ou a opacidade no header, e um comentário na band. Captura do hero em 1440×900: hierarquia igual, rótulos e parágrafo um pouco mais escuros |
| 7. `prefers-reduced-motion` legível e igual | No código: nenhuma das classes de cor tem variante `motion-reduce:`. Com movimento reduzido, o `rest()` da band limpa a opacidade inline do texto (fica 1) e deixa a band aberta, então o rótulo fica sobre o mesmo gradiente, com a mesma tinta medida. Não emulado (ver desvios) |
| 8. DESIGN.md atualizado | Seção 3: regra do texto secundário, linhas dos tokens removidas, pares medidos, nota da pendência trocada pela medida da citação |
| 9. Lint, typecheck e build | Ver Stage 8 |

**Fora do escopo, medido:** a citação da band aberta (`light-base`, 37 px) sobre o gradiente mede 2,52 na primeira linha e 3,00 na última, abaixo dos 3:1 de texto grande. Ficou registrada no DESIGN.md e como linha nova na Fase 1 do ROADMAP, para o Lucas decidir o visual.

---

## Stage 8 — Verification

- **lint:** Pass (`npm run lint`, saída 0)
- **typecheck:** Pass (`npx next typegen && npx tsc --noEmit`, saída 0)
- **test:** n/a (o projeto não tem testes)
- **build:** Pass (`npm run build`, `/` estático)
- **Navegador (390 px, iPad retrato e computador):** Pass. Contraste medido como no Stage 7. Captura da band aberta em 1440×900: rótulo em `dark-base` legível sobre a parede. Só a aba aberta pelo MCP foi fechada, e o `npm run dev` foi parado.

---

## Stage 9 — Walkthrough

> Data: 2026-10-10

### Resumo
- **Veredito:** WARNINGS
- **Arquivos analisados:** 12 (6 de código, 6 de docs)
- **Findings:** 0 críticos, 3 avisos

### Checklist
| Item | Status | Observação |
|---|---|---|
| 1. Escopo | OK | Os 12 arquivos são os do Stage 4. No código, só classes de cor, a opacidade do header, a remoção de 4 linhas de token e um comentário |
| 2. Regras de fora | OK | Nenhum texto, foto ou vídeo mudou. "Cirurgiã-Dentista" no header ficou mais legível (art. 43); o rodapé continua igual |
| 3. Stack | OK | Só classes do Tailwind 4 sobre tokens existentes. A band usa a variante `beside:` que já existia. Nenhuma API do Next e nenhum `"use client"` novo |
| 4. Produto | OK | Critério da seção 10 do PRD cumprido. O visual da citação da band virou item para o Lucas, não suposição |
| 5. Interface: tokens | OK | `dark-base/70`, `light-base/70` e `dark-base`, sem hex solto. Os tokens removidos não têm mais uso em `src/` |
| 5. Interface: viewports e contraste | OK | Medido em 390 px, iPad retrato e computador: de 6,10 a 7,08 (Stage 7) |
| 5. Interface: movimento e `prefers-reduced-motion` | OK, com ressalva | Nenhum movimento mudou. Movimento reduzido conferido no código, não emulado (Stage 6, desvios) |
| 6. Higiene: verificações | OK | Lint, typecheck e build com saída 0 |
| 6. Higiene: commits | OK | 10 commits em Conventional Commits, títulos até 72 caracteres, todos com o e-mail noreply. Busca por atribuição de IA no corpo vazia |
| 6. Higiene: docs | OK, com aviso | DESIGN.md, PRD, ROADMAP, `contato.md` e `ui.md` atualizados. `CLAUDE.md` não precisa mudar. Ver aviso 1 |

### Findings
#### Critical
- Nenhum.

#### Warnings
1. **A regra "nenhum texto abaixo de 70%" é mais absoluta que o código.** Na roleta, os anos fora de foco ficam entre 14% e 100% de opacidade durante o scroll (`about-timeline.tsx:164`), e isso é intencional. Do jeito que está escrita, a regra nova contradiz uma peça aprovada. — `docs/design/DESIGN.md:53`, `.claude/commands/ui.md:23` — Sugestão: "Nenhum texto em repouso abaixo de 70%" e citar a roleta como exceção de trânsito (no estado final com movimento reduzido, ela já fica em cor cheia).
2. **O DESIGN.md generaliza onde cada par foi medido.** Diz que os pares de texto secundário e da band foram medidos em 390 px, iPad retrato e computador. Mas a band aberta e a pele escura do hero só foram medidas em 1440×900 (a band aberta só existe no computador; a pele escura não muda com a largura). — `docs/design/DESIGN.md:59` — Sugestão: "nos três viewports; a band aberta e a pele escura, só no computador".
3. **A citação da band falha 3:1, de 2,52 a 3,00.** Não foi causada por esta branch: só foi medida e registrada aqui (DESIGN.md e ROADMAP, Fase 1). Fica pendente antes da barra técnica. — `src/components/about.tsx:193` — Decisão de visual do Lucas, já no ROADMAP.

#### Positive
- Uma convenção só para texto secundário, a do rodapé, já medida e aprovada. Os dois tokens que falhavam saíram, então não sobra atalho para repetir o erro.
- O caso da band foi tratado à parte, e com medida: 70% sobre a parede daria cerca de 3,6, e o `dark-base` cheio dá 6,34.
- A pele escura do hero foi corrigida e medida (7,08), embora esteja fora de uso. Trocar o `TONE` não traz a falha de volta.
- A ordem dos commits deixa todos os estados intermediários válidos: a remoção dos tokens veio depois de trocar todos os usos.
- O plano foi honesto sobre o que é conta e o que é medida, e o Stage 7 registra o método.

### Verificações executadas
- `git diff --name-only main...HEAD`: 12 arquivos, todos previstos no plano.
- `git diff main...HEAD -- src/`: só as mudanças do Stage 4.
- `git log --format=%B main..HEAD | grep -i -E "co-authored|generated with|claude|agent"`: vazio.
- `git log --format='%ae'`: todos com `198817785+portelav@users.noreply.github.com`.
- `npm run lint`: saída 0.
- `npx next typegen && npx tsc --noEmit`: saída 0.
- `npm run build`: saída 0, `/` estático.
- `grep -n opacity src/components/about-timeline.tsx`: origem do aviso 1.

**Gate S9 — WARNINGS**

### Correções depois do walkthrough
- **Avisos 1 e 2 corrigidos (`e2300f6`).** A regra virou "nenhum texto em repouso abaixo de 70%", com a roleta citada como exceção, no DESIGN.md e no `ui.md`. A frase das medidas agora diz que a band aberta e a pele escura do hero só foram medidas no computador.
- **Aviso 3 continua aberto.** É a citação da band, já registrada no ROADMAP (Fase 1) para o Lucas decidir.
