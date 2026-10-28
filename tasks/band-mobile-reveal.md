# Band no celular: revelação na entrada

**Branch:** `feat/mobile-hero-band` · **Status:** Planejado

## Objetivo
- Dar à band (Sobre, Tempo 1) uma versão própria no celular em pé (D42), no lugar da foto 3:4 com a frase embaixo, parada.
- Forma escolhida pelo Lucas entre três protótipos em 390 px (opção B, 2026-10-28): a citação vem em cima, sobre a parede da própria foto, e a foto fica embaixo. Quando a band entra na tela, a revelação acontece uma vez.
- Nada prende a rolagem: a band fica como respiro entre os dois trechos presos (o hero e a linha do tempo).

## Escopo
- **Dentro:** layout e revelação da band fora do `beside:` (celular e iPad retrato); as entradas no PRD, no FDD do Sobre e no DESIGN.md.
- **Fora:** a band no `beside:`, que continua como está (a foto cresce e a parede se abre para os lados); o hero do celular (próximo protótipo); texto novo.

## Conteúdo e regras de fora
- Conteúdo da doutora: a foto e a frase já estão no site. Nada novo.
- Regras do CFO: nenhuma muda. A foto e a frase são as mesmas, sem promessa, preço ou procedimento.

## Comportamento
- **Parede:** fundo com a linha de cima da foto, medida no arquivo em 9 pontos, de `rgb(173,157,137)` nos cantos a `rgb(180,165,147)` no meio. A foto ocupa a largura toda, então a parede continua o topo dela sem emenda. Os 2% de cima da foto se dissolvem na parede, sem chegar ao cabelo (com 12%, a cabeça ficou mais clara no protótipo).
- **Ordem:** rótulo "A dentista" e citação no alto, a partir de uns 96 px (abaixo da barra do topo); depois a foto 3:4, encostada nas laterais e no pé da seção.
- **Revelação:** quando 25% da band estiver à vista, uma cortina `light-base` desce (`translateY` de 0 a 101%, 1000 ms, `ease-out-quint`), a foto assenta (`scale` de 1,08 a 1, 1400 ms) e o rótulo e a citação sobem 14 px com `opacity` (600 ms, atraso de 350 e 480 ms). Acontece uma vez e não volta ao subir.
- **Sem estado escondido por padrão:** o HTML do servidor já vem no estado final. O script só arma a cortina se a band ainda estiver abaixo da tela ao montar. Sem JS, com link direto para `#sobre` ou com a band já à vista, nada fica escondido.
- **Movimento reduzido:** sem cortina, tudo no estado final.
- **iPad retrato** (mais largo que o celular, sem `beside:`): o bloco (parede e foto) fica com no máximo 34rem, centralizado sobre o creme, para a foto não passar de uma tela de altura.

## Critérios de aceite
1. Em 390 × 844 e 375 × 667: citação sobre a parede e foto embaixo, sem emenda de cor visível entre a parede e o topo da foto, sem rolagem horizontal.
2. A revelação roda uma vez ao entrar e não se repete ao subir e descer.
3. Rótulo e citação em `dark-base` cheio sobre a parede, com contraste de 4,5:1 ou mais no ponto mais escuro (`rgb(173,157,137)`), medido.
4. Com `prefers-reduced-motion` (testado por CDP, como manda a memória do projeto), não há cortina e o estado final está legível.
5. Recarregar a página já na band, ou abrir `/#sobre`, mostra a band inteira, sem cortina parada.
6. iPad retrato (820 × 1180): bloco de até 34rem, centralizado; no `beside:` (1440 × 900), a band é idêntica à de antes.
7. Só `transform` e `opacity` animam, e o `sizes` da foto corresponde à largura exibida.
8. Lint, typecheck e build passam; o Lighthouse no celular continua em 85 ou mais (D37).

## Arquivos
- `src/components/about.tsx`: layout fora do `beside:`, parede, borda de 2%, cortina e o observador que a arma.
- `docs/PRD.md`: D45 (a band no celular, opção B, com a data).
- `docs/fdd/sobre.md`: Tempo 1 no celular.
- `docs/design/DESIGN.md`: a linha da band no celular na tabela de movimento e a regra do rótulo sobre a parede.

## Checklist
1. [ ] Separar no `about.tsx` o bloco fora do `beside:` (parede, citação em cima, foto embaixo) sem tocar no `beside:`.
2. [ ] Fundo da parede com a linha de cima medida e a borda de 2% na foto.
3. [ ] Cortina e entrada da foto e da citação, armadas só se a band estiver abaixo da tela; uma vez só.
4. [ ] Movimento reduzido e sem JS no estado final.
5. [ ] iPad retrato com o bloco limitado a 34rem; `sizes` ajustado.
6. [ ] QA por CDP em 390, 375 × 667, iPad retrato e 1440, inclusive com movimento reduzido, e medição do contraste.
7. [ ] Teste no iPhone dele pelo servidor no Wi-Fi.
8. [ ] PRD (D45), FDD do Sobre e DESIGN.md.
9. [ ] Lint e typecheck; parar para o Lucas conferir.

---

## Feito e verificado
<!-- Escrito pelo /exec. -->
