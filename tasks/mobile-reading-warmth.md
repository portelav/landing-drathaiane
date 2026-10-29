# Leitura no celular e calor humano

**Branch:** `feat/mobile-reading-warmth` · **Status:** Planejado

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
<!-- Escrito pelo /exec: arquivos tocados, desvios do plano, como cada critério foi conferido. -->
