# Papéis, preços e regras do CFO nos docs

**Slug:** `roles-prices-cfo-rules`
**Branch:** `docs/roles-prices-cfo-rules`
**Área:** docs (PRD, CLAUDE.md, pesquisa, comandos) · **Dono:** Lucas
**Status:** Walkthrough
**Gate S2:** Livre

---

## Stage 1 — Scope Analysis

### Documentos
- **PRD:** `docs/PRD.md` seções 7 (fora de escopo), "Regras de fora", 9 (riscos) e 12 (registro de decisões: D7, D22)
- **FDD:** não se aplica (só docs, nenhuma seção do site muda)
- **ADR relacionado:** nenhum (sem mudança de stack ou de arquitetura)
- **Pesquisa:** `docs/research/publicidade-odontologica.md`

### Objetivo
- Registrar os papéis como são de fato: o Lucas confirma tudo; a Dra. Thaiane opina sobre estética, design e seções, dando opções, sem aprovação formal. Fica o olhar final dela no site completo antes de tirar o `noindex` (D22).
- Registrar a regra de nunca ter preço no site, que é pedido dela.
- Trocar a lista de regras do CFO no `CLAUDE.md` por uma lista curta, só do que o texto oficial diz, com a regra de proporção (o que passa na lista vai; só conflito claro com o texto se corrige).
- Conferir a tabela "Regras de fora" do PRD e a pesquisa contra o texto oficial, artigo por artigo, e marcar o que é interpretação dos conselhos.
- Escrever no topo do `CLAUDE.md` o princípio de que o site, o repositório e os docs nunca podem causar problema a ela em área nenhuma da vida.
- Fechar o status de `tasks/footer-colophon.md` (PR #3 mergeado em 2026-10-10).

### Escopo e não-escopo
- **Dentro:**
  - PRD: D28 (papéis, substitui D7) e D29 (preços) numa rodada nova; seção 7; tabela "Regras de fora" e o parágrafo de abertura dela; riscos da seção 9.
  - `CLAUDE.md`: princípio no topo, linha dos papéis (linha 10), seção "Regras de fora", item 4 de "docs primeiro" (linha 111).
  - Pesquisa: fontes, art. 20, art. 44, Res. 196/2019, Res. 271/2025 e cartilha conferidos contra o texto oficial.
  - Linhas que exageram o papel dela: `docs/design/DESIGN.md:3`, `.claude/commands/exec.md:47`, `.claude/commands/council.md:16`.
  - Cópias da lista de regras nos comandos (`.claude/commands/plan.md:14`, `exec.md:30`, `walkthrough.md:22-27`) e em `docs/design/DESIGN.md:139`, alinhadas à lista curta.
  - `tasks/footer-colophon.md`: status Done.
- **Fora:**
  - Código do site. Nada em `src/` muda.
  - D7, D11, D18 e D22 continuam como estão: são histórico. D28 diz que substitui D7.
  - Linhas que falam do olhar final dela antes do `noindex` (PRD 21, 27, 65, 69, 120, D21 a D23; `CLAUDE.md:20`): é a exceção que fica.
  - Pergunta já aberta sobre o art. 4º da Res. 196/2019 (o rodapé basta, ou cada foto e vídeo precisa de nome e CRO): a linha do PRD continua igual.
  - Tom de voz do DESIGN.md (seção 8, "palavras vetadas"): é escolha de voz, mais estrita que a norma, e fica.
  - `docs/fdd/servicos.md`, regras da seção: revistas quando o conteúdo de Serviços chegar.
  - Leitura do agente sobre depoimentos na pesquisa (seção "Depoimentos"): a seção está fora (D25).
  - Notas privadas (`private/`): outro repositório.

### Conteúdo e regras de fora
- Conteúdo da doutora necessário: nenhum. Os papéis e a regra de preços já foram combinados com o Lucas em 2026-10-10.
- Regras do CFO e do CRO-AL que tocam esta entrega: todas as da tabela do PRD, porque é ela que está sendo conferida. Fontes: Código de Ética Odontológica (Res. CFO-118/2012, com a alteração da Res. CFO-SEC-271/2025) e Res. CFO-SEC-196/2019, lidos do PDF oficial. A cartilha do CRO-AL (Conselho Regional de Odontologia de Alagoas) e o "CFO Esclarece" do CFO (Conselho Federal de Odontologia) são interpretação, não norma.

### Critérios de aceite (testáveis)
1. `grep` por "aprova todo", "ela aprova tudo", "quem aprova o visual", "doutora vê para aprovar" e "continua dependendo do aval" em `CLAUDE.md`, `docs/` e `.claude/` não acha nada.
2. PRD, seção 12, tem a Rodada 4 (2026-10-10) com D28 e D29. D28 diz que substitui D7. O texto de D7 não mudou.
3. Texto novo só usa "aval dela" para o olhar final antes do `noindex` (D22). Nenhum texto novo manda pergunta técnica, de git ou de segurança para ela ou para `private/pauta.md`.
4. `CLAUDE.md`, "Regras de fora", tem sete itens, cada um com o artigo citado, e o parágrafo da regra de proporção. A linha "Dúvida sobre uma peça: não publicar, registrar em `private/pauta.md` e perguntar à doutora" saiu.
5. O topo do `CLAUDE.md` tem o princípio, com as áreas nomeadas (profissional, jurídica, privacidade, reputação, segurança pessoal, dinheiro) e o CRO como uma delas.
6. Na tabela do PRD, toda linha cita artigo do texto oficial ou marca a fonte como "(interpretação)". "Desconto" cita a cartilha. O art. 1º, § 1º, da Res. 196/2019 aparece só como regra de selfie. Nenhuma linha cita fonte de terceiros.
7. A pesquisa não usa fonte secundária como fonte de regra. A seção da Res. 271/2025 cita o texto oficial do art. 20, VIII e X, do art. 32, XIII, e do art. 44, XIV.
8. A lista em `plan.md` e `exec.md` aponta para o `CLAUDE.md`; o checklist do `walkthrough.md` tem os sete itens da lista curta. Nenhum dos três trata "instrumental", "material" ou "superlativo" como regra do CFO.
9. `tasks/footer-colophon.md` com `**Status:** Done (PR #3 mergeado em 2026-10-10)`.
10. Hooks e CI verdes (lint, typecheck, build, higiene do repositório público). Nenhum arquivo em `src/` mudou (`git diff --stat main` só lista docs, comandos e tasks).

### Perguntas bloqueadoras
- Nenhuma. O escopo foi combinado com o Lucas em 2026-10-10.

### Premissas
- Alinhar as cópias da lista nos comandos (`plan.md`, `exec.md`, `walkthrough.md`) e o `DESIGN.md:139` faz parte do item da lista curta: se ficarem como estão, o `/walkthrough` continua cobrando "instrumental" e "material" em toda imagem. Não estava na lista combinada; entra por coerência. O Lucas confirma ao aprovar o plano.
- A extração do PDF do Código feita em 2026-10-09 cortou o art. 44, VII, no meio ("especialmen..."), e a palavra "popular" não aparece no texto extraído. O `/exec` relê essa página. Se "popular" não estiver no inciso, a tabela passa a citar a cartilha para essa palavra.
- A Res. CFO-230/2020 (procedimento não odontológico) ainda não foi lida no texto oficial. O `/exec` lê; se não der, a linha cita a cartilha como fonte e diz isso.
- "Superlativo" na tabela vem do "CFO Esclarece". O `/exec` confere na página do CFO. Se a página não disser, a palavra sai da tabela e fica só no tom de voz do DESIGN.md.
- O site do sistema de atos do CFO estava com o certificado TLS vencido em 2026-10-09 (download com `curl -k`). É texto público e nada é enviado. O `/exec` diz isso no Stage 6 se precisar baixar de novo.
- Siglas: TCLE é o Termo de Consentimento Livre e Esclarecido, assinado pelo paciente; DEF é o setor de fiscalização do CRO-AL.

---

## Stage 2 — Evidence Gathering

| Arquivo | Evidência |
|---|---|
| `CLAUDE.md` | Linha 10: "A Dra. Thaiane aprova todo conteúdo e todo visual". Linhas 66-77: lista com "superlativo", "crítica a colega", "instrumental, material" e a regra "Dúvida sobre uma peça: [...] perguntar à doutora". Linha 111: "Decisão de produto é do Lucas e da doutora". Sem o princípio no topo |
| `docs/PRD.md` | D7 (linha 146): "A doutora aprova conteúdo e visual". Risco (linha 99): "Dependência de uma pessoa (ela aprova tudo)". Seção 7 (linha 58): "Preços [...] vetados pelo CFO", sem dizer que é pedido dela. Tabela (linhas 71-84): linha 74 cita "desconto" no art. 44; linha 78 cita o art. 1º, § 1º, para toda imagem; linha 77 cita "promessa de resultado" no art. 44, I, que não diz isso; linha 82 diz "consentimento escrito", e o art. 44, VI, diz "consentimento livre e esclarecido" |
| `docs/research/publicidade-odontologica.md` | Linha 5: o incerto "deve ser confirmado pela Dra. Thaiane com o CRO-AL". Linha 15: fonte secundária (Sorriai) para a Res. 271/2025. Linhas 42 e 64: art. 44, XIV, e Res. 271/2025 descritos "segundo a fonte secundária". Cartilha e "CFO Esclarece" chamados de "Primária" |
| Res. CFO-SEC-271/2025, texto oficial (sistemas.cfo.org.br, SEC/2025/271) | Art. 1º: art. 20, VIII, passa a "permitir o oferecimento [...] de seus serviços [...] como forma de brinde, premiação e sorteios". Art. 2º: art. 20, X, passa a "vale presente". Art. 3º: revoga o art. 32, XIII (cartões de desconto). Art. 4º: art. 44, XIV, perde "cartão de descontos, caderno de descontos, mala direta via internet, sites promocionais ou de compras coletivas". Resultado: "desconto" saiu do Código |
| Res. CFO-SEC-196/2019, texto oficial | Art. 1º (selfie) com o § 1º (equipamento, instrumental, material, tecido biológico) dentro dele. Art. 2º: diagnóstico e conclusão com TCLE, por quem fez o caso; § 1º: proíbe sensacionalismo, autopromoção e promessa de resultado. Art. 3º: transcurso e realização de procedimento. Art. 4º: nome e número de inscrição em toda imagem ou vídeo |
| Código de Ética, PDF oficial (texto de 2012) | Art. 43: nome, número de inscrição e profissão. Art. 44: I (preços, serviços gratuitos, modalidades de pagamento), II (título ou especialidade sem registro), IV (criticar técnicas de outros profissionais), VI (paciente identificável só com consentimento livre e esclarecido, nunca para autopromoção), VII (cortado na extração), XII (antes, durante e depois). Art. 20, IX: consultas e diagnósticos gratuitos |
| `.claude/commands/` (`plan.md:14`, `exec.md:30` e `:47`, `walkthrough.md:22-27`, `council.md:16`) e `docs/design/DESIGN.md:3`, `:139` | Cópias da lista antiga com "instrumental, material", "superlativo" e "crítica a colega". `exec.md:47`: "O preview da Vercel é o que a doutora vê para aprovar". `council.md:16`: "continua dependendo do aval dela". `DESIGN.md:3`: "quem aprova o visual é a doutora" |

### Fluxo atual
- O `CLAUDE.md` e o PRD dizem que ela aprova conteúdo e visual. Na prática, o Lucas confirma tudo e conversa com ela sobre estética, design e seções.
- O `/plan`, o `/exec` e o `/walkthrough` aplicam a lista antiga, que trata o art. 1º, § 1º, da Res. 196/2019 como regra para toda imagem e manda a dúvida para a doutora. Isso gera alerta em peça que passa no texto literal.
- A pesquisa apoia a Res. 271/2025 numa fonte secundária e chama a interpretação dos conselhos de fonte primária.

---

## Stage 3 — Architecture Planning

### Source of Truth (até 4 blocos)

1. **Papéis (D28, PRD).** "O Lucas confirma tudo: conteúdo, visual, técnica, segurança e git. A Dra. Thaiane opina sobre estética, design e seções, dando opções, sem aprovação formal. Fica o olhar final dela no site completo antes de tirar o `noindex` (D22). O conteúdo que só ela tem (texto, foto, endereço, horário) continua vindo dela e nunca é inventado. Pergunta técnica, de git ou de segurança não vai para ela. Substitui D7." No `CLAUDE.md`, a linha 10 diz o mesmo em uma frase, com a referência a D28.
2. **Preços (D29, PRD).** "O site nunca tem preço nem tabela de preços, a pedido dela. Vale também para faixa de preço, 'a partir de', forma ou condição de pagamento. O Código de Ética veda o mesmo (art. 44, I)." A seção 7 passa a citar D29.
3. **Lista curta (`CLAUDE.md`, "Regras de fora").** Sete itens, cada um com o artigo:
   - nome, "Cirurgiã-Dentista" e CRO/AL-6418 visíveis (art. 43);
   - nenhum preço, forma de pagamento ou serviço gratuito (art. 44, I; D29);
   - nenhuma promessa de resultado, sensacionalismo ou autopromoção no texto (Res. 196/2019, art. 2º, § 1º);
   - "especialista" só com especialidade registrada; senão, "área de atuação" (art. 44, II);
   - nenhuma imagem de procedimento em andamento (Res. 196/2019, art. 3º);
   - paciente identificável só com consentimento (art. 44, VI);
   - antes e depois só de casos dela, com TCLE, nome e CRO na imagem (Res. 196/2019, arts. 2º e 4º).

   Depois da lista, a regra de proporção: peça que passa na lista vai; conflito claro com o texto literal se corrige, citando o artigo em uma linha; leitura de borda não se levanta, e o DEF/CRO-AL não é consultado por pouca coisa. Fora do CFO vale o princípio do topo: o que puder expor ou prejudicar a doutora fica fora, e a dúvida vai ao Lucas. A tabela completa continua no PRD.
4. **Tabela do PRD, linha a linha.**
   - Abertura: "Conferido contra o texto oficial em 2026-10-10: Código de Ética (Res. CFO-118/2012, alterado pela Res. CFO-SEC-271/2025) e Res. CFO-SEC-196/2019. A cartilha do CRO-AL e o 'CFO Esclarece' são interpretação dos conselhos e aparecem marcados assim."
   - Preço e palavras: preço, serviço gratuito e forma de pagamento no art. 44, I (e D29); brinde e sorteio no art. 20, VIII (redação da Res. 271/2025); "popular" no art. 44, VII, se a releitura confirmar; "desconto", "promoção", "oferta", bandeira de cartão e indicação de amigos na cartilha (interpretação), com a nota de que "desconto" saiu do Código em 2025.
   - Promessa de resultado: sensacionalismo, autopromoção e promessa de resultado na Res. 196/2019, art. 2º, § 1º; crítica a técnica de colega no art. 44, IV; "superlativo" no "CFO Esclarece" (interpretação), se a página disser.
   - A linha de imagem vira duas: transcurso ou realização de procedimento (Res. 196/2019, art. 3º; efeito "nenhum vídeo de atendimento") e, em selfie, nada que identifique equipamento, instrumental, material ou tecido biológico (art. 1º, § 1º, que está no artigo das selfies). Sai "marca de material nunca em destaque".
   - Antes e depois: Res. 196/2019, arts. 2º e 4º; "nunca em nome de clínica" no "CFO Esclarece" (interpretação).
   - Paciente: a regra diz "consentimento livre e esclarecido", como no art. 44, VI. O efeito continua "autorização escrita".
   - Cartilha: o termo "(interpretação)" ao lado de cada citação.
   - Linhas do art. 43, do mestrado, do "ambiente clínico", do art. 4º e da LGPD: sem mudança de regra.

### Decisão única
- Uma fonte para cada nível: o `CLAUDE.md` guarda a lista curta que os agentes aplicam; o PRD guarda a tabela completa, com artigo por linha; a pesquisa guarda o texto citado. `plan.md` e `exec.md` apontam para o `CLAUDE.md` em vez de copiar a lista; o `walkthrough.md` repete os sete itens como checklist, porque precisa de caixas marcáveis.

### Checklist de arquitetura (até 10)
- [x] Só docs e comandos: nenhum arquivo em `src/`, nenhum token, nenhum componente.
- [x] Sem FDD (nenhuma seção muda) e sem ADR (nenhuma mudança de stack).
- [x] Interface e movimento: não se aplicam.
- [x] Regras de fora: cada regra citada do texto oficial; interpretação marcada como tal.
- [x] Repositório público: nenhum dado pessoal dela ou do Lucas além do que o site já mostra; nenhuma dúvida aberta sobre ela em doc público; a pauta continua nas notas privadas.
- [x] Histórico preservado: D7 não é editado, D28 diz que o substitui.
- [x] Olhar final dela antes do `noindex` (D22) preservado em todos os lugares.
- [x] Docs em português do Brasil; commits em inglês, sem atribuição de IA.

---

## Stage 4 — Execution Planning

Até 10 itens, um commit cada, na ordem do `/exec`.

1. [ ] **Status do rodapé.** `tasks/footer-colophon.md`: `**Status:** Done (PR #3 mergeado em 2026-10-10)`. Commit `docs(tasks): mark footer-colophon as done`.
2. [ ] **D28 no PRD.** Rodada 4 (2026-10-10) na seção 12, com D28 (bloco 1 do Stage 3). Risco "Dependência de uma pessoa (ela aprova tudo)" reescrito: opinião dela sobre estética, design ou seção chegar depois; o Lucas conversa com ela, com opções, quando a decisão pesa; olhar final antes do `noindex` (D22). Commit `docs(prd): record the roles as D28`.
3. [ ] **Linhas de papel.** `CLAUDE.md:10` e `:111`, `docs/design/DESIGN.md:3`, `.claude/commands/exec.md:47`, `.claude/commands/council.md:16`, alinhadas a D28. Commit `docs: align the role lines with D28`.
4. [ ] **Princípio.** Topo do `CLAUDE.md`, logo depois da abertura: o site, o repositório e os docs nunca podem causar problema a ela em área nenhuma da vida (profissional, jurídica, privacidade, reputação, segurança pessoal, dinheiro); o CRO é uma delas. Na dúvida, fica fora e vai ao Lucas. No PRD, seção 9, uma linha de risco para o que não é CRO, com esse princípio como resposta. Commit `docs: state the principle of never causing her harm`.
5. [ ] **D29 no PRD.** D29 na Rodada 4 (bloco 2 do Stage 3); seção 7 cita D29 e o art. 44, I. Commit `docs(prd): record the no-prices rule as D29`.
6. [ ] **Pesquisa contra o texto oficial.** Reler o art. 44, VII, no PDF do Código; ler a Res. CFO-230/2020; conferir "superlativo" e "pessoa jurídica" no "CFO Esclarece"; conferir na página "Códigos" do CFO se saiu código novo. Em `docs/research/publicidade-odontologica.md`: data da conferência; linha 5 sem mandar o incerto para ela (o incerto fica fora do site até decisão do Lucas); fonte secundária sai e entra a Res. CFO-SEC-271/2025 oficial; cartilha e "CFO Esclarece" como interpretação; art. 20, VIII e IX; art. 44, XIV, com a redação nova citada; nota de que o art. 1º, § 1º, da Res. 196/2019 está no artigo das selfies; seção da Res. 271/2025 reescrita do texto oficial, com a nota de que "desconto" saiu do Código. Commit `docs(research): check the CFO rules against the official text`.
7. [ ] **Tabela do PRD.** Parágrafo de abertura e linhas conforme o bloco 4 do Stage 3, com o que o item 6 confirmar. Commit `docs(prd): cite each outside rule by article`.
8. [ ] **Lista curta no `CLAUDE.md`.** Seção "Regras de fora" conforme o bloco 3 do Stage 3; sai a regra da dúvida. Commit `docs: replace the CFO rule list with the short literal list`.
9. [ ] **Cópias da lista.** `.claude/commands/plan.md:14` e `exec.md:30` apontam para a lista curta do `CLAUDE.md`; `walkthrough.md:22-27` com os sete itens e a regra de proporção; `docs/design/DESIGN.md:139` sem "instrumental, material" (procedimento em andamento, Res. 196/2019, art. 3º; paciente identificável sem autorização escrita). Commit `docs: align the rule copies with the short list`.

Depois do merge (fora da branch): apagar a memória `docs-branch-plan` do agente.

---

## Stage 5 — Plan Verification

- [x] Regras nas camadas certas: lista curta no `CLAUDE.md`, tabela no PRD, texto citado na pesquisa, comandos apontando para o `CLAUDE.md`
- [x] FDD existe ou está no checklist: não se aplica (só docs)
- [x] Decisão de produto coberta pelo PRD ou pergunta aberta: D28 e D29 combinados com o Lucas em 2026-10-10 e registrados neste plano
- [x] Checklist ≤ 10, SoT ≤ 4, decisão única, evidências ≤ 7
- [x] Fora do `docs/ROADMAP.md`: é manutenção de docs, não item de produto; não entra na lista

**Gate S2:** Livre

---

## Stage 6 — Code Execution

| # | Camada | Arquivo | Status |
|---|---|---|---|
| 1 | tasks | `tasks/footer-colophon.md` | Done (`2036223`) |
| 2 | PRD | `docs/PRD.md` (Rodada 4, D28; risco da seção 9) | Done (`a1990c9`) |
| 3 | Docs e comandos | `CLAUDE.md`, `docs/design/DESIGN.md`, `.claude/commands/exec.md`, `.claude/commands/council.md` | Done (`1ebf3da`) |
| 4 | Docs | `CLAUDE.md` (seção "Princípio"), `docs/PRD.md` (risco fora do CRO) | Done (`8e79b80`) |
| 5 | PRD | `docs/PRD.md` (D29; seção 7) | Done (`c7d19d5`) |
| 6 | Pesquisa | `docs/research/publicidade-odontologica.md` | Done (`e875a14`) |
| 7 | PRD | `docs/PRD.md` ("Regras de fora": abertura e tabela) | Done (`b7d51b7`) |
| 8 | Docs | `CLAUDE.md` ("Regras de fora") | Done (`9963a69`) |
| 9 | Comandos e design | `.claude/commands/plan.md`, `exec.md`, `walkthrough.md`; `docs/design/DESIGN.md` | Done (`6db669e`) |

Conferências do item 6, feitas no texto oficial em 2026-10-10:
- Art. 44, VII: diz "especialmente a utilização da expressão 'popular'". Uma das extrações do PDF do Código cortou a linha; a outra, feita em 2026-10-09 com `pdfjs-dist`, traz o inciso inteiro.
- Res. CFO-230/2020, baixada do sistema de atos do CFO: o art. 2º veda publicidade de procedimento não odontológico. O certificado TLS do site continua vencido; o PDF foi baixado com `curl -k` (texto público, nada enviado).
- "CFO Esclarece": não fala em "superlativo"; confirma que pessoa jurídica não publica antes e depois.
- Página "Códigos" do CFO: ainda aponta para o PDF de 2012. Nenhum código novo.

### Desvios do plano
- **Art. 1º, § 1º, da Res. 196/2019.** O "CFO Esclarece" lê a proibição de equipamento, instrumental, material e tecido biológico para qualquer imagem, não só para selfie, como a cartilha do CRO-AL já fazia. A tabela do PRD e a pesquisa registram isso como interpretação, ao lado do texto literal. O efeito no produto seguiu o plano: vale para selfie, e saiu "marca de material nunca em destaque". Fica para o Lucas decidir se mantém assim.
- **Res. CFO-198/2019.** A pesquisa dizia que a cartilha tinha digitado errado ao citar a "Res. CFO-198/2019". O texto oficial da 230/2020 diz que regulamenta o art. 3º da 198/2019, então a cartilha está certa. A pesquisa foi corrigida e ganhou uma seção sobre a 230/2020, que também registra a alteração dela pela Res. CFO-285/2026 (procedimentos, não publicidade).
- **"Superlativo"** saiu da tabela do PRD e da lista curta, porque o "CFO Esclarece" não o menciona. Continua no tom de voz do DESIGN.md (seção 8) e nas regras do `docs/fdd/servicos.md`, que ficaram fora do escopo.
- **Item de paciente** no `CLAUDE.md` e no `walkthrough.md`: além do art. 44, VI, mantém o efeito do PRD ("na página, ninguém identificável sem autorização escrita"), para não perder a proteção de terceiro identificável que a lista antiga tinha.
- **Tabela do PRD** passou de 12 para 17 linhas: preço, brinde e sorteio, "popular", palavras da cartilha e crítica a colega viraram linhas próprias, cada uma com a sua fonte.

### Correções depois do walkthrough (2026-10-10)

O Lucas pediu para corrigir os avisos da primeira passada nesta branch, inclusive o que estava fora do escopo.

| # | Camada | Arquivo | Status |
|---|---|---|---|
| A | Docs e comandos | `CLAUDE.md`, `docs/PRD.md`, `docs/fdd/servicos.md`, `.claude/commands/walkthrough.md`: regra de área de atuação com a condição do art. 43, § 1º, I | Done (`a024683`) |
| B | Design e FDD | `docs/design/DESIGN.md` (seção 8), `docs/fdd/servicos.md` ("Regras"): cada palavra vetada com o artigo; o que é tom de voz ou interpretação vem marcado | Done (`53cf43a`) |
| C | PRD e ROADMAP | `docs/PRD.md` (D30, critério da Fase 2, risco), `docs/ROADMAP.md` (Fase 2): revisão do site inteiro contra as regras de fora antes de tirar o `noindex` | Done (`b02107c`) |

Decisões do Lucas, em 2026-10-10: o efeito do art. 1º, § 1º, da Res. 196/2019 fica para depois; ele conversa com a doutora e pesquisa. As peças do site ficam como estão até a revisão do D30. A lista do que conferir está nas notas privadas.

---

## Stage 7 — Tests

Entrega só de docs: não há teste automatizado. Cada critério foi conferido com `grep` e `git diff`.

| Critério de aceite | Como foi verificado |
|---|---|
| 1. Nenhuma frase de aprovação dela | `grep` pelas cinco frases em `CLAUDE.md`, `docs/` e `.claude/`: nenhum resultado |
| 2. Rodada 4 com D28 e D29; D7 intacto | Leitura da seção 12 do PRD; D7 sem diff |
| 3. "Aval dela" só para o `noindex`; nada técnico para ela | Linhas novas do diff (fora de `tasks/`) com "aval" ou "pauta": só o parágrafo de abertura das "Regras de fora", que fala de D22 |
| 4. Lista curta com sete itens e proporção; regra da dúvida fora | Leitura do `CLAUDE.md`, seção "Regras de fora" |
| 5. Princípio no topo com as áreas | Leitura do `CLAUDE.md`, seção "Princípio" |
| 6. Tabela do PRD com artigo ou "(interpretação)" em cada linha; nenhuma fonte de terceiros | Leitura da tabela linha a linha; o único link fora do CFO e do CRO-AL é a Lei 13.709/2018 |
| 7. Pesquisa sem fonte secundária como fonte de regra; Res. 271/2025 citada do texto | `grep` por "Sorriai" e "secundária" na seção de fontes: nada; seção da Res. 271/2025 cita os arts. 20, 32 e 44 |
| 8. Comandos alinhados | `grep` por "instrumental", "material" e "superlativo" em `plan.md`, `exec.md` e `walkthrough.md`: nada |
| 9. Status do rodapé | `tasks/footer-colophon.md`, linha 6: `Done (PR #3 mergeado em 2026-10-10)` |
| 10. Nenhum arquivo em `src/` | `git diff --stat main`: só `.claude/commands/`, `CLAUDE.md`, `docs/` e `tasks/` |

---

## Stage 8 — Verification

- **lint:** Pass
- **typecheck:** Pass (`npx next typegen && npx tsc --noEmit`)
- **test:** n/a
- **build:** Pass
- **Navegador (390 px e computador):** n/a (nenhum arquivo do site mudou)
- **Commits:** 10, todos com o e-mail noreply e sem atribuição de IA

---

## Stage 9 — Walkthrough

> Data: 2026-10-10. Segunda passada, depois das correções do Stage 6 ("Correções depois do walkthrough").

### Resumo
- **Veredito:** APPROVED
- **Arquivos analisados:** 12
- **Findings:** 0 críticos, 0 avisos

### Checklist
| Item | Status | Observação |
|---|---|---|
| 1. Escopo | Pass | Os arquivos do Stage 4, mais as correções que o Lucas pediu depois da primeira passada (Stage 6). A seção sobre a Res. 230/2020 na pesquisa é desvio registrado no Stage 6 |
| 2. Regras de fora | Pass | Nenhum texto, foto ou vídeo do site mudou. As quatro cópias da regra de "especialista" trazem a condição do art. 43, § 1º, I. A conferência das peças do site fica para a revisão do D30 |
| 3. Stack | n/a | Nenhum arquivo em `src/` |
| 4. Produto | Pass | D28, D29 e D30 registrados; D7 intacto; olhar final dela antes do `noindex` (D22) preservado |
| 5. Interface | n/a | Só docs |
| 6. Higiene | Pass | Lint e typecheck verdes; build verde na primeira passada, e depois dela só mudou Markdown; 16 commits, títulos até 72 caracteres, e-mail noreply, sem atribuição de IA |

### Findings
#### Critical
- Nenhum.

#### Warnings
- Nenhum. Os três avisos da primeira passada:
  - A regra de área de atuação não trazia a condição do art. 43, § 1º, I. Corrigido em `a024683`.
  - O efeito do art. 1º, § 1º, da Res. 196/2019 estava pendente. O Lucas deixou para depois (2026-10-10). A tabela do PRD continua com o texto literal e a interpretação lado a lado, e a decisão entra na revisão do D30.
  - O DESIGN.md e o FDD de Serviços tratavam escolha de tom como regra do CFO. Corrigido em `53cf43a`.

#### Positive
- Nenhuma frase de aprovação dela ficou nos docs e comandos. D28 substitui D7 sem editá-lo, e o olhar final antes do `noindex` continua em todos os lugares.
- Toda linha da tabela do PRD cita artigo do texto oficial ou vem marcada como "(interpretação)". O DESIGN.md e o FDD de Serviços seguem a mesma regra.
- Ler o texto oficial corrigiu dois erros da pesquisa: o "erro de digitação" da cartilha sobre a Res. 198/2019, que não era erro, e o "superlativo", que o "CFO Esclarece" não menciona.
- `plan.md` e `exec.md` apontam para o `CLAUDE.md` em vez de copiar a lista, então a regra fica num lugar só.
- Nada privado entrou no repositório público: nenhuma dúvida aberta sobre ela ou sobre peças do site; a lista do que conferir fica nas notas privadas, como manda o `CLAUDE.md`.

### Verificações executadas
- `git diff --name-only main...HEAD`: 12 arquivos (`.claude/commands/` 4, `CLAUDE.md`, `docs/` 5, `tasks/` 2)
- `npm run lint`: exit 0
- `npx next typegen && npx tsc --noEmit`: exit 0
- `npm run build`: exit 0 na primeira passada
- `grep` por "senão, área" em `CLAUDE.md`, `docs/` e `.claude/`: nada
- `grep` por "superlativo" nas regras: só no DESIGN.md e no FDD de Serviços, marcado como tom de voz
- `git log --format=%B main..HEAD | grep -i -E "co-authored|generated with"`: vazio
- `git log --format=%ae main..HEAD`: só `198817785+portelav@users.noreply.github.com`

**Gate S9 — APPROVED**
