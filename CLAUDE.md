# CLAUDE.md

Contexto operacional para agentes de IA neste repositório. Ler antes de qualquer tarefa. Ler também o `AGENTS.md` (bloco do Next.js, escrito e reescrito pelo `next dev`).

## Princípio

O site, o repositório e os docs nunca podem causar problema à Dra. Thaiane em área nenhuma da vida: profissional, jurídica, privacidade, reputação, segurança pessoal, dinheiro. O CRO é uma delas, não a única. Cada peça do site, commit e documento é pesado pelo que pode expor ou prejudicá-la (dado pessoal, localização, rotina, imagem). Na dúvida, fica fora, e a pergunta vai ao Lucas.

## Projeto

**landing-drathaiane**: landing page da Dra. Thaiane Lessa, cirurgiã-dentista em Maceió (CRO/AL-6418). Para pacientes de estética e de odontologia restauradora que querem conhecer a profissional antes de chamar no WhatsApp.
Objetivo: site completo e publicável, que entre no portfólio e no currículo do Lucas.

O Lucas confirma tudo. A Dra. Thaiane opina sobre estética, design e seções, dando opções, sem aprovação formal, e dá o olhar final no site completo antes de sair o `noindex` (PRD, D22 e D28). Texto, foto e dado dela vêm dela, nunca inventados. Pergunta técnica, de git ou de segurança não vai para ela.

## Equipe

Lucas Portela (`portelav`), sozinho. Ele faz o merge.

Repositório: `portelav/landing-drathaiane`, público desde 2026-10-09, com o aval dela (PRD, D18 e D19). Notas internas: `portelav/landing-drathaiane-notes` (privado), clonado em `private/`. Deploy: Vercel, produção a partir da `main`, preview por branch.

## Marco atual

Fase 1 do MVP, até 2026-10-23 (PRD, D21 a D25): o que só depende do Lucas, para o site entrar no portfólio e no currículo com o `noindex`. Rodapé com o CRO, menu sem link quebrado, contraste, pausa dos vídeos, barra técnica e README. Depois, sem data, a Fase 2: Serviços e Contato com o conteúdo dela, aval dela e saída do `noindex`. Depoimentos está fora por enquanto. Critérios de pronto no PRD, seção 10; lista de trabalho em `docs/ROADMAP.md`.

Onde está cada coisa:

| Pergunta | Documento |
|---|---|
| O quê e por quê, público, escopo, regras do CFO, decisões | `docs/PRD.md` |
| Por que cada decisão técnica foi tomada | `docs/adr/` |
| Como cada seção se comporta | `docs/fdd/<nome>.md` |
| O que vem agora e depois | `docs/ROADMAP.md` |
| O que falta pedir ou perguntar à doutora | `private/pauta.md` (notas privadas) |
| Caso clínico, material de paciente, leitura de risco sobre peças do site | `private/contexto-interno.md` (notas privadas) |
| Cor, tipografia, forma, movimento, tom de voz | `docs/design/DESIGN.md` |
| Pesquisa que embasa decisão | `docs/research/` |

## Estado atual

Prontos: preloader com o monograma, header (WhatsApp e Instagram), hero com vídeo, a seção Sobre em três tempos (band, texto, linha do tempo com vídeo) e o rodapé com a identificação do CRO e os canais de contato. Faltam Serviços e a seção Contato, cujo conteúdo está com a doutora. O menu leva só a Sobre e a Contato; Contato aponta para o rodapé até a seção existir (PRD, D26). No ar em https://drathaianelessa.vercel.app com `noindex`.

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

O site é publicidade odontológica. Vale o Código de Ética Odontológica (Res. CFO-118/2012, alterado pela Res. CFO-SEC-271/2025) e a Res. CFO-196/2019, lidos no texto oficial. Tabela completa, com o artigo de cada regra, no PRD, seção "Regras de fora". A lista curta, para quem escreve ou revisa:

- Nome, "Cirurgiã-Dentista" e CRO/AL-6418 visíveis no site, no rodapé no mínimo (art. 43).
- Nenhum preço, forma de pagamento ou serviço gratuito (art. 44, I; PRD, D29).
- Nenhuma promessa de resultado, sensacionalismo ou autopromoção no texto (Res. 196/2019, art. 2º, § 1º).
- "Especialista" só com a especialidade registrada no CRO-AL; senão, "área de atuação" (art. 44, II).
- Nenhuma imagem de procedimento em andamento (Res. 196/2019, art. 3º).
- Paciente identificável só com consentimento (art. 44, VI); na página, ninguém identificável sem autorização escrita (PRD).
- Antes e depois só de casos dela, com TCLE (Termo de Consentimento Livre e Esclarecido), nome e CRO na imagem (Res. 196/2019, arts. 2º e 4º).

Proporção: peça que passa na lista vai. Conflito claro com o texto literal se corrige, citando o artigo em uma linha. Leitura de borda não se levanta, e o DEF/CRO-AL não é consultado por pouca coisa. Regra vem do texto oficial, nunca de fonte de terceiros; leitura dos conselhos (cartilha do CRO-AL, "CFO Esclarece") é interpretação e se marca assim.

Fora do CFO vale o princípio do topo: o que puder expor ou prejudicar a doutora fica fora, e a dúvida vai ao Lucas.

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
4. Dúvida entre duas leituras do doc: perguntar. Decisão de produto é do Lucas, registrada no PRD com data; a doutora opina sobre estética, design e seções (D28).
5. Texto, foto ou dado que ela ainda não mandou vira `> TODO` (no doc) ou fica fora da página. Nunca texto plausível inventado: aqui isso vira problema ético para ela.
6. Documento pronto ou seção concluída: commit imediato.

## Git

- Commits pequenos, uma mudança lógica por commit.
- Conventional Commits: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `style`, `perf`, `ci`, e `redesign`/`tweak`/`revert` como o histórico já usa. Título em inglês, imperativo, sem ponto final, até 72 caracteres.
- NUNCA adicionar Co-Authored-By, "Generated with" ou qualquer atribuição de IA em commits ou PRs.
- Branch `tipo/nome` a partir da `main` atualizada, PR para `main`, merge sem squash. PR nunca em rascunho, e só aberto depois de confirmar.
- Nunca `git push --force` em `main`. Nunca commitar `.env`, segredos ou credenciais.

## Repositório público

Tudo que entra no git fica visível para sempre, inclusive no histórico e nos diffs de PR. Antes de cada commit:

- **Segredo nunca.** Chave, token, senha e `.env` só na Vercel ou em `.env.local`. O CI roda `gitleaks` e barra.
- **Dado de terceiro nunca:** paciente, pessoa que aparece em foto ou vídeo, telefone pessoal, CPF, endereço de casa. Foto de paciente só entra se for para a página (antes e depois com TCLE, sem identificar); material de paciente que não vai para a página fica fora do git.
- **Documento interno fica em `private/`** (repositório privado `portelav/landing-drathaiane-notes`, ignorado aqui): dúvida aberta, pendência da doutora, caso clínico, leitura de risco sobre peça do site, estratégia, opinião sobre terceiro, nome de outra empresa fora do que o site já mostra. O doc público registra só decisão tomada e regra.
- **Mídia sem metadado.** Foto e vídeo novos entram limpos (`exiftool -all=`, `magick -strip`, `ffmpeg -map_metadata -1 -c copy`): GPS, aparelho, autor, conta e id do documento no Canva ou no Adobe saem. Logo exportado do Canva traz XMP com o nome dela e o id da conta.
- **Commit com o e-mail noreply** do GitHub (`198817785+portelav@users.noreply.github.com`, em `git config user.email` de cada clone). O CI barra PR com commit de outro e-mail.
- **Direitos:** todos os direitos reservados (PRD, D20). Fotos, vídeos, logos e textos da Dra. Thaiane Lessa nunca entram em licença aberta.

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
npx next typegen && npx tsc --noEmit   # typecheck (typegen gera LayoutProps e PageProps)
```

Antes de abrir PR: lint, typecheck e build verdes (o CI roda os três).

## Estrutura do código

```
src/
  app/          layout.tsx (metadados, fontes, noindex), page.tsx (ordem das seções), globals.css (tokens, variantes wide: e beside:)
  components/   uma seção ou peça por arquivo: preloader, header, hero, about, about-text, about-timeline, footer, brand-mark, smooth-scroll
  lib/          dados sem componente, compartilhados entre Server e Client Components: contact.ts (telefone, WhatsApp, Instagram)
public/
  images/  logos/  video/   mídia já transcodificada
docs/           PRD, ADRs, FDDs, ROADMAP, DESIGN, research
tasks/          um arquivo por entrega (/plan, /exec, /walkthrough)
media/          material bruto, fora do git
private/        notas internas, repositório privado à parte, fora do git
```

## Kit

Organizado pelo `/kickoff` do `claude-kit` em 2026-10-09 (kit cee6f0b).

- **Adotado:** CLAUDE.md, PRD leve, ADRs, FDDs por seção, DESIGN.md, ROADMAP leve, `tasks/{slug}.md`, README, `docs/research/`; `/plan`, `/exec`, `/walkthrough`, `/pr`, `/commit`, `/refine`, `/fix-loop`, `/feature-flow`, `/cot`, `/tot`, `/council` (leve), `/ui`, `/ui-ux-pro-max`; subagentes dos comandos do núcleo; hooks de frontmatter e de lint/typecheck; CI; MCP do Chrome DevTools; regras de repositório público (receita `public-repo`, 2026-10-09).
- **Fora, e quando entra:** ADD (entra se surgir banco, formulário que grava, agendamento ou analytics); security-threat-model (mesmo gatilho); `/db-architect`, `/index-generator`, testes de RLS, migração no merge (entram com banco); `/good-morning` (entra se houver mais gente ou várias branches ao mesmo tempo).

Rodar `/kickoff` de novo revisa esta lista.
