# CLAUDE.md

Contexto operacional para agentes de IA neste repositório. Ler antes de qualquer tarefa. Ler também o `AGENTS.md` (bloco do Next.js, escrito e reescrito pelo `next dev`).

## Projeto

**landing-drathaiane**: landing page da Dra. Thaiane Lessa, cirurgiã-dentista em Maceió (CRO/AL-6418). Para pacientes de estética e de odontologia restauradora que querem conhecer a profissional antes de chamar no WhatsApp.
Objetivo: site completo e publicável, que entre no portfólio e no currículo do Lucas.

A Dra. Thaiane aprova todo conteúdo e todo visual. Fotos e dados dela só ficam públicos (no site indexado ou no repositório aberto) com o aval dela.

## Equipe

Lucas Portela (`portelav`), sozinho. Ele faz o merge.

Repositório: `portelav/landing-drathaiane` (privado; vira público no fim, com o aval dela). Deploy: Vercel, produção a partir da `main`, preview por branch.

## Marco atual

Fechar o MVP: seções que faltam (Serviços, Depoimentos ou substituto, Contato e rodapé), conformidade com as regras do CFO e do CRO-AL, e saída do `noindex`. Escopo, meta e prazo do MVP ainda vão ser definidos numa revisão do site. Lista de trabalho em `docs/ROADMAP.md`.

Onde está cada coisa:

| Pergunta | Documento |
|---|---|
| O quê e por quê, público, escopo, regras do CFO, decisões | `docs/PRD.md` |
| Por que cada decisão técnica foi tomada | `docs/adr/` |
| Como cada seção se comporta | `docs/fdd/<nome>.md` |
| O que vem agora e depois | `docs/ROADMAP.md` |
| Cor, tipografia, forma, movimento, tom de voz | `docs/design/DESIGN.md` |
| Pesquisa que embasa decisão | `docs/research/` |

## Estado atual

Prontos: preloader com o monograma, header (WhatsApp e Instagram), hero com vídeo e a seção Sobre em três tempos (band, texto, linha do tempo com vídeo). Faltam Serviços, Depoimentos e Contato, cujas âncoras o menu já declara. O conteúdo dessas seções está com a doutora. No ar em https://drathaianelessa.vercel.app com `noindex`.

## Ambientes

| Ambiente | URL |
|---|---|
| Local | `http://localhost:3000` |
| Preview (branch) | gerado pela Vercel a cada push |
| Produção (`main`) | https://drathaianelessa.vercel.app |

## Stack

| Camada | Escolha | ADR |
|---|---|---|
| Framework e hospedagem | Next.js 16 (App Router), React 19, Vercel | [0001](docs/adr/0001-nextjs-on-vercel.md) |
| Estilo | Tailwind CSS 4, tokens em `src/app/globals.css` | [0001](docs/adr/0001-nextjs-on-vercel.md) |
| Movimento | Motion 13, Lenis, `requestAnimationFrame` próprio nas peças de scroll | [0002](docs/adr/0002-motion-lenis-scroll.md) |
| Vídeo | Arquivos próprios em `public/video/`, VP9 + H.264 com poster | [0003](docs/adr/0003-self-hosted-video.md) |

Sem banco, sem backend, sem formulário, sem analytics.

Regras que decorrem da stack:

- Next.js 16 não é o Next do treinamento: ler o guia em `node_modules/next/dist/docs/` antes de escrever código e respeitar avisos de deprecação.
- Breakpoint de layout que depende de foto ou vídeo é por proporção (variantes `wide:` e `beside:` em `globals.css`), não por largura em pixels. Ver o bug do iPad em `docs/fdd/sobre.md`.
- Animação de `transform` e `opacity`. Desfoque em elemento que se move é exceção registrada no DESIGN.md, não padrão.
- Todo movimento tem estado final legível com `prefers-reduced-motion` (decisão no DESIGN.md).
- O que se mexe sozinho por mais de 5 s tem como pausar (WCAG 2.2.2).
- Mídia bruta fica em `media/` (ignorada pelo git); no repositório só entra a versão transcodificada.

## Regras de fora (CFO e CRO-AL)

O site é publicidade odontológica. Todo texto, foto e vídeo segue o Código de Ética Odontológica (Res. CFO-118/2012, cap. XVI) e a Res. CFO-196/2019. Tabela completa e fontes no PRD, seção "Regras de fora". Em resumo, para quem escreve ou revisa:

- Nome, "Cirurgiã-Dentista" e CRO/AL-6418 visíveis no site (rodapé, no mínimo).
- Nunca: preço, forma de pagamento, "grátis", "promoção", "desconto", "popular", sorteio, brinde, promessa de resultado, superlativo, crítica a colega.
- "Especialista" só se a especialidade estiver registrada no CRO-AL; senão, "área de atuação".
- Sem imagem de procedimento em andamento, instrumental, material ou tecido biológico.
- Antes e depois só da própria doutora, com TCLE assinado e nome + CRO na imagem.
- Paciente ou terceiro identificável só com autorização escrita.
- Dúvida sobre uma peça: não publicar, registrar no PRD e perguntar à doutora.

## Fluxo com agentes

Comandos em `.claude/commands/`, skills em `.claude/skills/`, subagentes em `.claude/agents/`. Artefato-mestre de cada entrega: `tasks/{slug}.md` (template em `.claude/templates/task-template.md`).

1. `/plan <pedido>`: cria a branch `tipo/{slug}`, faz a triagem e escreve os Stages 1 a 5. Para no **Gate S2** até aprovação humana. Não escreve código.
2. `/exec`: implementa na ordem do plano, um commit por item, escreve os Stages 6 a 8.
3. `/walkthrough`: audita (inclusive as regras do CFO) e escreve o Stage 9. APPROVED, WARNINGS ou BLOCKED.
4. `/pr`: abre o PR depois de confirmar. O Lucas faz o merge.

Cada seção nova é um `/plan`. Trivial (até 3 arquivos, sem regra): `tasks/{slug}.md` mínimo (Stages 1 e 4) e direto ao `/exec`.

| Comando ou skill | Para quê |
|---|---|
| `/feature-flow` | Orquestra refine → (tot ou council) → plan → exec → walkthrough → pr com gates. Só por chamada explícita |
| `/refine` | Reescreve pedido vago e roteia |
| `/commit` | Microcommits atômicos em Conventional Commits |
| `/fix-loop` | Bug: reproduzir no navegador primeiro, corrigir até verde, PR com causa raiz |
| `/ui`, `/ui-ux-pro-max` | Componentes com os tokens; checklist de qualidade de interface |
| `/cot`, `/tot` | Raciocínio passo a passo; comparação de 3 alternativas |
| `/council` | Conselho de 5 perspectivas. Raro; versão leve (sem peer review) por padrão |

Skills de design usadas, instaladas no usuário (não no repositório): `taste-skill`, `apple-design`, `emil-design-eng`, `animate`, `find-animation-opportunities`, `canvas-design` (do `claude-kit`); `frontend-design` e `ui-ux-pro-max` (plugins).

Hooks em `.claude/settings.json`: validação de frontmatter ao abrir a sessão; lint e typecheck ao fim de cada turno (só avisa).

QA: abrir a página pelo MCP do Chrome DevTools (`.mcp.json`) em 390 px, iPad retrato e computador antes de pedir teste manual, avisando. Fechar no fim só o Chrome que o MCP abriu.

## Fluxo de trabalho: docs primeiro

1. Nenhuma seção sem FDD. O FDD é a spec.
2. Mudança de stack ou de arquitetura exige ADR antes do código.
3. O PRD é vivo: implementação divergiu, o doc muda na mesma branch.
4. Dúvida entre duas leituras do doc: perguntar. Decisão de produto é do Lucas e da doutora, registrada no PRD com data.
5. Texto, foto ou dado que ela ainda não mandou vira `> TODO` (no doc) ou fica fora da página. Nunca texto plausível inventado: aqui isso vira problema ético para ela.
6. Documento pronto ou seção concluída: commit imediato.

## Git

- Commits pequenos, uma mudança lógica por commit.
- Conventional Commits: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `style`, `perf`, `ci`, e `redesign`/`tweak`/`revert` como o histórico já usa. Título em inglês, imperativo, sem ponto final, até 72 caracteres.
- NUNCA adicionar Co-Authored-By, "Generated with" ou qualquer atribuição de IA em commits ou PRs.
- Branch `tipo/nome` a partir da `main` atualizada, PR para `main`, merge sem squash. PR nunca em rascunho, e só aberto depois de confirmar.
- Nunca `git push --force` em `main`. Nunca commitar `.env`, segredos ou credenciais.

## Idioma

- Documentação: português do Brasil.
- Código, identificadores, comentários, commits, branches: inglês.
- Interface: português do Brasil.

## Convenções de documento

- Markdown, uma ideia por seção, diagramas em Mermaid no próprio arquivo.
- Seção ainda não escrita recebe `> TODO` com o que falta, nunca texto inventado.

## Comandos

```bash
npm run dev          # localhost:3000
npm run build
npm run lint
npx tsc --noEmit     # typecheck
```

Antes de abrir PR: lint, typecheck e build verdes (o CI roda os três).

## Estrutura do código

```
src/
  app/          layout.tsx (metadados, fontes, noindex), page.tsx (ordem das seções), globals.css (tokens, variantes wide: e beside:)
  components/   uma seção ou peça por arquivo: preloader, header, hero, about, about-text, about-timeline, brand-mark, smooth-scroll
public/
  images/  logos/  video/   mídia já transcodificada
docs/           PRD, ADRs, FDDs, ROADMAP, DESIGN, research
tasks/          um arquivo por entrega (/plan, /exec, /walkthrough)
media/          material bruto, fora do git
```

## Kit

Organizado pelo `/kickoff` do `claude-kit` em 2026-10-09 (kit cee6f0b).

- **Adotado:** CLAUDE.md, PRD leve, ADRs, FDDs por seção, DESIGN.md, ROADMAP leve, `tasks/{slug}.md`, README, `docs/research/`; `/plan`, `/exec`, `/walkthrough`, `/pr`, `/commit`, `/refine`, `/fix-loop`, `/feature-flow`, `/cot`, `/tot`, `/council` (leve), `/ui`, `/ui-ux-pro-max`; subagentes dos comandos do núcleo; hooks de frontmatter e de lint/typecheck; CI; MCP do Chrome DevTools.
- **Fora, e quando entra:** ADD (entra se surgir banco, formulário que grava, agendamento ou analytics); security-threat-model (mesmo gatilho); `/db-architect`, `/index-generator`, testes de RLS, migração no merge (entram com banco); `/good-morning` (entra se houver mais gente ou várias branches ao mesmo tempo).

Rodar `/kickoff` de novo revisa esta lista.
