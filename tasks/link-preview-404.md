# Prévia de link e página 404

**Branch:** `feat/link-preview-404` · **Status:** Planejado

## Objetivo
- O link do site, compartilhado no WhatsApp, no Instagram ou no portfólio, aparece com imagem, nome, profissão e CRO, não como link cru.
- Endereço errado cai numa 404 com a marca e o caminho de volta, não na página padrão do Next.
- Origem: pesquisa "Sites premiados e o que falta" (notas privadas, 2026-10-23). Os premiados conferidos têm og:image e ícones; o site tem só description e favicon.

## Escopo
- **Dentro:**
  - Imagem de prévia 1200 × 630 (`opengraph-image.jpg`), com texto alternativo.
  - Metadados no layout: `metadataBase`, título "Dra. Thaiane Lessa | Cirurgiã-Dentista em Maceió", descrição "Cirurgiã-dentista em Maceió, CRO/AL-6418. Conheça a Dra. Thaiane Lessa, veja como é a primeira consulta e como chegar ao consultório.", `openGraph` (website, pt_BR, nome do site), `twitter` com imagem grande, `themeColor`.
  - Ícone da Apple (180 × 180) com o monograma.
  - Página 404, e links do menu que funcionem fora da home.
  - Docs: PRD (D41), ROADMAP, DESIGN.md.
- **Fora:** tirar o `noindex` (D22); canonical, dados estruturados, robots e sitemap, que vão junto com o `noindex`; manifest; domínio (D10).

## Conteúdo e regras de fora
- Conteúdo da doutora: nenhum novo. Nome, profissão, CRO, slogan e retrato já estão no site (D18).
- CEO, art. 43: a prévia circula sozinha, então a imagem leva nome, "Cirurgiã-Dentista" e CRO/AL-6418. Cumpre também a Res. 196/2019, art. 4º (nome e CRO na imagem).
- CEO, art. 43, § 1º, I: nenhuma área de atuação na imagem nem na descrição ("Odontologia estética e restauradora" fica fora).
- Res. 196/2019, art. 2º, § 1º: descrição sem promessa nem superlativo.
- Imagem nova sem metadado (repositório público).

## Critérios de aceite
1. O HTML da home traz og:image (1200 × 630, URL absoluta em `https://drathaianelessa.vercel.app`), og:image:alt, og:title, og:description, og:locale `pt_BR`, og:site_name, twitter:card `summary_large_image`, `apple-touch-icon` e `theme-color`. O `robots` continua `noindex, nofollow`.
2. A imagem de prévia tem menos de 300 KB, sem EXIF nem XMP. Nome, "Cirurgiã-Dentista" e "CRO/AL-6418" ficam legíveis com a imagem reduzida a 300 px de largura.
3. `/qualquer-coisa` responde 404 com o monograma, um título, uma linha de texto e "Voltar ao início" (para `/`), em 390 px, iPad retrato e computador, sem rolagem horizontal.
4. Na 404, "Sobre" e "Contato" do menu levam à seção certa da home. Na home, o menu continua igual.
5. Todo texto da 404 passa em 4,5:1, com foco visível e área de toque de 44 px no link.
6. Lint, typecheck e build verdes.

## Arquivos
- `src/app/layout.tsx`: metadados e viewport.
- `src/app/opengraph-image.jpg`, `src/app/opengraph-image.alt.txt`, `src/app/apple-icon.png`: novos.
- `src/app/not-found.tsx`: novo.
- `src/components/header.tsx`: links do menu com `/` antes do `#` fora da home.
- `docs/PRD.md`, `docs/ROADMAP.md`, `docs/design/DESIGN.md`.
- Composição das imagens (HTML e script) em `media/og/`, fora do git.

## Checklist (até 10, em ordem)
1. [ ] PRD: D41 (Rodada 8, 2026-10-23), com §8 e §10 alinhados.
2. [ ] Compor a prévia em HTML com as fontes e os tokens do site: retrato à direita sobre a cor da parede da foto, texto à esquerda. Capturar em 1200 × 630.
3. [ ] Codificar em JPEG abaixo de 300 KB, sem metadado (sharp), e escrever o texto alternativo.
4. [ ] Gerar o `apple-icon.png` de 180 × 180 a partir do `MONOGRAM_PATH`.
5. [ ] `layout.tsx`: `metadataBase`, título, descrição, `openGraph`, `twitter` e `viewport.themeColor`.
6. [ ] `not-found.tsx` com os tokens e `data-header-theme="light"`.
7. [ ] Header: links do menu com `/` antes do `#` fora da home.
8. [ ] DESIGN.md (componentes e marca) e ROADMAP.
9. [ ] Conferir no navegador (390 px, iPad retrato, computador), o HTML gerado e o contraste.
10. [ ] Lint, typecheck e build.

---

## Feito e verificado
<!-- Escrito pelo /exec: arquivos tocados, desvios do plano, como cada critério foi conferido. -->
