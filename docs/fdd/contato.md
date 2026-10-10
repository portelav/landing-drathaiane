# FDD: Seção Contato e rodapé

Status: rodapé implementado (Fase 1); seção Contato em rascunho (conteúdo pendente, Fase 2)
PRD: seção 6, item Contato e rodapé; D26 e D27
Plano do rodapé: `tasks/footer-and-menu-anchors.md`

## Objetivo

O visitante sabe como falar com ela e chama no WhatsApp; e toda a página carrega a identificação que o CFO exige.

## Rodapé (Fase 1)

### Objetivo

Fechar a página com a identificação obrigatória e os canais de contato, e ser o destino de "Contato" no menu enquanto a seção completa não existe (D26).

### Conteúdo

Só o que já está publicado no site (D3):

- Identificação, uma parte por linha: "Dra. Thaiane Lessa", "Cirurgiã-Dentista", "CRO/AL-6418". O art. 43 do Código de Ética exige nome, profissão e número de inscrição, não um separador.
- Direitos (D27): "© 2026 Dra. Thaiane Lessa. Todos os direitos reservados."
- Canais: WhatsApp (`https://wa.me/5582993871990`), telefone "(82) 99387-1990" (`tel:+5582993871990`), Instagram "@thaiane_lessa" (`https://instagram.com/thaiane_lessa`).

Os dados de contato vêm de `src/lib/contact.ts`, a mesma fonte do header.

### Comportamento

- `<footer id="contato">` depois do conteúdo da página, montado em `layout.tsx` como par do header. Server Component, sem JavaScript.
- Colofão no fundo da própria página (`light-base`), sem bloco de cor: a página termina no mesmo tom em que é lida. Um traço `dark-10` no topo separa o rodapé da última seção. Sinaliza `data-header-theme="light"`.
- Monograma (`BrandMark`) em `forest-900`, estático: fecha a página com a mesma marca que o preloader abriu.
- Identificação ao lado do monograma, em três linhas de Inter Tight (15 px): o nome em `dark-base`, profissão e CRO em `dark-base` a 70%.
- Canais em Inter Tight (15 px), como links discretos no estilo do menu do header. Sem ícone e sem serifa grande.
- Direitos numa linha pequena embaixo, em `dark-base` a 70%.
- Celular: monograma, identificação, canais numa linha só (os três cabem em 390 px) e direitos, um embaixo do outro.
- A partir de `sm`: identificação à esquerda, canais numa coluna à direita. Cada linha da identificação fica na altura de um canal: as duas colunas usam linhas de 44 px em tela de toque e de 32 px com mouse (`pointer-fine`). Breakpoint em pixel, porque o rodapé não depende de foto nem de vídeo.
- WhatsApp e Instagram abrem em nova aba. O telefone abre o discador.
- Quando a seção Contato da Fase 2 existir, ela assume `#contato`, e o rodapé fica só como rodapé.

### Movimento

Nada anima. O rodapé é o ponto de repouso depois de três momentos seguidos dirigidos por scroll (hero, band, roleta). O hover dos canais é só de opacidade, como nos links do header.

### Regras

1. A identificação aparece inteira, em toda largura de tela, com o nome em `dark-base` sobre `light-base` (CEO art. 43).
2. Nenhum dado que a doutora não tenha publicado. Endereço, horários e e-mail ficam para a Fase 2.
3. Nenhuma palavra vetada (DESIGN.md, seção 8). Nenhuma imagem além do monograma.
4. Todo texto passa em 4,5:1, inclusive o secundário, que usa `dark-base` a 70% (DESIGN.md, seção 3).

### Acessibilidade

- O `<footer>` é o landmark `contentinfo`.
- Ordem de leitura: "Contato" (`h2` só para leitor de tela), identificação, canais, direitos.
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
- [x] Contato no menu leva ao rodapé, no computador (com o Lenis) e no celular.
- [x] Todo texto passa em 4,5:1, medido.
- [x] Foco visível em cada canal; ordem de leitura como acima.
- [x] Nada se move; com `prefers-reduced-motion` fica igual.

## Seção Contato (Fase 2)

### Conteúdo

> TODO: endereço, horários, mapa (sim ou não), e-mail. A doutora já tem e ainda não mandou.

### Comportamento

> TODO: definir no `/plan` da seção. Ela assume a âncora `#contato`, que hoje leva ao rodapé (D26).

### Movimento

> TODO

### Regras

1. Se mencionar convênios, só os nomes (art. 43, § 1º, IV); nunca condição de pagamento.
2. Sem formulário: o contato sai para o WhatsApp. Formulário exige novo `/kickoff` (LGPD, ADD).

### Acessibilidade

> TODO

### Desempenho

> TODO: mapa embutido pesa e carrega script de terceiro. Se entrar, carregamento preguiçoso ou imagem estática com link.

### Critérios de aceite

> TODO: definir no `/plan` da seção.

## Fora de escopo

- Agendamento online.
- Crédito do site no rodapé (D27).
