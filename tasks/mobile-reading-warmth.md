# Leitura no celular e calor humano

**Branch:** `feat/mobile-reading-warmth` · **Status:** Em execução

## Objetivo
- Testar no site os itens da análise comparativa de sites de cirurgiões-dentistas (2026-10-28): leitura no celular, calor humano e caminho até o WhatsApp. A forma saiu de um protótipo em 390 px aprovado pelo Lucas (2026-10-29).

## Escopo
- **Dentro:**
  - **Sobre:** abaixo do `sm`, só o primeiro parágrafo e um botão discreto "Leia mais". Aberto, o botão vai para o fim do texto como "Leia menos"; ao fechar, a página volta ao primeiro parágrafo. Do `sm` para cima, o texto inteiro, sem botão. Nenhuma palavra muda.
  - **Contato:** título "O que esperar e como chegar". Primeira consulta antes de Como chegar. "Dura em média 90 minutos." sai. A foto das sacolas (`IMG_8682 2`, 3:4, inteira) abre a Primeira consulta. O retrato (`IMG_5963 2`) fica antes do botão "Chamar no WhatsApp", no estilo do botão de Serviços. "Quer conversar antes de marcar?" sai.
  - **Header:** além de voltar ao rolar para cima, volta quando a rolagem para por cerca de 0,4 s, menos com o hero, a band ou a linha do tempo sob o header.
  - O fix da animação dos `<details>` (`0a1804c`), que já está na branch.
- **Fora:** foto do congresso; frase em destaque e parágrafo maior no Sobre; botão flutuante (descartado); o resto da lista "9 a 10".

## Conteúdo e regras de fora
- Conteúdo dela: as fotos chegaram em 2026-10-29 e o texto não muda. A duração sai por decisão do Lucas.
- Regras que tocam:
  - Só ela aparece nas fotos, e ninguém mais é identificável.
  - Nenhuma imagem de procedimento (Res. 196/2019, art. 3º).
  - Texto e `alt` das sacolas sem "brinde", "grátis" ou preço (CEO, art. 20, VIII, e art. 44, I).
  - Nome e CRO na imagem (Res. 196/2019, art. 4º): mesmo tratamento das fotos atuais, na revisão D30.
- Repo público: as fotos entram sem metadados (EXIF e XMP da Canon e do Lightroom). Nenhuma tem GPS.

## Critérios de aceite
1. Em 390 px, o Sobre mostra um parágrafo e "Leia mais". Tocar abre o resto com a mesma subida por linha. "Leia menos" fecha e traz o primeiro parágrafo de volta à tela. Botão com 44 px, foco visível e `aria-expanded`.
2. No iPad em pé e no computador, o Sobre aparece inteiro, sem botão.
3. O Contato segue a ordem: título novo, Primeira consulta (foto e 4 etapas), Como chegar, perguntas frequentes, retrato e botão. A duração e a frase saíram.
4. As duas fotos passam pelo `next/image`, com `sizes` certo e carregamento preguiçoso, sem metadados (conferido com o sharp). O retrato não toma a coluna inteira no computador.
5. O header volta cerca de 0,4 s depois que a rolagem para. Com o hero, a band ou a linha do tempo sob ele, só volta ao rolar para cima, como hoje. Funciona com o Lenis e com o toque no celular.
6. Com movimento reduzido, tudo funciona e nada desliza: o texto só aparece e o header volta sem animação.
7. Lint, typecheck e build passam. Conferido em 390 px, iPad em pé e computador, e no celular dele pelo Wi-Fi.

## Arquivos
- `public/images/primeira-consulta.webp` e `public/images/dra-thaiane-retrato.webp`: as fotos novas, já limpas.
- `src/components/about-text.tsx`: o "Leia mais" no celular.
- `src/components/contact-section.tsx`: título, ordem, foto, retrato e botão.
- `src/components/call-link.tsx` (novo): o botão de Serviços vira um componente que as duas seções usam.
- `src/components/services-section.tsx`: passa a usar o `call-link`.
- `src/components/header.tsx`: volta ao parar, com a exceção.
- `hero.tsx`, `about.tsx`, `about-timeline.tsx`: marcam onde o header não volta sozinho (`data-header-hold`).
- Docs:
  - `docs/fdd/header.md` (novo, pela regra do `fdd/README.md`);
  - `docs/fdd/contato.md` e `docs/fdd/sobre.md`;
  - PRD (D48, seção 6 e seção 10);
  - ROADMAP: os testes da análise comparativa ainda não estão lá e entram.

## Checklist
1. [ ] Converter as duas fotos com o sharp (webp, sem metadados) e conferir o resultado.
2. [ ] Extrair o `call-link` e usar em Serviços, sem mudança visual.
3. [ ] Contato: título, ordem, duração fora, foto, retrato e botão, frase fora.
4. [ ] Sobre: "Leia mais" e "Leia menos" abaixo do `sm`, com a volta ao fechar.
5. [ ] Header: volta ao parar, `data-header-hold` nos três trechos.
6. [ ] Docs: FDD do header, FDDs do Contato e do Sobre, D48 no PRD, ROADMAP.
7. [ ] Lint e typecheck.
8. [ ] QA pelo MCP em 390 px, iPad em pé e computador, inclusive com movimento reduzido. Fechar o Chrome do MCP.
9. [ ] Subir o servidor no Wi-Fi para o teste no celular dele. Parar sem commitar.

---
## Feito e verificado
- **Arquivos:**
  - fotos `primeira-consulta.webp` (1200 × 1600, 56 KB) e `dra-thaiane-retrato.webp` (1080 × 1350, 29 KB);
  - componentes `call-link.tsx` (novo), `services-section.tsx`, `contact-section.tsx`, `about-text.tsx`, `header.tsx`, `hero.tsx`, `about.tsx`, `about-timeline.tsx`;
  - docs `fdd/header.md` (novo), `fdd/contato.md`, `fdd/sobre.md`, `fdd/servicos.md`, `fdd/README.md`, `DESIGN.md`, PRD (D48 e seção 6), ROADMAP.
- **Desvios do plano:**
  - O header perdeu a transição com movimento reduzido. Antes ele deslizava mesmo assim.
  - O DESIGN.md e o FDD de Serviços citavam o `@starting-style`; agora citam a animação nova. O DESIGN.md também dizia que o Contato abria sem transição.
- **Critérios** (conferidos pelo MCP, emulando 390 × 844, 820 × 1180 e 1440 × 900):
  1. Em 390 px, um parágrafo e "Leia mais" (44 px, `aria-expanded`, `aria-controls`). Na primeira abertura as linhas sobem (`translateY` de 31 a 0 px em cerca de 0,6 s) e o foco vai para o segundo parágrafo. "Leia menos" fecha com o botão no mesmo lugar (400 px antes e depois) e o primeiro parágrafo à vista.
  2. Em 820 e 1440 px, os três parágrafos aparecem e o botão fica oculto.
  3. A ordem dos títulos conferida: "O que esperar e como chegar", Primeira consulta, Como chegar, Perguntas frequentes. Sem duração e sem a frase.
  4. As duas fotos saem do `next/image` e são preguiçosas, sem EXIF, XMP, IPTC nem ICC (lido pelo sharp). No celular, as sacolas ocupam 390 px de largura (de lado a lado) e o retrato 342 px. No computador, as duas ficam com 352 px. Sem rolagem horizontal.
  5. O header some ao descer e volta em 0,7 s em Serviços, no Contato e no texto do Sobre. Parado sobre o hero, a band ou a linha do tempo, continua escondido. Falta testar no celular dele, com o dedo.
  6. Com movimento reduzido, o texto só aparece (sem máscara), a página não pula ao fechar e o header fica com `transition-property: none`.
  7. Lint e typecheck verdes. O build fica para antes do PR.
- **Depois do teste no celular** (pedidos do Lucas, fora do plano inicial, todos na D48):
  - header: a volta ao parar leva 900 ms, com ease-out cúbico; a volta ao subir continua em 500 ms;
  - Contato no computador: sacolas ao lado das etapas (288 e 408 px em 1440) e botão da largura do retrato (352 px), ideia C do protótipo;
  - linha do tempo no computador: a foto chega coberta (`PHOTO_SHOWN` 0) e abre com os anos;
  - casos: o caso da vez fica no centro, o toque num vizinho o traz para lá, e o carrossel é em laço (três sequências, salto para a do meio ao parar). Conferido: começa no caso 1 com a Profilaxia à esquerda, dá a volta nos dois sentidos e sempre para na sequência do meio, centrado.
