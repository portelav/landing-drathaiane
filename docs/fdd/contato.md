# FDD: Seção Contato e rodapé

Status: rodapé implementado (Fase 1); seção Contato implementada, aguardando conferência (Fase 2); faltam e-mail, duração, acessibilidade do prédio e demais perguntas
PRD: seção 6, item Contato e rodapé; D26, D27 e D32 a D34
Plano da seção: `tasks/contact-section.md`
Plano do rodapé: `tasks/footer-and-menu-anchors.md`

## Objetivo

O visitante sabe como falar com ela e chama no WhatsApp; e toda a página carrega a identificação que o CFO exige.

## Rodapé (Fase 1)

### Objetivo

Fechar a página com a identificação obrigatória e os canais de contato, e ter sido o destino de "Contato" no menu até a seção completa existir (D26).

### Conteúdo

Só o que já está publicado no site (D3):

- Identificação, uma parte por linha: "Dra. Thaiane Lessa", "Cirurgiã-Dentista", "CRO/AL-6418". O art. 43 do Código de Ética exige nome, profissão e número de inscrição, não um separador.
- Direitos (D27): "© 2026 Dra. Thaiane Lessa. Todos os direitos reservados."
- Canais: WhatsApp (`https://wa.me/5582993871990`), telefone "(82) 99387-1990" (`tel:+5582993871990`), Instagram "@thaiane_lessa" (`https://instagram.com/thaiane_lessa`).

Os dados de contato vêm de `src/lib/contact.ts`, a mesma fonte do header.

### Comportamento

- `<footer>` depois do conteúdo da página, montado em `layout.tsx` como par do header. Server Component, sem JavaScript.
- Colofão no fundo da própria página (`light-base`), sem bloco de cor: a página termina no mesmo tom em que é lida. Um traço `dark-10` no topo separa o rodapé da última seção. Sinaliza `data-header-theme="light"`.
- Monograma (`BrandMark`) em `forest-900`, estático: fecha a página com a mesma marca que o preloader abriu.
- Identificação ao lado do monograma, em três linhas de Inter Tight (15 px): o nome em `dark-base`, profissão e CRO em `dark-base` a 70%.
- Canais em Inter Tight (15 px), como links discretos no estilo do menu do header. Sem ícone e sem serifa grande.
- Direitos numa linha pequena embaixo, em `dark-base` a 70%.
- Celular: monograma, identificação, canais numa linha só (os três cabem em 390 px) e direitos, um embaixo do outro.
- A partir de `sm`: identificação à esquerda, canais numa coluna à direita. Cada linha da identificação fica na altura de um canal: as duas colunas usam linhas de 44 px em tela de toque e de 32 px com mouse (`pointer-fine`). Breakpoint em pixel, porque o rodapé não depende de foto nem de vídeo.
- WhatsApp e Instagram abrem em nova aba. O telefone abre o discador.
- A seção Contato da Fase 2 assumiu `#contato`; o rodapé é só rodapé, sem `id` e sem `h2`.

### Movimento

Nada anima. O rodapé é o ponto de repouso depois de três momentos seguidos dirigidos por scroll (hero, band, roleta). O hover dos canais é só de opacidade, como nos links do header.

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
- [x] Três canais com os destinos acima. WhatsApp e Instagram em nova aba. Área de toque de 44 px em tela de toque.
- [x] (Fase 1) Contato no menu levava ao rodapé; hoje leva à seção, ver abaixo.
- [x] Todo texto passa em 4,5:1, medido.
- [x] Foco visível em cada canal; ordem de leitura como acima.
- [x] Nada se move; com `prefers-reduced-motion` fica igual.

## Seção Contato (Fase 2)

### Conteúdo

O texto vem dela, sem mudança de sentido. Endereço, estacionamento, horário e rota ficam em `src/lib/contact.ts`; este doc descreve o campo, não repete o dado.

- Como chegar: endereço do consultório, link de rota para o Maps (D34), estacionamento e horário. Sem mapa embutido.
- Primeira consulta: quatro etapas numeradas (conversa e orientação de higiene oral, limpeza, avaliação, planejamento), em poucas linhas cada (D32).
- Perguntas frequentes: por ora a de valor, com a resposta dela (D32). Sem número, faixa nem forma de pagamento (D29).
- WhatsApp, o mesmo destino do header e do rodapé.

> TODO: e-mail (sim ou não), duração da consulta, acessibilidade do prédio e as demais perguntas e respostas. A doutora ainda não mandou; não bloqueia a seção.

Fora por decisão do Lucas (2026-10-11): link do perfil e das avaliações do Google, até haver mais avaliações (D33 parada, D39).

### Comportamento

- `<section id="contato">` depois da linha do tempo do Sobre, em `light-base`, com `data-header-theme="light"`. Server Component, sem JavaScript no cliente. Assume a âncora `#contato`; o rodapé deixa de ter `id` (D26).
- `h2` "Contato" em Instrument Serif; três blocos com `h3` em rótulo de caixa-alta: Como chegar, Primeira consulta, Perguntas frequentes.
- Primeira consulta é uma `<ol>`; cada etapa tem título curto e uma frase dela.
- A pergunta é um `<details>`/`<summary>` nativo: teclado, foco e leitor de tela já vêm do navegador. Fechada por padrão.
- Celular e iPad retrato: o título vem em cima e os blocos abaixo, em uma coluna (celular) ou duas lado a lado (a partir de `sm`). A partir de `lg`: título à esquerda, preso no topo da tela (`position: sticky`, sem JavaScript), e os blocos empilhados à direita; o título solta quando o texto acaba. Breakpoint em pixel, porque a seção não depende de foto nem de vídeo. No celular o título não prende: duas linhas grandes no topo comeriam a tela.
- O link de rota usa a busca do Maps pelo endereço e abre em nova aba (`rel="noopener noreferrer"`). A chamada do WhatsApp abre em nova aba.

### Movimento

O título preso a partir de `lg` é posição, não animação: nada se move sozinho nem acompanha o scroll com cálculo. O `<details>` abre sem transição. Com `prefers-reduced-motion` é igual.

### Regras

1. Se mencionar convênios, só os nomes (art. 43, § 1º, IV); nunca condição de pagamento.
2. Sem formulário: o contato sai para o WhatsApp. Formulário exige novo `/kickoff` (LGPD, ADD).
3. Endereço do consultório, nunca o de casa (D34).
4. Nenhuma avaliação, nome ou foto de paciente na página (CEO art. 44, VI).
5. Pergunta sobre valor sem número, faixa, "a partir de" ou forma de pagamento (D29, D32). Nada de "gratuito" ou "sem compromisso" (CEO art. 20, IX). A palavra "valor" só vale na pergunta que recusa o preço (DESIGN.md, seção 8).
6. Primeira consulta e perguntas frequentes sem promessa de resultado (Res. CFO-196/2019, art. 2º, § 1º) e sem nomear área de atuação (CEO art. 43, § 1º, I).

### Acessibilidade

- Landmark: `<section>` com `aria-labelledby` apontando para o `h2`. Hierarquia `h2`, `h3`.
- Etapas numa lista ordenada: o leitor anuncia "1 de 4".
- Os links de rota e de WhatsApp levam "(abre em nova aba)" só para leitor de tela.
- Toque de 44 px nos links e no `summary`; foco visível em todos.
- Texto secundário em `dark-base` a 70% sobre `light-base`: 6,14:1 (DESIGN.md, seção 3).

### Desempenho

Sem mapa embutido (D34): o endereço leva à rota por link, sem script nem cookie de terceiro. Sem mídia e sem JavaScript no cliente.

### Critérios de aceite

Verificáveis em 390 px, iPad retrato e computador:

- [ ] `#contato` mostra endereço, link de rota, estacionamento, horário, as 4 etapas e a pergunta de valor, sem texto cortado nem rolagem horizontal.
- [ ] O link de rota abre o Maps no endereço certo, em nova aba.
- [ ] A resposta sobre valor é idêntica ao texto dela; nenhum número, faixa, "a partir de" nem forma de pagamento.
- [ ] "Contato" no menu leva à seção (computador com Lenis e celular) e o header inverte o tema certo.
- [ ] O rodapé vem logo depois, com a identificação intacta e sem `id="contato"`.
- [ ] A pergunta abre e fecha por teclado (Enter e espaço), com foco visível.
- [ ] Todo texto passa em 4,5:1; toque de 44 px.
- [ ] Nada se move; com `prefers-reduced-motion` fica igual.

## Fora de escopo

- Agendamento online.
- Crédito do site no rodapé (D27).
