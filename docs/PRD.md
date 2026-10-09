# PRD: landing da Dra. Thaiane Lessa

Documento vivo. O quê e por quê. Decisão de produto nova entra no registro da seção 12, com data, e depois no corpo.

Versão leve: landing de uma página, sem banco nem login.

## 1. Visão

Uma página que apresenta a Dra. Thaiane Lessa, cirurgiã-dentista em Maceió, com o cuidado visual que ela promete no atendimento, e leva o visitante a chamar no WhatsApp. Para o Lucas, é a peça de portfólio que mostra direção de arte, movimento e acabamento.

## 3. Público

- **Paciente de estética** (o alvo): adulto que pesquisa facetas, resina, clareamento. Quer confiar no olhar estético e no planejamento antes de marcar. O que impede: não conhece a profissional e desconfia de promessa fácil.
- **Paciente restauradora**: precisa resolver um problema, quer alguém cuidadoso e acessível pelo WhatsApp. O que impede: site que pareça só de estética e caro.
- **Quem avalia o portfólio do Lucas:** recrutador ou cliente em potencial. Quer ver decisão de design justificada, movimento bem feito, código limpo e repositório organizado.

Os textos precisam falar com os dois públicos de paciente sem parecer confusos (decisão já registrada em `docs/fdd/sobre.md`).

## 5. Objetivos e métricas

> TODO: definir na revisão do site com o Lucas (meta do MVP, prazo e como medir). Candidatas: site no ar e indexado com o aval dela; cliques no WhatsApp (precisaria de analytics, que hoje não existe); entrada no portfólio e no currículo.

## 6. Escopo

Seções em ordem na página.

| Item | Objetivo | FDD | Estado |
|---|---|---|---|
| Preloader | Abrir com a marca: monograma desenhado que voa para o header | (anterior ao kickoff) | pronto |
| Header | Navegação e contato direto (WhatsApp, Instagram) sempre à mão | (anterior ao kickoff) | pronto |
| Hero | Primeira impressão: o consultório e o nome | (anterior ao kickoff) | pronto |
| Sobre | Quem ela é, como trabalha, credenciais com datas | [`docs/fdd/sobre.md`](fdd/sobre.md) | pronto |
| Serviços | O que ela trata, para os dois públicos | [`docs/fdd/servicos.md`](fdd/servicos.md) | falta (conteúdo pendente) |
| Depoimentos | Prova social | [`docs/fdd/depoimentos.md`](fdd/depoimentos.md) | bloqueado (dúvida ética, ver Regras de fora) |
| Contato e rodapé | Como chegar, horários, WhatsApp; identificação obrigatória (nome, CRO) | [`docs/fdd/contato.md`](fdd/contato.md) | falta (conteúdo pendente) |

### Conteúdo pendente

A doutora já tem o conteúdo das seções que faltam e ainda não mandou. Fica nas notas privadas.

## 7. Fora de escopo

- Agendamento online, formulário, área do paciente: o contato é pelo WhatsApp. Se entrar, rodar `/kickoff` de novo (entra ADD).
- Blog e conteúdo educativo.
- Versão em outro idioma.
- Domínio pago: fica para o fim, depois do MVP.
- Preços e condições de pagamento: vetados pelo CFO.

## 8. Requisitos não funcionais

- Desempenho: LCP abaixo de 2,5 s no 4G no celular. Vídeo do hero com poster como primeira pintura.
- Acessibilidade: WCAG 2.2 AA (contraste, foco, `prefers-reduced-motion`, pausa do que se mexe sozinho por mais de 5 s).
- Dispositivos: celular (390 px), iPad retrato e computador. Layouts dependentes de mídia testados por proporção.
- SEO e compartilhamento: `noindex` até o aval dela e a revisão do CRO-AL; depois, metadados completos, prévia de link (Open Graph) e indexação.

## Regras de fora

Consulta em 2026-10-09. Detalhe, citações e grau de certeza em [`docs/research/publicidade-odontologica.md`](research/publicidade-odontologica.md). Confirmar com a Dra. Thaiane, e com o DEF/CRO-AL (revisão gratuita de peças, fiscalizacao@croal.org.br), antes de tirar o `noindex`.

| Regra | Efeito no produto | Fonte |
|---|---|---|
| Nome, profissão e número do CRO em toda divulgação | Rodapé fixo com "Dra. Thaiane Lessa · Cirurgiã-Dentista · CRO/AL-6418" | [CEO art. 43](https://website.cfo.org.br/wp-content/uploads/2018/03/codigo_etica.pdf); [cartilha CRO-AL](https://croal.org.br/wp-content/uploads/2025/04/Cartilha-de-publicidade-na-odontologia.pdf) |
| Proibido preço, forma de pagamento, bandeira de cartão, "grátis", "promoção", "desconto", "oferta", "popular", sorteio, brinde, indicação de amigos | Serviços sem valores. Nenhum CTA promocional | CEO art. 44, I e VII; cartilha CRO-AL |
| "Especialista" só com especialidade registrada no CRO-AL; senão, "área de atuação" | Sobre e Serviços dizem "especialista" só com o registro confirmado | CEO art. 44, II; cartilha CRO-AL |
| Mestrado e doutorado podem ser divulgados | Linha do tempo pode manter o mestrado | CEO art. 43, § 1º, III |
| Proibida promessa de resultado, sensacionalismo, superlativo, crítica a colega | Tom de voz no DESIGN.md; revisão de todo texto no `/walkthrough` | CEO art. 44, I e IV; [CFO Esclarece](https://website.cfo.org.br/redes-sociais-na-odontologia-fique-atento-as-normas-eticas-e-acerte-na-publicacao-dos-conteudos/) |
| Proibida imagem do transcurso de procedimento, de instrumental, material, equipamento ou tecido biológico | Nenhum vídeo de atendimento; marca de material nunca em destaque | Res. CFO-196/2019 art. 3º; cartilha CRO-AL |
| Cartilha do CRO-AL lista "bastidores, ambiente clínico" como proibido | Hero (recepção) e vídeo do kit precisam do aval do CRO-AL | Cartilha CRO-AL p. 8 |
| Antes e depois só da própria doutora, com TCLE e nome + CRO na imagem; nunca em nome de clínica | Serviços pode ter casos, se ela tiver TCLE | Res. CFO-196/2019; CFO Esclarece |
| Paciente ou terceiro identificável só com consentimento escrito, e nunca para autopromoção | Ninguém identificável na página sem autorização escrita | CEO art. 44, VI |
| Proibido anunciar procedimento não odontológico (micropigmentação, design de sobrancelha etc.) | Serviços só com procedimentos odontológicos | Res. CFO-230/2020; cartilha CRO-AL |
| Sem coleta de dados, sem obrigação de política de privacidade | Se entrar formulário ou analytics, política de privacidade e base legal (LGPD) | Lei 13.709/2018 |

### Perguntas em aberto

Fica nas notas privadas.

## 9. Riscos e premissas

| Risco ou premissa | Impacto | O que fazer |
|---|---|---|
| Conteúdo das seções depende dela e não tem data | MVP parado | Construir estrutura e movimento com `> TODO` no FDD, nunca com texto inventado na página |
| Uma peça do site ser considerada infração ética | Processo ético contra ela (advertência a suspensão) | Regras de fora no `/walkthrough`; revisão do DEF/CRO-AL antes de indexar |
| Depoimentos vetados | Seção do menu sem conteúdo | Decidir substituto (ex.: o caso de reabilitação contado por ela, sem paciente identificável) na revisão |
| Repositório público expõe fotos e dados dela | Exposição sem consentimento | Aval explícito dela antes de tornar público |
| Dependência de uma pessoa (ela aprova tudo) | Retrabalho se a aprovação vier depois | Mostrar o preview da Vercel a cada seção, antes do merge |

## 10. Critérios de pronto

> TODO: definir na revisão do site (sessão logo após o kickoff). Ponto de partida que o Lucas quis ajustar: Serviços, Depoimentos (ou substituto) e Contato com conteúdo real; CRO no site; aval dela; revisão do DEF/CRO-AL; `noindex` fora; README real; repositório público com aval dela. Domínio pago opcional.

## 12. Registro de decisões

Cada rodada é uma conversa com o dono. Decisões numeradas (D1, D2...) para o agente citar.

### Rodada 0 (2026-08-18 a 2026-08-20): construção, antes do kickoff

Decisões que já estavam no código e no plano do Sobre.

- **D1.** Público: mistura de estética de alto valor (o alvo) com restauradora.
- **D2.** Referência visual: aventuradentalarts.com (estrutura editorial do header, linha do tempo).
- **D3.** Contato principal pelo WhatsApp, com o número real do consultório; Instagram ao lado.
- **D4.** `noindex` até o conteúdo real chegar.
- **D5.** O caso de reabilitação em resina é material de Serviços, não do Sobre.
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
