# CLAUDE.md

Contexto operacional para agentes de IA neste repositório. Ler antes de qualquer tarefa. Ler também o `AGENTS.md` (bloco do Next.js, escrito e reescrito pelo `next dev`).

## Princípio

O site, o repositório e os docs nunca podem causar problema à Dra. Thaiane em área nenhuma da vida: profissional, jurídica, privacidade, reputação, segurança pessoal, dinheiro. O CRO é uma delas, não a única. Cada peça do site, commit e documento é pesado pelo que pode expor ou prejudicá-la (dado pessoal, localização, rotina, imagem). Na dúvida, fica fora, e a pergunta vai ao Lucas.

## Projeto

**landing-drathaiane**: landing page da Dra. Thaiane Lessa, cirurgiã-dentista em Maceió (CRO/AL-6418). Para pacientes de estética e de odontologia restauradora que querem conhecer a profissional antes de chamar no WhatsApp. Objetivo: site completo e publicável, que entre no portfólio e no currículo do Lucas.

O Lucas (`portelav`, sozinho) confirma tudo e faz o merge. A Dra. Thaiane opina sobre estética, design e seções, dando opções, sem aprovação formal, e dá o olhar final no site completo antes de sair o `noindex` (PRD, D22 e D28). Texto, foto e dado dela vêm dela, nunca inventados. Pergunta técnica, de git ou de segurança não vai para ela.

Repositório público `portelav/landing-drathaiane` (PRD, D18 e D19). Notas internas em `portelav/landing-drathaiane-notes` (privado), clonado em `private/`. Deploy na Vercel: produção a partir da `main` em https://www.drathaianelessa.com.br (com `noindex`; PRD, D49), preview por branch.

Onde está cada coisa:

| Pergunta | Onde |
|---|---|
| O quê e por quê, público, escopo, regras do CFO, decisões | `docs/PRD.md` |
| O que vem agora e depois, estado atual | `docs/ROADMAP.md` |
| Como uma seção se comporta | `docs/fdd/<nome>.md` |
| Por que uma decisão técnica foi tomada | `docs/adr/` |
| Cor, tipografia, forma, movimento, tom de voz | `docs/design/DESIGN.md` |
| Pendências com a doutora, caso clínico, leitura de risco | `private/` (notas privadas) |

## Stack

Next.js 16 (App Router), React 19, Tailwind CSS 4 (tokens em `src/app/globals.css`), Motion 13 e Lenis, vídeo próprio em `public/video/` (ADRs 0001 a 0004). Sem banco, sem backend, sem formulário, sem analytics.

- Next.js 16 não é o Next do treinamento: ler o guia em `node_modules/next/dist/docs/` antes de escrever código.
- **Celular primeiro** (PRD, D42): é por onde a maioria vai entrar. Toda seção é desenhada, planejada e conferida primeiro no celular em pé, com movimento próprio; o computador adapta a partir dela. Empilhar e parar não é versão de celular.
- Layout que depende de foto ou vídeo é por proporção (variantes `wide:` e `beside:`), não por largura em pixels.
- Animar `transform` e `opacity`. Todo movimento tem estado final legível com `prefers-reduced-motion`. O que se mexe sozinho por mais de 5 s tem como pausar (WCAG 2.2.2).
- Mídia bruta fica em `media/` (fora do git); no repositório só a versão transcodificada.

## Regras de fora (CFO e CRO-AL)

O site é publicidade odontológica. Vale o Código de Ética Odontológica (Res. CFO-118/2012, alterado pela Res. CFO-SEC-271/2025) e a Res. CFO-196/2019, lidos no texto oficial. Tabela completa, com o artigo de cada regra, no PRD, seção "Regras de fora". A lista curta:

- Nome, "Cirurgiã-Dentista" e CRO/AL-6418 visíveis no site, no rodapé no mínimo (art. 43).
- Nenhum preço, forma de pagamento ou serviço gratuito (art. 44, I; PRD, D29).
- Nenhuma promessa de resultado, sensacionalismo ou autopromoção (Res. 196/2019, art. 2º, § 1º).
- "Especialista" só com a especialidade registrada no CRO-AL (art. 44, II). Área de atuação, procedimento e técnica só depois do título dessa especialidade ou de "clínico geral" (art. 43, § 1º, I).
- Nenhuma imagem de procedimento em andamento (Res. 196/2019, art. 3º).
- Paciente identificável só com consentimento (art. 44, VI); na página, ninguém identificável sem autorização escrita.
- Antes e depois só de casos dela, com TCLE, nome e CRO na imagem (Res. 196/2019, arts. 2º e 4º).

Proporção: peça que passa na lista vai. Conflito claro com o texto literal se corrige, citando o artigo em uma linha. Leitura de borda não se levanta, e o DEF/CRO-AL não é consultado por pouca coisa. Regra vem do texto oficial, nunca de fonte de terceiros. Fora do CFO vale o princípio do topo.

## Fluxo de trabalho

Enxuto, para uma landing page de uma pessoa só. Comandos em `.claude/commands/`.

1. **Trabalho pequeno** (até 3 arquivos, sem regra do CFO, sem conteúdo novo da doutora): vai direto, sem `/plan` e sem `tasks/`. O escopo fica na descrição do PR.
2. **Seção nova, ou mudança que toque regra, dado ou conteúdo dela:** `/plan` (branch, triagem e `tasks/{slug}.md` de até 80 linhas) e depois `/exec`. Seção com comportamento que pode dar bug (proporção, vídeo, scroll) ganha FDD; seção simples, só uma entrada no PRD ou no ROADMAP.
3. `/exec` implementa, roda lint e typecheck e **para sem commitar**. O Lucas confere no navegador. Depois `/commit` (commits atômicos) e `/walkthrough` (auditoria curta, inclusive as regras do CFO).
4. `/pr` abre o PR, depois de perguntar "há mais algo do mesmo tema na fila?" e de confirmar com o Lucas.

Outros: `/ui` (componente com os tokens), `/fix-loop` (bug: reproduzir no navegador primeiro, corrigir até verde).

**Um PR por seção ou marco, não por ajuste.** A branch fica aberta até a entrega estar completa e visível no preview, com vários commits dentro. Ajuste pequeno que surge no meio vai na branch em andamento; sem branch aberta, acumula em `chore/polish` até haver uns 3 a 5. Ajuste muito pequeno (uma linha de status em `tasks/`, um erro de digitação): perguntar ao Lucas se vai num PR rápido próprio ou se espera na `chore/polish`. Direto na `main` não dá: a proteção exige PR e os checks do CI, inclusive para o dono. Doc e decisão do PRD entram junto com a seção que os motivou. Exceção: correção urgente em produção e mudança que precisa de revisão à parte.

Docs: o PRD é vivo (implementação divergiu, o doc muda na mesma branch). Nenhum PR é mergeado sem marcar como feito, no PRD (seção 10 e tabela da seção 6) e no ROADMAP, o que ele entrega; o `/pr` faz isso no passo 4. Mudança de stack ou arquitetura pede ADR antes do código. Decisão de produto é do Lucas, registrada no PRD com data. Texto, foto ou dado que a doutora ainda não mandou vira `> TODO` ou fica fora da página, nunca texto plausível inventado.

QA: abrir a página pelo MCP do Chrome DevTools em 390 px, iPad retrato e computador antes de pedir teste manual, avisando. Fechar no fim só o Chrome que o MCP abriu.

## Git

- Commits pequenos, uma mudança lógica por commit. Conventional Commits (`feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `style`, `perf`, `ci`, e `redesign`/`tweak`/`revert` como o histórico já usa). Título em inglês, imperativo, sem ponto final, até 72 caracteres.
- NUNCA adicionar Co-Authored-By, "Generated with" ou qualquer atribuição de IA em commits ou PRs.
- Branch `tipo/nome` a partir da `main` atualizada, PR para `main`, merge sem squash. PR nunca em rascunho, e só aberto depois de confirmar.
- Nunca `git push --force` em `main`. Nunca commitar `.env`, segredos ou credenciais.

## Repositório público

Tudo que entra no git fica visível para sempre, inclusive no histórico e nos diffs de PR. Antes de cada commit:

- **Segredo nunca.** Chave, token, senha e `.env` só na Vercel ou em `.env.local`. O CI roda `gitleaks` e barra.
- **Dado de terceiro nunca:** paciente, pessoa que aparece em foto ou vídeo, telefone pessoal, CPF, endereço de casa. Foto de paciente só entra se for para a página (antes e depois com TCLE, sem identificar).
- **Documento interno fica em `private/`:** dúvida aberta, pendência da doutora, caso clínico, leitura de risco sobre peça do site, estratégia, opinião sobre terceiro. O doc público registra só decisão tomada e regra.
- **Mídia sem metadado.** Foto e vídeo novos entram limpos (`exiftool -all=`, `magick -strip`, `ffmpeg -map_metadata -1 -c copy`). Logo exportado do Canva traz XMP com o nome dela e o id da conta.
- **Commit com o e-mail noreply** do GitHub (`198817785+portelav@users.noreply.github.com`). O CI barra PR com commit de outro e-mail.
- **Direitos:** todos os direitos reservados (PRD, D20). Fotos, vídeos, logos e textos dela nunca entram em licença aberta.

## Idioma

Documentação e interface em português do Brasil. Código, identificadores, comentários, commits e branches em inglês.

## Comandos

```bash
npm run dev          # localhost:3000
npm run build
npm run lint
npx next typegen && npx tsc --noEmit   # typecheck
```

Durante o trabalho basta lint e typecheck; o build roda uma vez antes de abrir o PR. O CI roda os três.

## Estrutura do código

```
src/
  app/          layout.tsx (metadados, fontes, noindex), page.tsx (ordem das seções), globals.css (tokens, variantes wide: e beside:)
  components/   uma seção ou peça por arquivo
  lib/          dados sem componente: contact.ts, media.ts
public/         images/ logos/ video/ (já transcodificados)
docs/           PRD, ADRs, FDDs, ROADMAP, DESIGN, research
tasks/          um arquivo por entrega que passou pelo /plan
media/          material bruto, fora do git
private/        notas internas, repositório privado à parte, fora do git
```
