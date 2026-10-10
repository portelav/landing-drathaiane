# Pausa dos vídeos em loop

**Slug:** `video-pause-control`
**Branch:** `feat/video-pause-control`
**Área:** hero (vídeo da recepção), Sobre (vídeo do kit) · **Dono:** Lucas
**Status:** Walkthrough
**Gate S2:** Livre

---

## Stage 1 — Scope Analysis

### Documentos
- **PRD:** seção 5 (WCAG 2.2 AA), seção 6 (Hero e Sobre), seção 10, Fase 1 ("Vídeos em loop (hero e kit) com controle de pausa acessível (WCAG 2.2.2)"), D21
- **ROADMAP:** Fase 1, "Pausa dos vídeos em loop"
- **ADR relacionado:** `docs/adr/0003-self-hosted-video.md`. Nas consequências, já diz que vídeo que se repete por mais de 5 s precisa de pausa e para quando sai da tela. Não muda.
- **FDD:**
  - `docs/fdd/sobre.md`, seção "O vídeo": existe e muda.
  - `docs/fdd/hero.md`: não existe. O `docs/fdd/README.md` diz que preloader, header e hero "ganham um quando forem revistos", e este plano revê o hero. Será escrito neste plano.
- **DESIGN.md:** seção 5 (forma), seção 6 (movimento, com a nota da pausa pendente) e seção 7 (componentes)

### Objetivo
- Os dois vídeos em loop passam a ter um jeito de pausar na própria página, como pede o critério 2.2.2 da WCAG, de nível A. Rodam enquanto estão na tela e param quando saem dela.

### Decisões do Lucas (2026-10-10)
1. **Os dois vídeos continuam em loop enquanto estão na tela:** a recepção, no hero, e o kit, no Sobre. Param quando saem da tela.
2. **Cada vídeo ganha um botão de pausa discreto** no canto do vídeo. A outra saída seria tirar o botão da recepção e assumir a falha no PRD; ele preferiu o botão.
3. **O visual é um ícone num quadrado claro de 32 px, sem cantos arredondados:** duas barras para pausar, triângulo para reproduzir. Escolhido entre três opções desenhadas (ícone em quadrado, ícone em círculo, texto em caixa-alta).

### Triagem
1. **Seções:** hero e Sobre (linha do tempo). Nenhum conteúdo da doutora é necessário. Os rótulos do botão são texto de interface, como "Role para conhecer".
2. **Regras de fora:** nenhuma é tocada. Os vídeos são os mesmos e não entra mídia nova.
3. **Trivial?** Não: há uma peça nova, dois componentes, dois FDDs e uma decisão de produto.
4. **Stack ou arquitetura:** não muda. O ADR 0003 já prevê pausa e parada fora da tela. É um Client Component novo, sem dependência nova.
5. **PRD:** cobre o critério (seção 10). As decisões de 2026-10-10 entram como D31.
6. **ROADMAP:** está, Fase 1.

### Escopo e não-escopo
- **Dentro:**
  - **Peça compartilhada `src/components/video-toggle.tsx`:** um hook que toca o vídeo em loop enquanto ele está na tela e o pausa fora dela, respeitando `prefers-reduced-motion` e a pausa pedida pela pessoa; e o botão `VideoToggle`.
  - **Hero:** o efeito de reprodução atual sai, e entram o hook e o botão no canto inferior direito do quadro do vídeo.
  - **Linha do tempo:** o efeito com `IntersectionObserver` sai, e entram o hook e o botão no canto inferior direito do vídeo do kit.
  - **FDD do hero (novo)**, escrito a partir do que existe, sem conteúdo novo. Atualizar o `sobre.md` e o índice de FDDs.
  - **Docs:** DESIGN.md, PRD (D31 e critério), ROADMAP e `CLAUDE.md` (estrutura do código).
  - **Status Done dos planos já mergeados:**
    - `small-label-contrast`: PR #5.
    - `roles-prices-cfo-rules`: PR #4.
    - `go-public`: todos os itens feitos; repositório público desde 2026-10-09.
- **Fora:**
  - Botão global de "parar todo movimento".
  - Pausa das peças dirigidas por scroll (hero abrindo, band, roleta). Elas só se mexem quando a pessoa rola, e o critério 2.2.2 trata do que se mexe sozinho.
  - Lembrar a escolha entre visitas (sem `localStorage`).
  - Trocar os vídeos, mudar o peso deles ou o poster.

### Conteúdo e regras de fora
- Conteúdo da doutora necessário: nenhum.
- Regras do CFO e do CRO-AL: nenhuma em conflito. Não entra imagem, vídeo nem texto de publicidade novo.

### Comportamento (a spec que os FDDs vão registrar)
1. **Na tela, toca em loop.** Conta como "na tela" quando 40% do vídeo está visível, o mesmo limite que o kit já usa.
2. **Fora da tela, pausa.** De volta à tela, retoma de onde parou, a menos que a pessoa tenha pausado.
3. **A pausa da pessoa vale até ela tocar em reproduzir,** mesmo que role para longe e volte. Vale só durante a visita.
4. **Com `prefers-reduced-motion`, o vídeo não toca:** fica o poster, e o botão não aparece, porque não há o que pausar. Se a preferência mudar com a página aberta, o comportamento acompanha, como o hero já faz.
5. **Se o navegador recusar tocar** (modo de economia de bateria ou de dados), fica o poster e o botão não aparece. O botão só surge depois que o vídeo tocou de fato.
6. **O vídeo continua decorativo:** `aria-hidden`, sem foco, sem os controles do navegador. O botão é o único controle.
7. **Botão:**
   - **Desenho:** quadrado claro de 32 px, sem raio, com ícone escuro, no canto inferior direito do vídeo.
   - **Toque:** área de 44 × 44 px.
   - **Teclado:** responde a Enter e a Espaço, e o foco fica visível.
   - **Nome para leitor de tela:** "Pausar o vídeo da recepção" ou "Reproduzir o vídeo da recepção" no hero; "Pausar o vídeo do kit de higiene" ou "Reproduzir o vídeo do kit de higiene" no Sobre.
8. **O botão não anima.** O hover é só de opacidade, 300 ms, como os links do header e do rodapé.

### Critérios de aceite (testáveis)
1. Em 390 px, iPad retrato e computador, cada vídeo toca enquanto está na tela e pausa quando sai. Verificado por `video.paused` rolando a página.
2. O botão de cada vídeo fica no canto inferior direito, com desenho de 32 px e área de toque de 44 × 44 px ou mais, medida pela caixa do elemento.
3. Clique, toque, Enter e Espaço alternam entre pausar e reproduzir, e o nome acessível muda junto (critério 7 do comportamento).
4. Com o vídeo pausado pelo botão, rolar para longe e voltar não o faz tocar sozinho. "Reproduzir" volta ao loop.
5. O foco é visível sobre o vídeo. O ícone tem 3:1 ou mais contra o quadrado, medido.
6. Com `prefers-reduced-motion`, o vídeo fica no poster e não há botão.
7. O vídeo continua com `aria-hidden` e sem controles do navegador. Na ordem do Tab, o botão do hero vem depois do texto do hero, e o do kit depois da lista da linha do tempo.
8. A abertura do hero pelo scroll (`objectPosition`, faixa "seu sorriso, no seu tempo") não muda. O botão não cobre a faixa, o header nem o texto, nos três tamanhos.
9. Lint, typecheck e build verdes.

### Perguntas bloqueadoras
- Nenhuma. Visual e comportamento foram decididos pelo Lucas em 2026-10-10.

### Premissas
- O limite de 40% vale para os dois vídeos. No hero, o quadro ocupa a tela inteira no celular e metade dela no computador, no topo da página, então toca desde a chegada.
- O MCP do Chrome DevTools não simula `prefers-reduced-motion`. O critério 6 é conferido no código e fica como teste manual para o Lucas no preview, com "reduzir movimento" ligado no aparelho.
- O caso do navegador que recusa tocar (critério 5 do comportamento) também é conferido no código, porque não dá para simulá-lo pelo MCP.

---

## Stage 2 — Evidence Gathering

| Arquivo | Evidência |
|---|---|
| `docs/fdd/sobre.md` | Seção "O vídeo": kit de 5,9 s. A nota de 2026-10-09 registra a volta do loop (6068291), com pausa fora da tela, e diz que "falta um controle de pausa (WCAG 2.2.2)" |
| `docs/fdd/README.md` | "Preloader, header e hero foram construídos antes desta regra e não têm FDD; ganham um quando forem revistos" |
| `docs/PRD.md` | Seção 6: Hero com FDD "(anterior ao kickoff)". Seção 10: critério da pausa, ainda aberto. Última decisão: D30 |
| `docs/adr/0003-self-hosted-video.md` | "Vídeo que se repete por mais de 5 s precisa de pausa (WCAG 2.2.2) e para quando sai da tela" |
| `src/components/hero.tsx` | O efeito das linhas 86 a 118 toca ao montar, tenta de novo no `canplay` até três vezes e acompanha a mudança de `prefers-reduced-motion`. **Não pausa fora da tela.** O efeito de scroll usa o mesmo `videoRef` para mudar o `objectPosition`. O vídeo tem `loop`, `aria-hidden`, `tabIndex={-1}` e fica dentro do quadro `frameRef` (`relative overflow-hidden`), junto do véu e do gradiente |
| `src/components/about-timeline.tsx` | As linhas 76 a 101 usam um `IntersectionObserver` com limite de 0,4 que toca e pausa. Com movimento reduzido, não toca, mas não acompanha mudança da preferência e não tenta de novo. O vídeo fica num `div` de largura 82% (ou 30% no `beside:`) e tem `loop`, `aria-hidden` e `tabIndex={-1}` |
| `docs/design/DESIGN.md` | Seção 5: "quase sem raio". Seção 6: linha "Vídeo do kit" e a nota "Hoje o vídeo do hero e o do kit não têm controle; item no ROADMAP". Seção 7: a tabela de componentes não tem controle de vídeo |

### Fluxo atual
- **Recepção (13,4 s, `hero.mp4`):** toca em loop desde o carregamento e continua tocando fora da tela. Sem controle.
- **Kit (5,9 s, `kit.mp4`):** toca em loop com 40% na tela e pausa fora dela. Sem controle.
- **Com movimento reduzido:** os dois ficam no poster. Só o hero acompanha a mudança da preferência com a página aberta.

---

## Stage 3 — Architecture Planning

### Source of Truth
1. **Comportamento:** `docs/fdd/hero.md` (novo) e `docs/fdd/sobre.md`, seção "O vídeo", com a regra do Stage 1 ("Comportamento"). Decisão no PRD, D31.
2. **Peça `src/components/video-toggle.tsx`** (`"use client"`):
   - `useLoopWhileVisible(videoRef)` reúne o que hoje está duplicado e diferente nos dois componentes: observador de 40%, `prefers-reduced-motion` com escuta de mudança, nova tentativa no `canplay` e pausa da pessoa. Devolve o estado (tocou, pausado pela pessoa) e a função de alternar.
   - `VideoToggle` é o botão: nome acessível, ícone em SVG próprio, área de toque de 44 px e quadrado de 32 px.
3. **Uso:** `hero.tsx` e `about-timeline.tsx` trocam o efeito de reprodução pelo hook e põem o botão dentro do contêiner do vídeo, que já é `relative` ou passa a ser. O `<video>` continua onde está, porque o hero precisa do `ref` para o `objectPosition`.
4. **Visual:** tokens existentes. Quadrado `bg-light-base/85`, ícone `dark-base`, contorno de foco `dark-base` encostado no quadrado claro. Sem raio, sem sombra, sem desfoque: no computador, o botão anda com o canto do quadro enquanto o hero abre, e desfoque em elemento que se move é exceção.

### Decisão única
- Um hook e um botão compartilhados, usados pelos dois vídeos, no lugar de dois efeitos parecidos que já divergem: o kit não tenta de novo nem escuta a preferência, e o hero não pausa fora da tela. Assim, o comportamento do Stage 1 vale igual para os dois, e um vídeo futuro herda tudo pelo mesmo caminho (ADR 0003, "todo vídeo novo passa pelo mesmo processo").
- Por que não um componente `<LoopingVideo>` que renderiza o próprio `<video>`: o hero mexe no `objectPosition` do vídeo a cada quadro do scroll e precisa do elemento na mão. Com o hook, cada componente continua dono do seu `<video>`.

### Checklist de arquitetura
- [x] Stack: Client Component só onde há estado e efeito (os dois arquivos já são `"use client"`). Nenhuma API do Next é tocada, e nenhuma dependência entra.
- [x] Layout por proporção: o botão é posicionado dentro do contêiner do vídeo, que já segue `wide:` e `beside:`. Nenhum breakpoint novo em pixel.
- [x] Interface: rótulos em pt-BR; toque de 44 px; foco visível; conferir em 390 px, iPad retrato e computador.
- [x] Movimento: nenhum novo. O botão não anima, e o hover é só de opacidade.
- [x] Pausa do que se mexe sozinho por mais de 5 s: é o objetivo desta entrega, nos dois vídeos.
- [x] `prefers-reduced-motion`: o estado final continua o poster, sem botão, e agora a mudança da preferência é acompanhada nos dois vídeos.
- [x] Não cria momento dirigido por scroll.
- [x] Regras de fora: nenhuma mídia nova.
- [x] Vídeo segue decorativo (`aria-hidden`), e o controle fica fora dele, então o leitor de tela encontra só o botão.
- [x] O efeito de scroll do hero continua dono do `objectPosition`. O hook só chama `play` e `pause`.

---

## Stage 4 — Execution Planning

Um commit cada, nesta ordem.

1. [x] **FDD do hero** (`docs/fdd/hero.md`, status `aprovado`), escrito a partir do código e do DESIGN.md, no template de seção: objetivo, conteúdo existente, comportamento (estreito e `wide:`), movimento, regras, acessibilidade com a pausa, desempenho e critérios. Sem conteúdo novo. Índice em `docs/fdd/README.md`. `docs(fdd): document the hero and its video pause`
2. [x] **FDD do Sobre**, seção "O vídeo": loop na tela, pausa fora, botão; a nota de 2026-10-09 vira histórico resolvido. `docs(fdd): record the kit video pause control`
3. [x] **Peça `src/components/video-toggle.tsx`**: hook `useLoopWhileVisible` e botão `VideoToggle`, com comentário curto do porquê (WCAG 2.2.2, bateria). `feat(video): add a shared loop-while-visible hook and pause button`
4. [x] **Hero**: trocar o efeito das linhas 86 a 118 pelo hook; botão no canto inferior direito do quadro, acima do véu e do gradiente. `feat(hero): pause the reception video off screen and on demand`
5. [x] **Linha do tempo**: trocar o efeito das linhas 76 a 101 pelo hook; contêiner do vídeo `relative`; botão no canto inferior direito. `feat(about): add the pause control to the kit video`
6. [x] **Navegador** (sem commit), pelo MCP do Chrome DevTools em 390 px, iPad retrato e computador: critérios 1 a 5, 7 e 8; contraste do ícone; captura do botão nos dois vídeos. O critério 6 fica conferido no código.
7. [x] **DESIGN.md**:
   - seção 5: o botão como peça sem raio;
   - seção 6: linha "Vídeo da recepção" e a do kit atualizada, e a nota da pausa pendente trocada pela regra;
   - seção 7: `VideoToggle` e os estados do `Hero`.

   `docs(design): record the video pause control`
8. [x] **PRD, ROADMAP e `CLAUDE.md`**:
   - PRD: D31 com as decisões de 2026-10-10, critério da seção 10 marcado, e na seção 6 o Hero aponta para o FDD;
   - ROADMAP: a linha aponta para este arquivo;
   - `CLAUDE.md`: `video-toggle` na estrutura do código.

   `docs: record the video pause decision`
9. [x] **Planos já mergeados como Done**: `small-label-contrast` (PR #5), `roles-prices-cfo-rules` (PR #4) e `go-public` (repositório público em 2026-10-09). `docs(tasks): mark merged plans as done`
10. [x] **Verificação**: lint, typecheck e build; Stages 6 a 8 deste arquivo; FDDs como `implementado`. `docs(tasks): record video-pause-control execution`

---

## Stage 5 — Plan Verification

- [x] Regras nas camadas certas: comportamento nos FDDs; decisão no PRD (D31); visual no DESIGN.md; lógica numa peça compartilhada; uso nos dois componentes.
- [x] FDD: o do Sobre existe e é atualizado; o do hero é escrito no item 1, antes do código, como pede o `docs/fdd/README.md`.
- [x] Decisão de produto: tomada pelo Lucas em 2026-10-10 (loop na tela, pausa fora, botão nos dois, ícone em quadrado) e registrada no PRD.
- [x] Checklist com 10 itens, SoT com 4 blocos, decisão única, 7 arquivos de evidência.
- [x] Nenhum conteúdo da doutora e nenhuma regra de fora tocados.

**Gate S2:** Livre

---

## Stage 6 — Code Execution

| # | Camada | Arquivo | Status |
|---|---|---|---|
| 1 | FDD | `docs/fdd/hero.md` (novo), `docs/fdd/README.md` | Feito (`2cdbd6f`); status `implementado` em `fe03afe` |
| 2 | FDD | `docs/fdd/sobre.md`, seção "O vídeo" | Feito (`8ac9a49`) |
| 3 | Componente | `src/components/video-toggle.tsx` (novo): `useLoopWhileVisible` e `VideoToggle` | Feito (`998c80a`) |
| 4 | Componente | `src/components/hero.tsx` | Feito (`05f0f0f`) |
| 5 | Componente | `src/components/about-timeline.tsx` | Feito (`59c2d3b`) |
| 6 | Navegador | sem commit | Feito |
| 7 | Docs | `docs/design/DESIGN.md`, seções 3, 5, 6 e 7 | Feito (`f81bcfb`) |
| 8 | Docs | `docs/PRD.md` (D31, seção 6, seção 10), `docs/ROADMAP.md`, `CLAUDE.md` | Feito (`e679d85`) |
| 9 | Docs | `tasks/small-label-contrast.md`, `tasks/roles-prices-cfo-rules.md`, `tasks/go-public.md` | Feito (`da2e1fa`) |
| 10 | Docs | este arquivo, Stages 6 a 8 | Feito |

### Desvios do plano
- **Nome do botão do hero: "do consultório", não "da recepção".** Antes de escrever o FDD, conferi quadros do vídeo: o tríptico mostra a recepção, a copa e uma sala de atendimento, não só a recepção. "Pausar o vídeo do consultório" descreve o que aparece. O título do commit `05f0f0f` ainda diz "reception video".
- **O observador do kit não respeitava os 40%.** O código antigo usava `threshold: 0.4` com `entry.isIntersecting`. Isso continua verdadeiro com qualquer pedaço do vídeo na tela, então na prática ele tocava ao primeiro pixel. A peça nova observa `[0, 0,4]` e decide pela razão (`intersectionRatio >= 0,4`).
- **Contraste do ícone no DESIGN.md.** A medida estava prevista no item 6 e foi registrada na tabela da seção 3, no item 7.
- **Critério de movimento reduzido do FDD do hero ficou desmarcado.** Foi conferido no código, mas falta o teste num aparelho.
- **Servidor de desenvolvimento antigo.** O `next dev` da entrega anterior continuava rodando na porta 3000 (o `TaskStop` parou o `npm`, mas não o `node` filho). Os testes usaram esse servidor, que recarrega o código atual. No fim, os dois processos foram parados.
- **Status do FDD numa entrega à parte.** A troca para `implementado` saiu num commit próprio (`fe03afe`) antes do item 10, em vez de junto com ele.

---

## Stage 7 — Tests

Medido no navegador pelo MCP do Chrome DevTools, com `next dev`, em 390×844 (celular, toque), 1024×1366 (iPad retrato, toque) e 1440×900 (computador). Estado dos vídeos lido por `video.paused`, `currentTime` e a fração visível de cada um.

| Critério de aceite | Como foi verificado |
|---|---|
| 1. Toca na tela, pausa fora | Nos três tamanhos: o hero toca no topo (no celular, 44% visível já basta) e ao longo da pista do `wide:`; descendo até o kit, o hero pausa e o kit toca; voltando, o kit pausa e o hero retoma de onde parou (0,6 s para 2,1 s) |
| 2. Canto inferior direito, 32 px e 44 × 44 px | Caixa do botão de 44×44 e quadrado de 32×32 nos dois vídeos, a 8 px da borda direita e da de baixo do contêiner. No computador, o botão do hero fica em (1373, 848) a (1417, 892), dentro do quadro |
| 3. Clique, toque, Enter e Espaço | Clique real pelo MCP no computador; clique por script no celular; Enter e Espaço pelo teclado com foco no botão. Os quatro alternam, o nome muda entre "Pausar o vídeo do consultório" e "Reproduzir o vídeo do consultório", e o ícone muda junto. Espaço não rola a página |
| 4. Pausa da pessoa persiste | Pausado pelo botão, rolar até o kit e voltar mantém o hero pausado e com "Reproduzir". O botão de novo volta ao loop |
| 5. Foco visível; ícone 3:1 | Captura em 390 px com foco: contorno escuro por dentro do quadrado claro. Ícone contra o quadrado, os dois a 80% sobre qualquer quadro: 8,45 (vídeo branco) a 10,31 (vídeo preto). Com foco ou hover: 15,68 |
| 6. Movimento reduzido: poster, sem botão | Conferido no código: `sync()` pausa, volta ao início e põe `playable` em falso; a escuta de `change` acompanha a mudança com a página aberta. Não emulado (o MCP não simula a preferência); fica o teste manual no preview |
| 7. Vídeo decorativo; ordem do Tab | `aria-hidden="true"`, `tabIndex` -1 e `controls` falso nos dois. Árvore de acessibilidade: o botão do hero vem depois de "Role para conhecer" e antes da band; o do kit vem depois da lista da linha do tempo |
| 8. Abertura do hero intacta; nada coberto | No iPad e no computador, em 0%, 30%, 60% e 100% da pista: o botão não cruza a linha de exibição, o texto nem o header, e é o elemento do topo no seu ponto (`elementFromPoint`). Capturas no celular e no computador |
| 9. Lint, typecheck e build | Ver Stage 8 |

---

## Stage 8 — Verification

- **lint:** Pass (`npm run lint`, saída 0)
- **typecheck:** Pass (`npx next typegen && npx tsc --noEmit`, saída 0)
- **test:** n/a (o projeto não tem testes)
- **build:** Pass (`npm run build`, `/` estático)
- **Navegador (390 px, iPad retrato e computador):** Pass nos critérios 1 a 5, 7 e 8. O critério 6 foi conferido só no código. Só a aba aberta pelo MCP foi fechada.

---

## Stage 9 — Walkthrough

*(Preenchido pelo walkthrough.)*
