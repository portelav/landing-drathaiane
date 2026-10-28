# Seção Serviços

**Branch:** `feat/services-section` · **Status:** Planejado

> **Decidido (2026-10-28):** opção A dos protótipos (11 opções em 3 rodadas): lista dos 5 serviços que abre um por vez (`<details name>`) + casos num carrossel horizontal com encaixe nativo (`scroll-snap`), caso da vez aceso e vizinhos a 50%, contagem "01 / 05", barrinhas e setas de 44 px. Sem um quarto momento dirigido por scroll. A Dra. Thaiane escolheu.

## Objetivo
- O visitante entende o que ela trata, se reconhece em pelo menos um caso (estética ou restauradora) e chama no WhatsApp.
- `#servicos` volta ao menu do header (D26).

## Escopo
- **Dentro:** seção `#servicos` entre a linha do tempo do Sobre e o Contato, desenhada primeiro em 390 px (D42); os 5 serviços com o texto dela; os 5 casos com foto e legenda dela; link "Serviços" no menu; chamada para o WhatsApp; FDD, PRD (decisão nova), ROADMAP e DESIGN.md (movimento e componentes).
- **Fora:** o caso de 27 dentes (`private/contexto-interno.md`), que não tem foto; preço e pacote (D29); botão flutuante de WhatsApp; cortar ou separar as fotos em antes e depois (o Lucas decidiu usar os quadros inteiros).

## Conteúdo e regras de fora
- Conteúdo da doutora: **chegou** (2026-10-27). Textos dos 5 serviços e legendas dos 5 casos em `private/pauta.md`, "Recebido em 2026-10-27". Entram literais. Fotos em `media/servicos/1.png` a `5.png` (1080 × 1350, duas metades em cada quadro).
- Regras que tocam:
  - CEO art. 44, II e art. 43, § 1º, I: sem "especialista". A frase "Atuo na clínica geral…" já fica fixa no Sobre, antes desta seção (D43).
  - CEO art. 44, I: nenhum preço, forma de pagamento ou "grátis".
  - Res. CFO-196/2019, art. 2º, § 1º: sem promessa de resultado. Os textos dela descrevem o objetivo do tratamento e passam.
  - Res. CFO-196/2019, arts. 2º e 4º: antes e depois (casos 1 e 2) com TCLE (ela tem) e com nome e CRO **gravados no arquivo**. Os outros 3 levam a mesma linha, para ficarem iguais.
  - Res. CFO-230/2020: só procedimentos odontológicos (todos os 5 são).
  - CEO art. 44, VI: ninguém identificável (só boca e dentes).
- Repo público: fotos sem metadado; os PNGs brutos ficam em `media/`, fora do git.

## Critérios de aceite
1. Em 390 px, 375 × 667, iPad retrato e computador, `#servicos` mostra os 5 serviços e os 5 casos, sem texto cortado e sem rolagem horizontal da página.
2. Textos e legendas são idênticos aos dela (comparação de string com a pauta).
3. Cada foto publicada traz "Dra. Thaiane Lessa · CRO/AL-6418" legível em 390 px, e `exiftool`/`ffprobe` não mostra metadado além do técnico.
4. "Serviços" no menu leva à seção (celular e computador com Lenis), e o header inverte o tema certo nela.
5. Tudo que abre ou passa funciona por toque, teclado (foco visível) e leitor de tela; toque de 44 px; cada foto tem `alt` descritivo.
6. Com `prefers-reduced-motion`, tudo legível e sem animação; nada se mexe sozinho.
7. Contraste de todo texto em 4,5:1, medido.
8. Nenhuma palavra vetada do DESIGN.md, seção 8; nenhum preço, "especialista" ou promessa.
9. Lint, typecheck e build verdes; Lighthouse sem queda abaixo da barra (D37); fotos em WebP via `next/image`, com `loading` preguiçoso.

## Arquivos
- `src/components/services-section.tsx`: seção nova (lista e casos).
- `src/lib/services.ts`: textos, legendas, caminhos e `alt`.
- `public/images/servicos/caso-{1..5}.webp`: quadros com a linha de nome e CRO, sem metadado.
- `src/app/page.tsx`: entra entre `AboutTimeline` e `ContactSection`.
- `src/components/header.tsx`: link "Serviços".
- `docs/fdd/servicos.md`, `docs/PRD.md` (D44, tabela da seção 6), `docs/ROADMAP.md`, `docs/design/DESIGN.md` (seções 6 e 7).

## Checklist (até 10, em ordem)
1. [x] Protótipos de forma e movimento em 390 px num artifact privado; escolhida a opção A.
2. [ ] FDD `servicos.md`: comportamento, movimento, acessibilidade, desempenho e critérios, a partir da escolha.
3. [ ] Gerar os 5 WebP: linha de nome e CRO gravada, metadado removido, tamanho conferido.
4. [ ] `src/lib/services.ts` com o texto dela, literal.
5. [ ] `ServicesSection`, primeiro no celular, depois iPad e computador.
6. [ ] Página e menu do header.
7. [ ] Estado com movimento reduzido conferido pelo CDP (memória do projeto).
8. [ ] QA pelo MCP do Chrome em 390 px, 375 × 667, iPad retrato e computador; contraste medido.
9. [ ] PRD (D44), ROADMAP e DESIGN.md.
10. [ ] Lint e typecheck verdes; para sem commitar.

---

## Feito e verificado

**Arquivos:** `src/lib/services.ts`, `src/components/services-section.tsx`, `src/components/services-cases.tsx` (cliente, só o carrossel), `src/app/page.tsx`, `src/components/header.tsx`, `public/images/servicos/caso-{1..5}.webp`, `docs/fdd/servicos.md`, `docs/PRD.md` (D44), `docs/ROADMAP.md`, `docs/design/DESIGN.md`.

**Desvios:** a seção não tem rótulo acima do título, só "Serviços": a frase de título do Contato veio dela, e Serviços não tem uma. As fotos foram geradas por um script de `sharp` (texto em Arial sobre faixa `dark-base` a 78%), que ficou fora do repositório. O cartão ficou com 20rem a partir de `lg`, para a borda do terceiro aparecer no computador. O item 7 achou um bug: com movimento reduzido os vizinhos seguiam a 50%; foi corrigido com `motion-safe:`.

**Critérios:**
1. Em 390 × 844, 375 × 667, 820 × 1180 e 1440 × 900, pelo MCP: `scrollWidth` igual à largura, sem corte.
2. Textos copiados da pauta para `services.ts` e conferidos no snapshot de acessibilidade.
3. A faixa se lê em 390 px (print); `ffprobe` não mostra tag nenhuma.
4. O link do menu leva a `#servicos` (topo da seção em 0). Header claro.
5. A lista é exclusiva (abrir "Restaurações" fecha "Limpeza"); setas e resumo com 44 e 56 px; `alt` nas 5 fotos; lista com rótulo.
6. Com movimento reduzido via CDP: opacidade 1 e `transform: none` em todos os casos.
7. Legenda e serviços 13,82:1, rótulos 8,09:1.
8. Nenhuma palavra vetada pelo CFO. Pelo tom, um ponto: o clareamento diz "o melhor método para o seu caso", texto dela, sobre a escolha do método e sem promessa de resultado. Ficou como veio.
9. Lint e typecheck verdes. Build e Lighthouse ficam para antes do PR.
