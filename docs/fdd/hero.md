# FDD: Seção Hero

Status: implementado
PRD: seção 6, item Hero; D31
Plano: `tasks/video-pause-control.md` (o hero foi construído antes da regra dos FDDs; este documento registra o que existe e acrescenta a pausa do vídeo)

## Objetivo

Primeira impressão: o visitante vê o consultório e entende, em uma linha, que ali se cuida do sorriso com tempo e planejamento.

## Conteúdo

Tudo já no ar desde antes do kickoff, sem conteúdo novo neste documento. A revisão do site inteiro antes de tirar o `noindex` (PRD, D30) também passa por aqui.

- Rótulo: "Odontologia estética e restauradora".
- Título (`h1`, o único da página): "sorrir é sempre *uma boa ideia*", com o fim em itálico.
- Parágrafo: "Cada plano de tratamento começa pela leitura do seu rosto — proporção, luz e expressão antes de qualquer procedimento."
- Convite: "Role para conhecer".
- Linha de exibição que cruza o vídeo: "seu sorriso, no seu tempo".
- Vídeo: o consultório (recepção e salas), em três clipes verticais lado a lado num quadro 16:9 (tríptico).
  - Arquivos: `public/video/hero.webm` (VP9, 2,0 MB), `hero.mp4` (H.264, 2,3 MB) e `hero-poster.webp` (64 KB).
  - Duração de 13,4 s, sem som. Processo no ADR 0003.

## Comportamento

Duas peles de cor no código (`PALETTE`), escolhidas pela constante `TONE`. No ar está a clara: fundo `light-base` e header claro. A escura (`forest-900`) está guardada e passa no mesmo contraste (DESIGN.md, seção 3).

**Estreito** (proporção abaixo de 427/720, o teste `wide:`; quase todo celular em pé):
- O texto vem primeiro, e o vídeo desce para um quadro de tela inteira (`100svh`) logo abaixo.
- Não há palco travado.

**`wide:`** (proporção de 427/720 ou mais; tablet, computador):
- O texto ocupa a metade esquerda, e o vídeo começa como uma janela na direita, do tamanho de um painel do tríptico.
- A seção tem `300svh` de pista, com o palco travado (`sticky`) enquanto a janela abre.

**O vídeo:**
1. **Na tela, toca em loop.** Conta como na tela quando 40% do vídeo está visível.
2. **Fora da tela, pausa.** Ao voltar, retoma de onde parou.
3. **Botão de pausa** no canto inferior direito do quadro: um quadrado claro de 32 px, sem raio, com ícone escuro (duas barras para pausar, triângulo para reproduzir), e área de toque de 44 × 44 px. O nome para leitor de tela é "Pausar o vídeo do consultório" ou "Reproduzir o vídeo do consultório".
4. **A pausa pedida pela pessoa vale até ela tocar em reproduzir,** mesmo que role para longe e volte. Vale só durante a visita.
5. **Se o navegador recusa tocar** (economia de bateria ou de dados), fica o poster e o botão não aparece. O botão só surge depois que o vídeo tocou de fato.

## Movimento

| O quê | Gatilho | Como | Por quê |
|---|---|---|---|
| Janela abre de um painel para a tela cheia (`wide:`) | scroll (rAF) | Largura do quadro do início da pista até 72% dela. Começa no menor entre um painel (`0,5931 × altura`) e metade da tela | O tríptico se revela painel a painel, em vez de cair num recorte qualquer |
| Véu sobre o vídeo (`wide:`) | scroll | Opacidade até 0,56 na pele clara (0,34 na escura), proporcional à abertura | Paredes claras em tela cheia atrás da linha de exibição pedem um pouco de sombra |
| Texto sai (`wide:`) | scroll | Opacidade e deslocamento para a esquerda, de 5% a 40% da pista | O texto sai bem antes de o vídeo tomar a tela |
| Linha "seu sorriso, no seu tempo" (`wide:`) | scroll | Entra pela direita a partir de 22% e assenta centralizada no fim | Linha de exibição grande que vaza as duas bordas |
| Panorâmica no tríptico (estreito) | scroll | `objectPosition` de 0% a 100% enquanto o quadro atravessa a tela | Em tela de celular o recorte é mais estreito que um painel; os três painéis chegam um depois do outro |
| Linha de exibição (estreito) | scroll | Atravessa da direita para a esquerda | Contraponto ao movimento da panorâmica |
| Vídeo | sozinho, na tela | Loop, com pausa pelo botão e fora da tela | O consultório vivo na primeira impressão |

Só `transform`, `opacity`, `width` do quadro (que está em posição absoluta e não força layout do resto da página) e `objectPosition`. O botão não anima: o hover é só de opacidade, 300 ms.

**`prefers-reduced-motion`:**
- Sem palco travado: no `wide:`, a seção perde a pista de `300svh`. A janela fica no tamanho de um painel e o texto fica parado.
- A linha de exibição fica centralizada no estreito. No `wide:`, ela não aparece, porque só entra com a abertura.
- O vídeo fica no poster e o botão não aparece.
- Se a preferência mudar com a página aberta, tudo acompanha. Ligar a preferência desfaz a pausa pedida pela pessoa: ao desligar, o vídeo volta ao loop, com o botão.

## Regras

1. Nenhum procedimento em andamento no vídeo (Res. CFO-196/2019, art. 3º). Paciente identificável só com consentimento (Código de Ética, art. 44, VI); na página, ninguém identificável sem autorização escrita (PRD).
2. Nenhuma promessa de resultado no texto (Res. CFO-196/2019, art. 2º, § 1º).
3. Texto secundário a 70% ou mais (DESIGN.md, seção 3).
4. O vídeo que se mexe sozinho tem pausa na página (WCAG 2.2.2) e para fora da tela (ADR 0003).

## Acessibilidade

- Ordem de leitura: rótulo, título (`h1`), parágrafo, convite, e então o botão de pausa e a linha de exibição. No estreito, a linha vem antes do botão; no `wide:`, depois.
- O vídeo é decorativo: `aria-hidden`, fora do Tab, sem os controles do navegador nem picture-in-picture. O botão é o único controle.
- O botão é um `button` com nome que muda entre "Pausar" e "Reproduzir". Responde a Enter e a Espaço, e o foco é visível sobre o quadrado claro.
- O ícone passa em 3:1 contra o quadrado.
- Contraste do texto: DESIGN.md, seção 3.

## Desempenho

- O poster é a primeira pintura (LCP) e sai com preload de prioridade alta (`ReactDOM.preload` em `page.tsx`).
- O vídeo começa com `preload="none"` e só baixa depois do evento `load` da página, para não disputar a banda da primeira tela (ADR 0004).
- Duas fontes de vídeo, VP9 e H.264 nível 4.0 (ADR 0003).
- Fora da tela o vídeo para, o que poupa bateria e processamento.

## Fora de escopo

- Botão global de "parar todo movimento".
- Pausa da abertura pelo scroll: ela só se mexe quando a pessoa rola.
- Lembrar a pausa entre visitas.

## Critérios de aceite

Verificáveis em 390 px, iPad retrato e computador.

- [x] O vídeo toca em loop na tela e pausa fora dela.
- [x] O botão fica no canto inferior direito do quadro, com 44 × 44 px de toque, e alterna pausar e reproduzir por clique, toque, Enter e Espaço.
- [x] Pausado pelo botão, o vídeo não volta a tocar sozinho depois de rolar para longe e voltar.
- [ ] Com movimento reduzido, fica o poster, sem botão e sem palco travado. Conferido no código; falta o teste num aparelho com "reduzir movimento" ligado.
- [x] A abertura pelo scroll e a linha de exibição continuam como descritas em "Movimento", e o botão não cobre texto, linha de exibição nem header.
