# ADRs: Architecture Decision Records

Um arquivo por decisão técnica relevante. Nome: `NNNN-titulo-curto.md`, numeração sequencial.
ADR nunca é editado depois de aceito. Decisão mudou? ADR novo que substitui o anterior. Exceção: uma nota curta e datada quando o texto ficou desatualizado sem mudar a decisão.

As três primeiras registram, no kickoff (2026-10-09), decisões tomadas durante a construção (2026-08-18 a 2026-08-20).

## Índice

| Nº | Título | Status |
|---|---|---|
| [0001](0001-nextjs-on-vercel.md) | Next.js 16 com Tailwind 4, hospedado na Vercel | aceito |
| [0002](0002-motion-lenis-scroll.md) | Motion e Lenis para o movimento, `requestAnimationFrame` próprio nas peças dirigidas por scroll | aceito |
| [0003](0003-self-hosted-video.md) | Vídeo próprio em `public/video/`, VP9 e H.264 nível 4.0 com poster | aceito; o carregamento (`preload`) foi substituído pela 0004 |
| [0004](0004-deferred-video-loading.md) | Vídeos carregam depois da primeira tela; poster do hero com prioridade alta | aceito |
| [0005](0005-mapbox-static-map.md) | Mapa do consultório como imagem estática do Mapbox, servida pelo `next/image` | aceito |

## Template

```markdown
# ADR NNNN: Título

Status: proposto | aceito | substituído por ADR NNNN
Data: AAAA-MM-DD

## Contexto

Qual problema ou força motivou a decisão. Restrições reais (equipe, custo, prazo, conhecimento).

## Decisão

O que foi decidido, em uma ou duas frases diretas.

## Alternativas consideradas

- Alternativa A: por que não.
- Alternativa B: por que não.

## Consequências

O que fica mais fácil, o que fica mais difícil, o que passa a ser obrigatório.
```
