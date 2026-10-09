---
name: feature-flow
description: "Orquestrador ponta a ponta de uma entrega do landing-drathaiane, da ideia ao PR, encadeando refine → (council ou tot) → plan → exec → verificação → walkthrough → pr, com gates humanos obrigatórios. Só por chamada explícita: /feature-flow, roda o fluxo completo, pipeline completo. Não usar para ajuste trivial (até 3 arquivos)."
disable-model-invocation: true
---

# Feature Flow — da ideia ao PR, com gates

Roteiro que o agente principal segue, invocando os comandos do projeto na ordem e **parando nos gates humanos**. Duas regras inquebráveis:

1. **Nunca pular um gate humano.** Esperar o OK explícito.
2. **Nunca fazer merge.** O fluxo termina no PR.

## Fluxo

| # | Comando | O que faz | Gate |
|---|---|---|---|
| 0 | `/refine` | Pedido cru ou ambíguo? Reescreve e coleta lacunas | 🚦 confirma o escopo |
| 1 | `/council` ou `/tot` | Só se há trade-off real ou 2+ abordagens excludentes | 🚦 escolhe a abordagem |
| 2 | `/plan` | Branch `tipo/{slug}`, `tasks/{slug}.md` Stages 1 a 5 | 🚦 **Gate S2** |
| 3 | `/exec` | Implementa na ordem do plano, um commit por item | — |
| 4 | verificação | `npm run lint`, `npx next typegen && npx tsc --noEmit` e `npm run build`; fluxo do FDD no navegador em 390 px e no computador | — |
| 4b | validação visual | Só se tocou interface: página aberta pelo MCP do Chrome DevTools, checklist do `/ui-ux-pro-max` | CRÍTICO → volta ao 3 |
| 5 | `/walkthrough` | Auditoria | BLOCKED → volta ao 3 |
| 6 | `/pr` | PR para `main` com o template | 🚦 **ENTREGA**: só após "pode abrir o PR" |
| 7 | depois | o Lucas faz o merge sem squash; atualizar `docs/ROADMAP.md` | — |

## Atalhos

- Pedido claro e completo: pular o 0.
- Sem trade-off: pular o 1.
- Trivial: `tasks/{slug}.md` mínimo (Stages 1 e 4) → `/exec` → verificação → `/pr`.
- WARNINGS no 5: reportar e perguntar se segue ou corrige antes do 6.
- Decisão de produto que o PRD não cobre: para e pergunta ao dono, em qualquer estágio.

Responda sempre em português do Brasil.
