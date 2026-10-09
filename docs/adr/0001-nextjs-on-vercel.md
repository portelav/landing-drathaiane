# ADR 0001: Next.js 16 com Tailwind 4, hospedado na Vercel

Status: aceito
Data: 2026-08-18 (registrado em 2026-10-09)

## Contexto

Landing de uma página para uma cirurgiã-dentista, feita por uma pessoa só, que também é peça de portfólio. Precisa de animação pesada e de mídia otimizada, e tem que ficar no ar sem custo enquanto não há domínio pago. Não há banco, login nem formulário.

## Decisão

Next.js 16 (App Router, TypeScript) com Tailwind CSS 4, publicado na Vercel pela integração com o GitHub: produção a partir da `main`, preview por branch. Fontes servidas pelo próprio Next (`next/font`): Inter Tight e Instrument Serif.

## Alternativas consideradas

- HTML, CSS e JS sem framework: mais leve, mas sem componentes e sem otimização de fonte e imagem; pior como amostra de portfólio para vagas de React.
- Astro: ótimo para página estática, mas as peças centrais são componentes React interativos com Motion; ilhas para quase tudo anulam a vantagem.
- Outro host (Netlify, GitHub Pages): a Vercel dá preview por PR sem configuração, e é o host nativo do Next.

## Consequências

- O Next 16 tem mudanças que fogem do treinamento dos modelos: ler `node_modules/next/dist/docs/` antes de escrever código (bloco do `AGENTS.md`).
- Tokens de cor, fonte e curva vivem em `src/app/globals.css` (`@theme inline`), não num arquivo de config.
- A página é estática; se entrar formulário ou agendamento, o servidor do Next resolve sem trocar de stack, mas exige ADD e novo `/kickoff`.
- O domínio `drathaianelessa.vercel.app` vale até a compra de um domínio próprio.
