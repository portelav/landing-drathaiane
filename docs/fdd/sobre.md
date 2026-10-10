# FDD: Seção Sobre

Status: implementado
PRD: seção 6, item Sobre

Escrito como plano da seção antes do kit; mantido no formato original. Regras de fora que tocam esta seção: PRD, "Regras de fora".

## Plano dos três tempos

Estado em 19/08/2026. Os três tempos estão construídos. Este documento agora
serve para explicar por que cada um é como é, e para registrar o que ficou
guardado para as seções seguintes.

---

## Os três tempos

### Tempo 1 — a band

O retrato cresce, o cenário abre para os lados, a frase chega pela direita.
Dirigido por scroll, eixo horizontal. Roda em `src/components/about.tsx`, acima
do teste `beside:`.

As cinco credenciais que ficavam ao lado da foto saíram daqui e viraram o
Tempo 3. A band ficou só com a frase.

### Tempo 2 — o texto

`src/components/about-text.tsx`. Bloco calmo abaixo da band, fundo `light-base`.
Leva o nome dela num `<h2>` de verdade — a página só tinha o `<h1>` do hero — e
três parágrafos.

Medida de leitura 60ch, coluna deslocada e não centrada. Sem foto ao lado: o
bloco existe para ser lido, e uma imagem ali disputa atenção com o retrato
grande logo acima.

O deslocamento usa `lg:`/`xl:`, e não `beside:`, porque um recuo horizontal
depende só de largura disponível — é justamente a pergunta que um breakpoint de
pixel responde certo. O aviso contra `lg:` no fim deste documento vale para
layout de duas colunas, não para recuo.

**Animação: disparada por entrada, uma vez só.** As linhas sobem por baixo de
uma máscara, com 70ms entre elas, e param. Depois disso ficam paradas mesmo com
o scroll continuando.

O motivo é o ponto central do desenho: todo o resto do site é dirigido por
scroll, e texto dirigido por scroll sequestra o ritmo de leitura — as palavras
reagem ao dedo em vez de esperarem o olho. Este é o primeiro momento do site em
que algo anima e para. O silêncio depois é o efeito, não a ausência dele.

**Cada bloco tem o próprio gatilho.** Não é a coluna inteira que dispara: o
grupo rótulo+nome anima quando ele entra, e cada parágrafo espera a própria vez.

O motivo é um defeito que só apareceu usando: com um gatilho só, a seção inteira
terminava antes de o leitor, rolando em ritmo normal, chegar no primeiro
parágrafo. A animação existia e ninguém via. Bloco a bloco, nunca se chega numa
peça que já acabou — e a regra sobrevive inteira, porque cada peça continua
animando uma vez e parando.

Os atrasos contam a partir da primeira linha de cada bloco, não do topo da
coluna. Carregar o acumulado deixaria o último parágrafo esperando quase um
segundo parado antes de se mexer.

Implementação: `whileInView` com `viewport={{ once: true, amount: 0.25 }}` e
variants com stagger. Usa IntersectionObserver, não registra listener de scroll.

Uma linha visual só existe depois do layout, então ela é medida: cada palavra
vai num `<span>` mascarado pelo próprio `overflow`, e palavras que dividem o
mesmo `offsetTop` dividem a mesma linha e o mesmo atraso. A medição refaz quando
as webfonts chegam e a cada resize, porque as duas coisas mudam onde o texto
quebra. Hoje são 211 palavras em 19 linhas, ~2,1s do começo ao fim.

Por linha, nunca por letra — letra a letra dentro de parágrafo é ilegível.

### Tempo 3 — a linha do tempo

`src/components/about-timeline.tsx`. As credenciais viraram anos. Padrão
observado em aventuradentalarts.com/about, que é a referência do projeto.

**Quatro marcos, não seis.** As seis credenciais caem em quatro anos, e três
delas dividem 2024. Uma régua que solta "2024, 2024, 2024" lê como travamento,
então cada marco segura uma ou mais linhas:

```
2019  início da graduação, UFAL
2024  formatura e CRO/AL-6418 · Innovare
2025  grupo de creators da Ivoclar (atual)
2026  especialização concluída · início do mestrado
```

Ivoclar é a única credencial do lote que não é escola, e para paciente de
estética uma marca global escolhendo a profissional pesa mais que o mestrado. A
linha traz uma glosa curta ("marca global de materiais odontológicos") porque
o visitante leigo não conhece o nome.

**Animação: uma roleta dirigida por scroll.** Os anos ficam em assentos de uma
roda cujo eixo está fora da tela, à esquerda. Rolar gira a roda; o ano ativo
encosta num traço fixo no meio da altura.

O motivo: hero e band abrem para os lados, e o site nunca desceu. O eixo
vertical é o contraste que nenhuma das duas peças anteriores pode dar. A curva
é o que faz a descida parecer um mecanismo em vez de uma lista rolando.

O raio é enorme (1500px na escala cheia) e o passo entre assentos é de 4,2° de
propósito: só uma fatia rasa do círculo cruza a tela, então os quatro anos
continuam legíveis ao mesmo tempo. Uma roda com curva forte só mostra um ano
por vez, e credencial que só aparece uma por vez é credencial que o visitante
não confere de relance.

**A frase viaja com o ano.** Ela não troca num lugar fixo — pertence ao ano e
anda com ele: chega por baixo, encosta no traço, sai por cima. A presença tem
um platô em volta do assento (±0,22 assento), então existe uma janela em que a
linha está genuinamente parada para ser lida, e some de vez a 0,78. No meio do
caminho as duas frases vizinhas convivem meio apagadas, cada uma na altura do
seu próprio ano — não se sobrepõem porque estão em lugares diferentes, e um
`blur` de até 2,5px funde a passagem em vez de deixar dois blocos disputando.

O que isso custa, e foi aceito: **não há escalonamento de linhas.** Posição
presa ao scroll não tem "depois", só "mais abaixo". Nos anos de duas linhas
(2024 e 2026) elas chegam juntas.

Implementação: `requestAnimationFrame` com a trigonometria escrita à mão, no
mesmo padrão de `about.tsx`, e não `useScroll`/`useTransform` como o plano
original previa. A biblioteca resolve bem uma régua com um valor; aqui são
doze elementos com posição, escala, rotação, opacidade e desfoque derivados do
mesmo ângulo a cada quadro, e passar isso por motion values custa mais e
esconde a conta.

Só `transform`, `opacity` e `filter` são tocados — nada que force layout.

**A roleta só existe onde há espaço.** Abaixo do teste `beside:` a seção é uma
lista empilhada comum, sem palco travado, e o vídeo desce para baixo dela. Um
palco travado teria que segurar a roda e o vídeo retrato lado a lado, e num
celular o vídeo sozinho já é três quartos da tela. É o mesmo teste que a band
usa, pelo mesmo motivo.

---

## O vídeo

`public/video/kit.webm` · `kit.mp4` · `kit-poster.webp`. Master bruto em
`media/sobre/video/` (fora do repositório, `/media/` é ignorada).

Recorte de 5,15s–9,02s de um clipe de 33s com 12 cortes — o único trecho contínuo
que é close das mãos: ela montando o kit de higiene, com a fileira de cremes
dentais e a sacolinha da marca no quadro. Casa com o parágrafo 2 do Tempo 2
("qual escova, qual creme dental, para o seu caso") acontecendo em imagem.

Desacelerado para 0,65x, com `minterpolate` gerando os quadros intermediários,
o que leva 3,9s de material a 5,9s de tela. 720x1280, 254KB em H.264 e 263KB em
VP9.

**Retrato, não paisagem.** O plano original pedia painel horizontal. Todo o
material que a clínica grava é vertical, porque é gravado para redes sociais —
e um painel alto ao lado de uma régua vertical funciona melhor que o horizontal
de qualquer forma. Vertical virou escolha de direção, não remendo. Nunca
letterbox.

**Não em loop.** Toca uma vez ao entrar em vista e congela no último frame —
mesma regra do Tempo 2. Loop de pessoa executando tarefa vira esteira: a ação
tem começo e fim, e repetida o olho acha o ponto de emenda.

> Nota de 2026-10-09: decisão revertida em 6068291 (2026-08-20). O vídeo agora roda em loop e pausa ao sair da tela: um quadro congelado ao lado de uma roda que ainda gira parecia falha de carregamento. Como se repete por mais de 5 s, falta um controle de pausa (WCAG 2.2.2), item no ROADMAP.

**Dimensionado pelo tamanho de exibição.** O hero pesa 4,2MB porque é tela
cheia; este painel cabe em 300–500KB.

Para o que for gravado daqui em diante, o pedido é o mesmo de sempre: perto,
devagar, plano único, sem fala. Close sobrevive a qualquer proporção; plano
aberto filmado do outro lado da sala não serve em proporção nenhuma.

---

## O que foi decidido não fazer

- **Palavras acendendo com o scroll** (padrão Apple/Stripe). É o efeito mais
  pedido e está errado aqui: força ritmo de leitura e seria o quarto momento
  dirigido por scroll seguido.
- **Parallax no retrato.** A band já se move.
- **Contagem crescente nos anos.** Ano não é quantidade; contar de zero até
  2019 é movimento sem significado.
- **Qualquer coisa letra a letra** dentro de parágrafo.
- **Linha do tempo sem datas.** Foi considerada: a régua expõe que a formatura
  foi em 2024, e o visitante faz a conta. Ficou com as datas porque
  especialização e mestrado dois anos depois da formatura leem como densidade,
  e porque sem os anos o Tempo 3 perde a razão de existir e vira lista.

Tudo com `prefers-reduced-motion` levando ao estado final visível, como hero e
band já fazem. No Tempo 2 isso significa texto puro, sem as máscaras por
palavra; no Tempo 3, régua inteira desenhada, marcos opacos e vídeo parado no
poster.

---

## Material recebido e guardado

Tudo em `media/sobre/`, fora do repositório.

**`DSC09749.jpg`** — close dela paramentada, touca e máscara, olhos na câmera,
clínica desfocada atrás. É a melhor foto do lote e o registro que mais falta ao
site, e não tem lugar nesta seção: o Tempo 2 é deliberadamente sem foto ao lado.
Guardada para `Serviços` ou para uma revisão do hero.

**`IMG_9049`** — uma sacolinha do kit ao lado do papel timbrado. Candidata a
faixa estreita entre os Tempos 2 e 3, se a seção pedir respiro depois que as
outras existirem. Não construída.

**`IMG_8682`, `IMG_9039`** — outros enquadramentos das mesmas sacolinhas.
Nenhum melhor que o `IMG_9049`.

**Vídeos de atendimento** — fora de uso (PRD, "Regras de fora"). Detalhes nas
notas privadas.

---

## Fora do escopo desta seção

O menu do header declara `Sobre`, `Serviços`, `Depoimentos` e `Contato`, mas só
`#sobre` existe — as outras três âncoras continuam quebradas.

Público decidido: mistura de estética de alto valor (o alvo) com restauradora.
O texto e os serviços precisam falar com as duas sem parecer confusos.

O caso clínico mais forte que ela contou ficou de fora do Tempo 2 de propósito:
é grande demais para um parágrafo de "sobre" e é material de `Serviços`, com
foto de antes/depois se ela tiver (PRD, D5).

## Bug corrigido

A band do Tempo 1 trocava para o layout lado a lado em 1024px, medida em pixels.
Como a foto ocupa `0,75 x altura`, num iPad Pro retrato (1024x1366) ela pedia
1025px — a tela inteira — e o texto era posicionado a partir de x=1025, fora da
viewport. As credenciais e a frase simplesmente não estavam na página.

Corrigido pela variante `beside:`, que exige proporção mínima de 6/5 além do
piso de largura. Abaixo disso a band empilha, que é o que uma tela alta pede de
qualquer forma. Era a mesma classe de erro que o hero largou em `10c5e79`, e a
última ocorrência conhecida dela.

O Tempo 3 usa `beside:` pelo mesmo motivo — e não só para as duas colunas: é
ele que decide se a roleta existe. Verificado em 1024x1366: empilha como
lista, sem overflow horizontal.
