# Roadmap

Forma leve: projeto solo. O MVP sai em duas fases (PRD, D21 a D25): a Fase 1 só depende do Lucas e vai até 2026-10-23; a Fase 2 é a versão pública e não tem data. Critérios de pronto no PRD, seção 10.

## Fase 1: portfólio (até 2026-10-23)

| Item | Critério de pronto | Plano |
|---|---|---|
| Rodapé com identificação | "Dra. Thaiane Lessa · Cirurgiã-Dentista · CRO/AL-6418" visível em 390 px, iPad e computador | `tasks/footer-and-menu-anchors.md` |
| Menu sem link quebrado | Depoimentos sai do menu (D25); `#servicos` e `#contato` levam a uma seção, ou saem do menu até ela existir | `tasks/footer-and-menu-anchors.md` |
| Contraste dos rótulos de 11 px | Texto secundário pequeno passa em 4,5:1, medido (DESIGN.md, seção 3) | `tasks/small-label-contrast.md` |
| Contraste da citação da band | Na band aberta, a citação do Sobre passa em 3:1 (texto grande) sobre o gradiente; hoje mede de 2,52 a 3,00 (DESIGN.md, seção 3). Muda o visual da band: decisão do Lucas | — |
| Pausa dos vídeos em loop | Hero e kit com controle de pausa acessível (WCAG 2.2.2) | — |
| Barra técnica | Lighthouse no celular: LCP abaixo de 2,5 s no 4G, acessibilidade sem falha AA, em 390 px, iPad e computador | — |
| README final | Prints e link do site | — |
| Portfólio e currículo | Link do site nos dois | fora do repositório |

## Fase 2: site público (sem data)

- Seção Serviços (`docs/fdd/servicos.md`), quando o conteúdo chegar.
- Seção Contato (`docs/fdd/contato.md`), quando o conteúdo chegar.
- Revisão do site inteiro contra as regras de fora, com as respostas que tiverem chegado (PRD, D30); lista do que conferir nas notas privadas.
- Aval dela no site completo; tirar o `noindex`, completar metadados e prévia de link (Open Graph) (D22).
- Barra técnica conferida de novo com as seções novas.

## Depois

- Rever o ignore `.claude/**` do `eslint.config.mjs` (comentário diz "vendored agent tooling"): as skills de terceiros saíram no kickoff, e o que sobrou em `.claude/hooks/` é código do projeto.
- Domínio próprio (D10).
- Rever o visual do rodapé: o colofão claro (`tasks/footer-colophon.md`) melhorou o primeiro rodapé, mas ainda não convence o Lucas.
- Nome do header quebrando em quatro linhas em 390 px quando o header ganha fundo.

## Talvez

- Seção Depoimentos (`docs/fdd/depoimentos.md`), fora por enquanto (D25).
- Seção de primeira visita, com o vídeo do kit (contexto nas notas privadas).
- Faixa estreita com a foto `IMG_9049` (sacolinha do kit) entre o texto e a linha do tempo do Sobre.
- Analytics de cliques no WhatsApp (exige política de privacidade e novo `/kickoff`).

## Pauta com a Dra. Thaiane

O que pedir ou perguntar à doutora, e o que ela leva ao DEF/CRO-AL, fica nas notas privadas: `private/pauta.md`, clone do repositório privado `portelav/landing-drathaiane-notes` (fora deste). Resposta recebida vira decisão no PRD (seção 12, com data), e o que virou trabalho entra nesta lista.
