# Site público: noindex fora

**Branch:** `feat/go-public` · **Status:** Em execução

## Objetivo
- Liberar o site para os buscadores, com o aval dela dado (PRD, D22 e D51), e dizer ao Google qual é o endereço oficial e o que o site é.

## Escopo
- **Dentro:**
  - Tirar o `robots: { index: false, follow: false }` do `layout.tsx`.
  - Canonical em `https://www.drathaianelessa.com.br` (`alternates.canonical`).
  - Dados estruturados (JSON-LD, tipo `Dentist` do schema.org) na home, só com o que o site já mostra: nome, profissão e CRO, telefone da clínica, endereço do consultório, coordenadas do mapa, horário e Instagram. Tudo lido de `src/lib/contact.ts`, sem repetir valor à mão.
  - `src/app/sitemap.ts` (só a home) e `src/app/robots.ts` (tudo liberado, com o endereço do sitemap).
  - `drathaianelessa.vercel.app` redireciona (308) para o `www`, no `next.config.ts` (`redirects` com `has: host`). Fica no código e no git, e não pega os previews, que têm outro endereço.
  - ROADMAP, "Depois": aparecer mais nas buscas do Google (Search Console com o sitemap, título e descrição com os termos que as pessoas buscam, perfil dela no Google, avaliações).
  - README e CLAUDE.md sem "fora dos buscadores" e sem `noindex`.
- **Fora:** Search Console, revisão de título e descrição, perfil dela no Google (ficam no ROADMAP, "Depois"). README final com prints (item próprio da Fase 1).

## Conteúdo e regras de fora
- Conteúdo da doutora necessário: nenhum novo. Os dados estruturados repetem o que já está no site. O celular pessoal dela nunca entra; só o da clínica.
- Regras do CFO: os dados estruturados são publicidade como o resto do site. Nome, "Cirurgiã-Dentista" e CRO/AL-6418 entram (art. 43). Sem `priceRange` nem nada de preço ou pagamento (art. 44, I; D29), embora o Google sugira o campo. Sem "especialista" nem área de atuação (art. 43, § 1º, I; o registro da especialidade ainda não saiu). Sem CEP nem bairro, que o site não mostra.

## Critérios de aceite
1. O HTML da home não tem `noindex` e tem `<link rel="canonical" href="https://www.drathaianelessa.com.br">`.
2. A 404 continua com `noindex`, que o Next põe sozinho.
3. `/robots.txt` libera tudo e aponta para `https://www.drathaianelessa.com.br/sitemap.xml`; `/sitemap.xml` lista a home.
4. O JSON-LD da home passa no Schema Markup Validator, sem erro, e não tem preço nem o celular pessoal.
5. Na produção, `https://drathaianelessa.vercel.app/` responde 308 para o `www`; o preview da branch continua abrindo.
6. Lint, typecheck e build verdes.

## Arquivos
- `src/app/layout.tsx`: sai o `robots`, entra o canonical.
- `src/app/page.tsx`: o `<script type="application/ld+json">`.
- `src/lib/structured-data.ts`: o objeto do JSON-LD, montado a partir de `contact.ts`.
- `src/app/sitemap.ts`, `src/app/robots.ts`: novos.
- `next.config.ts`: o redirecionamento do `vercel.app`.
- `docs/PRD.md` (D53 e seção 10), `docs/ROADMAP.md`, `README.md`, `CLAUDE.md`.

## Checklist (até 10, em ordem)
1. [x] Ler `json-ld.md`, `robots.md`, `sitemap.md` e `redirects.md` em `node_modules/next/dist/docs/`.
2. [x] `layout.tsx`: tirar o `robots`, pôr o canonical, atualizar o comentário.
3. [x] `structured-data.ts` e o `<script>` na home, com `<` escapado como manda o guia.
4. [x] `robots.ts` e `sitemap.ts`.
5. [x] Redirecionamento do `vercel.app` no `next.config.ts`.
6. [x] Build local: conferir os critérios 1 a 4 no HTML e nas rotas.
7. [x] PRD (D53), ROADMAP (feito e o "Depois" das buscas), README e CLAUDE.md.
8. [x] Lint e typecheck. Parar para o Lucas conferir.
9. [ ] Depois do merge: critério 5 na produção.

---

## Feito e verificado
- **Arquivos:** `layout.tsx` (sem `robots`, `metadataBase` de `site.ts`), `page.tsx` (canonical e JSON-LD), `robots.ts` e `sitemap.ts` novos, `next.config.ts` (redirecionamento), `src/lib/site.ts` e `structured-data.ts` novos, `contact.ts` (`OPENING_HOURS`, o horário na forma que o Google lê). Docs: PRD (D53), ROADMAP, README, CLAUDE.md.
- **Desvios:** o canonical foi para a `page.tsx`, não para o `layout.tsx`, para a 404 não apontar para a home. `src/lib/site.ts` entrou para o endereço oficial ter um lugar só (layout, robots, sitemap, JSON-LD e redirecionamento).
- **Critérios, no build local (`next start`):**
  1. Home sem `noindex` e com `<link rel="canonical" href="https://www.drathaianelessa.com.br">`.
  2. `/nao-existe` com `<meta name="robots" content="noindex">`.
  3. `/robots.txt` com `Allow: /` e o sitemap; `/sitemap.xml` com a home.
  4. JSON-LD lido e conferido: tipo `Dentist`, telefone da clínica, sem o celular pessoal, sem preço. Validador do schema.org fica para a URL de produção, depois do merge.
  5. Com `Host: drathaianelessa.vercel.app`, 308 para o `www` com o caminho; com outro host da Vercel, 200. Na produção, depois do merge.
  6. Lint, typecheck e build verdes.
- **Interface:** nada visível mudou; sem conferência em 390 px, iPad e computador além do HTML.
