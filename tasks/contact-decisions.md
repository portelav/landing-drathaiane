# Decisões de Contato a partir da pesquisa de sites

**Slug:** `contact-decisions`
**Branch:** `docs/contact-decisions`
**Área:** docs (PRD, FDD de Contato, ROADMAP) · **Dono:** Lucas
**Status:** Done (PR #7 mergeado em 2026-10-10)
**Gate S2:** Livre (entrega trivial: só docs, decisões tomadas pelo Lucas em 2026-10-10)

---

## Stage 1 — Scope Analysis

### Documentos
- **PRD:** `docs/PRD.md` seções 6 (escopo), 7 (fora de escopo), "Regras de fora", 10 (critérios da Fase 2) e 12 (Rodada 5: D32 a D34)
- **FDD:** `docs/fdd/contato.md` (existe; a seção Contato da Fase 2 continua em rascunho)
- **ADR relacionado:** nenhum (sem mudança de stack ou de arquitetura)
- **Pesquisa:** relatório nas notas privadas (`reports/Benchmark de sites de dentistas.md`), porque cita outros profissionais

### Objetivo
- Registrar as três decisões do Lucas depois da pesquisa com 24 sites de dentistas: primeira consulta e perguntas frequentes (D32), link para as avaliações externas (D33) e endereço do consultório com link de rota, sem mapa embutido (D34).
- Levar as decisões ao corpo do PRD, ao FDD de Contato e ao ROADMAP.

### Escopo e não-escopo
- **Dentro:** PRD (D32 a D34 e o corpo), FDD de Contato (conteúdo decidido, regras, desempenho), item Contato da Fase 2 no ROADMAP.
- **Fora:**
  - Código. Nada em `src/` muda.
  - Forma, lugar e movimento das partes novas: saem do `/plan` da seção Contato.
  - Botão flutuante de WhatsApp: em aberto, sem decisão.
  - Pendências com a doutora: vão para `private/pauta.md`, no repositório de notas.

### Conteúdo e regras de fora
- Conteúdo da doutora necessário: nenhum para registrar as decisões. Para a seção, sim (endereço, horário, acesso, etapas da primeira consulta, perguntas e respostas, link do perfil no Google), marcado como `> TODO` no FDD.
- Regras do CFO que tocam esta entrega: CEO art. 43, § 1º, IV (endereço, horário e convênios podem constar); art. 44, VI (paciente identificável); art. 44, I e art. 20, IX (preço, gratuito, "sem compromisso"); Res. CFO-196/2019, art. 2º, § 1º (promessa de resultado). LGPD para o mapa embutido.

### Critérios de aceite (testáveis)
1. PRD tem a Rodada 5 com D32, D33 e D34, datada de 2026-10-10.
2. Seção 6, seção 7, tabela de regras e critérios da Fase 2 do PRD citam as decisões novas.
3. FDD de Contato lista as partes decididas e mantém `> TODO` para o conteúdo dela; nenhum texto dela inventado.
4. Nenhum nome de outro profissional ou clínica nos docs públicos.

### Perguntas bloqueadoras
- Nenhuma.

### Premissas
- O endereço que entra é o do consultório, comercial.

---

## Stage 4 — Execution Planning

1. [x] `docs(prd)`: Rodada 5 (D32 a D34) e corpo do PRD.
2. [x] `docs(fdd)`: partes decididas, regras e desempenho da seção Contato.
3. [x] `docs(roadmap)`: item Contato da Fase 2 com as partes decididas.
4. [x] `docs(tasks)`: este arquivo.
