# Roadmap

Forma leve: projeto solo. O MVP sai em duas fases (PRD, D21 a D25): a Fase 1 só depende do Lucas e vai até 2026-10-23; a Fase 2 é a versão pública e não tem data. Critérios de pronto no PRD, seção 10.

## Fase 1: portfólio (até 2026-10-23)

| Item | Critério de pronto | Plano |
|---|---|---|
| Rodapé com identificação | "Dra. Thaiane Lessa · Cirurgiã-Dentista · CRO/AL-6418" visível em 390 px, iPad e computador | `tasks/footer-and-menu-anchors.md` |
| Menu sem link quebrado | Depoimentos sai do menu (D25); `#servicos` e `#contato` levam a uma seção, ou saem do menu até ela existir | `tasks/footer-and-menu-anchors.md` |
| Contraste dos rótulos de 11 px | Texto secundário pequeno passa em 4,5:1, medido (DESIGN.md, seção 3) | `tasks/small-label-contrast.md` |
| Contraste da citação da band | Na band aberta, a citação do Sobre passa em 3:1 (texto grande) sobre o gradiente. Feito: citação em `dark-base`, 5,34 a 6,13 (DESIGN.md, seção 3) | `tasks/band-quote-contrast.md` |
| Pausa dos vídeos em loop | Hero (e o kit, enquanto esteve no site) com controle de pausa acessível (WCAG 2.2.2) | `tasks/video-pause-control.md` |
| Barra técnica | Nota de desempenho do Lighthouse de 85 ou mais no celular e de 90 ou mais no computador, e acessibilidade sem falha AA (D37). Feito: 88 no celular, 94 a 100 no computador, acessibilidade 100 | `tasks/technical-bar.md` |
| Prévia de link e 404 | Link compartilhado mostra imagem com nome, profissão e CRO; endereço errado cai numa 404 com a marca (D41) | `tasks/link-preview-404.md` |
| README final | Prints e link do site. Feito (PR #12) | `tasks/readme-final.md` |
| Portfólio e currículo | Link do site nos dois | fora do repositório |

## Fase 2: site público (sem data)

- **Celular primeiro (D42).** Cada seção ganha uma versão própria para o celular, com movimento, em vez da versão empilhada e parada. Feito: linha do tempo do Sobre, com a "foto em foco" (`tasks/timeline-portrait.md`); band, com a chegada que segue a rolagem (D46; `tasks/band-mobile-reveal.md`, PR #26); hero, que fica como está por decisão dela (D47, PR #26).
- Seção Serviços (`docs/fdd/servicos.md`): feita (`tasks/services-section.md`), com os cinco serviços e os cinco casos dela (PRD, D44).
- Seção Contato (`docs/fdd/contato.md`): feita (`tasks/contact-section.md` e `tasks/contact-content.md`), com endereço e rota, estacionamento, horário, acessibilidade, primeira consulta com a duração, cinco perguntas frequentes. O e-mail saiu na D45. O link das avaliações está fora até haver mais avaliações (PRD, D39).
- Primeira leitura dela (PRD, D45): feita (`tasks/thaiane-feedback.md`, PR #25), com número da clínica, mensagem pronta no WhatsApp, e-mail fora, chamada de Serviços, texto novo do Sobre e travessões fora (os do hero e da linha do tempo saíram no PR #26).
- Testes da análise comparativa de sites de cirurgiões-dentistas (2026-10-28): leitura no celular, calor humano e caminho até o WhatsApp. Primeira rodada feita (`tasks/mobile-reading-warmth.md`, D48, PR #28): "Leia mais" no Sobre, Contato com a primeira consulta na frente, foto das sacolas e retrato dela no botão do WhatsApp, header que volta quando a rolagem para, casos em laço com o escolhido no meio. Depois, o resto da lista nas notas privadas.
- Revisão do site inteiro contra as regras de fora, com as respostas que tiverem chegado (PRD, D30): feita em 2026-10-29.
- Aval dela no site completo; tirar o `noindex` e completar os metadados de busca: canonical, dados estruturados e sitemap (D22, D41).
- Barra técnica conferida de novo com as seções novas.

## Depois

- Domínio próprio (D10).
- LCP no celular abaixo de 2,5 s; hoje dá 2,9 s (D37). Caminho: diminuir o JS da primeira tela (ADR 0002) e entender o atraso do Chrome em torno da imagem do hero (`tasks/technical-bar.md`, "Medição na produção").
- Rever o visual do rodapé: o colofão claro (`tasks/footer-colophon.md`) melhorou o primeiro rodapé, mas ainda não convence o Lucas.

## Talvez

- Seção Depoimentos (`docs/fdd/depoimentos.md`), fora por enquanto (D25).
- Seção de primeira visita, com o vídeo do kit (contexto nas notas privadas).
- Faixa estreita com a foto `IMG_9049` (sacolinha do kit) entre o texto e a linha do tempo do Sobre.
- Analytics de cliques no WhatsApp (exige política de privacidade e novo `/kickoff`).

## Pauta com a Dra. Thaiane

O que pedir ou perguntar à doutora, e o que ela leva ao DEF/CRO-AL, fica nas notas privadas: `private/pauta.md`, clone do repositório privado `portelav/landing-drathaiane-notes` (fora deste). Resposta recebida vira decisão no PRD (seção 12, com data), e o que virou trabalho entra nesta lista.
