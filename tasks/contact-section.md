# Seção Contato (Fase 2, primeira entrega)

**Slug:** `contact-section`
**Branch:** `feat/contact-section`
**Área:** seção nova (FDD, componente, página) · **Dono:** Lucas
**Status:** Done (PR #17 mergeado em 2026-10-13); o que falta é conteúdo dela, no ROADMAP (Fase 2)
**Gate S2:** Livre

---

## Stage 1 — Scope Analysis

### Documentos
- **PRD:** `docs/PRD.md` seções 6 (escopo), "Regras de fora", 10 (Fase 2) e 12 (D26, D29, D32, D33, D34, D38)
- **FDD:** `docs/fdd/contato.md` (existe; a parte "Seção Contato (Fase 2)" tem `> TODO` e é escrita neste plano)
- **ADR relacionado:** nenhum (sem mudança de stack: Server Component, sem JavaScript novo)
- **Conteúdo dela:** `private/pauta.md`, seção "Recebido em 2026-10-11" (notas privadas, não vão para docs públicos)

### Objetivo
- O visitante chega ao consultório (endereço, rota, estacionamento, horário), sabe como é a primeira consulta, tira a dúvida mais comum (valor) e chama no WhatsApp, tudo a um toque de distância do menu.
- Contato deixa de ser o rodapé e passa a ser uma seção. O rodapé volta a ser só rodapé (D26).

### Escopo e não-escopo
- **Dentro:**
  - Seção `#contato` depois da linha do tempo do Sobre, em `light-base`.
  - Como chegar: endereço, link de rota para o Maps, estacionamento, horário.
  - Primeira consulta: as 4 etapas, com o texto dela.
  - Perguntas frequentes: por ora uma pergunta, a de valor, com a resposta dela, sem número, faixa nem forma de pagamento (D29, D32).
  - Chamada para o WhatsApp (mesmo destino do header e do rodapé).
  - Rodapé sem `id="contato"` e sem o `h2` só para leitor de tela.
  - Docs: FDD, DESIGN.md, ROADMAP, PRD, CLAUDE.md.
- **Fora:**
  - Link para o perfil e as avaliações do Google. Lucas decidiu em 2026-10-11: fica fora até haver mais avaliações. A D33 segue válida, mas parada.
  - E-mail, duração da consulta, acessibilidade do prédio e as demais perguntas do FAQ: `> TODO` no FDD até ela mandar.
  - Vídeo da recepção (hero): pendente da autorização escrita, outro assunto.
  - Mapa embutido (D34), formulário, analytics.
  - Botão flutuante de WhatsApp: decisão continua em aberto (memória do projeto), não entra aqui.

### Conteúdo e regras de fora
- Conteúdo da doutora necessário: endereço, estacionamento, horário, 4 etapas, resposta sobre valor. **Já chegou (2026-10-11).** O que falta (e-mail, duração, acessibilidade, outras perguntas) é `> TODO` e não bloqueia.
- O texto dela entra como veio, sem reescrever o sentido. O endereço e o horário ficam só no código da página (`src/lib/contact.ts`), que é o que o site publica; o FDD descreve o campo, não repete o dado.
- Regras que tocam esta entrega:
  - CEO art. 43, § 1º, IV: endereço, telefone, horário podem constar.
  - CEO art. 44, I e art. 20, IX: nenhum preço, forma de pagamento, "gratuito" ou "sem compromisso". A resposta dela passa: explica que o valor sai depois da avaliação e não traz número.
  - CEO art. 44, II e art. 43, § 1º, I: "Dentística" não está registrada como especialidade, então nada de "especialista". A primeira consulta descreve o que acontece, sem nomear área de atuação.
  - Res. CFO-196/2019, art. 2º, § 1º: sem promessa de resultado nas etapas nem no FAQ.
  - CEO art. 44, VI: nenhum paciente, avaliação ou foto.
  - Endereço do consultório, nunca o de casa (D34).
- **Atrito com o DESIGN.md:** a seção 8 lista "valor" entre as palavras vetadas. A norma veda divulgar preço, não a palavra. A pergunta "Quanto custa o tratamento?" e a resposta dela usam a palavra para recusar o preço, o que é o caso que a D32 prevê. O DESIGN.md é ajustado nesta entrega para dizer isso (item 2). Não é leitura de borda: não há conflito com o texto literal.

### Critérios de aceite (testáveis)
1. Em 390 px, iPad retrato e computador, `#contato` mostra: endereço, link de rota, estacionamento, horário, as 4 etapas e a pergunta de valor, sem texto cortado nem rolagem horizontal.
2. O link de rota abre o Maps no endereço certo, em nova aba, com `rel="noopener noreferrer"` e aviso "(abre em nova aba)" para leitor de tela.
3. A resposta sobre valor está idêntica ao texto dela e não há número, faixa, "a partir de" nem forma de pagamento em nenhum ponto da seção.
4. "Contato" no menu leva à seção (computador com Lenis e celular) e o header inverte o tema certo ali.
5. O rodapé aparece logo depois, com a identificação intacta e sem `id="contato"` duplicado.
6. A pergunta abre e fecha por teclado (Enter e espaço), com foco visível.
7. Todo texto passa em 4,5:1, medido. Toque de 44 px nos links e na pergunta.
8. Nada se move; `prefers-reduced-motion` fica igual.
9. Lint, typecheck e build verdes; Lighthouse sem queda abaixo da barra (D37).
10. Nenhuma palavra vetada do DESIGN.md, seção 8, fora a ressalva de "valor" na pergunta do FAQ.

### Perguntas bloqueadoras
- Nenhuma.
- Não bloqueia, mas decide o acabamento: **uma pergunta só no FAQ** parece pouco. O componente aceita uma lista, então as outras entram quando ela mandar. Se o Lucas preferir esperar as outras perguntas antes de publicar a seção, avisar antes do `/exec`.

### Premissas
- Cidade na rota do Maps: Maceió (CLAUDE.md). O `/exec` confere no navegador que a busca cai no prédio certo.
- O link do perfil do Google (`share.google`) não entra: ficou ligado ao link das avaliações, que está fora. A rota usa a busca do Maps pelo endereço, sem depender daquele link.
- Rodapé e seção ficam encostados na mesma cor (`light-base`); o traço `dark-10` do rodapé separa os dois.

---

## Stage 2 — Evidence Gathering

| Arquivo | Evidência |
|---|---|
| `docs/fdd/contato.md` | Rodapé implementado; Seção Contato com `> TODO` em comportamento, movimento, acessibilidade, desempenho e critérios. Regras 1 a 6 já escritas. |
| `docs/PRD.md` | D26 (Contato leva ao rodapé até a seção existir), D29 (sem preço), D32 (primeira consulta e FAQ; pergunta de valor sem número), D33 (link das avaliações, parado), D34 (endereço com rota, sem mapa embutido). |
| `src/components/footer.tsx` | `<footer id="contato">` com `h2` só para leitor de tela; canais e identificação; classes de linha 44 px / 32 px com mouse. |
| `src/lib/contact.ts` | Canais (telefone, WhatsApp, Instagram) lidos por Server e Client Components; lugar natural para endereço, horário e rota. |
| `src/app/page.tsx` | Ordem: Hero, About, AboutText, AboutTimeline dentro de `<main>`; a seção entra depois da linha do tempo. |
| `src/components/about-timeline.tsx` | Fecha em `light-base` com `data-header-theme="light"`, então a seção nova continua no mesmo tom sem emenda. |
| `docs/design/DESIGN.md` | Seções 4 (tipografia), 5 (forma: quase sem raio, 24/40 px laterais), 6 (movimento; o rodapé é ponto de repouso), 7 (tabela de componentes), 8 (tom de voz e palavras vetadas). |

### Fluxo atual
- O menu tem Sobre e Contato; `#contato` cai no rodapé, que tem a identificação e três canais. Não há endereço, horário, primeira consulta nem FAQ no site. A primeira consulta já é citada em tom pessoal no texto do Sobre (segundo parágrafo); a nova parte é a versão objetiva, em etapas, e não repete o texto.

---

## Stage 3 — Architecture Planning

### Source of Truth (até 4 blocos)
1. `docs/fdd/contato.md`: o que a seção mostra, regras e critérios.
2. `src/lib/contact.ts`: endereço, estacionamento, horário e link de rota, ao lado dos canais que já moram ali.
3. `src/components/contact-section.tsx`: etapas da primeira consulta e perguntas (listas locais, como `PARAGRAPHS` no Sobre) e a marcação.
4. `docs/design/DESIGN.md`: componente novo, linha de movimento ("nenhum") e a ressalva sobre "valor".

### Decisão única
- Um Server Component estático, sem JavaScript no cliente: a pergunta usa `<details>`/`<summary>` nativo, que já traz teclado, foco e leitor de tela. Sem animação, sem biblioteca.

### Checklist de arquitetura (até 10)
- [ ] Convenções do Next 16 respeitadas: Server Component, sem `"use client"`, `next/link` não é necessário (âncora e links externos).
- [ ] Layout não depende de foto nem de vídeo: breakpoint de pixel (`sm`) como no rodapé, sem `wide:` nem `beside:`.
- [ ] Textos em português do Brasil; identificadores e comentários em inglês.
- [ ] Toque de 44 px (links e `summary`); foco visível; 390 px sem rolagem horizontal.
- [ ] Movimento: nenhum. Seria o quarto momento seguido dirigido por scroll; a decisão é ficar parado, como o rodapé, e dizer isso no FDD.
- [ ] Cores só por token (`light-base`, `dark-base`, `forest-*`); texto secundário em `dark-base` a 70%, 4,5:1.
- [ ] Nenhum dado de terceiro, preço, promessa nem palavra vetada; texto dela sem alteração de sentido.
- [ ] Sem script nem cookie de terceiro: rota é link, não mapa (D34).
- [ ] Rodapé sem `id` duplicado e sem `h2` repetido.
- [ ] Mídia: nenhuma nova.

---

## Stage 4 — Execution Planning

Um commit por item, na ordem do `/exec`.

1. [ ] FDD `docs/fdd/contato.md`: escrever comportamento, acessibilidade, desempenho, movimento (parado, e por quê) e critérios da seção; manter `> TODO` para e-mail, duração, acessibilidade do prédio e demais perguntas; sem repetir endereço nem horário.
2. [ ] `docs/design/DESIGN.md`: linha de componente `ContactSection`, linha de movimento "nenhum", e a ressalva de que "valor" só vale na pergunta do FAQ que recusa o preço.
3. [ ] `src/lib/contact.ts`: endereço, estacionamento, horário e link de rota do Maps (busca por endereço).
4. [ ] `src/components/contact-section.tsx`: Como chegar, Primeira consulta (`<ol>` com as 4 etapas), Perguntas frequentes (`<details>`), chamada para o WhatsApp.
5. [ ] `src/components/footer.tsx`: tirar `id="contato"` e o `h2` oculto.
6. [ ] `src/app/page.tsx`: montar `ContactSection` depois de `AboutTimeline`.
7. [ ] Verificação no navegador (390 px, iPad retrato, computador): rota, menu, teclado, contraste; lint, typecheck e build.
8. [ ] Docs de fechamento: `docs/ROADMAP.md` (Contato parcial, o que falta), `docs/PRD.md` (D39: link das avaliações fora até haver mais avaliações; critério da Fase 2), `CLAUDE.md` (Estado atual e estrutura do código), status do FDD.

---

## Stage 5 — Plan Verification

- [x] Regras nas camadas certas (dado em `lib`, marcação no componente, regra no FDD)
- [x] FDD existe e é atualizado no item 1
- [x] Decisão de produto coberta pelo PRD (D26, D29, D32, D34, D38) ou registrada no item 8 (D39)
- [x] Checklist ≤ 10, SoT ≤ 4, decisão única, evidências ≤ 7

**Gate S2:** Livre

---

## Stage 6 — Code Execution

| # | Camada | Arquivo | Status |
|---|---|---|---|
| 1 | Doc | `docs/fdd/contato.md` | feito |
| 2 | Doc | `docs/design/DESIGN.md` | feito |
| 3 | Dados | `src/lib/contact.ts` | feito |
| 4 | Componente | `src/components/contact-section.tsx` | feito |
| 5 | Componente | `src/components/footer.tsx` | feito |
| 6 | Rota | `src/app/page.tsx` | feito |
| 7 | Verificação | navegador, lint, typecheck, build | parcial (ver Stage 7) |
| 8 | Doc | `docs/ROADMAP.md`, `docs/PRD.md` (D39) | feito; `CLAUDE.md` não precisou mudar |

### Desvios do plano
- O vídeo do kit saiu da linha do tempo do Sobre, por pedido do Lucas (2026-10-12): ao lado da roda parecia solto. Arquivos guardados em `media/sobre/video/parked-site/` e no histórico (`6a34698`). A roda ficou sem o painel à direita, a decidir (foto retrato, foto de detalhe ou roda centralizada).
- Título "Como chegar e o que esperar" e a frase "Quer conversar antes de marcar?" são texto do agente, a confirmar.

---

## Stage 7 — Tests

Conferido no build de produção, em 2026-10-12, pelo MCP do Chrome DevTools.

| Critério de aceite | Como foi verificado |
|---|---|
| 1. Conteúdo sem corte nem rolagem horizontal | 1440 px, iPad retrato (768 px, duas colunas) e 390 px: sem rolagem horizontal e sem elemento passando da borda; captura do iPad e do computador |
| 2. Link de rota | `target="_blank"`, `rel="noopener noreferrer"`, aviso para leitor de tela; busca com "Maceió, AL". Abrir o Maps e ver o prédio: não feito (sem acesso à rede do Maps) |
| 3. Resposta de valor | texto idêntico ao dela no DOM; sem "gratuit", "a partir de" nem "R$" |
| 4. Menu leva à seção | no computador, abrir o menu e clicar em Contato rolou até a seção; header em tema claro. No celular, não repetido |
| 5. Rodapé sem `id` duplicado | um só `#contato` no DOM |
| 6. Teclado | Enter abriu e Espaço fechou o `<details>`; foco com contorno de 2 px |
| 7. Contraste e toque | menor razão medida na seção: 8,09:1. Links de 44 px em toque (iPad e 390 px); `summary` de 50 px |
| 8. Sem movimento | título preso por `position: sticky` (só `lg`, sem JS), `static` em 390 px; nada anima |
| 9. Lint, typecheck, build, Lighthouse | verdes. Lighthouse celular: acessibilidade 100, boas práticas 100, SEO 63 (esperado, `noindex`). Nota de desempenho não medida (a ferramenta a exclui); a seção não traz JS nem mídia |
| 10. Palavras vetadas | busca no código da seção sem ocorrência, fora "valor" na pergunta do FAQ |

---

## Stage 9 — Walkthrough

**WARNINGS** (2026-10-12): sem conflito com as regras do CFO. Ressalvas: conferência no navegador incompleta (iPad, menu, teclado, contraste, Lighthouse); título e frase de chamada são texto do agente; endereço comercial público (previsto na D34); roda sem o painel à direita. Docs do PRD acertados.

---

## Feito e verificado

Ver Stages 6 a 8 acima. Resumo: seção Contato implementada e conferida nas três larguras, em 3 commits mais o título preso; vídeo do kit retirado. Fica para depois: abrir o Maps e ver o prédio, e medir a nota de desempenho do Lighthouse.
