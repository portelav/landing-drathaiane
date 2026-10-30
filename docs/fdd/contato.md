# FDD: Seção Contato e rodapé

Status: rodapé implementado (Fase 1); seção Contato implementada (Fase 2), com o conteúdo completo desde 2026-10-27
PRD: seção 6, item Contato e rodapé; D26, D27, D32 a D34, D40 e D43; ADR 0005
Plano da seção: `tasks/contact-section.md`
Plano do rodapé: `tasks/footer-and-menu-anchors.md`

## Objetivo

O visitante sabe como falar com ela e chama no WhatsApp; e toda a página carrega a identificação que o CFO exige.

## Rodapé (Fase 1)

### Objetivo

Fechar a página com a identificação obrigatória e os canais de contato, e ter sido o destino de "Contato" no menu até a seção completa existir (D26).

### Conteúdo

Só o que já está publicado no site (D3):

- Identificação: "Dra. Thaiane Lessa", e embaixo "Cirurgiã-Dentista · CRO/AL-6418". O art. 43 do Código de Ética exige nome, profissão e número de inscrição.
- Direitos (D27): "© 2026 Dra. Thaiane Lessa. Todos os direitos reservados."
- Canais: telefone "(82) 99661-0348" (`tel:+5582996610348`), o número da clínica (D45), Instagram "@thaiane_lessa" (`https://instagram.com/thaiane_lessa`) e "Voltar ao topo" (`#`). O WhatsApp ficou só no header e na seção Contato; o telefone repete a seção de propósito.

Os dados de contato vêm de `src/lib/contact.ts`, a mesma fonte do header.

### Comportamento

- `<footer>` depois do conteúdo da página, montado em `layout.tsx` como par do header. Server Component, sem JavaScript.
- Colofão no fundo da própria página (`light-base`), sem bloco de cor: a página termina no mesmo tom em que é lida. Um traço `dark-10` no topo separa o rodapé da última seção. Sinaliza `data-header-theme="light"`.
- Monograma (`BrandMark`) em `forest-900`, estático: fecha a página com a mesma marca que o preloader abriu.
- Identificação ao lado do monograma, em duas linhas de Inter Tight (15 px): o nome em `dark-base`, profissão e CRO em `dark-base` a 70%.
- Links em Inter Tight (15 px), discretos, no estilo do menu do header. Sem ícone e sem serifa grande.
- Direitos numa linha pequena embaixo, em `dark-base` a 70%.
- Celular: monograma e identificação, os links embaixo (quebram linha se faltar largura) e os direitos, um embaixo do outro.
- A partir de `sm`: uma faixa baixa, identificação à esquerda e links à direita, na mesma borda do conteúdo da seção Contato (`max-w-[78rem]`, 24 px no celular e 40 px a partir de `sm`). Links com 44 px de altura em toque e 32 px com mouse (`pointer-fine`). Breakpoint em pixel, porque o rodapé não depende de foto nem de vídeo.
- O Instagram abre em nova aba. O telefone abre o discador. "Voltar ao topo" rola para o início da página.
- A seção Contato da Fase 2 assumiu `#contato`; o rodapé é só rodapé, sem `id` e sem `h2`.

### Movimento

Nada anima sozinho. O rodapé é o ponto de repouso depois de três momentos seguidos dirigidos por scroll (hero, band, roleta). O hover dos links é só de opacidade, como no header. Exceção, por clique: "Voltar ao topo" sobe a página em 1,8 s, com `ease-out` (Lenis onde ele roda, scroll suave do navegador no resto), também com `prefers-reduced-motion` (PRD, D52).

### Regras

1. A identificação aparece inteira, em toda largura de tela, com o nome em `dark-base` sobre `light-base` (CEO art. 43).
2. Nenhum dado que a doutora não tenha publicado. Endereço, horários e e-mail ficam para a Fase 2.
3. Nenhuma palavra vetada (DESIGN.md, seção 8). Nenhuma imagem além do monograma.
4. Todo texto passa em 4,5:1, inclusive o secundário, que usa `dark-base` a 70% (DESIGN.md, seção 3).

### Acessibilidade

- O `<footer>` é o landmark `contentinfo`.
- Ordem de leitura: identificação, canais, direitos.
- O monograma tem `aria-hidden`.
- O nome acessível de cada canal contém o texto visível. Os que abrem em nova aba levam "(abre em nova aba)" só para leitor de tela.
- Em tela de toque, cada canal tem área de toque de 44 px de altura; com mouse, 32 px. Foco visível em todos.

### Desempenho

Sem mídia: o monograma é SVG inline. Sem JavaScript no cliente.

### Critérios de aceite

Verificáveis em 390 px, iPad retrato e computador:

- [x] Identificação exata e inteira, sem cortar.
- [x] Linha de direitos presente.
- [x] Três links: telefone, Instagram (nova aba) e voltar ao topo. Área de toque de 44 px em tela de toque.
- [x] (Fase 1) Contato no menu levava ao rodapé; hoje leva à seção, ver abaixo.
- [x] Todo texto passa em 4,5:1, medido.
- [x] Foco visível em cada canal; ordem de leitura como acima.
- [x] Nada se move; com `prefers-reduced-motion` fica igual.

## Seção Contato (Fase 2)

### Conteúdo

O texto vem dela, sem mudança de sentido. Endereço, estacionamento, horário e rota ficam em `src/lib/contact.ts`; este doc descreve o campo, não repete o dado.

- Primeira consulta: a foto das sacolas que ela entrega nessa consulta (`public/images/primeira-consulta.webp`, 3:4) e quatro etapas numeradas (conversa e orientação de higiene oral, limpeza, avaliação, planejamento), em poucas linhas cada (D32). A duração média saiu (D48).
- Como chegar: endereço do consultório, mapa estático do Mapbox com o pino (ADR 0005, D40) que abre a rota no Maps, estacionamento, horário e acessibilidade do prédio. Sem token, cai no link de rota em texto.
- Perguntas frequentes: a de valor primeiro (D32), sem número, faixa nem forma de pagamento (D29); depois quatro dela, sobre limpeza, clareamento, restauração e duração dos tratamentos. A que ela mandou sobre a primeira consulta fica fora, porque repete as etapas (D43).
- Retrato dela (`public/images/dra-thaiane-retrato.webp`, 4:5) e, embaixo, o botão "Chamar no WhatsApp", o mesmo destino do header, com a mensagem pronta (D48). O e-mail saiu: o WhatsApp é o único canal escrito (D45).

Fora por decisão do Lucas (2026-10-11): link do perfil e das avaliações do Google, até haver mais avaliações (D33 parada, D39).

### Comportamento

- `<section id="contato">` depois da linha do tempo do Sobre, em `light-base`, com `data-header-theme="light"`. Server Component, sem JavaScript no cliente. Assume a âncora `#contato`; o rodapé deixa de ter `id` (D26).
- Rótulo "Contato" e `h2` "O que esperar e como chegar" em Instrument Serif (D48); três blocos com `h3` em rótulo de caixa-alta, nesta ordem: Primeira consulta, Como chegar, Perguntas frequentes. No fim, o retrato e o botão.
- No celular a foto das sacolas vai de lado a lado, como os casos de Serviços. A partir de `sm`, ela fica numa coluna de até 22rem, sobre as etapas; a partir de `lg`, onde a coluna é larga, vai ao lado delas (18rem), como a foto e o texto da band. A forma do computador saiu de um protótipo em 1280 × 800 (Lucas, 2026-10-29).
- O retrato fica numa coluna de até 22rem, com o botão embaixo, da mesma largura, para os dois lerem como um bloco só. As duas passam pelo `next/image`, com carregamento preguiçoso.
- O botão é o mesmo de Serviços (`call-link.tsx`): bloco com contorno, sem raio. Em Serviços ele tem a largura do texto a partir de `sm`; aqui, com `fill`, a do retrato.
- Primeira consulta é uma `<ol>`; cada etapa tem título curto e uma frase dela.
- Cada pergunta é um `<details>`/`<summary>` nativo: teclado, foco e leitor de tela já vêm do navegador. Fechadas por padrão.
- Celular e iPad retrato: o título vem em cima e os blocos abaixo, em uma coluna (celular) ou duas lado a lado (a partir de `sm`). A partir de `lg`: título à esquerda, preso no topo da tela (`position: sticky`, sem JavaScript), e os blocos empilhados à direita; o título solta quando o texto acaba. Breakpoint em pixel, porque a seção não depende de foto nem de vídeo. No celular o título não prende: duas linhas grandes no topo comeriam a tela.
- O mapa é um link: tocar abre o Maps, em nova aba (`rel="noopener noreferrer"`), na mesma coordenada do pino. A imagem passa pelo `next/image`, então o navegador não fala com o Mapbox. A chamada do WhatsApp abre em nova aba.

### Movimento

O título preso a partir de `lg` é posição, não animação: nada se move sozinho nem acompanha o scroll com cálculo. Ao abrir uma pergunta, a resposta aparece em 450 ms, com um ease-out cúbico (`cubic-bezier(0.33, 1, 0.68, 1)`): sobe 8 px e vai de transparente a visível, a cada abertura (`animate-details-in` no `::details-content`, só `opacity` e `translate`). O `@starting-style` de antes só tocava na primeira: o Chrome não recalcula o estilo do conteúdo de um `<details>` fechado. Fechar é instantâneo. Com `prefers-reduced-motion` é igual (PRD, D52).

### Regras

1. Se mencionar convênios, só os nomes (art. 43, § 1º, IV); nunca condição de pagamento.
2. Sem formulário: o contato sai para o WhatsApp. Formulário exige novo `/kickoff` (LGPD, ADD).
3. Endereço do consultório, nunca o de casa (D34).
4. Nenhuma avaliação, nome ou foto de paciente na página (CEO art. 44, VI). Nas fotos, só ela e as sacolas; texto e `alt` das sacolas sem "brinde" nem "grátis" (CEO art. 20, VIII, e art. 44, I).
5. Pergunta sobre valor sem número, faixa, "a partir de" ou forma de pagamento (D29, D32). Nada de "gratuito" ou "sem compromisso" (CEO art. 20, IX). A palavra "valor" só vale na pergunta que recusa o preço (DESIGN.md, seção 8).
6. Primeira consulta e perguntas frequentes sem promessa de resultado (Res. CFO-196/2019, art. 2º, § 1º). As perguntas citam procedimentos, o que só vale depois de "clínica geral" enquanto não houver especialidade registrada (CEO art. 43, § 1º, I): a menção fixa está no primeiro parágrafo do Sobre, antes desta seção (D43, D45).

### Acessibilidade

- Landmark: `<section>` com `aria-labelledby` apontando para o `h2`. Hierarquia `h2`, `h3`.
- Etapas numa lista ordenada: o leitor anuncia "1 de 4".
- Os links de rota e de WhatsApp levam "(abre em nova aba)" só para leitor de tela.
- Toque de 44 px nos links e no `summary`; foco visível em todos.
- Texto secundário em `dark-base` a 70% sobre `light-base`: 6,14:1 (DESIGN.md, seção 3).

### Desempenho

Mapa estático (ADR 0005, D40): sem script e sem cookie de terceiro no navegador; o servidor busca a imagem no Mapbox e a guarda em cache. As duas fotos saem do `next/image` no tamanho de exibição, preguiçosas e com o espaço reservado (`width` e `height`), sem metadado no arquivo. Sem JavaScript no cliente.

### Critérios de aceite

Verificáveis em 390 px, iPad retrato e computador:

- [ ] `#contato` mostra, nesta ordem, a foto das sacolas e as 4 etapas, o endereço, o link de rota, estacionamento, horário e acessibilidade, as 5 perguntas, o retrato e o botão, sem duração, sem e-mail, sem texto cortado nem rolagem horizontal.
- [ ] O mapa mostra o pino no consultório e abre a rota no Maps, em nova aba. Sem o token, aparece o link de rota em texto.
- [ ] A resposta sobre valor é idêntica ao texto dela; nenhum número, faixa, "a partir de" nem forma de pagamento.
- [ ] "Contato" no menu leva à seção (computador com Lenis e celular) e o header inverte o tema certo.
- [ ] O rodapé vem logo depois, com a identificação intacta e sem `id="contato"`.
- [ ] Cada pergunta abre e fecha por teclado (Enter e espaço), com foco visível.
- [ ] Todo texto passa em 4,5:1; toque de 44 px.
- [ ] Nada se move sozinho; com `prefers-reduced-motion` a resposta entra igual (D52).

## Fora de escopo

- Agendamento online.
- Crédito do site no rodapé (D27).
