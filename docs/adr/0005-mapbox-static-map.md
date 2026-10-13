# ADR 0005: Mapa do consultório como imagem estática do Mapbox, servida pelo `next/image`

Status: aceito
Data: 2026-10-12

## Contexto

A D34 (PRD) decidiu que Contato mostra o endereço com um link de rota e nenhum mapa embutido, porque um mapa interativo carrega script e cookie de terceiro e o site não coleta dado. Em 2026-10-12 o Lucas pediu um mapa de verdade, com o visual do que usa no Crewz (Mapbox, estilo `streets-v12`). A D40 reverte a D34 nesse ponto.

O Mapbox GL JS é uma biblioteca grande para um pino só, envia eventos de uso e pede os blocos do mapa direto do navegador. Isso pesaria na nota do Lighthouse (D37) e traria de volta o problema que a D34 evitava.

## Decisão

- **Imagem estática, não mapa interativo.** A Static Images API do Mapbox devolve uma imagem do mesmo estilo, com o pino no consultório. Sem JavaScript no cliente.
- **Servida pelo `next/image`.** O servidor da Vercel busca a imagem no Mapbox e a guarda em cache. O navegador do visitante não fala com o Mapbox e o IP dele não vai para lá. A cota gratuita (5 mil pedidos por mês) quase não gasta.
- **Token público (`pk.`) em `NEXT_PUBLIC_MAPBOX_TOKEN`**, só na Vercel e no `.env.local`, nunca no git. Conta própria do projeto, plano gratuito sem cartão: ao estourar a cota a imagem para, sem cobrança. O token vai no endereço da imagem e é visível no navegador, o que é do desenho deste tipo de token.
- **`remotePatterns` fechado:** só `api.mapbox.com`, só o caminho `/styles/v1/mapbox/**` e só esta query (`?access_token=<token>`), para o otimizador não ser apontado para outro lugar.
- **Sem token, sem mapa:** o código cai no link de rota em texto. A página nunca mostra imagem quebrada.
- **O mapa é o link de rota:** tocar nele abre o Maps, em nova aba, na mesma coordenada do pino.
- **Coordenada do consultório lida à mão no Maps**, porque a geocodificação do Mapbox não acha o prédio (devolveu outro bairro).

## Alternativas consideradas

- **Mapbox GL JS interativo, só depois do clique:** mantém o arrastar e ampliar, mas custa a biblioteca inteira e mais código a manter acessível. Fica como saída se o Lucas sentir falta da interação.
- **Google Maps embutido:** script e cookie do Google na abertura da página, o que a D34 queria evitar.
- **OpenStreetMap com Leaflet:** sem cookie, mas o visual padrão é mais pobre e os blocos vêm de servidor de terceiro.
- **Manter só o link de rota (D34):** a mais privada e leve, mas o Lucas quer o mapa.

## Consequências

Fica mais fácil:

- Página leve, sem script novo, com o visual que o Lucas gosta.
- Privacidade preservada: o visitante não fala com o Mapbox.

Fica mais difícil:

- Dependência de um fornecedor e de uma variável de ambiente no build: sem o token, o mapa some.
- O mapa não mexe. Quem quiser arrastar usa o Maps pelo link.
- A atribuição do Mapbox vai dentro da imagem e precisa continuar visível.
- Trocar o visual para as cores do site exige criar um estilo no Mapbox Studio e trocar o ID em `src/lib/contact.ts`.

Porta de saída: sem o token a seção volta ao link de rota da D34, sem mudar mais nada.
