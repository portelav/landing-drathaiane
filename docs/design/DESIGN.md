# Dra. Thaiane Lessa — Design System

Referência visual. Regra de produto vem do PRD, e quem aprova o visual é a doutora. Este documento descreve o que já existe no código (`src/app/globals.css` e `src/components/`) em 2026-10-09; mudança aqui acompanha mudança no código, na mesma branch.

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

## 3. Paleta

Tokens em `src/app/globals.css`, expostos ao Tailwind por `@theme inline`.

| Token | Valor | Uso |
|---|---|---|
| `light-base` | `#f4f2ee` | Fundo quente das seções claras (Sobre) |
| `dark-base` | `#1a1a18` | Texto principal, fundos escuros |
| `dark-55` | `#1a1a18` a 55% | Texto secundário, rótulos |
| `dark-40`, `dark-10` | 40%, 10% | Traços, divisórias |
| `light-40`, `light-15` | `#f4f2ee` a 40%, 15% | Texto secundário e traços sobre fundo escuro |
| `forest-900` | `#163000` | Verde original da marca; fundo do rodapé |
| `forest-700`, `500`, `300` | `#2e4718`, `#4a6330`, `#5a7440` | Anos da linha do tempo, fundos de destaque |
| `wine-700`, `500`, `300` | `#661028`, `#8e1a3c`, `#b02b58` | Acento da marca |
| `whatsapp`, `instagram` | valores oficiais | Só nos ícones dessas marcas |
| `background` | `#ffffff` | Fundo da página |

### Contraste verificado

Calculado em 2026-10-09 (WCAG 2.x). AA pede 4,5:1 para texto normal e 3:1 para texto grande (24 px, ou 18,66 px em negrito).

| Par | Razão | Passa |
|---|---|---|
| `dark-base` sobre `#ffffff` | 17,43 | AA e AAA |
| `dark-base` sobre `light-base` | 15,59 | AA e AAA |
| `forest-900` sobre `light-base` | 12,89 | AA e AAA |
| `forest-700` sobre `light-base` | 9,25 | AA e AAA |
| `forest-500` sobre `light-base` | 6,02 | AA |
| `forest-300` sobre `light-base` | 4,69 | AA (no limite) |
| `wine-500` sobre `light-base` | 7,95 | AA e AAA |
| `wine-300` sobre `light-base` | 5,64 | AA |
| `#ffffff` sobre `forest-500` | 6,73 | AA |
| `dark-55` sobre `light-base` | 3,79 | **Só texto grande** |
| `light-40` sobre `dark-base` | 3,52 | **Só texto grande** |
| `dark-40` sobre `light-base` | 2,46 | **Não passa**: só traço decorativo |
| `light-base` sobre `forest-900` (identificação do rodapé) | 12,89 | AA e AAA |
| `light-base` a 85% sobre `forest-900` (canais do rodapé) | 9,69 | AA e AAA |
| `light-base` a 70% sobre `forest-900` (rótulo e direitos do rodapé) | 7,08 | AA e AAA |

Os três pares do rodapé foram medidos no navegador em 2026-10-09. No rodapé, o texto secundário usa `light-base` a 70%, nunca `light-40`.

`dark-55` e `light-40` hoje aparecem em rótulos de 11 px (hero, band do Sobre, texto do Sobre, linha do tempo). Isso não passa no AA; item no ROADMAP.

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
- Sem sombra de cartão. A única "sombra" é a mistura de cor que continua a parede da foto na band do Sobre.
- Espaçamento lateral: 24 px no celular, 40 px a partir de `sm`.

## 6. Movimento

Curvas em `globals.css`: `--ease-out-quint` (padrão de entrada), `--ease-soft-pop` (passa um fio do alvo e assenta), `--ease-menu`, `--default-ease`.

| O quê | Gatilho | Duração e curva | Por quê |
|---|---|---|---|
| Preloader: monograma desenhado e preenchido | carregamento | ~2,9 s; monograma voa para o header via `layoutId` | Abrir com a marca, e entregar a marca ao header sem corte |
| Hero: janela abre de um painel para a tela cheia | scroll (rAF) | proporcional ao scroll | O tríptico do vídeo se revela painel a painel |
| Header: some ao descer, volta ao subir; inverte a cor pelo tom da seção | scroll | 500 ms, `ease-out-quint` | Sair do caminho sem sumir de vez |
| Menu do header | toque | 550 ms, stagger 50 ms | Desdobrar dentro do header |
| Sobre, band: retrato cresce, cenário abre | scroll (rAF) | proporcional ao scroll | Eixo horizontal, continuação do hero |
| Sobre, texto: linhas sobem por máscara | entrada, uma vez | 70 ms entre linhas | Único momento que anima e para: o silêncio depois é o efeito |
| Sobre, roleta de anos | scroll (rAF) | proporcional ao scroll | Eixo vertical, o contraste que hero e band não dão |
| Vídeo do kit | entrada na tela | loop, pausa fora da tela | Um quadro parado ao lado da roda parecia falha |
| Rodapé | nenhum | nada anima; hover dos canais só de opacidade, 300 ms | Ponto de repouso depois de três momentos seguidos dirigidos por scroll |

- Animar `transform` e `opacity`. **Exceção registrada:** a roleta aplica `blur` de até 2,5 px nas frases em trânsito, para fundir a passagem entre duas linhas vizinhas. Nada de `mix-blend-mode` em elemento que se move.
- O que se mexe sozinho por mais de 5 s tem como pausar (WCAG 2.2.2). Hoje o vídeo do hero e o do kit não têm controle; item no ROADMAP.
- `prefers-reduced-motion`: **respeitado**, decisão já tomada no código. Cada peça vai ao estado final legível: hero e band abertos e sem palco travado, texto sem máscara, roleta inteira desenhada, vídeos parados no poster, Lenis desligado, preloader encurtado para 300 ms.
- Lenis só no computador; no toque o aparelho já suaviza.
- O que já foi decidido não fazer está em `docs/fdd/sobre.md` ("O que foi decidido não fazer"): palavras acendendo com o scroll, parallax no retrato, contagem crescente nos anos, letra a letra em parágrafo.

## 7. Componentes próprios

| Componente | Onde | Estados |
|---|---|---|
| `Preloader` | `src/components/preloader.tsx` | desenhando, preenchido, voando, ausente; versão curta com movimento reduzido |
| `Header` | `src/components/header.tsx` | flutuando, ancorado (fundo próprio), escondido; tema claro e escuro; menu aberto e fechado |
| `BrandMark` | `src/components/brand-mark.tsx` | herda a cor do texto |
| `Hero` | `src/components/hero.tsx` | `wide:` (abre por scroll) ou estreito (quadro inteiro); vídeo tocando ou poster |
| `About`, `AboutText`, `AboutTimeline` | `src/components/about*.tsx` | `beside:` (lado a lado, por scroll) ou empilhado; movimento reduzido |
| `SmoothScroll` | `src/components/smooth-scroll.tsx` | ligado no computador; desligado no toque e com movimento reduzido |
| `Footer` | `src/components/footer.tsx` | estático; destino de `#contato` enquanto a seção Contato não existe (PRD, D26) |

## 8. Tom de voz

- Primeira pessoa no texto dela ("Trabalho melhor com tempo"), segunda pessoa para o paciente ("Quando você sair daqui").
- Frases curtas, concretas, sem jargão; termo técnico só com glosa (como "marca global de materiais odontológicos" para a Ivoclar).
- Fala de cuidado e planejamento, nunca de resultado.
- **Palavras vetadas** (CFO e CRO-AL): preço, valor, parcelamento, "grátis", "promoção", "desconto", "oferta", "popular", "pacote", "cupom", "sorteio", "brinde", "indicação de amigos"; "especialista" sem registro da especialidade; "o melhor", "garantido", "perfeito", "sem dor" e qualquer promessa de resultado ou superlativo.

## 9. O que não fazer

- Cards com ícone de dente, banco de imagens, sorriso genérico.
- Foto ou vídeo de procedimento em andamento, instrumental, material ou paciente identificável sem autorização escrita.
- Antes e depois sem TCLE ou sem nome e CRO na imagem.
- Quarto momento seguido dirigido por scroll sem um motivo forte.
- Texto dirigido por scroll (sequestra o ritmo de leitura).
- Letterbox em vídeo vertical.
- Breakpoint em pixel para layout que depende de mídia.
