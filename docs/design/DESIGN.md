# Dra. Thaiane Lessa — Design System

Referência visual. Regra de produto vem do PRD. O Lucas decide o visual, com opções conversadas com a doutora (PRD, D28). Este documento descreve o que já existe no código (`src/app/globals.css` e `src/components/`) em 2026-10-09; mudança aqui acompanha mudança no código, na mesma branch.

## 1. Princípios

1. **Editorial, não institucional.** Página que se lê como revista: serifa grande, muito respiro, uma ideia por tela. Nada de grade de cards e ícones de clínica.
2. **O movimento conta a história.** Cada peça animada tem um porquê escrito no FDD da seção. Animação sem motivo sai.
3. **Proporção antes de pixel.** Layout que depende de foto ou vídeo decide pela proporção da janela (`wide:`, `beside:`), porque é a proporção que diz se a mídia cabe.
4. **Parado também é estado de primeira classe.** Toda peça tem um estado final legível sem movimento.
5. **Ética é requisito de design.** Nenhuma escolha visual ou de texto pode esbarrar nas regras do CFO (PRD, "Regras de fora").

## 2. Personalidade

- **Cuidadosa:** detalhe acabado (o monograma desenhado traço a traço, a sombra que continua a parede atrás da foto).
- **Calma:** ritmo lento, curvas suaves, texto que anima uma vez e para.
- **Elegante sem ser fria:** verde-floresta e vinho da marca sobre neutros quentes, serifa itálica no lugar de caixa-alta gritada.
- **Próxima:** o contato é o WhatsApp, sempre a um toque, no header, e de novo no rodapé.

Referência: [aventuradentalarts.com](https://aventuradentalarts.com) (estrutura editorial do header, par tipográfico, linha do tempo do "about").

### Marca

Arquivos em `public/logos/`:

| Arquivo | Uso |
|---|---|
| `monograma-claro.png`, `monograma-escuro.png` | Monograma sobre fundo escuro e claro |
| `logoclara-drathaianelessa.png`, `logoescura-drathaianelessa.png` | Logo completa em fundo escuro e claro |
| `logooriginalcompleta-drathaianelessa.png`, `logoverdeoriginal-drathaianelessa.png` | Versões originais da marca (verde) |
| `slogan-drathaianelessa.png` | Slogan |

No código, o monograma é o componente `BrandMark` (`src/components/brand-mark.tsx`), um SVG que herda a cor do texto e é o mesmo `layoutId` do preloader ao header.

A prévia de link e o ícone da Apple ficam em `src/app/` (PRD, D41). `opengraph-image.jpg` (1200 × 630): o retrato do Sobre à direita, a cor da parede da foto continuada à esquerda, o monograma em `forest-900`, o nome em Instrument Serif e "Cirurgiã-Dentista" e o CRO em Inter Tight, caixa-alta. `apple-icon.png` (180 × 180): monograma `light-base` sobre `forest-900`. A composição e o script que gera os dois ficam em `media/og/`, fora do git.

## 3. Paleta

Tokens em `src/app/globals.css`, expostos ao Tailwind por `@theme inline`.

| Token | Valor | Uso |
|---|---|---|
| `light-base` | `#f4f2ee` | Fundo quente das seções claras (Sobre) |
| `dark-base` | `#1a1a18` | Texto principal, fundos escuros |
| `dark-40`, `dark-10` | 40%, 10% | Traços, divisórias |
| `light-15` | `#f4f2ee` a 15% | Traços sobre fundo escuro |
| `forest-900` | `#163000` | Verde original da marca; monograma do rodapé |
| `forest-700`, `500`, `300` | `#2e4718`, `#4a6330`, `#5a7440` | Anos da linha do tempo, fundos de destaque |
| `wine-700`, `500`, `300` | `#661028`, `#8e1a3c`, `#b02b58` | Acento da marca |
| `whatsapp`, `instagram` | valores oficiais | Só nos ícones dessas marcas |
| `background` | `#ffffff` | Fundo da página |

### Texto secundário

Rótulos, parágrafo de apoio e canais do rodapé usam o token-base a 70%: `dark-base/70` sobre fundo claro, `light-base/70` sobre fundo escuro. No header, onde a cor vem do tom da seção, é `opacity-70`. Sobre foto, ou sobre gradiente tirado de foto, o texto vai em cor cheia: o rótulo "A dentista" na band aberta é `dark-base`. Nenhum texto em repouso abaixo de 70%. A exceção é a roleta da linha do tempo, que apaga os anos fora de foco durante o scroll, mas nunca abaixo de 60% (PRD, D36), e com movimento reduzido fica toda em cor cheia.

`dark-55` e `light-40` saíram em 2026-10-10: em texto pequeno não passavam no AA (3,79 e 3,52).

### Contraste verificado

AA pede 4,5:1 para texto normal e 3:1 para texto grande (24 px, ou 18,66 px em negrito). Os pares de cor sólida foram calculados em 2026-10-09 (WCAG 2.x). Os de texto secundário e os da band foram medidos no navegador em 2026-10-10, em 390 px, iPad retrato e computador (a band aberta e a pele escura do hero, só no computador): cor computada misturada sobre o fundo real e, na band, sobre a cor do gradiente na altura do texto.

| Par | Razão | Passa |
|---|---|---|
| `dark-base` sobre `#ffffff` | 17,43 | AA e AAA |
| `dark-base` sobre `light-base` | 15,59 | AA e AAA |
| `forest-900` sobre `light-base` | 12,89 | AA e AAA |
| `forest-700` sobre `light-base` | 9,25 | AA e AAA |
| `forest-700` a 60% sobre `light-base` (anos fora de foco da roleta, texto grande) | 3,23 | AA (texto grande) |
| `forest-500` sobre `light-base` | 6,02 | AA |
| `forest-300` sobre `light-base` | 4,69 | AA (no limite) |
| `wine-500` sobre `light-base` | 7,95 | AA e AAA |
| `wine-300` sobre `light-base` | 5,64 | AA |
| `#ffffff` sobre `forest-500` | 6,73 | AA |
| `dark-base/70` sobre `light-base` (rótulos, parágrafo do hero, rodapé) | 6,14 | AA |
| "Cirurgiã-Dentista" no header, `opacity-70`, sobre `light-base` | 6,10 | AA |
| `light-base/70` sobre `forest-900` (pele escura do hero, fora de uso) | 7,08 | AA e AAA |
| `dark-base` sobre o gradiente da band, na altura do rótulo | 6,34 | AA |
| `dark-base` sobre o gradiente da band, nas quatro linhas da citação | 5,34 a 6,13 | AA |
| Ícone do botão de pausa (`dark-base`) sobre o quadrado (`light-base`), os dois a 80% sobre qualquer quadro do vídeo | 8,45 ou mais (15,68 com foco ou hover) | Componente (3:1) |
| `dark-40` sobre `light-base` | 2,46 | **Não passa**: só traço decorativo |

A citação da band aberta era em `light-base` e media de 2,52 a 3,00, abaixo dos 3:1 de texto grande. Foi para `dark-base` cheio, como o rótulo, medida em 2026-10-11 no computador (1440×900): de 5,34 a 6,13. Escurecer o gradiente em vez disso quebraria a emenda com a parede da foto. Empilhado (celular, iPad retrato) a citação já era `dark-base` sobre `light-base`.

## 4. Tipografia

| Papel | Fonte | Tamanho e peso |
|---|---|---|
| Display (nome no hero, títulos, anos) | Instrument Serif, normal e itálico | `clamp()` entre 2,5 e 8 rem conforme a peça; peso 400; entrelinha 0,95 a 1,12 |
| Texto corrido | Inter Tight | 17 px, entrelinha 1,65, `dark-base` a 85% |
| Interface | Inter Tight | 15 px no hero, 13 px na navegação |
| Rótulos | Inter Tight em caixa-alta, `.tracking-brand` (0,18 em) | 11 px |

As duas fontes são servidas pelo `next/font` (sem requisição a terceiro). O par é o mesmo do site de referência. Medida de leitura do texto corrido: 60ch.

Nada abaixo de 11 px, e 11 px só em rótulo de caixa-alta com contraste AA.

## 5. Forma

- Quase sem raio: a página é feita de fotos, vídeos e texto, não de cartões. Exceções: os botões sociais do header (`rounded-[16px]`, 44 px, área de toque mínima) e os marcadores da linha do tempo (`rounded-full`).
- O botão de pausa dos vídeos segue a regra: quadrado de 32 px, sem raio, dentro de uma área de toque de 44 px, no canto inferior direito do vídeo.
- Sem sombra de cartão. A única "sombra" é a mistura de cor que continua a parede da foto na band do Sobre.
- Espaçamento lateral: 24 px no celular, 40 px a partir de `sm`.

## 6. Movimento

Curvas em `globals.css`: `--ease-out-quint` (padrão de entrada), `--ease-soft-pop` (passa um fio do alvo e assenta), `--ease-menu`, `--default-ease`.

| O quê | Gatilho | Duração e curva | Por quê |
|---|---|---|---|
| Preloader: monograma desenhado e preenchido | carregamento | ~2,9 s; monograma voa para o header via `layoutId` | Abrir com a marca, e entregar a marca ao header sem corte |
| Hero: janela abre de um painel para a tela cheia | scroll (rAF) | proporcional ao scroll | O tríptico do vídeo se revela painel a painel |
| Header: some ao descer, volta ao subir; inverte a cor pelo tom da seção | scroll | 500 ms, `ease-out-quint` | Sair do caminho sem sumir de vez |
| Menu do header | toque | 350 ms, itens com 45 ms de intervalo | Lista que desce sob o botão, no canto esquerdo |
| Sobre, band: retrato cresce, cenário abre | scroll (rAF) | proporcional ao scroll | Eixo horizontal, continuação do hero |
| Sobre, texto: linhas sobem por máscara | entrada, uma vez | 70 ms entre linhas | Único momento que anima e para: o silêncio depois é o efeito |
| Sobre, roleta de anos | scroll (rAF) | proporcional ao scroll | Eixo vertical, o contraste que hero e band não dão |
| Vídeo do consultório (hero) | 40% na tela | loop; pausa fora da tela e pelo botão | O consultório vivo na primeira impressão |
| Vídeo do kit | (fora do site desde 2026-10-12; guardado para reuso) | | |
| Contato | nenhum | título preso no topo a partir de `lg` (`position: sticky`, sem JS); `<details>` abre sem transição | Segura o título enquanto o texto passa, sem um quarto movimento calculado por scroll |
| Rodapé: voltar ao topo | clique | 1,8 s, ease-out quart (Lenis); direto com movimento reduzido | A página é longa, e o salto seco desorienta. O resto do rodapé não anima (hover só de opacidade, 300 ms) |

- Animar `transform` e `opacity`. **Exceção registrada:** a roleta aplica `blur` de até 2,5 px nas frases em trânsito, para fundir a passagem entre duas linhas vizinhas. Nada de `mix-blend-mode` em elemento que se move.
- O que se mexe sozinho por mais de 5 s tem como pausar (WCAG 2.2.2). Os dois vídeos em loop têm o botão `VideoToggle`. A pausa da pessoa vale até ela tocar em reproduzir, mesmo que role para longe e volte (PRD, D31).
- `prefers-reduced-motion`: **respeitado**, decisão já tomada no código. Cada peça vai ao estado final legível: hero e band abertos e sem palco travado, texto sem máscara, roleta inteira desenhada, vídeos parados no poster, Lenis desligado, preloader encurtado para 300 ms.
- Lenis só no computador; no toque o aparelho já suaviza.
- O que já foi decidido não fazer está em `docs/fdd/sobre.md` ("O que foi decidido não fazer"): palavras acendendo com o scroll, parallax no retrato, contagem crescente nos anos, letra a letra em parágrafo.

## 7. Componentes próprios

| Componente | Onde | Estados |
|---|---|---|
| `Preloader` | `src/components/preloader.tsx` | desenhando, preenchido, voando, ausente; versão curta com movimento reduzido |
| `Header` | `src/components/header.tsx` | flutuando, ancorado (fundo próprio), escondido; tema claro e escuro; menu aberto e fechado; fora da home, os links do menu voltam a ela |
| `BrandMark` | `src/components/brand-mark.tsx` | herda a cor do texto |
| `Hero` | `src/components/hero.tsx` | `wide:` (abre por scroll) ou estreito (quadro inteiro); vídeo tocando, pausado ou no poster |
| `VideoToggle`, `useLoopWhileVisible` | `src/components/video-toggle.tsx` | botão: pausar ou reproduzir, foco, hover; ausente com movimento reduzido ou antes de o vídeo tocar |
| `About`, `AboutText`, `AboutTimeline` | `src/components/about*.tsx` | `beside:` (lado a lado, por scroll) ou empilhado; movimento reduzido |
| `SmoothScroll` | `src/components/smooth-scroll.tsx` | ligado no computador; desligado no toque e com movimento reduzido |
| `ContactSection` | `src/components/contact-section.tsx` | estático; destino de `#contato`; pergunta aberta ou fechada (`<details>`) |
| `Footer` | `src/components/footer.tsx` | estático; faixa baixa alinhada à seção Contato: identificação, telefone, Instagram, voltar ao topo e direitos |
| `NotFound` | `src/app/not-found.tsx` | estático; tema claro; monograma, título na tipografia do hero e link de volta ao início |

## 8. Tom de voz

- Primeira pessoa no texto dela ("Trabalho melhor com tempo"), segunda pessoa para o paciente ("Quando você sair daqui").
- Frases curtas, concretas, sem jargão; termo técnico só com glosa (como "marca global de materiais odontológicos" para a Ivoclar).
- Fala de cuidado e planejamento, nunca de resultado.
- **Palavras vetadas pelas regras de fora** (PRD, "Regras de fora"): preço, valor (o dinheiro), parcelamento e "grátis" (Código de Ética, art. 44, I, e art. 20, IX); "popular" (art. 44, VII); "sorteio" e "brinde" (art. 20, VIII); "especialista" sem registro da especialidade (art. 44, II); "garantido" e qualquer promessa de resultado (Res. CFO-196/2019, art. 2º, § 1º). A cartilha do CRO-AL acrescenta "promoção", "desconto", "oferta", "pacote", "cupom" e "indicação de amigos" (interpretação).
- **Exceção em "valor":** a pergunta "Quanto custa o tratamento?" do FAQ e a resposta dela usam a palavra para recusar o preço, o caso que o PRD (D32) prevê. Fora dessa pergunta, a palavra segue vetada.
- **Vetadas por tom, mais estrito que a regra:** superlativo ("o melhor", "perfeito") e "sem dor".

## 9. O que não fazer

- Cards com ícone de dente, banco de imagens, sorriso genérico.
- Foto ou vídeo de procedimento em andamento (Res. CFO-196/2019, art. 3º), ou de paciente identificável sem autorização escrita.
- Antes e depois sem TCLE ou sem nome e CRO na imagem.
- Quarto momento seguido dirigido por scroll sem um motivo forte.
- Texto dirigido por scroll (sequestra o ritmo de leitura).
- Letterbox em vídeo vertical.
- Breakpoint em pixel para layout que depende de mídia.
