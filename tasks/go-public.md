# Abrir o repositório ao público

**Slug:** `go-public`
**Branch:** `chore/go-public`
**Área:** repositório · **Dono:** Lucas
**Status:** Execution
**Gate S2:** Livre (plano aprovado pelo Lucas em 2026-10-09)

---

## Stage 1 — Scope Analysis

### Documentos
- **PRD:** seção 12, D18 a D20; seção 9 (risco do repositório público)
- **Procedimento:** receita `public-repo` do `claude-kit`

### Objetivo
- Deixar o repositório pronto para virar público sem vazar segredo, dado de terceiro, nota interna, metadado de mídia ou e-mail pessoal.

### Escopo e não-escopo
- **Dentro:** notas internas para o repositório privado `landing-drathaiane-notes` (em `private/`); docs públicos só com regra e decisão; regras de repositório público no `CLAUDE.md`; logos e vídeos sem metadado; README com os direitos; CI com `gitleaks`, e-mail dos commits e metadado de mídia.
- **Fora:** a cópia com histórico limpo, a criação do repositório público e a troca na Vercel. Acontecem depois do merge, fora do código, com confirmação do Lucas a cada passo.

### Conteúdo e regras de fora
- Aval da doutora para o repositório público: dado em 2026-10-09 (D18).

### Critérios de aceite (testáveis)
1. `git grep` não acha dúvida aberta, pendência dela, caso clínico nem material de paciente nos docs.
2. Nenhum arquivo em `public/` com XMP, EXIF ou bloco de texto PNG; pixels dos logos e pacotes dos vídeos idênticos aos de antes.
3. `gitleaks` sem achados; commits da branch só com o e-mail noreply.
4. Lint, typecheck e build verdes.

---

## Stage 4 — Execution Planning

1. [x] Ignorar `private/`
2. [x] Pauta, perguntas em aberto e material de paciente para as notas privadas (ROADMAP, PRD, FDDs, pesquisa)
3. [x] PRD: aval e decisões D18 a D20
4. [x] `CLAUDE.md`: seção "Repositório público" e ponteiros para `private/`
5. [x] Logos e vídeos sem metadado
6. [x] README: todos os direitos reservados
7. [x] CI: `gitleaks`, e-mail dos commits, metadado de mídia
