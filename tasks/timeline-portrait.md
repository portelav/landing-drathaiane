# Foto dela ao lado da roda de anos

**Branch:** `feat/timeline-portrait` · **Status:** Feito (PR #20)

## Objetivo
- Preencher o espaço à direita da roda de anos (Sobre, Tempo 3), vazio desde que o vídeo do kit saiu em 2026-10-12, com a `DSC09749`: close dela de touca e máscara, clínica desfocada atrás.
- A roda conta a trajetória; a foto mostra a profissional de hoje. O kit saiu porque parecia solto ao lado da roda (`9744e3f`). Uma foto dela tem ligação direta com os anos, mas isso se confere no navegador antes do commit.

## Escopo
- **Dentro:** converter a foto para webp sem metadado; painel retrato estático ao lado da roda (`beside:`) e abaixo da lista no empilhado; FDDs do Sobre e de Serviços; pauta privada.
- **Fora:** animação própria da foto (o palco já é o terceiro momento dirigido por scroll); legenda com nome e CRO em cada foto (espera a resposta do CRO-AL, pauta); Serviços.

## Conteúdo e regras de fora
- Conteúdo da doutora: a foto, original recebido em 2026-10-27 (`media/servicos/DSC09749.jpg`, 3289×4604). Chegou. Alt descritivo, sem dizer onde foi feita.
- Res. CFO-196/2019, art. 3º: não é procedimento em andamento. Passa.
- Res. CFO-196/2019, art. 1º, § 1º: sem equipamento, instrumental ou material identificável (a torneira está desfocada). Passa.
- "Ambiente clínico" da cartilha do CRO-AL é interpretação, não está na norma: entra na conferência de antes de indexar (PRD, tabela das regras, D22). A foto vai para a pergunta que ela leva ao DEF/CRO-AL, junto dos vídeos.
- Art. 44, VI: nenhum paciente na foto. Repositório público: foto dela, com aval (D18), sem metadado.

## Critérios de aceite
1. `public/images/` tem a foto em webp, até 1600 px de largura, sem nenhum EXIF, XMP ou ICC com dado (conferido por leitura do arquivo).
2. Com `beside:` (de 64rem e proporção 6/5 para cima), a foto fica à direita da roda, retrato, cerca de 30% da largura, presa no palco junto com a roda, sem cobrir ano, frase nem traço.
3. Abaixo do `beside:` (390 px, iPad retrato), a foto vem depois da lista de anos, com cerca de 82% da largura, sem rolagem horizontal.
4. Com `prefers-reduced-motion` (palco estático), a foto continua ao lado da lista, legível e sem sobrepor nada.
5. A foto carrega preguiçosa (fica muito abaixo da primeira tela) e não entra na conta do LCP; o `sizes` corresponde à largura exibida.
6. `alt` em português, descritivo ("Dra. Thaiane Lessa, de touca e máscara"). Ela é informativa, não decorativa.
7. Nota de desempenho do Lighthouse no celular continua 85 ou mais (D37).
8. Lint, typecheck e build passam.

## Arquivos
- `public/images/dra-thaiane-paramentada.webp`: novo.
- `src/components/about-timeline.tsx`: painel com `next/image` depois da coluna da roda, no mesmo lugar e nas mesmas larguras do vídeo do kit (`git show 9744e3f`); comentário do `OPENS_BESIDE` passa a falar da foto.
- `docs/fdd/sobre.md`: Tempo 3 (a foto no lugar do vídeo), "Material recebido" (a `DSC09749` está em `media/servicos/` e foi usada aqui).
- `docs/fdd/servicos.md`: a foto deixa de estar reservada para Serviços.
- `private/pauta.md` (repositório privado, commit à parte): item 15 marcado, foto incluída na pergunta do "ambiente clínico".

## Checklist (até 10, em ordem)
1. [ ] Converter com `sharp` (já está em `node_modules`): redimensionar para 1600 px de largura, webp com qualidade 80, sem metadado. Script no scratchpad, fora do repositório.
2. [ ] Conferir que o webp saiu sem metadado e com o recorte certo (rosto à direita da foto).
3. [ ] Painel da foto em `about-timeline.tsx`, `object-cover`, proporção 3:4, `sizes` igual ao do kit (`30vw` com `beside:`, `82vw` sem).
4. [ ] Conferir no navegador, em 390 px, iPad retrato e computador, também com `prefers-reduced-motion` (CDP). Avisar antes de abrir o Chrome.
5. [ ] Se ao lado da roda a foto parecer solta como o kit: parar e mostrar ao Lucas antes de seguir.
6. [ ] Lint e typecheck.
7. [ ] FDD do Sobre e FDD de Serviços.
8. [ ] Pauta privada.
9. [ ] Build uma vez antes do PR; Lighthouse no celular.

---

## Feito e verificado

Arquivos: `public/images/dra-thaiane-paramentada.webp` (novo), `src/components/about-timeline.tsx`, `docs/fdd/sobre.md`, `docs/fdd/servicos.md`, `private/pauta.md` (repositório privado).

Desvios do plano: a foto parada ficou "à toa" ao lado da roda (Lucas); ganhou abertura presa ao progresso da roda (painel desce, escala de 1,08 para 1, 15% visível em 2019, inteira aos 90%), só `transform`, desligada no empilhado e com movimento reduzido (FDD do Sobre, "A foto"). Conferido em 1440x900 a 5%, 45% e 97% do progresso; com movimento reduzido e em 390 px o painel fica `display: none`. Painel com `beside:max-h-full`, para a foto não passar do palco preso numa tela larga e baixa (recorta mais em vez disso). O vídeo do kit tinha `mt-14` além do `gap-14` do palco; a foto fica só com o `gap`.

1. Webp de 1600x2240, 223 KB, convertido com `sharp`. Metadado lido de volta: sem EXIF, XMP, ICC nem IPTC, e nenhum chunk `EXIF`, `XMP ` ou `ICCP` no arquivo.
2. 1440x900: painel de 404x538 à direita da roda, sem cobrir ano, frase nem traço (print). 2560x1100: 740x908, dentro do palco de 100svh menos o `py-24`.
3. 390 px: 280x374, depois da lista; iPad retrato (820x1180): 607x809. Sem rolagem horizontal nos dois (`scrollWidth` igual à largura).
4. 1440x900 com `prefers-reduced-motion` (CDP): lista à esquerda, foto ao lado, nada sobreposto (print).
5. `loading="lazy"`; em 1440 px e DPR 1 o navegador pediu `w=640` para 404 px exibidos.
6. `alt` conferido no DOM.
7. Lighthouse 13.4.1 na produção depois do merge, mediana de 3 (D35), em 2026-10-27: celular 88 (87, 88, 98; LCP 3,0 s), computador 100; acessibilidade 100 nos dois.
8. Lint e typecheck verdes. O build roda uma vez antes do PR.

Console: só o aviso do Motion sobre movimento reduzido, esperado com a emulação.

Celular (D42, pedido do Lucas no meio da branch): a lista parada virou a "foto em foco", escolhida entre quatro rascunhos (artefato privado). Antes dela, um rascunho com moldura e anos em contador foi descartado. Conferido em 390x844 a 2%, 50% e 100% do progresso, 375x667, iPad retrato e com movimento reduzido (palco `display: none`, quatro anos visíveis na lista). Sem rolagem horizontal, console limpo. Lint, typecheck e build verdes.

Walkthrough: o rótulo de 11 px sobre a foto já clara media 2,6 a 3,2:1. Degradê de cima foi para `dark-base/85` e 40% da altura, rótulo em `light-base` cheio: 4,8:1 ou mais no fim da rolagem, em 390 px e no iPad retrato (medido nos prints).
