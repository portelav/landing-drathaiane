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
| Barra técnica | Lighthouse no celular: LCP abaixo de 2,5 s no 4G, acessibilidade sem falha AA. Conferido em 390 px, iPad retrato e computador | 1 |
| Site indexado com o aval dela | `noindex` fora, página encontrada pelo nome dela no Google | 2 |

Prazo (D24): Fase 1 até 2026-10-23. Fase 2 sem data; sai quando o conteúdo e o aval chegarem.

Cliques no WhatsApp ficam fora da meta: medir exige analytics, que não existe (seção 7).

## 6. Escopo

Seções em ordem na página.

| Item | Objetivo | FDD | Estado |
|---|---|---|---|
| Preloader | Abrir com a marca: monograma desenhado que voa para o header | (anterior ao kickoff) | pronto |
| Header | Navegação e contato direto (WhatsApp, Instagram) sempre à mão | (anterior ao kickoff) | pronto |
| Hero | Primeira impressão: o consultório e o nome | [`docs/fdd/hero.md`](fdd/hero.md) | pronto |
| Sobre | Quem ela é, como trabalha, credenciais com datas | [`docs/fdd/sobre.md`](fdd/sobre.md) | pronto |
| Serviços | O que ela trata, para os dois públicos | [`docs/fdd/servicos.md`](fdd/servicos.md) | falta (conteúdo pendente) |
| Depoimentos | Prova social | [`docs/fdd/depoimentos.md`](fdd/depoimentos.md) | fora por enquanto, sai do site e do menu (D25) |
| Contato e rodapé | Como chegar, horários, WhatsApp; identificação obrigatória (nome, CRO) | [`docs/fdd/contato.md`](fdd/contato.md) | rodapé pronto, com a identificação e os canais (D26); seção Contato falta (conteúdo pendente) |

### Conteúdo pendente

A doutora já tem o conteúdo das seções que faltam e ainda não mandou (D9). O acompanhamento fica nas notas privadas (ROADMAP, ["Pauta com a Dra. Thaiane"](ROADMAP.md#pauta-com-a-dra-thaiane)).

## 7. Fora de escopo

- Agendamento online, formulário, área do paciente: o contato é pelo WhatsApp. Se entrar, rodar `/kickoff` de novo (entra ADD).
- Blog e conteúdo educativo.
- Versão em outro idioma.
- Domínio pago: fica para o fim, depois do MVP.
- Depoimentos, por enquanto: a seção sai do site e do menu e fica para decisão futura (D25).
- Preços e condições de pagamento: nunca, a pedido dela (D29); o Código de Ética também veda (art. 44, I).

## 8. Requisitos não funcionais

- Desempenho: LCP abaixo de 2,5 s no 4G no celular. Vídeo do hero com poster como primeira pintura.
- Acessibilidade: WCAG 2.2 AA (contraste, foco, `prefers-reduced-motion`, pausa do que se mexe sozinho por mais de 5 s).
- Dispositivos: celular (390 px), iPad retrato e computador. Layouts dependentes de mídia testados por proporção.
- SEO e compartilhamento: `noindex` até o aval dela (D22); depois, metadados completos, prévia de link (Open Graph) e indexação.

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
- [x] Menu sem link quebrado: Depoimentos sai (D25); Serviços e Contato levam a uma seção ou saem do menu até ela existir. Serviços saiu; Contato leva ao rodapé (D26).
- [x] Rótulos de 11 px com contraste de 4,5:1 (DESIGN.md, seção 3).
- [x] Vídeos em loop (hero e kit) com controle de pausa acessível (WCAG 2.2.2) (D31).
- [ ] Barra técnica da seção 5: Lighthouse no celular com LCP abaixo de 2,5 s no 4G e acessibilidade sem falha AA.
- [ ] README final, com prints e link.
- [ ] Link do site no portfólio e no currículo.
- [x] Repositório público com o aval dela (D18).

### Fase 2: site público (sem data)

Depende do conteúdo e do aval dela (D24).

- [ ] Serviços e Contato com o conteúdo real dela.
- [ ] Site inteiro revisto de novo contra as regras de fora; o que não passou mudou ou saiu (D30).
- [ ] Aval dela no site completo, com o texto do rodapé.
- [ ] `noindex` fora, metadados completos e prévia de link (Open Graph).
- [ ] Barra técnica da Fase 1 conferida de novo com as seções novas.

Fora dos critérios: Depoimentos (D25) e domínio pago (D10).

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
- **D10.** Domínio pago só no fim. Até lá, `drathaianelessa.vercel.app`.
- **D11.** Repositório privado; fica público no fim. Fotos e dados dela só com o aval dela.
- **D12.** Regras do CFO e do CRO-AL pesquisadas e registradas aqui (seção "Regras de fora").
- **D13.** Skills de terceiros saem do repositório: as repetidas são apagadas, as 6 únicas vão para o `claude-kit`.
- **D14.** Git: branch e PR por entrega, o Lucas faz o merge. Sem atribuição de IA.
- **D15.** Fluxo de agentes: núcleo (`/plan`, `/exec`, `/walkthrough`, `/pr`) com `/feature-flow`, `/cot`, `/tot` e `/council` (leve por padrão).
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
- **D31.** Pausa dos vídeos (2026-10-10). Os dois vídeos, o do consultório no hero e o do kit no Sobre, rodam em loop enquanto estão na tela e param quando saem dela. Cada um tem um botão de pausa discreto no canto inferior direito: ícone escuro num quadrado claro de 32 px, sem raio, com área de toque de 44 px. A pausa pedida pela pessoa vale até ela tocar em reproduzir, só durante a visita. Foi considerado tirar o botão do hero e assumir a falha no critério WCAG 2.2.2; ficou o botão nos dois.
