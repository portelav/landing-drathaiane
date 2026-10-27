# Nome do header em duas linhas no celular

**Slug:** `header-name-wrap`
**Branch:** `fix/header-name-wrap`
**Área:** header · **Dono:** Lucas
**Status:** Done (PR #13 mergeado em 2026-10-11)
**Gate S2:** Livre

---

## Stage 1 — Scope Analysis

### Objetivo
- Em 390 px o nome "Dra. Thaiane Lessa" e "Cirurgiã-Dentista" quebravam em quatro linhas: o nome precisa de 140 px em uma linha e sobravam 101.

### Escopo
- **Dentro:** `src/components/header.tsx`, só abaixo de `sm` (640 px): margens laterais e folgas menores, e o rótulo "Menu" vira só o ícone (alvo de toque de 44 px, rótulo continua para leitor de tela).
- **Fora:** iPad e computador (nada muda); telas abaixo de 360 px, onde o nome pode voltar a quebrar.
- **Regras de fora:** nome, "Cirurgiã-Dentista" e demais textos não mudam.

### Critérios de aceite
1. Nome e "Cirurgiã-Dentista" em duas linhas em 390 e 360 px.
2. Botão do menu com 44×44 px; menu abre e fecha; iPad (820 px) com rótulo "Menu" e margem de 40 px como antes.
3. Sem rolagem horizontal. Lint, typecheck e build verdes.

---

## Stage 4 — Plano de execução

1. [x] Header abaixo de `sm`: margens, folgas e rótulo do menu. `fix(header): keep the name on two lines on phones`
2. [x] Medido em 390, 360 e 820 px; menu aberto conferido em 390 px.
3. [x] ROADMAP: item tirado de "Depois".
