# Rodapé com identificação e menu sem link quebrado

**Slug:** `footer-and-menu-anchors`
**Branch:** `feat/footer-and-menu-anchors`
**Área:** rodapé e header · **Dono:** Lucas
**Status:** Walkthrough
**Gate S2:** Livre

---

## Stage 1 — Scope Analysis

### Documentos
- **PRD:** `docs/PRD.md` seções 6 (item Contato e rodapé), 8 (acessibilidade), "Regras de fora" (CEO art. 43), 10 (Fase 1, dois primeiros itens), 12 (D3, D20, D21, D25)
- **FDD:** `docs/fdd/contato.md` (existe, em rascunho; este plano escreve a parte do rodapé)
- **ADR relacionado:** nenhum novo. Stack de [0001](../docs/adr/0001-nextjs-on-vercel.md), sem mudança

### Objetivo
- Cumprir os dois primeiros critérios da Fase 1: rodapé com "Dra. Thaiane Lessa · Cirurgiã-Dentista · CRO/AL-6418" legível em toda tela, e um menu em que todo link leva a algum lugar.

### Escopo e não-escopo
- **Dentro:**
  - Rodapé em fundo `forest-900` com a identificação, a linha de direitos e os canais de contato que o site já mostra no header (WhatsApp, telefone, Instagram).
  - O rodapé é o destino de `#contato` nesta fase.
  - Menu do header com Sobre e Contato; Serviços e Depoimentos saem.
  - Dados de contato numa fonte única, usada pelo header e pelo rodapé.
  - Docs: decisões no PRD, FDD do rodapé, DESIGN.md, ROADMAP, `CLAUDE.md`.
- **Fora:**
  - Seção Contato completa (endereço, horários, mapa, e-mail): Fase 2, depende do conteúdo dela.
  - Serviços (Fase 2) e Depoimentos (D25).
  - Contraste dos rótulos de 11 px já existentes e pausa dos vídeos: outros itens da Fase 1.
  - Crédito do site no rodapé: o Lucas decidiu não pôr.

### Conteúdo e regras de fora
- Conteúdo da doutora necessário: só o que já está publicado no site (nome, profissão, CRO, telefone, WhatsApp, Instagram; D3). Nada novo. O texto do rodapé passa pelo aval dela na Fase 2 (PRD, seção 10).
- Regras que tocam esta entrega:
  - CEO art. 43: nome, profissão e CRO em toda divulgação.
  - Nada de preço, pagamento, promoção, superlativo nem promessa no texto do rodapé.
  - D20: todos os direitos reservados.
  - A regra do art. 4º da Res. CFO-196/2019 (PRD, "Regras de fora") pode exigir nome e CRO também junto de cada mídia. Se exigir, é outra entrega.

### Critérios de aceite (testáveis)
1. O rodapé mostra, sem cortar, exatamente "Dra. Thaiane Lessa · Cirurgiã-Dentista · CRO/AL-6418" em `light-base` sobre `forest-900`, em 390 px, iPad retrato e computador.
2. O rodapé mostra "© 2026 Dra. Thaiane Lessa. Todos os direitos reservados."
3. O rodapé tem três links:
   - WhatsApp: `https://wa.me/5582993871990`, em nova aba.
   - Telefone: `tel:+5582993871990`.
   - Instagram: `https://instagram.com/thaiane_lessa`, em nova aba.
   Cada link tem área de toque de pelo menos 44 px de altura, e o nome acessível contém o texto visível.
4. Os dois menus (o que desdobra no computador e o compacto) listam só Sobre e Contato. Todo `href` do menu aponta para um `id` que existe na página: `document.querySelector(href)` não é nulo.
5. Clicar em Contato leva ao rodapé no computador (com o Lenis) e no celular. Clicar em Sobre continua levando à band do Sobre.
6. Todo texto do rodapé passa em 4,5:1, inclusive o secundário (medido, não estimado).
7. Teclado: foco visível em cada link do rodapé. Ordem de leitura: rótulo "Contato", canais, identificação, direitos.
8. O rodapé não tem nada que se mova. Com `prefers-reduced-motion` ele fica igual.
9. O header continua com o mesmo telefone, WhatsApp e Instagram de antes, agora lidos da fonte única.
10. Lint, typecheck e build verdes.

### Perguntas bloqueadoras
- Nenhuma. As três decisões abertas foram respondidas pelo Lucas em 2026-10-09:
  - o rodapé é o destino de `#contato`;
  - só a linha de direitos, sem crédito do site;
  - fundo `forest-900`.

### Premissas
- Telefone, WhatsApp e Instagram já estão públicos no header com o aval dela (D3, D18). Repeti-los no rodapé não é conteúdo novo.
- Quando a seção Contato da Fase 2 existir, ela assume `#contato`, e o rodapé fica só como rodapé. O FDD registra isso.
- O ano da linha de direitos é fixo (2026, ano da publicação), não calculado no build.

---

## Stage 2 — Evidence Gathering

| Arquivo | Evidência |
|---|---|
| `docs/PRD.md` | Seção 10, Fase 1: "Rodapé com 'Dra. Thaiane Lessa · Cirurgiã-Dentista · CRO/AL-6418', legível" e "Serviços e Contato levam a uma seção ou saem do menu até ela existir". D25 tira Depoimentos do menu. D20: todos os direitos reservados. "Regras de fora", CEO art. 43: rodapé fixo com a identificação |
| `docs/fdd/contato.md` | Rascunho. Identificação fixa já definida. Comportamento, movimento, acessibilidade e critérios estão como `> TODO: definir no /plan`. Regra 1: identificação visível em toda largura |
| `src/components/header.tsx` | `NAV_LINKS` com quatro destinos (`#sobre`, `#servicos`, `#depoimentos`, `#contato`), usado nos dois menus. `PHONE_*`, `WHATSAPP_HREF` e `INSTAGRAM_HREF` declarados no próprio arquivo, que é `"use client"`. `useSectionTone` lê `data-header-theme` das seções |
| `src/app/layout.tsx` | `<body className="min-h-full flex flex-col">` com `<Header />` e `{children}`. O header é peça do layout, não da página |
| `src/app/page.tsx` | `main` com `flex-1`: Hero, About (`id="sobre"`), AboutText, AboutTimeline. Nenhum `id` além de `sobre` |
| `src/app/globals.css` | Tokens `forest-900`, `light-base` e `light-15` já existem. Nenhum token novo é preciso |
| `docs/design/DESIGN.md` | Seção 3: `light-base` sobre `forest-900` dá 12,89:1, mas `light-40` em texto pequeno não passa. Seção 6: o site já tem três momentos seguidos dirigidos por scroll. Seção 7: tabela de componentes |

Guia do Next 16 lido: `01-app/01-getting-started/03-layouts-and-pages.md` e `05-server-and-client-components.md`. `"use client"` marca a fronteira entre os grafos de módulo do servidor e do cliente.

### Fluxo atual
- O menu abre e mostra quatro destinos. Só Sobre leva a algum lugar; Serviços, Depoimentos e Contato não fazem nada, porque os `id` não existem.
- A página termina na linha do tempo do Sobre, sem rodapé. Nome e "Cirurgiã-Dentista" aparecem no header, mas o CRO não aparece em lugar nenhum.

---

## Stage 3 — Architecture Planning

### Source of Truth (até 4 blocos)
1. **Dados de contato:** `src/lib/contact.ts` (novo), módulo neutro, sem `"use client"`. É a única fonte de telefone (exibição e `tel:`), WhatsApp e Instagram, para o header e o rodapé.
2. **Identificação e direitos:** texto fixo em `src/components/footer.tsx`, exatamente o do PRD ("Regras de fora") e o da decisão D27.
3. **Destinos do menu:** `NAV_LINKS` em `header.tsx`. Cada `href` aponta para um `id` que existe: `#sobre` em `about.tsx`, `#contato` no rodapé.
4. **Visual:** tokens existentes (`forest-900`, `light-base`, `light-15`). O DESIGN.md registra o par de contraste do texto secundário.

### Decisão única
- O rodapé é um Server Component em `src/components/footer.tsx`. Ele entra em `layout.tsx` depois de `{children}`, como par do `Header`. É um `<footer id="contato" data-header-theme="dark">` estático, sem JavaScript e sem movimento.
- O menu fica com Sobre e Contato.
- Os dados de contato saem do `header.tsx`, porque ele é `"use client"`: o rodapé importa de um módulo neutro em vez de atravessar a fronteira cliente/servidor.

### Desenho do rodapé (vai para o FDD)
- **Fundo e espaçamento:** `forest-900`, texto `light-base`. Espaçamento lateral do site (24 px, 40 px a partir de `sm`), respiro vertical generoso.
- **Primeiro bloco:**
  - `BrandMark` estático, com `aria-hidden`. Fecha a página com a mesma marca que o preloader abriu.
  - Rótulo "Contato" (`h2`, `.tracking-brand`, caixa-alta).
  - Os três canais como texto em Instrument Serif, como no menu compacto: "WhatsApp", "(82) 99387-1990", "@thaiane_lessa". Sem ícone: editorial, não institucional.
- **Traço `light-15`** separando os dois blocos.
- **Segundo bloco:**
  - Identificação em `light-base` cheio, no mínimo 13 px.
  - Direitos em texto secundário que passe em 4,5:1 (`light-base` a 70% sobre `forest-900` dá cerca de 7:1; o exec mede).
  - Empilhados no celular, lado a lado a partir de `sm`. Breakpoint em pixel é permitido aqui: o rodapé não depende de mídia.
- **Links externos:** `target="_blank"`, `rel="noopener noreferrer"` e "(abre em nova aba)" em `sr-only`.
- **Hover:** só opacidade, como os links do header.

### Checklist de arquitetura (até 10)
- [x] Convenções da stack: Server Component por padrão. Nenhum breakpoint de mídia (`wide:` e `beside:` não se aplicam). Nenhuma API nova do Next.
- [x] Interface: textos em português; toque de 44 px nos canais; foco visível; conferido em 390 px, iPad retrato e computador.
- [x] Movimento: nenhum. O porquê vai no FDD: o rodapé é o ponto de repouso depois de três momentos dirigidos por scroll. Não é o quarto.
- [x] Nada se mexe sozinho. `prefers-reduced-motion` não muda nada.
- [x] Só `transform` e `opacity`: o hover é só opacidade.
- [x] Regras de fora:
  - Identificação exata.
  - Nenhuma palavra vetada.
  - Só dados que já estão publicados.
  - Nenhuma imagem.
- [x] Repositório público: nenhum dado novo. Telefone e Instagram já estão no código e na página.
- [x] Header: `useSectionTone` reconhece o rodapé por `data-header-theme="dark"`, sem mudança no hook.
- [x] Sem token novo: os pares de cor saem dos tokens existentes.

---

## Stage 4 — Execution Planning

Até 10 itens, um commit cada, na ordem do `/exec`.

1. [x] **PRD, decisões** (`docs/PRD.md`, seção 12). Nova Rodada 3 (2026-10-09), plano do rodapé:
   - **D26:** na Fase 1, o rodapé é o destino de `#contato`, com a identificação e os canais já públicos. Serviços sai do menu até a seção existir.
   - **D27:** o rodapé leva "© 2026 Dra. Thaiane Lessa. Todos os direitos reservados." e não leva crédito do site.
   A decisão é registrada antes da spec que a cita. `docs(prd)`
2. [x] **FDD do rodapé.** `docs(fdd)`
   - `docs/fdd/contato.md`: divide em "Rodapé (Fase 1)", com objetivo, conteúdo, comportamento, movimento, regras, acessibilidade, desempenho e critérios completos, e "Seção Contato (Fase 2)", que segue com `> TODO`. Registra que a Fase 2 assume `#contato`.
   - `docs/fdd/README.md`: estado no índice.
   - `docs/fdd/servicos.md:24`: `#servicos` volta ao menu quando a seção existir.
   - `docs/fdd/sobre.md:218`: tira a frase das três âncoras quebradas.
3. [x] **Fonte única dos contatos.** `src/lib/contact.ts` com `PHONE_DISPLAY`, `PHONE_HREF`, `WHATSAPP_HREF` e `INSTAGRAM_HREF`. O `header.tsx` passa a importar de lá, sem mudança visível. `refactor`
4. [x] **Componente do rodapé.** `src/components/footer.tsx`, conforme o desenho do Stage 3 e o FDD. `feat`
5. [x] **Composição.** `<Footer />` em `src/app/layout.tsx`, depois de `{children}`. `feat`
6. [x] **Menu.** `NAV_LINKS` só com Sobre e Contato. Os comentários sobre "four destinations" passam a falar dos destinos sem número. `fix`
7. [x] **DESIGN.md.** `docs(design)`
   - Seção 3: `forest-900` também como fundo do rodapé, e o par medido do texto secundário.
   - Seção 6: linha "Rodapé: nada anima".
   - Seção 7: `Footer`.
8. [x] **Fechamento no PRD e no ROADMAP.** `docs`
   - PRD seção 6: estado de "Contato e rodapé" (rodapé pronto, seção pendente).
   - PRD seção 10: marca os dois primeiros itens da Fase 1, depois do QA.
   - ROADMAP: coluna Plano das duas linhas com `tasks/footer-and-menu-anchors.md`.
9. [x] **`CLAUDE.md`.** "Estado atual" com rodapé e menu. Estrutura do código com `footer` e `src/lib/`. `docs(claude)`

QA antes do item 8:
- Chrome DevTools MCP em 390 px, iPad retrato e computador.
- `querySelector` em cada `href` do menu.
- Contraste medido.
- Teclado.
- Clique em Contato com o Lenis ligado.
- Fechar o Chrome que o MCP abriu.

---

## Stage 5 — Plan Verification

- [x] **Regras nas camadas certas:**
  - Texto fixo de identificação no componente.
  - Dados de contato num módulo neutro.
  - Destinos no `NAV_LINKS`.
  - Visual nos tokens.
- [x] **FDD:** `docs/fdd/contato.md` existe e é atualizado no item 2, antes do código.
- [x] **Decisão de produto:** o PRD cobre a regra (seção 10, D25). As três escolhas abertas foram respondidas pelo Lucas e entram como D26 e D27 no item 1; o fundo vai para o DESIGN.md no item 7.
- [x] **Limites do plano:** checklist com 9 itens (até 10), SoT com 4 blocos (até 4), decisão única, 7 evidências (até 7).
- [x] **Conteúdo:** nenhum conteúdo inventado. Só o que já está publicado e o texto exigido pelo CFO.
- [x] **Roadmap:** os dois itens estão no ROADMAP, Fase 1.

**Gate S2:** Livre

---

## Stage 6 — Code Execution

| # | Camada | Arquivo | Status |
|---|---|---|---|
| 1 | Docs | `docs/PRD.md` (Rodada 3, D26 e D27) | feito, `f899e7f` |
| 2 | Docs | `docs/fdd/contato.md` | feito, `fb0e8ca` |
| 2 | Docs | `docs/fdd/README.md`, `docs/fdd/servicos.md`, `docs/fdd/sobre.md` | feito, `de8b149` |
| 3 | Dados | `src/lib/contact.ts` (novo), `src/components/header.tsx` | feito, `a395593` |
| 4 | Componente | `src/components/footer.tsx` (novo), `docs/fdd/contato.md` | feito, `937ecf6` |
| 5 | Composição | `src/app/layout.tsx` | feito, `cf88fe3` |
| 6 | Componente | `src/components/header.tsx` (`NAV_LINKS`) | feito, `649af3c` |
| 7 | Docs | `docs/design/DESIGN.md` | feito, `650ef69` |
| 8 | Docs | `docs/PRD.md` (seções 6 e 10), `docs/ROADMAP.md`, `docs/fdd/contato.md` e `README.md` (status) | feito, `126191a` |
| 9 | Docs | `CLAUDE.md` | feito, `9cba318` |

### Desvios do plano
- **Item 2 em dois commits.** O primeiro levou só o `contato.md`, porque o script que editava os outros três arquivos falhou (não há Python no shell). O segundo commit fecha o item.
- **Layout da base do rodapé.** O plano previa identificação e direitos lado a lado a partir de `sm`. Entre 640 e 1023 px as duas linhas não cabem lado a lado, então ficaram em `flex-wrap`: lado a lado quando cabem, uma embaixo da outra quando não. Os canais ficam em linha a partir de `lg`. O FDD foi ajustado no mesmo commit do componente (`937ecf6`).
- **`INSTAGRAM_HANDLE`** entrou em `src/lib/contact.ts` além dos quatro dados listados, para o rodapé não repetir "@thaiane_lessa" à mão.
- **Fechamento do FDD.** O status "implementado" e os critérios marcados no FDD entraram no commit do item 8, junto com PRD e ROADMAP.

---

## Stage 7 — Tests

O projeto não tem testes automatizados. Verificação no navegador, pelo MCP do Chrome DevTools, contra o `next dev`.

| Critério de aceite | Como foi verificado |
|---|---|
| 1. Identificação exata e inteira em `light-base` sobre `forest-900` | `innerText` do parágrafo igual ao texto do PRD. Largura de 340 px em 390 px, sem cortar. Uma linha no iPad retrato (1024×1366) e no computador (1440×900). Prints conferidos |
| 2. Linha de direitos | Texto presente nas três larguras |
| 3. Três canais, destinos, nova aba, 44 px, nome acessível | `href` e `target` lidos no DOM. Altura de cada link: 44 px. O nome acessível é o texto visível mais "(abre em nova aba)" em `sr-only` nos dois externos |
| 4. Menus só com Sobre e Contato, todo `href` existe | Menu compacto (390 px) e menu que desdobra (1440 px): dois links cada. `document.querySelector(href)` não é nulo para os dois |
| 5. Contato leva ao rodapé; Sobre continua funcionando | Celular: clique em Contato chegou ao fim da página (`scrollY` 4357 de 4357), rodapé visível e menu fechado. Computador com o Lenis ligado: `scrollY` 8865 de 8865, rodapé visível. Sobre: topo do `#sobre` em 0 |
| 6. Contraste ≥ 4,5:1, medido | Cor computada misturada sobre o fundo, no navegador. Identificação: 12,89. Canais: 9,69. Rótulo e direitos: 7,08 |
| 7. Foco visível e ordem de leitura | Tab a partir do último foco do header caiu no WhatsApp do rodapé, com `:focus-visible` e contorno sólido de 2 px em `light-base`, afastado 4 px (print). Ordem no DOM: `h2` "Contato", canais, identificação, direitos |
| 8. Nada se move; igual com movimento reduzido | Pelo código: o rodapé não tem animação; só transição de opacidade no hover. O MCP não emula `prefers-reduced-motion`, então não houve conferência no navegador |
| 9. Header com os mesmos contatos | `tel:+5582993871990`, `https://wa.me/5582993871990` e `https://instagram.com/thaiane_lessa` lidos no header depois da troca para `src/lib/contact.ts` |
| 10. Lint, typecheck e build | Stage 8 |

---

## Stage 8 — Verification

- **lint:** Pass (`npm run lint`)
- **typecheck:** Pass (`npx next typegen && npx tsc --noEmit`)
- **test:** n/a (sem testes automatizados)
- **build:** Pass (`npm run build`, `/` estático)
- **Navegador (390 px, iPad retrato 1024×1366 e computador 1440×900):** Pass. Sem rolagem horizontal; sem erro nem aviso no console. O indicador do `next dev` cobre o canto do rodapé só em desenvolvimento.
- **Regras de fora:** Pass. Identificação exata; nenhuma palavra vetada; só dados já publicados; nenhuma imagem além do monograma.

---

## Stage 9 — Walkthrough

> Data: 2026-10-09

### Resumo
- **Veredito:** WARNINGS
- **Arquivos analisados:** 13 (4 de código, 9 de documentação)
- **Findings:** 0 críticos, 1 aviso (o aviso sobre o texto do Código foi resolvido no mesmo dia)

### Checklist
| Item | Status | Observação |
|---|---|---|
| 1. Escopo | OK | Só os arquivos do Stage 4. `INSTAGRAM_HANDLE` a mais está registrado nos desvios |
| 2. Nome, "Cirurgiã-Dentista" e CRO visíveis | OK | O rodapé cumpre o caput do art. 43 do Código de Ética (nome, número de inscrição, profissão), conferido no texto do CFO |
| 2. Preço, pagamento, promoção, superlativo, crítica | OK | Nenhum no texto novo |
| 2. "Especialista" | OK | Não aparece |
| 2. Imagem de procedimento, instrumental ou material | OK | Nenhuma imagem nova; o monograma é logomarca (art. 43, § 1º, V) |
| 2. Paciente ou terceiro identificável | OK | Nenhum |
| 2. Texto inventado | OK | Só dados já publicados (D3), o texto exigido pelo art. 43 e a linha de direitos da D27 |
| 3. Next.js 16 e `"use client"` | OK | O rodapé é Server Component; os dados saíram do módulo cliente para `src/lib/contact.ts` |
| 3. Layout por proporção | n/a | O rodapé não depende de mídia; breakpoint em pixel justificado no FDD |
| 3. Vídeo (ADR 0003) | n/a | Nenhum vídeo novo |
| 4. FDD e PRD | OK | Bate com `docs/fdd/contato.md` (rodapé) e com a D26 e a D27 |
| 4. Decisão não coberta | OK | Três escolhas perguntadas ao Lucas no `/plan` e registradas |
| 4. Português do Brasil | OK | Textos da interface e docs |
| 5. Tokens | OK | `forest-900`, `light-base`, `light-15`, opacidades de `light-base`; nenhuma cor solta |
| 5. 390 px, iPad retrato, computador | OK | Conferido pelo `/exec` no MCP do Chrome DevTools (Stage 7) |
| 5. Toque, foco, contraste | OK | 44 px; contorno de 2 px; contraste medido de 7,08 a 12,89 |
| 5. Movimento | OK | Nada anima; hover só de opacidade |
| 5. `prefers-reduced-motion` | Aviso | Conferido só pelo código (aviso 2) |
| 5. Desempenho | OK | Sem mídia, sem JavaScript no cliente para o rodapé |
| 6. Lint, typecheck, build | OK | Verdes |
| 6. Commits e atribuição | OK | 12 commits pequenos, Conventional Commits, títulos até 63 caracteres, e-mail noreply, nenhuma atribuição |
| 6. Docs | OK | FDD, índice, PRD, ROADMAP, DESIGN.md e `CLAUDE.md` atualizados |

### Findings
#### Critical
- Nenhum.

#### Warnings
- ~~**Texto consolidado do Código não conferido.**~~ Resolvido em 2026-10-09. O Código em vigor é o aprovado pela Res. CFO-118/2012. A única alteração encontrada no sistema de atos do CFO é a Res. CFO-SEC-271/2025, que mexe no art. 20 (VIII e X), no art. 32 (XIII) e no art. 44 (XIV). O art. 43 continua com o texto de 2012, então a conferência do rodapé vale. O PDF do Código no site do CFO não traz a alteração de 2025. — `src/components/footer.tsx:18`
- **Movimento reduzido sem conferência no navegador.** O MCP do Chrome DevTools não emula `prefers-reduced-motion`. — `src/components/footer.tsx:51` — Sem risco prático: o rodapé não anima e só tem transição de opacidade no hover. Conferir à mão se quiser.

#### Positive
- O rodapé é Server Component, sem JavaScript. Ler os dados de um módulo neutro evita atravessar a fronteira `"use client"` do header.
- O menu nasce da mesma lista nos dois formatos, e todo destino existe na página.
- A identificação não quebra no meio de uma parte; só quebra nos separadores.
- O contraste foi medido no navegador e registrado no DESIGN.md, com a regra de nunca usar `light-40` no rodapé.
- Os desvios do plano estão registrados, inclusive o item 2 em dois commits.

### Verificações executadas
- `npm run lint`: verde.
- `npx next typegen && npx tsc --noEmit`: verde.
- `npm run build`: verde, `/` estático.
- `git log --format=%B main..HEAD | grep -i -E "co-authored|generated with"`: vazio.
- `git log --format=%ae main..HEAD`: só o e-mail noreply.
- `gitleaks git --log-opts="main..HEAD"`: 12 commits, nenhum vazamento.
- Art. 43 e art. 44 do Código de Ética lidos no PDF do CFO (`website.cfo.org.br/wp-content/uploads/2018/03/codigo_etica.pdf`).
- Res. CFO-SEC-118/2012, 196/2019 e 271/2025 lidas no sistema de atos do CFO (`sistemas.cfo.org.br/visualizar/atos/...`), para saber se o texto de 2012 continua valendo.

**Gate S9 — WARNINGS**
