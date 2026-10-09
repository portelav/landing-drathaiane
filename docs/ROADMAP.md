# Roadmap

Forma leve: projeto solo. Escopo, meta e prazo do MVP saem da revisão do site com o Lucas (PRD, D17); até lá, a lista abaixo é só o que já se sabe.

## Agora

| Item | Critério de pronto | Plano |
|---|---|---|
| Revisão do site com o Lucas | Escopo do MVP, meta e prazo registrados no PRD (Rodada 2, seções 5 e 10) e nesta lista | — |
| Rodapé com identificação | "Dra. Thaiane Lessa · Cirurgiã-Dentista · CRO/AL-6418" visível em 390 px, iPad e computador | `/plan` (parte de Contato) |
| Âncoras quebradas do menu | `#servicos`, `#depoimentos`, `#contato` levam a uma seção, ou saem do menu até ela existir | — |
| Contraste dos rótulos de 11 px | `dark-55` e `light-40` em texto pequeno passam em 4,5:1 (DESIGN.md, seção 3) | — |
| Pausa dos vídeos em loop | Hero e kit com controle de pausa acessível (WCAG 2.2.2) | — |

## Depois

- Seção Serviços (`docs/fdd/servicos.md`), quando o conteúdo chegar.
- Seção Contato (`docs/fdd/contato.md`), quando o conteúdo chegar.
- Seção Depoimentos ou substituto (`docs/fdd/depoimentos.md`), depois da resposta do CRO-AL.
- Revisão do DEF/CRO-AL (consultoria gratuita) antes de tirar o `noindex`.
- Tirar o `noindex`, completar metadados e prévia de link (Open Graph).
- README final com prints e link, e repositório público, com o aval dela.
- Remover `.claude/skills/**` dos ignores do `eslint.config.mjs`: as skills saíram do repositório no kickoff.
- Domínio próprio.

## Talvez

- Seção de primeira visita, para onde a doutora acha que o vídeo do kit pertence (nota em `docs/fdd/sobre.md`).
- Faixa estreita com a foto `IMG_9049` (sacolinha do kit) entre o texto e a linha do tempo do Sobre.
- Analytics de cliques no WhatsApp (exige política de privacidade e novo `/kickoff`).

## Aberto (depende de alguém)

Fica nas notas privadas.
