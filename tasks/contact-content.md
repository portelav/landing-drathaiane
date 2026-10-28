# Conteúdo do Contato e "clínica geral" no Sobre

**Branch:** `feat/contact-content` · **Status:** Feito (PR #22)

## Objetivo
- Pôr no site o que a doutora mandou em 2026-10-27 para o Contato e deixar "clínica geral" visível antes de qualquer área de atuação ou procedimento, também com `prefers-reduced-motion`.

## Escopo
- **Dentro:**
  - Contato: e-mail, duração da primeira consulta, acessibilidade do prédio e 4 perguntas frequentes novas.
  - Sobre: frase de abertura dela no primeiro parágrafo.
  - PRD, FDD do Contato e ROADMAP atualizados.
- **Fora:**
  - Seção Serviços (outra branch).
  - Nome do curso e da instituição da especialização (não chegou; o Sobre continua com "Concluí a especialização em dentística").
  - E-mail no rodapé.
  - A linha do preloader: já diz "Clínica geral · Dentística estética e restauradora" e fica como está.

## Conteúdo e regras de fora
- Conteúdo da doutora necessário: chegou em 2026-10-27 (texto literal nas notas privadas, `pauta.md`).
  - E-mail: `dra.thaianelessa@gmail.com`.
  - Primeira consulta: "dura em média 90 minutos".
  - Prédio: "tem elevador e acesso para cadeirante".
  - Perguntas: limpeza, clareamento, restauração e anestesia, duração de facetas e restaurações, com as respostas dela sem mudança de sentido.
  - Fica fora "Como funciona a primeira consulta?": repete as 4 etapas e não cita a limpeza.
- Regras que tocam esta entrega:
  - Art. 43, § 1º, I: área de atuação e procedimento precedidos de "clínico geral" enquanto não houver especialidade registrada. Hoje só o preloader diz isso, e com movimento reduzido ele some em 0,3 s. A frase dela no início do Sobre ("Atuo na clínica geral, com foco em dentística estética e restauradora.") deixa a menção fixa antes das perguntas frequentes e, depois, de Serviços.
  - Art. 44, II: nada de "especialista".
  - Res. CFO-196/2019, art. 2º, § 1º: as respostas não prometem resultado (conferido).
  - D29: a pergunta de valor continua sem número, faixa ou forma de pagamento.
  - DESIGN.md, seção 8: nenhuma palavra vetada nas respostas novas.

## Critérios de aceite
1. As perguntas frequentes mostram 5 itens: a de valor primeiro, depois as 4 dela na ordem em que mandou. Cada uma abre e fecha pelo teclado.
2. "Primeira consulta" diz que dura em média 90 minutos, junto das 4 etapas.
3. "Como chegar" tem um item "Acessibilidade" com elevador e acesso para cadeirante, no mesmo formato de Estacionamento e Horário.
4. O e-mail aparece no Contato como link `mailto:`, com toque de 44 px e foco visível, ao lado da chamada do WhatsApp.
5. O primeiro parágrafo do Sobre começa por "Atuo na clínica geral, com foco em dentística estética e restauradora."; a animação de linhas continua certa em 390 px, iPad retrato e computador, e com `prefers-reduced-motion`.
6. Nenhuma palavra vetada; texto secundário em 4,5:1 (mesmos tokens de hoje).
7. Lint e typecheck verdes.

## Arquivos
- `src/lib/contact.ts`: `EMAIL`, `EMAIL_HREF`, `ACCESSIBILITY`.
- `src/components/contact-section.tsx`: duração, item de acessibilidade, perguntas novas, e-mail.
- `src/components/about-text.tsx`: frase de abertura do primeiro parágrafo.
- `docs/fdd/contato.md`: conteúdo, `> TODO` resolvido, regra 6 (procedimentos depois de "clínica geral").
- `docs/PRD.md`: D43 (clínica geral fixa no Sobre; pergunta da primeira consulta fora do FAQ; e-mail só no Contato).
- `docs/ROADMAP.md`: Contato sem pendência de conteúdo.

## Checklist (até 10, em ordem)
1. [ ] Dados novos em `src/lib/contact.ts`.
2. [ ] Contato: duração, acessibilidade, e-mail.
3. [ ] Contato: 4 perguntas novas, com o texto dela.
4. [ ] Sobre: frase de abertura.
5. [ ] FDD, PRD (D43) e ROADMAP.
6. [ ] Lint e typecheck.
7. [ ] QA pelo MCP em 390 px, iPad retrato e computador, também com movimento reduzido.

---

## Feito e verificado
- Arquivos: os seis da lista acima. O comentário do `ContactSection` deixou de falar em "a pergunta".
- Desvio: animação da resposta do FAQ (450 ms, só `opacity` e `translate`), pedida pelo Lucas; FDD atualizado. O e-mail ficou numa linha própria, "Ou escreva para …", embaixo da chamada do WhatsApp.
- Critérios 1 a 4: conferidos pelo MCP em 390 px (toque), iPad retrato 810 px e computador 1440 px. 5 perguntas na ordem; duração, acessibilidade e e-mail presentes; `summary` e link do e-mail com 44 px em toque e 32 px com mouse; sem rolagem horizontal.
- Critério 5: frase no início do Sobre, conferida em 390 px com movimento e no iPad com `prefers-reduced-motion` (texto inteiro, parado).
- Critério 6: textos dela sem palavra vetada; tokens e cores iguais aos de antes.
- Critério 7: lint e typecheck verdes.
