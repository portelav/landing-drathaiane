# FDD: Seção Contato e rodapé

Status: rodapé aprovado (Fase 1); seção Contato em rascunho (conteúdo pendente, Fase 2)
PRD: seção 6, item Contato e rodapé; D26 e D27
Plano do rodapé: `tasks/footer-and-menu-anchors.md`

## Objetivo

O visitante sabe como falar com ela e chama no WhatsApp; e toda a página carrega a identificação que o CFO exige.

## Rodapé (Fase 1)

### Objetivo

Fechar a página com a identificação obrigatória e os canais de contato, e ser o destino de "Contato" no menu enquanto a seção completa não existe (D26).

### Conteúdo

Só o que já está publicado no site (D3):

- Identificação: "Dra. Thaiane Lessa · Cirurgiã-Dentista · CRO/AL-6418".
- Direitos (D27): "© 2026 Dra. Thaiane Lessa. Todos os direitos reservados."
- Canais: WhatsApp (`https://wa.me/5582993871990`), telefone "(82) 99387-1990" (`tel:+5582993871990`), Instagram "@thaiane_lessa" (`https://instagram.com/thaiane_lessa`).

Os dados de contato vêm de `src/lib/contact.ts`, a mesma fonte do header.

### Comportamento

- `<footer id="contato">` depois do conteúdo da página, montado em `layout.tsx` como par do header. Server Component, sem JavaScript.
- Fundo `forest-900`, texto `light-base`. Sinaliza `data-header-theme="dark"` para o header inverter quando passar por cima.
- Primeiro bloco:
  - Monograma (`BrandMark`) estático: fecha a página com a mesma marca que o preloader abriu.
  - Rótulo "Contato" em caixa-alta.
  - Os três canais em Instrument Serif, como no menu compacto. Sem ícone: editorial, não institucional.
- Um traço `light-15` separa os dois blocos.
- Segundo bloco:
  - A identificação em `light-base` cheio. Cada parte (nome, profissão, CRO) não quebra no meio; a linha só quebra nos separadores.
  - Os direitos em texto secundário.
- No celular os blocos empilham; a partir de `sm`, identificação e direitos ficam lado a lado. Breakpoint em pixel, porque o rodapé não depende de foto nem de vídeo.
- WhatsApp e Instagram abrem em nova aba. O telefone abre o discador.
- Quando a seção Contato da Fase 2 existir, ela assume `#contato`, e o rodapé fica só como rodapé.

### Movimento

Nada anima. O rodapé é o ponto de repouso depois de três momentos seguidos dirigidos por scroll (hero, band, roleta). O hover dos canais é só de opacidade, como nos links do header.

### Regras

1. A identificação aparece exata, em toda largura de tela, em `light-base` sobre `forest-900` (CEO art. 43).
2. Nenhum dado que a doutora não tenha publicado. Endereço, horários e e-mail ficam para a Fase 2.
3. Nenhuma palavra vetada (DESIGN.md, seção 8). Nenhuma imagem além do monograma.
4. Todo texto passa em 4,5:1, inclusive o secundário. `light-40` não serve aqui.

### Acessibilidade

- O `<footer>` é o landmark `contentinfo`.
- Ordem de leitura: rótulo "Contato" (`h2`), canais, identificação, direitos.
- O monograma tem `aria-hidden`.
- O nome acessível de cada canal contém o texto visível. Os que abrem em nova aba levam "(abre em nova aba)" só para leitor de tela.
- Cada canal tem área de toque de pelo menos 44 px de altura, e foco visível.

### Desempenho

Sem mídia: o monograma é SVG inline. Sem JavaScript no cliente.

### Critérios de aceite

Verificáveis em 390 px, iPad retrato e computador:

- [ ] Identificação exata e inteira, sem cortar.
- [ ] Linha de direitos presente.
- [ ] Três canais com os destinos acima. WhatsApp e Instagram em nova aba. Área de toque de pelo menos 44 px.
- [ ] Contato no menu leva ao rodapé, no computador (com o Lenis) e no celular.
- [ ] Todo texto passa em 4,5:1, medido.
- [ ] Foco visível em cada canal; ordem de leitura como acima.
- [ ] Nada se move; com `prefers-reduced-motion` fica igual.

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
