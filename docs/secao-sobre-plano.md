# Seção "Sobre" — plano dos três tempos

Estado em 19/08/2026. A seção existe hoje como uma peça só (a band). O plano é
quebrá-la em três tempos empilhados. Nada disso foi construído ainda porque
depende de material que a cliente ainda não enviou.

---

## Como retomar

Cole isto no Claude Code para continuar de onde paramos:

> Leia `docs/secao-sobre-plano.md` e `src/components/about.tsx`. Vamos construir
> os Tempos 2 e 3 da seção Sobre conforme o plano. O material que faltava já
> chegou — está em [diga onde]. Comece confirmando o que você tem em mãos
> contra a lista de pendências do documento, e me diga o que ainda falta antes
> de escrever qualquer código.

---

## Os três tempos

### Tempo 1 — a band (existe, não mexer)

O retrato cresce, o cenário abre para os lados, a frase chega pela direita.
Dirigido por scroll, eixo horizontal. Roda em `src/components/about.tsx`,
acima de 1024px.

Uma mudança prevista: as cinco credenciais que hoje ficam ao lado da foto saem
daqui e viram o Tempo 3. A band fica só com a frase, mais limpa.

### Tempo 2 — o texto

Bloco calmo abaixo da band, fundo `light-base`. Leva o nome dela, um `<h2>` de
verdade (a página inteira não tem nenhum `<h2>` hoje, só o `<h1>` do hero) e
dois ou três parágrafos.

Medida de leitura ~60ch, coluna deslocada e não centrada. Sem foto ao lado: o
bloco existe para ser lido, e uma imagem ali disputa atenção com o retrato
grande logo acima.

**Animação: disparada por entrada, uma vez só.** As linhas sobem por baixo de
uma máscara, com atraso de 60–80ms entre elas, e param. Depois disso ficam
paradas mesmo com o scroll continuando.

O motivo é o ponto central do desenho: todo o resto do site é dirigido por
scroll, e texto dirigido por scroll sequestra o ritmo de leitura — as palavras
reagem ao dedo em vez de esperarem o olho. Este é o primeiro momento do site em
que algo anima e para. O silêncio depois é o efeito, não a ausência dele.

Implementação: `whileInView` com `viewport={{ once: true, amount: 0.3 }}` e
variants com stagger. Usa IntersectionObserver, não registra listener de scroll.

Referências levantadas no 21st.dev: `Vertical Cut Reveal` (Cnippet),
`Blur Reveal` (tom), `Per Word Crossfade` (Edu Calvo). Por linha, nunca por
letra — letra a letra dentro de parágrafo é ilegível.

### Tempo 3 — a linha do tempo

As credenciais viram anos: formação na UFAL, especialização, mestrado,
Innovare. Padrão observado em aventuradentalarts.com/about, que é a referência
do projeto.

**Animação: dirigida por scroll, eixo vertical.** Uma régua desce e vai
revelando cada ano conforme passa.

O motivo: hero e band abrem para os lados, e o site nunca desceu. O eixo
vertical é o contraste que nenhuma das duas peças anteriores pode dar, e é o
que faz este tempo parecer um momento novo em vez de repetição.

Implementação: `useScroll({ target, offset: ["start end", "center center"] })`
com `useTransform` no `scaleY` da régua. É a mesma matemática que já está
escrita à mão em `about.tsx`, só que mantida pela biblioteca.

---

## O que foi decidido não fazer

- **Palavras acendendo com o scroll** (padrão Apple/Stripe). É o efeito mais
  pedido e está errado aqui: força ritmo de leitura e seria o quarto momento
  dirigido por scroll seguido.
- **Parallax no retrato.** A band já se move.
- **Contagem crescente nos anos.** Ano não é quantidade; contar de zero até
  2019 é movimento sem significado.
- **Qualquer coisa letra a letra** dentro de parágrafo.

Tudo com `prefers-reduced-motion` levando ao estado final visível, como hero e
band já fazem.

---

## O que falta chegar

### Texto — bloqueia o Tempo 2

Não existe nada na voz dela. As perguntas abaixo foram escritas para serem
respondidas por áudio de WhatsApp; puxam cena e memória em vez de adjetivo,
porque "qual seu diferencial?" só produz "atendimento humanizado".

> Oi, Thaiane! Estou escrevendo a parte do site que fala sobre você e queria que
> saísse com a sua voz, não com texto genérico de clínica. Pode responder por
> áudio, do jeito que vier — não precisa se preocupar em ficar bonito, eu
> organizo depois.
>
> 1. Por que você escolheu dentística, e não outra especialidade? Teve algum
>    momento ou algum caso que fez você decidir?
> 2. Me conta como é uma primeira consulta com você, do começo ao fim. O que
>    acontece quando a paciente senta na cadeira?
> 3. Qual foi o caso que mais te marcou até hoje? Não precisa citar nome — o que
>    me interessa é o que mudou para aquela pessoa depois.
> 4. O que as pacientes mais chegam entendendo errado sobre tratamento estético?
>    O que você mais precisa explicar e reexplicar?
> 5. Você já estava atendendo quando foi fazer o mestrado. Por que foi? O que
>    mudou no seu atendimento depois disso?
> 6. Tem alguma coisa que você faz diferente da maioria dos dentistas? Alguma
>    mania sua no trabalho?
> 7. Quando a paciente sai do seu consultório, o que você quer que ela esteja
>    sentindo?

Alvo: 150–220 palavras, dois ou três parágrafos. Evitar "excelência",
"profissional qualificada", "atendimento humanizado" — palavra genérica mata
seção sobre.

### Datas — bloqueia o Tempo 3

Os anos de cada credencial. Hoje o site tem os fatos mas não as datas:

| Credencial | Ano |
|---|---|
| Formação — Cirurgiã-dentista pela UFAL | falta |
| Especialização em Dentística | falta |
| Início do mestrado | falta |
| Entrada na Innovare Odontologia | falta |
| Registro CRO/AL-6418 | falta |

### Imagem ou vídeo — opcional, melhora o Tempo 3

Só existe uma foto no repositório (`public/images/dra-thaiane.webp`), que é o
retrato posado usado na band. Esse registro já está gasto: uma segunda imagem
só acrescenta se for de outro tipo.

**Preferência: vídeo curto das mãos dela trabalhando.** Vai ao lado da linha do
tempo. A linha conta a trajetória, e as mãos ancoram aquilo no presente.

Pedido para ela:

> Grava também, na horizontal, uns 8 segundos das suas mãos trabalhando —
> preparando o material, segurando o instrumento, o que estiver fazendo. Bem de
> perto, sem aparecer o rosto, sem falar. Movimento devagar. Não precisa ser
> produzido, o celular resolve.

Regras para esse vídeo:

- **Não em loop.** Toca uma vez ao entrar e congela no último frame — mesma
  regra do Tempo 2. Loop de pessoa executando tarefa vira esteira: a ação tem
  começo e fim, e repetida o olho acha o ponto de emenda.
- **Dimensionar pelo tamanho de exibição.** O hero pesa 4.2MB porque é tela
  cheia; um painel ao lado da linha do tempo cabe em 300–500KB. Landing de
  celular não aguenta um segundo vídeo full-size.

Alternativas aceitáveis, em ordem: foto dela atendendo ou das mãos; foto do
consultório ou de um detalhe do ambiente, como faixa estreita entre os Tempos 2
e 3. Outro retrato posado não acrescenta — guardar para outra seção.

Se nada chegar, os Tempos 2 e 3 funcionam sem imagem nenhuma.

---

## Fora do escopo desta seção

O menu do header já declara `Sobre`, `Serviços`, `Depoimentos` e `Contato`, mas
só `#sobre` existe — as outras três âncoras estão quebradas. A estrutura do
resto do site, a ordem das seções e o que cada uma precisa provar ficaram para
depois que a seção Sobre fechar.

Público decidido: mistura de estética de alto valor (o alvo) com restauradora. O texto e os serviços precisam falar com as
duas sem parecer confusos.

Pendências conhecidas e não tratadas: `Depoimentos` não pode existir de forma
honesta sem depoimento real, e `Serviços` não tem prova visual sem foto de
caso. Nenhum dos dois materiais existe hoje.

## Bug corrigido

A band do Tempo 1 trocava para o layout lado a lado em 1024px, medida em
pixels. Como a foto ocupa `0,75 x altura`, num iPad Pro retrato (1024x1366) ela
pedia 1025px — a tela inteira — e o texto era posicionado a partir de x=1025,
fora da viewport. As credenciais e a frase simplesmente não estavam na página.

Corrigido pela variante `beside:`, que exige proporção mínima de 6/5 além do
piso de largura. Abaixo disso a band empilha, que é o que uma tela alta pede de
qualquer forma. Era a mesma classe de erro que o hero largou em `fbb9de7`, e a
última ocorrência conhecida dela.

Quem for construir o Tempo 2 e o Tempo 3 deve usar `beside:` para o layout de
duas colunas, nunca `lg:` — o breakpoint de pixel não responde a pergunta certa
nesta seção.
