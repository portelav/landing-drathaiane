# Rodapé como colofão claro

**Slug:** `footer-colophon`
**Branch:** `redesign/footer-colophon`
**Área:** rodapé · **Dono:** Lucas
**Status:** Done (PR #3 mergeado em 2026-10-10)
**Gate S2:** Livre (trivial: um arquivo de código, sem regra nova; direção escolhida pelo Lucas em 2026-10-10)

---

## Stage 1 — Scope Analysis

### Documentos
- **PRD:** D26 e D27 (sem mudança)
- **FDD:** `docs/fdd/contato.md`, parte do rodapé
- **Entrega anterior:** `tasks/footer-and-menu-anchors.md` (PR #2)

### Objetivo
- Refazer o visual do rodapé publicado no PR #2, que ficou pesado. O conteúdo não muda: identificação, canais e direitos. Muda só a forma.

### Problemas do rodapé atual
1. **Fundo:** um bloco `forest-900` alto e quase vazio no fim de uma página toda clara.
2. **Canais:** em serifa de 44 px, com cara de manchete, não de link.
3. **Composição:** tudo encostado à esquerda; no computador, a maior parte da largura fica vazia.
4. **Elementos soltos:** monograma, rótulo "CONTATO" e identificação sem ordem clara de leitura.
5. **Separadores:** dois "·" na linha de identificação.

### Escopo e não-escopo
- **Dentro:** `src/components/footer.tsx` como colofão claro.
  - Fundo `light-base`, continuando a última seção, com traço `dark-10` no topo.
  - Monograma em `forest-900`.
  - Identificação em três linhas: nome, profissão, CRO.
  - Canais como links pequenos em Inter Tight, no estilo do menu do header.
  - Linha de direitos embaixo.
  - Rótulo "Contato" só para leitor de tela.
  - Docs: FDD e DESIGN.md.
- **Fora:** conteúdo, menu e âncora `#contato`, que continuam como estão.

### Critérios de aceite
1. A identificação aparece inteira, em três linhas: "Dra. Thaiane Lessa", "Cirurgiã-Dentista", "CRO/AL-6418". O art. 43 exige nome, profissão e número de inscrição, não o separador.
2. Rodapé em fundo claro, sem bloco de cor. `data-header-theme="light"`.
3. Canais com os mesmos destinos. Área de toque de 44 px em tela de toque.
4. Todo texto passa em 4,5:1, medido.
5. Em 390 px, iPad retrato e computador. Sem rolagem horizontal.
6. Lint, typecheck e build verdes.

---

## Stage 4 — Execution Planning

1. [x] `src/components/footer.tsx` como colofão claro. `redesign` (`2dbcaba`; ajuste dos canais numa linha no celular em `867adb8`)
2. [x] FDD (`docs/fdd/contato.md`) e DESIGN.md: fundo, contraste medido, sem `forest-900` como fundo. `docs` (`000f779`)
3. [x] Status do `tasks/footer-and-menu-anchors.md` para Done (PR #2). `docs(tasks)` (`20257e4`)

---

## Verificação

- **Lint, typecheck e build:** verdes.
- **Navegador (MCP do Chrome DevTools):**
  - 390 px: monograma, identificação em três linhas, os três canais numa linha só (44 px de altura) e direitos. Sem rolagem horizontal.
  - iPad retrato (1024×1366, toque): identificação à esquerda e canais à direita, linha a linha, em linhas de 44 px.
  - Computador (1440×900, mouse): mesmo arranjo, em linhas de 32 px.
- **Contraste medido:** nome 15,59; profissão, CRO, canais e direitos 6,14; monograma `forest-900` 12,89.
- **Teclado:** Tab a partir do header cai no WhatsApp do rodapé, com contorno de 2 px em `dark-base`.
- **Regras do CFO:** a identificação continua com nome, profissão e número de inscrição (art. 43). Nenhum texto novo.
