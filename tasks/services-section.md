# Seção Serviços

**Branch:** `feat/services-section` · **Status:** Planejado

> **Pergunta aberta (bloqueia o `/exec`):** forma e movimento no celular. Antes do código, 2 ou 3 protótipos lado a lado num artifact privado, em 390 px. Proposta de partida: lista dos 5 serviços que abre um por vez + casos num carrossel horizontal com encaixe nativo (`scroll-snap`), sem um quarto momento dirigido por scroll (FDD, "Movimento"). Alternativa: foto presa que troca conforme se rola pelos casos. O Lucas escolhe vendo.

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
1. [ ] Protótipos de forma e movimento em 390 px num artifact privado; o Lucas escolhe.
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
<!-- Escrito pelo /exec. -->
