# Ajustes da Thaiane (2026-10-28)

**Branch:** `feat/thaiane-feedback` · **Status:** Planejado

> **Pergunta aberta (bloqueia só o item 5):** qual é o número da clínica, e ele tem WhatsApp? Ligação e WhatsApp passam a usar esse número (Lucas, 2026-10-28). Até chegar, o resto pode ser executado e o número atual continua.

## Objetivo
- Aplicar a primeira rodada de considerações dela sobre o site: mensagem pronta no WhatsApp, chamadas, e-mail fora, travessões fora, texto novo do Sobre e número da clínica.

## Escopo
- **Dentro:**
  1. Todo link de WhatsApp (botão do topo, Serviços, Contato) abre com a mensagem "Olá! Gostaria de mais informações sobre uma consulta." (`?text=` codificado).
  2. Em Serviços, abaixo de Casos, "Chamar no WhatsApp" vira "Agende aqui um horário". O "Chamar no WhatsApp" do Contato fica.
  3. Sai a linha "Ou escreva para …" do Contato, e `EMAIL`/`EMAIL_HREF` saem de `contact.ts`. WhatsApp vira o único canal escrito; telefone e Instagram ficam.
  4. Texto do Sobre trocado pelo dela, literal, em três parágrafos (sem travessão).
  5. Telefone (`PHONE_*`) e WhatsApp passam ao número da clínica, quando chegar.
- **Fora:** os travessões de `hero.tsx:247` e `about-timeline.tsx:9`, que a `feat/mobile-hero-band` troca (Lucas, 2026-10-28). Nenhuma mudança em `about.tsx`, `hero.tsx`, `about-timeline.tsx`, `video-toggle.tsx`.

## Conteúdo e regras de fora
- Conteúdo da doutora: mensagem, chamada e texto do Sobre chegaram (2026-10-28). Número da clínica não chegou: bloqueia só o item 5.
- CEO art. 43, § 1º, I: área de atuação depois de "clínico geral". No texto novo, "clínica geral" sai da primeira frase (D43) e fica na terceira, ainda no primeiro parágrafo do Sobre, antes de Serviços e das perguntas do Contato. Lucas aprovou o texto literal (2026-10-28).
- CEO art. 43, § 1º, IV: telefone pode ser divulgado. "Especialização" sem "especialista", como já estava. Ivoclar Creators já coberto (D38).
- Nenhum preço, promessa ou dado de terceiro novo.

## Critérios de aceite
1. Os três links de WhatsApp abrem `wa.me/<número>?text=Ol%C3%A1!%20Gostaria…` e o WhatsApp mostra a mensagem pronta.
2. Serviços mostra "Agende aqui um horário"; o Contato não tem mais e-mail; `grep -rn "EMAIL\|gmail" src` vazio.
3. O Sobre mostra o texto dela, igual ao enviado, com a revelação por linha funcionando e legível com `prefers-reduced-motion`.
4. Nenhum travessão (— ou –) em texto visível dos arquivos desta branch.
5. Com o número: topo, rodapé e links de WhatsApp usam o número da clínica.
6. 390 px, iPad retrato e computador sem texto cortado; lint e typecheck verdes.

## Arquivos
- `src/lib/contact.ts`: mensagem no `WHATSAPP_HREF`, sem e-mail, número da clínica (item 5).
- `src/components/services-section.tsx`: texto da chamada.
- `src/components/contact-section.tsx`: sai o parágrafo e os imports do e-mail.
- `src/components/about-text.tsx`: `PARAGRAPHS` novos.
- `docs/PRD.md`: D45 (rodada 12), com a mudança da D43 (e-mail e primeira frase do Sobre).
- `docs/fdd/contato.md`, `docs/fdd/servicos.md`: e-mail fora; "primeira frase" vira "primeiro parágrafo do Sobre".
- `docs/ROADMAP.md`: linha do Contato sem o e-mail; item desta rodada.

## Checklist (até 10, em ordem)
1. [ ] `contact.ts`: `WHATSAPP_MESSAGE` e `WHATSAPP_HREF` com `encodeURIComponent`; remover `EMAIL` e `EMAIL_HREF`.
2. [ ] `services-section.tsx`: "Agende aqui um horário".
3. [ ] `contact-section.tsx`: remover a linha do e-mail e os imports.
4. [ ] `about-text.tsx`: texto novo do Sobre.
5. [ ] Conferir travessões no texto visível dos arquivos desta branch.
6. [ ] PRD D45, FDDs e ROADMAP.
7. [ ] Lint e typecheck.
8. [ ] QA em 390 px, iPad retrato e computador (porta 3001, Chrome do MCP livre), inclusive movimento reduzido no Sobre.
9. [ ] Item 5 quando o número chegar.

---

## Feito e verificado
<!-- Escrito pelo /exec: arquivos tocados, desvios do plano, como cada critério foi conferido. -->
