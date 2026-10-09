# FDD: Seção Contato e rodapé

Status: rascunho
PRD: seção 6, item Contato e rodapé

## Objetivo

O visitante sabe onde e quando ela atende e chama no WhatsApp; e toda a página carrega a identificação que o CFO exige.

## Conteúdo

Já existe no código (`src/components/header.tsx`): telefone (82) 99387-1990, WhatsApp, Instagram `@thaiane_lessa`.

> TODO: endereço, horários, mapa (sim ou não), e-mail. A doutora já tem e ainda não mandou.

Identificação fixa do rodapé: "Dra. Thaiane Lessa · Cirurgiã-Dentista · CRO/AL-6418".

## Comportamento

> TODO: definir no `/plan`. Âncora `#contato`, já declarada no menu.

## Movimento

> TODO

## Regras

1. Nome, "Cirurgiã-Dentista" e CRO/AL-6418 visíveis no rodapé, em toda largura de tela (CEO art. 43).
2. Se mencionar convênios, só os nomes (art. 43, § 1º, IV); nunca condição de pagamento.
3. Sem formulário: o contato sai para o WhatsApp. Formulário exige novo `/kickoff` (LGPD, ADD).

## Acessibilidade

> TODO

## Desempenho

> TODO: mapa embutido pesa e carrega script de terceiro; se entrar, carregamento preguiçoso ou imagem estática com link.

## Fora de escopo

- Agendamento online.

## Critérios de aceite

> TODO: definir no `/plan`. Mínimo: rodapé com a identificação legível em 390 px.
