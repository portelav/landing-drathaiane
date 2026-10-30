# PRD: landing da Dra. Thaiane Lessa

Documento vivo. O quê e por quê. Decisão de produto nova entra no registro da seção 12, com data, e depois no corpo.

Versão leve: landing de uma página, sem banco nem login.

## 1. Visão

Uma página que apresenta a Dra. Thaiane Lessa, cirurgiã-dentista em Maceió, com o cuidado visual que ela promete no atendimento, e leva o visitante a chamar no WhatsApp. Para o Lucas, é a peça de portfólio que mostra direção de arte, movimento e acabamento.

## 3. Público

- **Paciente de estética** (o alvo): adulto que pesquisa facetas, resina, clareamento. Quer confiar no olhar estético e no planejamento antes de marcar. O que impede: não conhece a profissional e desconfia de promessa fácil.
- **Paciente restauradora:** precisa resolver um problema, quer alguém cuidadoso e acessível pelo WhatsApp. O que impede: site que pareça só de estética e caro.
- **Quem avalia o portfólio do Lucas:** recrutador ou cliente em potencial. Quer ver decisão de design justificada, movimento bem feito, código limpo e repositório organizado.

Os textos precisam falar com os dois públicos de paciente sem parecer confusos (decisão já registrada em `docs/fdd/sobre.md`).

## 5. Objetivos e métricas

O MVP sai em duas fases (D21). A Fase 1 só depende do Lucas; a Fase 2 é a versão pública, com o conteúdo e o aval dela.

| Meta | Como medir | Fase |
|---|---|---|
| Entrar no portfólio e no currículo do Lucas | Link do site no portfólio e no currículo | 1 |
| Barra técnica | Lighthouse: nota de desempenho de 85 ou mais no celular e de 90 ou mais no computador, e acessibilidade sem falha AA (D37). Conferido em 390 px, iPad retrato e computador | 1 |
| Site indexado com o aval dela | `noindex` fora, página encontrada pelo nome dela no Google | 2 |

Prazo (D24): Fase 1 até 2026-10-23. Fase 2 sem data; sai quando o conteúdo e o aval chegarem.

Como se mede a barra técnica (D35): Lighthouse no modo padrão (simulado), o mesmo do PageSpeed Insights, na produção, mediana de 3 execuções; celular no padrão do Lighthouse, iPad retrato em 820 × 1180, computador no preset desktop. O modo com throttling real serve só de diagnóstico.

Cliques no WhatsApp ficam fora da meta: medir exige analytics, que não existe (seção 7).

## 6. Escopo

Seções em ordem na página.

| Item | Objetivo | FDD | Estado |
|---|---|---|---|
| Preloader | Abrir com a marca: monograma desenhado que voa para o header | (anterior ao kickoff) | pronto |
| Header | Navegação e contato direto (WhatsApp, Instagram) sempre à mão | [`docs/fdd/header.md`](fdd/header.md) | pronto; sem o tranco da inércia ao parar (2026-10-29; PR #29) |
| Hero | Primeira impressão: o consultório e o nome | [`docs/fdd/hero.md`](fdd/hero.md) | pronto; versão do celular mantida como está (2026-10-28, D47; PR #26); parágrafo novo dela (2026-10-29; PR #29) |
| Sobre | Quem ela é, como trabalha, credenciais com datas | [`docs/fdd/sobre.md`](fdd/sobre.md) | pronto; texto novo dela (2026-10-28, D45); band no celular com chegada que segue a rolagem (2026-10-28, D46; PR #26); "Leia mais" no celular (2026-10-29, D48; PR #28) |
| Serviços | O que ela trata, para os dois públicos, e cinco casos dela com foto | [`docs/fdd/servicos.md`](fdd/servicos.md) | feito (2026-10-28, D44); botão "Agende aqui um horário" (D45); texto dos casos vizinhos legível (2026-10-29, D50; PR #30) |
| Depoimentos | Prova social | [`docs/fdd/depoimentos.md`](fdd/depoimentos.md) | fora por enquanto, sai do site e do menu (D25) |
| Contato e rodapé | Como chegar (endereço do consultório e rota), horários, primeira consulta, perguntas frequentes, WhatsApp (D32 a D34; link das avaliações fora, D39); identificação obrigatória (nome, CRO) | [`docs/fdd/contato.md`](fdd/contato.md) | pronto: rodapé com a identificação e os canais (D26); seção Contato completa (2026-10-27, D43); número da clínica, mensagem pronta no WhatsApp e e-mail fora (2026-10-28, D45); primeira consulta na frente, com a foto das sacolas, e o retrato dela no botão do WhatsApp (2026-10-29, D48; PR #28) |
| Página 404 | Endereço errado cai numa página com a marca e o caminho de volta à home (D41) | (sem FDD) | pronto |

### Conteúdo pendente

A doutora já tem o conteúdo das seções que faltam e ainda não mandou (D9). O acompanhamento fica nas notas privadas (ROADMAP, ["Pauta com a Dra. Thaiane"](ROADMAP.md#pauta-com-a-dra-thaiane)).

## 7. Fora de escopo

- Agendamento online, formulário, área do paciente: o contato é pelo WhatsApp. Se entrar, rodar `/kickoff` de novo (entra ADD).
- Blog e páginas de conteúdo educativo. A primeira consulta e as perguntas frequentes não são blog: entram na seção Contato (D32).
- Versão em outro idioma.
- Depoimentos, por enquanto: a seção sai do site e do menu e fica para decisão futura (D25). O link para as avaliações externas não é a seção e entra em Contato (D33).
- Mapa interativo embutido (Mapbox GL, Google): fica fora. O mapa de Contato é uma imagem estática do Mapbox, servida pelo `next/image` (D40, ADR 0005).
- Preços e condições de pagamento: nunca, a pedido dela (D29); o Código de Ética também veda (art. 44, I).

## 8. Requisitos não funcionais

- Desempenho: nota de desempenho do Lighthouse de 85 ou mais no celular e de 90 ou mais no computador (D37). O LCP é medido e registrado; a meta de 2,5 s no celular fica para depois. Vídeo do hero com poster como primeira pintura; os vídeos só baixam depois da primeira tela (ADR 0004).
- Acessibilidade: WCAG 2.2 AA (contraste, foco, `prefers-reduced-motion`, pausa do que se mexe sozinho por mais de 5 s).
- Dispositivos: celular (390 px), iPad retrato e computador. Layouts dependentes de mídia testados por proporção. **O celular é o alvo principal** (D42): cada seção é pensada primeiro em tela de celular em pé, e o computador adapta a partir dela.
- SEO e compartilhamento: prévia de link (Open Graph, com nome, profissão e CRO na imagem), ícone da Apple e cor do tema desde 2026-10-23 (D41). `noindex` até o aval dela (D22); depois, canonical, dados estruturados, sitemap e indexação.

## Regras de fora

Conferido contra o texto oficial em 2026-10-10: Código de Ética Odontológica (CEO, aprovado pela Res. CFO-118/2012 e alterado pela Res. CFO-SEC-271/2025), Res. CFO-196/2019 e Res. CFO-230/2020. A cartilha do CRO-AL e o "CFO Esclarece" são interpretação dos conselhos e aparecem marcados assim. Detalhe e citações em [`docs/research/publicidade-odontologica.md`](research/publicidade-odontologica.md). Tirar o `noindex` depende do aval da Dra. Thaiane (D22). O DEF/CRO-AL, setor de fiscalização do Conselho Regional de Odontologia de Alagoas, revisa peças de graça (fiscalizacao@croal.org.br).

| Regra | Efeito no produto | Fonte |
|---|---|---|
| Nome, profissão e número do CRO em toda divulgação | Rodapé fixo com "Dra. Thaiane Lessa · Cirurgiã-Dentista · CRO/AL-6418" | [CEO art. 43](https://website.cfo.org.br/wp-content/uploads/2018/03/codigo_etica.pdf) |
| Proibido preço, serviço gratuito e forma de pagamento | Nenhum preço nem condição de pagamento (D29) | CEO art. 44, I; art. 20, IX (consulta e diagnóstico gratuitos) |
| Proibido oferecer serviço como brinde, prêmio ou sorteio | Nenhum sorteio nem brinde | CEO art. 20, VIII, na redação da [Res. CFO-SEC-271/2025](https://sistemas.cfo.org.br/visualizar/atos/RESOLU%C3%87%C3%83O/SEC/2025/271) |
| Proibido aliciar paciente, "especialmente a utilização da expressão 'popular'" | Nenhum "popular" | CEO art. 44, VII |
| "Desconto", "promoção", "oferta", bandeira de cartão, indicação de amigos, pacote e cupom não são permitidos | Nenhum CTA promocional. "Desconto" saiu do Código em 2025 e fica fora pela cartilha | [Cartilha CRO-AL](https://croal.org.br/wp-content/uploads/2025/04/Cartilha-de-publicidade-na-odontologia.pdf) (interpretação) |
| "Especialista" só com especialidade registrada no CRO-AL. Área de atuação, procedimento e técnica só precedidos do título da especialidade registrada ou de "clínico geral" | Texto do site diz "especialista" só com o registro confirmado, e nomeia área de atuação só depois do título ou de "clínico geral" | CEO art. 44, II, e art. 43, § 1º, I e II |
| Mestrado e doutorado podem ser divulgados | Linha do tempo pode manter o mestrado | CEO art. 43, § 1º, III |
| Endereço, telefone, e-mail, horário e convênios podem ser divulgados | Contato com o endereço do consultório e o horário (D34); convênio, se houver, só pelo nome | CEO art. 43, § 1º, IV |
| Proibida expressão que caracterize sensacionalismo, autopromoção, concorrência desleal, mercantilização ou promessa de resultado | Tom de voz no DESIGN.md; revisão de todo texto no `/walkthrough` | [Res. CFO-196/2019](https://sistemas.cfo.org.br/visualizar/atos/RESOLU%C3%87%C3%83O/SEC/2019/196) art. 2º, § 1º |
| Proibido criticar técnica de outro profissional como inadequada ou ultrapassada | Texto não critica técnica de colega | CEO art. 44, IV |
| Proibido vídeo ou imagem do transcurso ou da realização de procedimento, salvo em publicação científica | Nenhum vídeo de atendimento | Res. CFO-196/2019 art. 3º |
| Em selfie, proibida imagem que permita identificar equipamento, instrumental, material ou tecido biológico | Selfie dela, se entrar, sem nada disso identificável | Res. CFO-196/2019 art. 1º, § 1º, que está no artigo das selfies. O [CFO Esclarece](https://website.cfo.org.br/redes-sociais-na-odontologia-fique-atento-as-normas-eticas-e-acerte-na-publicacao-dos-conteudos/) e a cartilha CRO-AL leem a proibição para qualquer imagem (interpretação) |
| Cartilha do CRO-AL lista "bastidores, ambiente clínico" como proibido (termo que não está na norma; é a leitura do conselho que fiscaliza) | Imagem do consultório conferida contra a cartilha antes de indexar (D22) | Cartilha CRO-AL p. 8 (interpretação) |
| Toda publicação de imagem ou vídeo leva nome e CRO | Confirmar com o CRO-AL se o rodapé basta ou se cada foto e vídeo precisa de legenda com nome e CRO | Res. CFO-196/2019 art. 4º |
| Antes e depois só de casos dela, com TCLE e nome + CRO na imagem; nunca em nome de clínica | Serviços pode ter casos, se ela tiver TCLE | Res. CFO-196/2019 arts. 2º e 4º; "nunca em nome de clínica": CFO Esclarece (interpretação) |
| Paciente identificável só com consentimento livre e esclarecido, e nunca para autopromoção | Ninguém identificável na página sem autorização escrita | CEO art. 44, VI |
| Proibido anunciar procedimento não odontológico (micropigmentação, design de sobrancelha etc.) | Serviços só com procedimentos odontológicos | [Res. CFO-230/2020](https://sistemas.cfo.org.br/visualizar/atos/RESOLU%C3%87%C3%83O/SEC/2020/230) art. 2º |
| Sem coleta de dados, sem obrigação de política de privacidade | Se entrar formulário ou analytics, política de privacidade e base legal (LGPD) | Lei 13.709/2018 |

### Perguntas em aberto

As perguntas à doutora e ao DEF/CRO-AL ficam nas notas privadas (ROADMAP, ["Pauta com a Dra. Thaiane"](ROADMAP.md#pauta-com-a-dra-thaiane)). Este documento registra só a regra e a decisão: resposta recebida vira decisão na seção 12, com data.

Sobre depoimentos: o Código de Ética não trata de depoimento de paciente. A regra que pesa é o art. 44, VI: paciente identificável só com consentimento, e nunca para autopromoção. A seção está fora por enquanto (D25).

## 9. Riscos e premissas

| Risco ou premissa | Impacto | O que fazer |
|---|---|---|
| Conteúdo das seções depende dela e não tem data | Fase 2 parada | Fase 1 não depende dela (D21). Na Fase 2, estrutura e movimento com `> TODO` no FDD, nunca com texto inventado na página |
| Uma peça do site ser considerada infração ética | Processo ético contra ela (advertência a suspensão) | Regras de fora no `/walkthrough`; revisão do site inteiro antes de indexar (D30); aval dela antes de indexar (D22); dúvida pontual ao DEF/CRO-AL |
| Peça do site, commit ou doc expor ou prejudicar a doutora fora do CRO (privacidade, segurança pessoal, reputação, área jurídica, dinheiro) | Problema para ela fora da odontologia | Princípio no topo do `CLAUDE.md`: cada peça é pesada pelo que pode expor; na dúvida, fica fora e vai ao Lucas |
| Repositório público expõe fotos e dados dela, ou dúvida aberta sobre ela | Exposição sem consentimento | Aval dado em 2026-10-09 (D18). Dúvida, pendência e dado de terceiro só nas notas privadas (D19) |
| Opinião dela sobre estética, design ou seção chegar com a seção já pronta | Retrabalho de visual | O Lucas conversa com ela, com opções, quando a decisão de visual ou de seção pesa (D28); olhar final dela antes de tirar o `noindex` (D22) |

## 10. Critérios de pronto

Duas fases (D21). Cada item é verificável em 390 px, iPad retrato e computador.

### Fase 1: portfólio (até 2026-10-23)

Só depende do Lucas. O site continua com `noindex`.

- [x] Rodapé com "Dra. Thaiane Lessa · Cirurgiã-Dentista · CRO/AL-6418", legível.
- [x] Menu sem link quebrado: Depoimentos sai (D25); Serviços e Contato levam a uma seção ou saem do menu até ela existir. Serviços saiu; Contato leva à seção (D26, cumprida em 2026-10-12).
- [x] Rótulos de 11 px com contraste de 4,5:1 (DESIGN.md, seção 3).
- [x] Vídeos em loop (hero e kit) com controle de pausa acessível (WCAG 2.2.2) (D31).
- [x] Barra técnica da seção 5 (D37). Nota de desempenho: 88 no celular, 89 a 93 no iPad, 94 a 100 no computador. Acessibilidade: 100 nos três. LCP no celular: 2,9 s, medido em 2026-10-10.
- [x] Prévia de link (Open Graph) com nome, "Cirurgiã-Dentista" e CRO na imagem, e página 404 (D41).
- [ ] README final, com prints e link.
- [ ] Link do site no portfólio e no currículo.
- [x] Repositório público com o aval dela (D18).

### Fase 2: site público (sem data)

Depende do conteúdo e do aval dela (D24).

- [x] Serviços e Contato com o conteúdo real dela. Contato completo em 2026-10-27 (D32, D34, D39, D43; PR #22) e Serviços em 2026-10-28 (D44; PR #23). Primeira leitura dela aplicada em 2026-10-28: número da clínica, mensagem pronta, e-mail fora e Sobre novo (D45; PR #25).
- [x] Site inteiro revisto de novo contra as regras de fora; o que não passou mudou ou saiu (D30). Feito em 2026-10-29 (PR #29).
- [x] Aval dela no site completo, com o texto do rodapé. Dado em 2026-10-29 (D51; PR #30).
- [ ] `noindex` fora, com canonical, dados estruturados e sitemap. A prévia de link já saiu na Fase 1 (D41).
- [x] Barra técnica da Fase 1 conferida de novo com as seções novas. Nota de desempenho na produção em 2026-10-29: 88 no celular, 94 no iPad, 100 no computador. Acessibilidade: 100 nos três, depois da correção do contraste dos casos (D50). LCP no celular: 3,0 s (PR #30).

Fora dos critérios: Depoimentos (D25).

## 12. Registro de decisões

Cada rodada é uma conversa com o dono. Decisões numeradas (D1, D2...) para o agente citar.

### Rodada 0 (2026-08-18 a 2026-08-20): construção, antes do kickoff

Decisões que já estavam no código e no plano do Sobre.

- **D1.** Público: mistura de estética de alto valor (o alvo) com restauradora.
- **D2.** Referência visual: aventuradentalarts.com (estrutura editorial do header, linha do tempo).
- **D3.** Contato principal pelo WhatsApp, com o número real do consultório; Instagram ao lado.
- **D4.** `noindex` até o conteúdo real chegar.
- **D5.** Caso clínico é material de Serviços, não do Sobre, contado sem identificar o paciente.
- **D6.** Depoimentos não existem de forma honesta sem depoimento real; Serviços não tem prova visual sem foto de caso.

### Rodada 1 (2026-10-09): kickoff

- **D7.** A doutora aprova conteúdo e visual. O projeto é do Lucas, sozinho.
- **D8.** Objetivo: terminar para entrar no portfólio e no currículo. Prazo e meta do MVP saem da revisão do site (Rodada 2).
- **D9.** O conteúdo das seções que faltam existe e ainda não chegou: fica marcado como pendente.
- **D10.** Domínio pago só no fim. Até lá, `drathaianelessa.vercel.app`. Substituída pela D49.
- **D11.** Repositório privado; fica público no fim. Fotos e dados dela só com o aval dela.
- **D12.** Regras do CFO e do CRO-AL pesquisadas e registradas aqui (seção "Regras de fora").
- **D13.** Skills de terceiros saem do repositório: as repetidas são apagadas, as 6 únicas vão para o `claude-kit`.
- **D14.** Git: branch e PR por seção ou marco (não por ajuste), o Lucas faz o merge. Sem atribuição de IA.
- **D15.** Fluxo de agentes: `/plan`, `/exec`, `/walkthrough`, `/commit` e `/pr`, enxutos. Em 2026-10-12 saíram `/cot`, `/tot`, `/council`, `/refine`, `/feature-flow` e os hooks (cerimônia demais para uma landing page).
- **D16.** O plano do Sobre vira o primeiro FDD (`docs/fdd/sobre.md`).
- **D17.** Critério de pronto, meta e prazo do MVP: definidos numa sessão de revisão do site com o Lucas, logo depois do kickoff.

### Rodada 1b (2026-10-09): repositório público

- **D18.** A doutora deu o aval para o repositório ficar público, com as fotos e os dados dela que estão no site. Substitui a parte de D11 que mantinha o repositório privado.
- **D19.** Abertura por repositório novo, com histórico limpo (sem as notas internas, sem metadado nas mídias, e-mail noreply nos commits). O repositório anterior fica privado e arquivado. Dúvida aberta, pendência dela, dado de paciente ou de terceiro e opinião sobre empresa ficam nas notas privadas (`portelav/landing-drathaiane-notes`, clonado em `private/`); os docs públicos registram só regra e decisão.
- **D20.** Código com todos os direitos reservados, sem licença aberta. Fotos, vídeos, logos e textos são da Dra. Thaiane Lessa.

### Rodada 2 (2026-10-09): revisão do site

Cumpre D17.

- **D21.** O MVP sai em duas fases. Fase 1: o que só depende do Lucas (rodapé com CRO, menu, contraste, pausa dos vídeos, barra técnica, README); serve ao portfólio e ao currículo com o `noindex`. Fase 2: a versão pública, com o conteúdo e o aval dela. Critérios na seção 10.
- **D22.** Tirar o `noindex` depende do aval dela. O DEF/CRO-AL é consultado quando uma regra não for clara.
- **D23.** Meta: entrar no portfólio e no currículo, cumprir a barra técnica medida e ficar indexado com o aval dela (seção 5). Cliques no WhatsApp ficam fora, por exigir analytics.
- **D24.** Prazo: Fase 1 até 2026-10-23. Fase 2 sem data; o conteúdo é acompanhado nas notas privadas.
- **D25.** Depoimentos sai do site e do menu por enquanto. A seção fica para decisão futura e não entra em nenhuma das duas fases.

### Rodada 3 (2026-10-09): plano do rodapé

Plano em `tasks/footer-and-menu-anchors.md`.

- **D26.** Na Fase 1, o rodapé é o destino de `#contato`: leva a identificação e os canais que o site já mostra no header (WhatsApp, telefone, Instagram; D3). Quando a seção Contato da Fase 2 existir, ela assume a âncora. Serviços sai do menu até a seção existir.
- **D27.** O rodapé leva "© 2026 Dra. Thaiane Lessa. Todos os direitos reservados." (D20) e não leva crédito do site.

### Rodada 4 (2026-10-10): papéis, preços e regras do CFO

Plano em `tasks/roles-prices-cfo-rules.md`.

- **D28.** Papéis. O Lucas confirma tudo: conteúdo, visual, técnica, segurança e git. A Dra. Thaiane opina sobre estética, design e seções, dando opções, sem aprovação formal. Fica o olhar final dela no site completo antes de tirar o `noindex` (D22). O conteúdo que só ela tem (texto, foto, endereço, horário) continua vindo dela e nunca é inventado. Pergunta técnica, de git ou de segurança não vai para ela. Substitui D7.
- **D29.** O site nunca tem preço nem tabela de preços, a pedido dela. Vale também para faixa de preço, "a partir de", forma ou condição de pagamento. O Código de Ética veda o mesmo (art. 44, I).
- **D30.** Antes de tirar o `noindex`, o site inteiro passa de novo pela tabela de regras de fora, com as respostas que tiverem chegado até lá. O que não passar muda ou sai antes de indexar. A lista do que conferir fica nas notas privadas.
- **D31.** Pausa dos vídeos (2026-10-10). Os dois vídeos, o do consultório no hero e o do kit no Sobre, rodam em loop enquanto estão na tela e param quando saem dela. Cada um tem um botão de pausa discreto no canto inferior direito: ícone escuro num quadrado claro de 32 px, sem raio, com área de toque de 44 px. A pausa pedida pela pessoa vale até ela tocar em reproduzir, só durante a visita. Foi considerado tirar o botão do hero e assumir a falha no critério WCAG 2.2.2; ficou o botão nos dois. Nota de 2026-10-12: o vídeo do kit saiu do Sobre (ficava solto ao lado da roda) e está guardado para reuso; hoje só o hero tem vídeo e botão.

### Rodada 5 (2026-10-10): pesquisa de sites de dentistas

Pesquisa com 24 sites de dentistas de estética e restauradora (Maceió, Nordeste, Brasil e exterior), o que o paciente procura antes de chamar e conferência no navegador. O relatório cita outros profissionais e fica nas notas privadas. Plano em `tasks/contact-decisions.md`.

- **D32.** Entram uma parte "primeira consulta", com as etapas em poucas linhas, e perguntas frequentes curtas. As duas ficam na seção Contato; forma e lugar exato saem do plano da seção. O texto vem dela. Pergunta sobre valor só entra se ela quiser, e a resposta não tem número, faixa, "a partir de" nem forma de pagamento (D29).
- **D33.** Contato leva um link discreto para as avaliações dela fora do site (perfil no Google). A página não reproduz avaliação, nome nem foto de paciente (CEO art. 44, VI). Depoimentos continua fora (D25). Depende de ela ter o perfil e querer o link.
- **D34.** Contato mostra o endereço do consultório (CEO art. 43, § 1º, IV), com link de rota para o Maps. Sem mapa embutido: ele carrega script e cookies de terceiros, e o site não coleta dados (regras de fora, LGPD). Endereço de casa nunca. Endereço, horário e acesso vêm dela.

### Rodada 6 (2026-10-10): barra técnica

Plano em `tasks/technical-bar.md`.

- **D35.** A barra técnica é medida com o Lighthouse no modo padrão (simulado), o mesmo do PageSpeed Insights, na produção, com a mediana de 3 execuções. O modo com throttling real serve só de diagnóstico.
- **D36.** Na roleta da linha do tempo, os anos fora de foco apagam até 60% de opacidade, e não mais até 14%. Com isso passam em 3:1 como texto grande, e o sumiço nas pontas fica com a máscara. Foi considerado manter o apagado forte e registrar a exceção; ficou o piso.
- **D37.** A meta da barra técnica passa a ser a nota de desempenho do Lighthouse, e não mais o LCP: 85 ou mais no celular e 90 ou mais no computador, com acessibilidade sem falha AA. Ajusta a seção 5 e a D35.
  - **Por que mudou:** depois da ADR 0004, o LCP no celular caiu de 3,2 para 2,9 s e parou aí. Mesmo sem nenhum JS, a página daria 2,3 s. O resto vem de um atraso do Chrome para mostrar a primeira tela quando a imagem do hero está nela, e nada no código do site mudou isso (`tasks/technical-bar.md`, "Medição na produção").
  - **O que ficou para depois:** chegar a 2,5 s pede diminuir o JS da primeira tela (ADR 0002), sem ganho garantido. Está no ROADMAP.
  - **Notas medidas:** 88 no celular (igual nas três execuções), 89 a 93 no iPad, 94 a 100 no computador.

### Rodada 7 (2026-10-11): respostas dela

- **D38.** A menção ao grupo de creators da Ivoclar fica no Sobre. Ela confirmou.
- **D39.** O link para o perfil e as avaliações do Google fica fora do site até haver mais avaliações (Lucas, 2026-10-11). A D33 segue válida, mas parada. A seção Contato assume `#contato` (D26) e o rodapé fica só como rodapé.
- **D40.** Contato passa a mostrar um mapa estático do Mapbox, com o pino no consultório, no lugar do link de rota em texto (Lucas, 2026-10-12). Reverte a parte da D34 que vetava o mapa; o resto da D34 vale (endereço do consultório, nunca o de casa). A imagem é servida pelo `next/image`, para o navegador não falar com o Mapbox. Sem o token, volta o link de rota. Ver ADR 0005.

### Rodada 8 (2026-10-23): prévia de link e 404

Plano em `tasks/link-preview-404.md`.

- **D41.** A prévia de link (Open Graph, com imagem 1200 × 630), o ícone da Apple, a cor do tema e uma página 404 entram já, na Fase 1, sem esperar o `noindex` sair (Lucas, 2026-10-23). Não dependem de conteúdo dela, e o link já circula no portfólio. Antecipa essa parte da D22; o `noindex` continua até o aval dela. A imagem de prévia circula sozinha, então leva nome, "Cirurgiã-Dentista" e CRO/AL-6418 (CEO, art. 43) e nenhuma área de atuação (art. 43, § 1º, I). Canonical, dados estruturados e sitemap ficam para quando sair o `noindex`.

### Rodada 9 (2026-10-27): celular primeiro

- **D42.** O celular é o foco do site: é por ele que a maior parte dos pacientes vai chegar (Lucas, 2026-10-27). Até aqui o site foi desenhado a partir do computador, e o celular recebia a versão empilhada. Em 2026-10-27, num celular em pé, hero, band e linha do tempo ficam parados (só abrem em tela mais larga que alta), e o único movimento é o texto do Tempo 2. A linha do tempo vira uma lista sem animação nenhuma. A partir de agora:
  - Cada seção tem uma versão própria para o celular, com o mesmo cuidado e o mesmo nível de movimento do computador. A versão empilhada não é mais o fim do caminho.
  - Plano, FDD e QA começam pelo celular (390 px, e uma tela baixa como 375 × 667). O computador vem depois.
  - O movimento segue as mesmas regras: `transform` e `opacity`, estado final legível com `prefers-reduced-motion`, pausa no que se mexe sozinho por mais de 5 s.
  - Ordem: linha do tempo primeiro, depois band e hero (ROADMAP).

### Rodada 10 (2026-10-27): conteúdo do Contato

- **D43.** O Contato recebe o resto do conteúdo dela: e-mail, duração média da primeira consulta, acessibilidade do prédio e mais quatro perguntas frequentes (Lucas, 2026-10-27).
  - A pergunta dela sobre como funciona a primeira consulta fica fora: repete as etapas, que já estão na seção.
  - O e-mail fica só no Contato, embaixo do WhatsApp; o rodapé continua com telefone e Instagram.
  - Enquanto não houver especialidade registrada, área de atuação e procedimento vêm depois de "clínica geral" (CEO art. 43, § 1º, I). A linha do preloader já diz isso, mas com movimento reduzido ela some em 0,3 s; por isso a primeira frase do Sobre passa a ser a dela, "Atuo na clínica geral, com foco em dentística estética e restauradora.", e a menção fica fixa antes das perguntas e de Serviços.

### Rodada 11 (2026-10-28): Serviços

- **D44.** Serviços entra entre o Sobre e o Contato e volta ao menu (Lucas, 2026-10-28). A forma saiu de protótipos em 390 px, e quem escolheu foi ela.
  - Os cinco serviços entram com o texto dela, numa lista que abre um de cada vez.
  - Os cinco casos entram com foto e a legenda dela, num carrossel lateral com encaixe nativo. A seção não tem movimento dirigido por scroll, para não virar o quarto momento depois de hero, band e roda.
  - As fotos entram como quadros inteiros, com as duas metades. Cada uma leva "Dra. Thaiane Lessa · CRO/AL-6418" gravado no arquivo (Res. CFO-196/2019, art. 4º): é obrigatório nos antes e depois e se repete nas outras para ficarem iguais. Ela tem o TCLE de todos os casos.
  - O caso da reabilitação de 27 dentes (D5) fica fora até haver foto.

### Rodada 12 (2026-10-28): primeira leitura dela

- **D45.** Primeira rodada de ajustes dela sobre o site (Lucas, 2026-10-28).
  - Telefone e WhatsApp passam a ser o número da clínica, (82) 99661-0348. Todo link de WhatsApp abre com a mensagem pronta "Olá, gostaria de mais informações sobre uma consulta com a Dra. Thaiane Lessa.".
  - O e-mail sai do Contato: o WhatsApp é o único canal escrito. Reverte a parte da D43 sobre o e-mail; telefone e Instagram continuam no rodapé.
  - A chamada embaixo dos casos, em Serviços, passa a ser "Agende aqui um horário", num bloco com contorno, sem raio, da largura do celular: como link sublinhado ela sumia embaixo do carrossel. A forma saiu de protótipos em 390 px. A do Contato continua "Chamar no WhatsApp", como link.
  - Sem travessão nos textos do site: no lugar, vírgula, ponto ou dois-pontos.
  - O Sobre recebe o texto novo dela, literal. "Clínica geral" sai da primeira frase e fica na terceira, ainda no primeiro parágrafo, antes de Serviços e das perguntas do Contato (CEO art. 43, § 1º, I). Reverte a parte da D43 que fixava a primeira frase.

### Rodada 13 (2026-10-28): band e hero no celular

- **D46.** A band ganha versão própria no celular em pé (D42), escolhida pelo Lucas entre três protótipos em 390 px (2026-10-28).
  - A citação vem em cima, sobre a parede da própria foto, e a foto vem embaixo, de lado a lado. A parede repete a linha de cima da foto, medida no arquivo, para não haver emenda.
  - A chegada segue o dedo: conforme a band sobe na tela, o rótulo e a citação sobem e aparecem, e a foto assenta (de 1,08 a 1). Nada prende a rolagem: a band fica como respiro entre o hero e a linha do tempo, que já prendem a tela. O protótipo era uma revelação única com cortina creme; no iPhone ela ficou rápida e mostrava um bloco creme depois do vídeo, e o Lucas trocou pela versão que segue o dedo (2026-10-28). Ela ainda vai ver.
  - No iPad em pé, o bloco fica numa coluna de até 34rem. No computador (`beside:`), a band continua como era.
- **D47.** O hero do celular fica como está: o título em cima e, depois, o vídeo preso em tela cheia passando pelos três painéis, com "seu sorriso, no seu tempo" atravessando (Thaiane, 2026-10-28). Ela viu quatro protótipos em 390 px, entre eles a faixa com o tríptico inteiro crescendo até a tela cheia e o painel do meio se abrindo como no computador, e preferiu o atual. Com isso, o D42 fica cumprido para hero, band e linha do tempo.

### Rodada 14 (2026-10-29): leitura no celular e calor humano

- **D48.** Primeiro teste vindo de uma análise comparativa de sites de cirurgiões-dentistas (2026-10-28), feita com três critérios: calor humano, leitura no celular e caminho até o WhatsApp (Lucas, 2026-10-29). A forma saiu de um protótipo em 390 px; as fotos chegaram dela no mesmo dia.
  - Sobre: no celular aparece só o primeiro parágrafo, com "Leia mais"; aberto, o botão fica no fim como "Leia menos". O texto não muda e não ganha foto nem frase em destaque.
  - Contato: o título passa a "O que esperar e como chegar", e a Primeira consulta vem antes de Como chegar. A duração média sai (reverte essa parte da D43). A Primeira consulta abre com a foto das sacolas que ela entrega nessa consulta.
  - Contato, fim: o retrato dela e o botão "Chamar no WhatsApp", no mesmo formato do de Serviços. A frase "Quer conversar antes de marcar?" sai. Reverte a parte da D45 que mantinha o link.
  - Header: além de voltar ao rolar para cima, volta quando a rolagem para, menos sobre o hero, a band e a linha do tempo. Substitui o botão flutuante, descartado em 2026-10-28.
  - Casos de Serviços: o caso da vez fica no meio, em todas as larguras, e tocar num vizinho o traz para lá. O carrossel é em laço: antes do primeiro já aparece o último. Corrige a seta para trás, que travava na última foto no iPad e no computador.
  - Linha do tempo no computador: a foto ao lado da roda chega coberta e só começa a abrir quando os anos começam a girar. Antes, a faixa de cima já aparecia em 2019.
- **D49.** Domínio próprio `www.drathaianelessa.com.br`, comprado antes do fim previsto na D10 (Lucas, 2026-10-29). O endereço sem `www` leva ao com `www`. O `noindex` continua até o aval dela (D22).
- **D50.** Nos casos de Serviços, os vizinhos deixam de ficar inteiros a 50%: a foto fica a 50% e o texto a 75%, o mínimo que ainda passa no contraste de 4,5:1 (Lucas, 2026-10-29). O texto a 50% reprovava no Lighthouse do computador. O texto não some nos vizinhos.
- **D51.** Aval dela no site completo, com o rodapé (Lucas, 2026-10-29). Falta só tirar o `noindex`, com canonical, dados estruturados e sitemap (D22, D41).
