# FDD: Seção Serviços

Status: implementado (2026-10-28)
PRD: seção 6, item Serviços; D44

## Objetivo

O visitante entende o que a doutora trata, se reconhece em pelo menos um dos casos (estética ou restauradora) e chama no WhatsApp.

## Conteúdo

- Cinco serviços, com o texto dela: limpeza (profilaxia), restaurações, clareamento, facetas em resina composta e coroas. Os textos ficam em `src/lib/services.ts` e entram literais.
- Cinco casos, com foto e a legenda dela. Cada foto é um quadro de 1080 × 1350 com duas metades. Os casos 1 e 2 são antes e depois; o 3 mostra peças em resina num modelo de gesso; o 4 e o 5, flúor e pasta profilática.
- As fotos ficam em `public/images/servicos/caso-{1..5}.webp`, sem metadado, com "Dra. Thaiane Lessa · CRO/AL-6418" gravado no canto inferior esquerdo. O bruto fica em `media/servicos/`, fora do git. O `alt` de cada foto é nosso e descreve a imagem; não é texto dela.
- O caso de reabilitação de 27 dentes (PRD, D5) fica fora até haver foto.

## Comportamento

Âncora `#servicos`, entre a linha do tempo do Sobre e o Contato, com "Serviços" no menu do header. Fundo `light-base`, `data-header-theme="light"`.

- **Celular (primeiro):** título "Serviços"; lista dos serviços; "Casos" com a contagem "01 / 05"; carrossel; barrinhas e setas; link para o WhatsApp.
- **Lista:** `<details name="services">`, um aberto por vez, o primeiro aberto na chegada. Toque de 56 px no nome.
- **Carrossel:** `<ul>` com rolagem lateral e `scroll-snap` no centro. Cartão de 84vw no celular, de 22rem a partir de `sm` e de 20rem a partir de `lg`, para as bordas dos vizinhos sempre aparecerem. O caso da vez fica no meio (D48). Antes o encaixe era no início, e no iPad e no computador os dois últimos nunca chegavam à linha: na última foto, a seta para trás não tinha para onde ir. Tocar num vizinho o traz para o meio.
- **Em laço** (D48): a pista tem três sequências dos cinco casos e começa na do meio, então à esquerda do primeiro já está o último. Quando a rolagem para (140 ms sem evento) numa sequência de fora, a pista salta sem animação para o mesmo caso na do meio. Todas as cópias do caso da vez ficam acesas, então o salto não troca nada na tela. As cópias ficam fora do leitor de tela (`aria-hidden`, `alt` vazio). Setas de 44 px, sem ponta. Cada clique conta a partir de para onde a pista já está indo, não do caso mais perto: no meio do deslize o mais perto ainda é o de partida, e um segundo clique rápido se perdia.
- **A partir de `lg`:** a mesma moldura do Contato: título preso à esquerda (`sticky`, sem JS), lista e carrossel à direita.

## Movimento

Nenhum movimento dirigido por scroll: a seção não é o quarto momento depois de hero, band e roda.

- Lista: o texto entra como as respostas do Contato (450 ms, de baixo, a cada abertura, pelo `animate-details-in` no `::details-content`); o + gira para × (300 ms).
- Carrossel: o gesto é do aparelho. Em todas as larguras, o caso da vez fica aceso e, nos vizinhos, a foto fica a 50% e o texto a 75%, o mínimo que ainda passa no contraste de 4,5:1; a foto vai de 1,04 a 1 (400 e 700 ms, `ease-out-quint`). Só `opacity` e `transform`.
- Com `prefers-reduced-motion`: todos os casos em cor cheia, sem zoom, e as setas saltam em vez de deslizar. Nada se mexe sozinho.

## Regras

1. Nenhum preço, forma de pagamento ou "grátis" (Código de Ética, art. 44, I; PRD, D29), nem "popular" (art. 44, VII). "Promoção", "desconto" e "oferta" ficam fora pela cartilha do CRO-AL (interpretação).
2. "Especialista" só se a especialidade estiver registrada no CRO-AL (Código de Ética, art. 44, II). Área de atuação, procedimento e técnica só depois do título dessa especialidade ou de "clínico geral" (art. 43, § 1º, I): a frase "Hoje atuo na clínica geral…" fica fixa no primeiro parágrafo do Sobre, antes desta seção (D43, D45).
3. Nenhuma promessa de resultado (Res. CFO-196/2019, art. 2º, § 1º). Superlativo fica fora por tom de voz (DESIGN.md, seção 8), não por regra do CFO.
4. Só procedimentos odontológicos (Res. CFO-230/2020, art. 2º).
5. Antes e depois só com TCLE e com nome e CRO na imagem (Res. CFO-196/2019, arts. 2º e 4º), publicados em nome dela, nunca da clínica ("CFO Esclarece", interpretação).
6. Texto fala com os dois públicos (PRD, D1) sem parecer confuso.

## Acessibilidade

- O carrossel é uma lista com rótulo ("Casos, deslize para o lado"), focável, e rola pelas setas do teclado. Cada item diz "Caso N de 5".
- As setas são botões com rótulo e `aria-controls`. A contagem e as barrinhas são decorativas (`aria-hidden`).
- Contraste medido em 390 px: legenda e texto dos serviços 13,82:1; rótulos 8,09:1.

## Desempenho

- Fotos por `next/image`, com carregamento preguiçoso e `sizes` por largura do cartão. Os WebP de origem têm de 26 a 83 KB.
- O único JS novo é o do carrossel: um ouvinte de `scroll` passivo que acha o caso da vez e, depois de 140 ms sem rolagem (ou no `scrollend`, onde chega), faz o salto do laço; e um de `resize` que recentraliza o caso da vez.

## Fora de escopo

- Preços e pacotes (vetados).
- Separar as fotos em antes e depois, ou cortar as metades.

## Critérios de aceite

Em `tasks/services-section.md`.
