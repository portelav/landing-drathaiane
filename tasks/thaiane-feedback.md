# Ajustes da Thaiane (2026-10-28)

**Branch:** `feat/thaiane-feedback` · **Status:** Em execução

## Objetivo
- Aplicar a primeira rodada de considerações dela sobre o site: mensagem pronta no WhatsApp, chamadas, e-mail fora, travessões fora, texto novo do Sobre e número da clínica.

## Escopo
- **Dentro:**
  1. Todo link de WhatsApp (botão do topo, Serviços, Contato) abre com a mensagem "Olá, gostaria de mais informações sobre uma consulta com a Dra. Thaiane Lessa." (`?text=` codificado).
  2. Em Serviços, abaixo de Casos, "Chamar no WhatsApp" vira "Agende aqui um horário". O "Chamar no WhatsApp" do Contato fica.
  3. Sai a linha "Ou escreva para …" do Contato, e `EMAIL`/`EMAIL_HREF` saem de `contact.ts`. WhatsApp vira o único canal escrito; telefone e Instagram ficam.
  4. Texto do Sobre trocado pelo dela, literal, em três parágrafos (sem travessão).
  5. Telefone (`PHONE_*`) e WhatsApp passam ao número da clínica, (82) 99661-0348.
- **Fora:** os travessões de `hero.tsx:247` e `about-timeline.tsx:9`, que a `feat/mobile-hero-band` troca (Lucas, 2026-10-28). Nenhuma mudança em `about.tsx`, `hero.tsx`, `about-timeline.tsx`, `video-toggle.tsx`.

## Conteúdo e regras de fora
- Conteúdo da doutora: chamada e texto do Sobre chegaram (2026-10-28). Mensagem e número da clínica vieram do Lucas (2026-10-28).
- CEO art. 43, § 1º, I: área de atuação depois de "clínico geral". No texto novo, "clínica geral" sai da primeira frase (D43) e fica na terceira, ainda no primeiro parágrafo do Sobre, antes de Serviços e das perguntas do Contato. Lucas aprovou o texto literal (2026-10-28).
- CEO art. 43, § 1º, IV: telefone pode ser divulgado. "Especialização" sem "especialista", como já estava. Ivoclar Creators já coberto (D38).
- Nenhum preço, promessa ou dado de terceiro novo.

## Critérios de aceite
1. Os três links de WhatsApp abrem `wa.me/5582996610348?text=Ol%C3%A1%2C%20gostaria…` e o WhatsApp mostra a mensagem pronta.
2. Serviços mostra "Agende aqui um horário"; o Contato não tem mais e-mail; `grep -rn "EMAIL\|gmail" src` vazio.
3. O Sobre mostra o texto dela, igual ao enviado, com a revelação por linha funcionando e legível com `prefers-reduced-motion`.
4. Nenhum travessão (— ou –) em texto visível dos arquivos desta branch.
5. Topo, rodapé e links de WhatsApp usam o número da clínica.
6. 390 px, iPad retrato e computador sem texto cortado; lint e typecheck verdes.

## Arquivos
- `src/lib/contact.ts`: mensagem no `WHATSAPP_HREF`, sem e-mail, número da clínica.
- `src/components/services-section.tsx`: texto da chamada.
- `src/components/contact-section.tsx`: sai o parágrafo e os imports do e-mail.
- `src/components/about-text.tsx`: `PARAGRAPHS` novos.
- `docs/PRD.md`: D45 (rodada 12), com a mudança da D43 (e-mail e primeira frase do Sobre).
- `docs/fdd/contato.md`, `docs/fdd/servicos.md`: e-mail fora; "primeira frase" vira "primeiro parágrafo do Sobre".
- `docs/ROADMAP.md`: linha do Contato sem o e-mail; item desta rodada.

## Checklist (até 10, em ordem)
1. [x] `contact.ts`: `WHATSAPP_MESSAGE` e `WHATSAPP_HREF` com `encodeURIComponent`; remover `EMAIL` e `EMAIL_HREF`.
2. [x] `services-section.tsx`: "Agende aqui um horário".
3. [x] `contact-section.tsx`: remover a linha do e-mail e os imports.
4. [x] `about-text.tsx`: texto novo do Sobre.
5. [x] Conferir travessões no texto visível dos arquivos desta branch.
6. [x] PRD D45, FDDs e ROADMAP.
7. [x] Lint e typecheck.
8. [x] QA em 390 px, iPad retrato e computador (porta 3001, Chrome do MCP livre), inclusive movimento reduzido no Sobre.
9. [x] Item 5: número da clínica em `contact.ts`.

---

## Feito e verificado
<!-- Escrito pelo /exec: arquivos tocados, desvios do plano, como cada critério foi conferido. -->
- Arquivos: `src/lib/contact.ts`, `services-section.tsx`, `contact-section.tsx`, `about-text.tsx`; `docs/PRD.md` (D45), `docs/fdd/contato.md`, `docs/fdd/servicos.md`, `docs/ROADMAP.md`.
- Desvios: a mensagem pronta e o número vieram do Lucas, não dela. A chamada de Serviços virou um bloco com contorno (opção C dos protótipos, Lucas, 2026-10-28), porque o link ficava pequeno. Os dois na D45.
- Critérios 1, 2, 4 e 5: no HTML servido em `localhost:3001`, os 3 links de WhatsApp levam a `wa.me/5582996610348?text=…` com a mensagem, os 2 `tel:` levam ao número da clínica, nenhum `mailto` ou `gmail`, e os únicos travessões visíveis são os de `hero.tsx` e `about-timeline.tsx` (fora do escopo).
- Critério 3: texto do Sobre conferido no HTML, igual ao enviado.
- Critério 6: lint e typecheck verdes. No Chrome do MCP, em 390 px, iPad retrato (820 px) e computador (1440 px): botão de Serviços com 56 px de altura, largura toda no celular (342 px) e 276 px do iPad em diante, Contato sem e-mail, número novo no topo, sem rolagem horizontal. Com movimento reduzido, o Sobre aparece em texto corrido, legível, igual ao enviado.
