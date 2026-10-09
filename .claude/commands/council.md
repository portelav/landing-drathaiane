---
name: council
description: "Roda uma questão, ideia ou decisão do landing-drathaiane por um conselho de 5 conselheiros de IA que analisam em paralelo, fazem peer review anônimo e sintetizam um veredito (metodologia LLM Council). Gatilhos: 'conselho nisso', 'rode o conselho', 'debate isso', 'pressione-teste isso', 'devo fazer X ou Y', 'não consigo decidir'. Não usar para pergunta simples de sim ou não nem consulta factual."
argument-hint: "[questão ou decisão]"
---

Rode o conselho de 5 conselheiros na questão abaixo. Protocolo: enriquecer contexto → enquadrar → 5 conselheiros em paralelo → peer review anônimo → síntese do chairman → transcript em `docs/research/council/`.

**Questão:** $ARGUMENTS

## Modo

- **Leve (padrão):** pular o passo 3 (peer review). São 5 subagentes em vez de 10, metade do custo. O chairman sintetiza direto das 5 respostas.
- **Completo:** só quando a questão começar com `completo:` ou o Lucas pedir. Para decisão difícil de desfazer.

Em qualquer modo, os conselheiros podem rodar num modelo menor (`model: sonnet` no Agent); a síntese fica no modelo principal. Decisão que mexe com a imagem da doutora continua dependendo do aval dela.

---

## Os cinco conselheiros

**1. O Contrário.** Procura o que está errado, o que falta, o que vai falhar. Assume que há uma falha fatal e tenta achá-la.

**2. O Pensador de Primeiros Princípios.** Ignora a pergunta superficial e pergunta "o que estamos realmente tentando resolver?". Desconstrói suposições. Às vezes o output mais valioso é "você está fazendo a pergunta errada".

**3. O Expansionista.** Procura o upside que todos estão perdendo. O que poderia ser maior? Que oportunidade adjacente está escondida?

**4. O Estranho.** Zero contexto sobre o landing-drathaiane ou o dono. Responde ao que está na frente dele. Pega a maldição do conhecimento.

**5. O Executor.** Uma pergunta: isso pode ser feito, e qual é o caminho mais rápido com a equipe e o prazo do marco atual (`docs/ROADMAP.md`)? Se não tem primeiro passo claro na segunda de manhã, ele diz.

---

## Sessão

### 1. Enquadrar com contexto

Antes de enquadrar, ler rápido (até 30 segundos): `CLAUDE.md`, `docs/PRD.md` (seções relevantes), `docs/ROADMAP.md`, e qualquer arquivo que a questão cite. Buscar 2 a 3 fatos concretos que evitem respostas genéricas.

Reformular a questão de forma neutra: decisão central, contexto do produto (fase, público, restrições, números), o que está em jogo. Sem opinião própria. Se vaga demais, **uma** pergunta de clarificação, depois seguir.

### 2. Convocar (5 subagentes em paralelo)

Cada um recebe identidade, estilo, questão enquadrada, e a instrução: responder independentemente, direto, sem hedging, 150 a 300 palavras, sem preâmbulo.

### 3. Peer review (5 subagentes em paralelo)

Anonimizar as respostas como A a E, com mapeamento aleatório. Cada revisor responde, em até 200 palavras:
1. Qual resposta é a mais forte e por quê?
2. Qual tem o maior ponto cego e qual é?
3. O que todas perderam?

### 4. Síntese do chairman

Recebe questão, 5 respostas desanonimizadas e 5 revisões. Produz:

```
## Onde o Conselho Concorda
## Onde o Conselho Diverge
## Pontos Cegos que o Conselho Capturou
## A Recomendação
## A Única Coisa a Fazer Primeiro
```

Recomendação clara, sem "depende". O chairman pode ficar com o dissidente se o raciocínio for melhor.

### 5. Persistir

Salvar o transcript completo em `docs/research/council/AAAA-MM-DD-<slug>.md`: questão original, questão enquadrada, 5 respostas, 5 revisões com o mapeamento revelado, síntese. Se a decisão for de produto, lembrar que ela só vale depois que o dono aceitar, e que aí entra no registro de decisões do PRD ou em ADR.

---

## Regras

- Sempre spawnar os 5 em paralelo. Sequencial contamina.
- Sempre anonimizar para o peer review.
- Não rodar em questão trivial. Se tem resposta certa, responder direto.
- Decisão de produto é do dono. O conselho recomenda, não decide.
- Português do Brasil.
