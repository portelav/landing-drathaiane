---
name: cot
description: "Aplica Chain of Thought explícito ao problema passado como argumento, seguindo o protocolo da skill cot-thinker (causa raiz, por quê, hipóteses com trade-offs, eliminação, decisão, e só então o output). Use quando o usuário invocar /cot, pedir para pensar passo a passo, ou trouxer bug de causa não óbvia, decisão técnica ou erro em produção."
argument-hint: "[problema a analisar]"
---
Aplique Chain of Thought ao problema abaixo, seguindo o protocolo da skill `cot-thinker`:

1. Causa raiz
2. Por quê
3. Hipóteses, cada uma com trade-off positivo e negativo
4. Eliminação
5. Decisão

**E então:** produza o output final (código, plano ou resposta).

Contexto fixo do landing-drathaiane: landing de uma página em Next.js 16, React 19, Tailwind 4, Motion e Lenis, sem banco nem servidor; movimento dirigido por scroll com `requestAnimationFrame` próprio; layout dependente de mídia por proporção (`wide:`, `beside:`); vídeo próprio (ADR 0003); bugs já vistos aparecem por aparelho (iPhone com economia de energia, iPad retrato, roda do mouse no Windows); regras do CFO no PRD. Hipótese que depende de comportamento em runtime (dado, permissão, navegador) se confirma reproduzindo, não lendo código.

**Problema:** $ARGUMENTS
