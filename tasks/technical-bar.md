# Barra técnica da Fase 1

**Slug:** `technical-bar`
**Branch:** `perf/technical-bar`
**Área:** hero, Sobre (linha do tempo e vídeo do kit), layout · **Dono:** Lucas
**Status:** Execution (pausada depois do item 6; ver Stage 6)
**Gate S2:** Livre (pergunta 1 respondida em 2026-10-10: opção A)

---

## Stage 1 — Scope Analysis

### Documentos
- **PRD:** `docs/PRD.md` seção 5 (meta "Barra técnica"), seção 8 (desempenho, acessibilidade, dispositivos), seção 10 (critério da Fase 1)
- **FDD:** `docs/fdd/hero.md` (Desempenho), `docs/fdd/sobre.md` (vídeo do kit, roleta da linha do tempo). Existem; mudam na seção Desempenho
- **ADR relacionado:** `docs/adr/0003-self-hosted-video.md` decide `preload="metadata"`. Mudar o carregamento dos vídeos pede ADR nova (0004) antes do código
- **Design:** `docs/design/DESIGN.md`, se a roleta mudar de visual (pergunta 1)

### Objetivo
- Cumprir a barra técnica da Fase 1: Lighthouse no celular com LCP abaixo de 2,5 s no 4G e acessibilidade sem falha AA, conferido em 390 px, iPad retrato e computador.
- Medir antes, corrigir só o que não passa, medir de novo depois de cada correção.

### Medição de partida (2026-10-10, produção, Lighthouse 13.4.1)

| Tamanho | Modo | LCP | FCP | TBT | CLS | Acessibilidade |
|---|---|---|---|---|---|---|
| Celular (padrão do Lighthouse, 412 px) | simulado, 3 execuções | **3,2 s** nas três | 1,1 s | 60 a 200 ms | 0 | 100 |
| iPad retrato (820 × 1180) | simulado, 2 execuções | 1,8 e **2,7 s** | 1,1 e 1,2 s | 50 a 80 ms | 0 | 100 |
| Computador (preset desktop) | simulado, 2 execuções | 0,5 e 0,6 s | 0,4 e 0,5 s | 0 | 0 | **96** |
| Celular | throttling real (devtools, 4G lento e CPU 4×), 2 execuções | **4,3 s** | 2,4 s | 210 a 270 ms | 0 | — |

- **Elemento do LCP:** o poster do vídeo do hero, nos três tamanhos.
- **Celular, throttling real:** o poster tem 64 KB e leva 3,4 s para baixar. Ele divide a banda do 4G com o que começa a baixar junto: o começo dos dois vídeos (cerca de 270 KB, por `preload="metadata"`), o poster do kit (47 KB, abaixo da dobra), os scripts (cerca de 205 KB) e as três fontes (75 KB).
- **Celular, simulado:** a primeira pintura observada sai em cerca de 2,4 s. Antes dela, o agendador do React roda em cerca de 7.000 fatias entre 0,6 e 2 s, que somam cerca de 1,1 s de CPU sem throttling. O Lighthouse então soma todo esse JS ao LCP estimado.
- **Build local, throttling real:** LCP de 2,2 a 2,3 s, com ou sem preloader. Sem o preloader, a CPU na thread principal cai à metade (2,2 s para 1,1 s) e o Speed Index vai de 8,1 s para 3,7 s, mas o LCP não muda: a pintura sob o preloader conta para o LCP.
- **Experimentos que não ajudaram:** bloquear os vídeos não muda o LCP simulado (o gargalo do simulado é o JS antes da primeira pintura). Tirar o preloader também não muda o LCP.
- **Acessibilidade, computador:** a única falha é `color-contrast`. São os anos apagados da roleta da linha do tempo (`about-timeline.tsx`, opacidade de `0.14 + near × 0.86`), com 1,54:1 e 1,26:1 contra os 3:1 exigidos para texto grande. Com o `forest-700` sobre o `light-base`, o ano passa de 3:1 a partir de 60% de opacidade.
- **SEO 63:** só pelo `noindex`, que é intencional (D22) e fica fora do critério.

### Escopo e não-escopo
- **Dentro:**
  - Carregar primeiro o que pinta a primeira tela e só depois os vídeos e o que fica abaixo da dobra (ADR 0004).
  - Prioridade alta para o poster do hero.
  - Diagnóstico da rajada de trabalho do React no carregamento, e correção se for um laço de renderização.
  - Contraste dos anos da roleta, conforme a resposta à pergunta 1.
  - Medição final nos três tamanhos, registrada aqui e no PRD (seção 10).
- **Fora:**
  - Contraste da citação da band: item próprio do ROADMAP, decisão do Lucas. O Lighthouse não mede texto sobre gradiente.
  - Redesenho ou corte do preloader. O Speed Index não é critério, e o preloader não mexe no LCP. Fica registrado como custo (Speed Index de 8 s) para decisão futura.
  - Trocar o vídeo por imagem, ou mudar o enquadramento do hero.
  - SEO e `noindex` (Fase 2).
  - README (item próprio da Fase 1).

### Conteúdo e regras de fora
- Conteúdo da doutora necessário: nenhum. Nenhum texto, foto ou vídeo novo.
- Regras do CFO e do CRO-AL que tocam esta entrega: nenhuma. A mídia é a mesma, só muda quando carrega.

### Critérios de aceite (testáveis)
1. Lighthouse 13.4.1 no celular (padrão, simulado), mediana de 3 execuções na URL do deploy: LCP abaixo de 2,5 s.
2. iPad retrato (820 × 1180, simulado), mediana de 3: LCP abaixo de 2,5 s.
3. Computador (preset desktop), mediana de 3: LCP abaixo de 2,5 s, e se mantém.
4. Acessibilidade sem nenhuma auditoria AA falhando nos três tamanhos (fora `is-crawlable`, que é de SEO).
5. O poster do hero continua sendo a primeira pintura. Os vídeos tocam como antes quando aparecem na tela, com o botão de pausa (D31).
6. Com `prefers-reduced-motion`, os dois vídeos ficam no poster, inclusive o do kit.
7. Nenhuma mudança visual além da que a pergunta 1 decidir.
8. Lint, typecheck e build verdes.

### Perguntas bloqueadoras
- Nenhuma em aberto. A pergunta 1 foi respondida pelo Lucas em 2026-10-10: **opção A** (piso de 60%). A premissa de medição foi aceita junto.

### Pergunta respondida
1. **Anos apagados da roleta (computador).** No computador, a linha do tempo gira como uma roleta: o ano atual fica forte e os vizinhos ficam bem apagados (14% de opacidade nas pontas). O Lighthouse mede esses anos apagados como texto de baixo contraste e reprova a acessibilidade no computador (96). Opções:
   - **A.** Piso de 60% de opacidade nos anos vizinhos. Passa no Lighthouse. A roleta fica menos "holofote", e o sumiço nas pontas continua pela máscara que já existe.
   - **B.** Manter como está e registrar a exceção no DESIGN.md, como texto decorativo em movimento. O critério "sem falha AA" deixa de valer para a roleta, e o PRD (seção 10) muda.

### Premissas
- **Como se mede:** vale o Lighthouse no modo padrão (simulado), que é o que o PageSpeed Insights mostra, na URL do deploy (preview da branch; produção depois do merge), mediana de 3. O modo com throttling real (devtools) serve só de diagnóstico. A premissa vai para o PRD, seção 5.
- **iPad retrato:** 820 × 1180 com DPR 2.
- **Preview protegido:** se o preview da Vercel exigir login e o Lighthouse não abrir, mede-se o build local (`npm run build && npm start`) com throttling real como aproximação, e a medição oficial fica para a produção depois do merge.

---

## Stage 2 — Evidence Gathering

| Arquivo | Evidência |
|---|---|
| `docs/PRD.md` | Seção 5: barra técnica com LCP abaixo de 2,5 s no 4G. Seção 8: "Vídeo do hero com poster como primeira pintura". Seção 10: item da Fase 1 em aberto |
| `docs/adr/0003-self-hosted-video.md` | `preload="metadata"`. "Peso de vídeo entra na conta do LCP; o poster precisa ser leve" |
| `docs/fdd/hero.md` | Desempenho: poster é o LCP; vídeo só com metadados |
| `src/components/hero.tsx` | `<video preload="metadata" poster>` com duas fontes. Poster de 1920 × 1080, 64 KB |
| `src/components/video-toggle.tsx` | `useLoopWhileVisible`: `play()` assim que o vídeo tem 40% na tela, logo na hidratação. No celular, o hero já está na tela, então o vídeo de 2 MB começa a baixar na hora |
| `src/components/about-timeline.tsx` | Vídeo do kit com `preload="metadata"` e poster de 720 × 1280 (47 KB), longe da dobra. Roleta: `year.style.opacity = 0.14 + near × 0.86` |
| `src/app/layout.tsx` | Três fontes do `next/font` com preload (Instrument Serif normal e itálico, Inter Tight) |

### Fluxo atual
1. O HTML chega e o navegador pede de uma vez: CSS, três fontes (prioridade alta), poster do hero (alta), poster do kit (média), o começo dos dois vídeos (baixa) e os scripts (baixa).
2. No 4G, tudo divide a mesma banda; o poster do hero, que é o LCP, termina de baixar em cerca de 3,4 s.
3. Na hidratação, o hero já está na tela e o `play()` dispara o download completo do vídeo (cerca de 1,8 MB), ainda durante o carregamento.
4. O preloader cobre a tela por 2,9 s, e a pintura embaixo dele já conta para o LCP.

---

## Stage 3 — Architecture Planning

### Source of Truth (até 4 blocos)
1. **ADR 0004 (nova):** ordem de carregamento dos vídeos. Substitui o `preload="metadata"` da ADR 0003.
2. **`src/components/video-toggle.tsx`:** o único lugar que decide quando um vídeo carrega e toca, usado pelo hero e pelo kit.
3. **`src/app/page.tsx`:** preload do poster do hero com `ReactDOM.preload(..., { as: "image", fetchPriority: "high" })`, o caminho que a doc do Next 16 indica para `<link rel="preload">`.
4. **`src/components/about-timeline.tsx`:** piso de opacidade da roleta, se a resposta for A.

### Decisão única
- Primeiro, o que pinta a primeira tela: HTML, CSS, fontes e o poster do hero, com prioridade alta. Os vídeos começam com `preload="none"`. O do hero só carrega depois do evento `load` da página. O do kit e o poster dele só carregam quando chegam perto da tela. O poster continua sendo a primeira pintura, e a mídia não muda.

### Checklist de arquitetura (até 10)
- [ ] ADR 0004 escrita antes do código; ADR 0003 marcada como parcialmente substituída.
- [ ] Nenhuma dependência nova; Next 16, preload pelo `ReactDOM.preload` (doc lida em `node_modules/next/dist/docs/`).
- [ ] O carregamento adiado vive no hook compartilhado, não duplicado em cada vídeo.
- [ ] Movimento reduzido: os vídeos não carregam nem tocam, e o poster aparece, inclusive o do kit, que é carregado ao chegar perto da tela mesmo sem movimento.
- [ ] O botão de pausa continua surgindo só depois que o vídeo tocou de fato (D31).
- [ ] Sem mudança de layout. Os quadros dos vídeos já têm tamanho fixo (`h-[100svh]`, `aspect-[9/16]`), então o CLS fica em 0.
- [ ] Animação só em `transform` e `opacity`: nada novo anima.
- [ ] A rajada de trabalho do React é diagnosticada no build local, com o profiler, antes de qualquer mudança nela. Só se corrige com causa achada.
- [ ] Roleta: o piso de opacidade só muda se a resposta for A, e o DESIGN.md acompanha.
- [ ] Medição depois de cada correção, nos três tamanhos, com números registrados no Stage 7.

---

## Stage 4 — Execution Planning

1. [ ] `docs(adr)`: ADR 0004, carregamento adiado dos vídeos e prioridade do poster do hero; ADR 0003 com status atualizado.
2. [ ] `perf(hero)`: preload do poster do hero com prioridade alta em `page.tsx`.
3. [ ] `perf(video)`: `preload="none"` nos dois vídeos. O hook carrega o do hero depois do `load` da página, e o do kit perto da tela. O poster do kit é atribuído só ao chegar perto da tela. Medir.
4. [ ] `perf`: diagnóstico das cerca de 7.000 fatias do agendador do React na carga, no build local com o profiler. Corrigir se for laço de renderização, com a causa na mensagem do commit. Medir. Se não for laço, registrar o achado e seguir.
5. [ ] `perf`, só se o LCP ainda não passar: poster do hero mais leve (mesma resolução, qualidade menor, sem metadado) ou `preload: false` na fonte que não está na primeira tela. Medir.
6. [ ] `fix(a11y)`: piso de 60% de opacidade nos anos da roleta (opção A).
7. [ ] Medição final: 3 execuções em cada tamanho (celular, iPad retrato, computador), mais a conferência manual de movimento reduzido. Números no Stage 7.
8. [ ] `docs`:
   - FDD do hero e FDD do Sobre: seção Desempenho.
   - DESIGN.md: roleta (resposta A) ou exceção (resposta B).
   - PRD: premissa de medição na seção 5 e item da Fase 1 na seção 10.
   - ROADMAP: item da barra técnica.

---

## Stage 5 — Plan Verification

- [x] Regras nas camadas certas (carregamento no hook compartilhado, preload no Server Component da página, decisão técnica em ADR)
- [x] FDD existe ou está no checklist (hero e Sobre existem; Desempenho atualizado no item 8)
- [x] Decisão de produto coberta pelo PRD ou pergunta aberta: pergunta 1 respondida (opção A); vira decisão no PRD no item 8
- [x] Checklist ≤ 10, SoT ≤ 4, decisão única, evidências ≤ 7

**Gate S2:** Livre (2026-10-10).

---

## Stage 6 — Code Execution

Execução pausada em 2026-10-10 depois do item 6, para medir na Vercel (ver "Pausa").

| # | Camada | Arquivo | Status |
|---|---|---|---|
| 1 | Docs | `docs/adr/0004-deferred-video-loading.md` (novo), `docs/adr/0003-self-hosted-video.md` (nota e status), `docs/adr/README.md`, `CLAUDE.md` (stack) | feito (`da27623`) |
| 2 | Dados e página | `src/lib/media.ts` (novo), `src/app/page.tsx`, `src/components/hero.tsx` | feito (`9c9c4b5`) |
| 3 | Componentes | `src/components/video-toggle.tsx`, `src/components/hero.tsx`, `src/components/about-timeline.tsx` | feito (`50a9749`) |
| 4 | Diagnóstico | sem arquivo de código | feito: achado abaixo |
| 5 | Mídia ou fontes | — | não feito; depende da medição na Vercel |
| 6 | Componentes | `src/components/about-timeline.tsx` | feito (`010a56f`) |
| 7 | Medição | — | local feita (Stage 7); oficial pendente |
| 8 | Docs | FDDs, DESIGN.md, PRD, ROADMAP | pendente |

### Desvios do plano
- **Item 3:** o poster do kit virou `next/image` preguiçoso atrás do vídeo, em vez de ser atribuído por JavaScript perto da tela. Assim funciona sem JS e entrega o tamanho de exibição. Registrado na ADR 0004.
- **Item 4:** não há laço de renderização. No build local, o agendador do React roda 42 vezes na carga, contra cerca de 7.000 em produção. Em produção, a rajada coincide com dois scripts que chegaram em cerca de 1,4 s. Nada a corrigir no código por esse caminho.

### Pausa: o que a medição mostrou
- **Como o Lighthouse estima o LCP** (lantern, `LargestContentfulPaint.js`): entra na conta todo recurso que terminou de baixar antes da primeira pintura observada. Numa carga sem throttling, os scripts (cerca de 200 KB) chegam e rodam antes dessa pintura. O JS inteiro entra, e com 4G simulado o LCP fica em cerca de 3,2 s.
- **Prova, no build local:**
  - Com o JS bloqueado, o LCP simulado cai para 2,3 s.
  - Bloquear as fontes ou as imagens não muda nada (3,2 s).
  - Bloquear o poster dá 3,0 s, porque o LCP passa para o título.
  - Sem o preloader, o LCP não muda.
- **Produção:** o PageSpeed Insights do Google, sobre a `main` atual, dá LCP de 3,2 s, FCP de 1,2 s e Speed Index de 6,4 s. Bate com as medições locais.
- **Preview:** o preview da Vercel pede login (SSO), então o Lighthouse não abre e as mudanças não foram medidas em condição de produção.
- **Projeção:** o local caiu de 3,6 para 3,2 s, e a produção de partida era 0,4 s menor que o local. Se essa diferença se mantiver, a produção fica perto de 2,8 s, o que ainda não passa. É estimativa, não medição.
- **Próximo passo, se não passar:** diminuir o JS que chega antes da primeira pintura, que é o que pesa. Isso muda a arquitetura de movimento (ADR 0002) e pede decisão do Lucas.

---

## Stage 7 — Tests

Medição local, `npm run build && npm start`, Lighthouse 13.4.1, mediana de 3, depois do item 6:

| Tamanho | LCP | FCP | TBT | CLS |
|---|---|---|---|---|
| Celular, simulado | 3,21 s (era 3,6 local) | 0,76 s | 37 ms | 0 |
| iPad retrato, simulado | 3,21 s | 0,76 s | 38 ms | 0 |
| Computador | 0,70 s | 0,21 s | 0 | 0 |
| Celular, throttling real (devtools) | 2,20 s (era 2,2 a 2,3 local) | 1,92 s | 195 ms | 0,014 |

| Critério de aceite | Como foi verificado |
|---|---|
| 1. Celular, LCP abaixo de 2,5 s | **Não verificado em produção.** Local simulado: 3,21 s |
| 2. iPad, LCP abaixo de 2,5 s | **Não verificado em produção.** Local simulado: 3,21 s |
| 3. Computador abaixo de 2,5 s | Local: 0,70 s |
| 4. Acessibilidade sem falha AA | Lighthouse local: 100 no celular, no iPad e no computador, sem nenhuma auditoria falhando |
| 5. Poster como primeira pintura; vídeos tocam com o botão | Navegador (MCP), 390 px: o hero toca depois do `load`, com o botão; o kit toca ao aparecer, com o botão; o hero pausa fora da tela. O preload do poster sai no HTML com `fetchPriority="high"` |
| 6. Movimento reduzido no poster | Pelo código: o `attempt()` continua barrado por `stillness.matches`, e o poster do kit é um `next/image` que não depende de movimento. Falta o teste num aparelho com a preferência ligada |
| 7. Mudança visual só na roleta | Computador, 1440 × 900: anos fora de foco entre 0,6 e 1 de opacidade; o sumiço nas pontas continua pela máscara |
| 8. Lint, typecheck e build | verdes depois de cada item |

---

## Stage 8 — Verification

*(Preenchido pelo exec.)*

- **lint:** Pass
- **typecheck:** Pass
- **test:** n/a
- **build:** Pass
- **Navegador (390 px e computador):** Pass para o comportamento (vídeos, poster do kit, roleta). O critério de LCP em produção está pendente

---

## Stage 9 — Walkthrough

*(Preenchido pelo walkthrough.)*
