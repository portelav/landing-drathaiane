/**
 * What she treats and the cases she chose to show, in her own words. The text
 * goes on the page exactly as she sent it; only the `alt` descriptions are ours.
 */

export type Service = { title: string; text: string };

export const SERVICES: Service[] = [
  {
    title: "Limpeza (profilaxia)",
    text: "Remove a placa bacteriana e o tártaro que a escovação sozinha não tira. Ajuda a manter gengivas e dentes saudáveis e faz parte da prevenção. A frequência ideal varia de pessoa para pessoa e é orientada na avaliação.",
  },
  {
    title: "Restaurações",
    text: "Tratam dentes com cárie, fraturas ou desgastes. Reconstruímos a parte do dente que foi perdida, usando resina composta. O objetivo é restabelecer a função e a estética, respeitando a anatomia de cada sorriso.",
  },
  {
    title: "Clareamento",
    text: "Deixa os dentes mais claros de forma controlada. Antes de começar, faço uma avaliação para ver se é indicado para você e qual é o melhor método para o seu caso.",
  },
  {
    title: "Facetas em resina composta",
    text: "Recobrimento delicado da superfície do dente com resina composta, indicado para ajustar cor, forma e proporção do sorriso. É um tratamento conservador, planejado de acordo com o seu rosto e as suas necessidades.",
  },
  {
    title: "Coroas",
    text: "Peça confeccionada sob medida e cimentada ao dente, recobrindo toda a sua estrutura. Entra como solução quando houve grande perda de estrutura dentária, e cada caso é avaliado individualmente para definir o material mais adequado.",
  },
];

export type Case = { src: string; alt: string; title: string; text: string };

/**
 * Each photo is a 1080×1350 frame with two halves, and carries her name and
 * CRO burned into the corner (Res. CFO-196/2019, art. 4º), so the line travels
 * with the picture if someone saves it.
 */
export const CASES: Case[] = [
  {
    src: "/images/servicos/caso-1.webp",
    alt: "Antes e depois: sorriso com dentes de bordas irregulares e, abaixo, os mesmos dentes mais claros e com formato uniforme.",
    title: "Recontorno em resina composta",
    text: "Realizamos o clareamento para modificar a cor e, em seguida, o recontorno com resina composta para ajustar o formato dos dentes. O objetivo foi deixar o sorriso mais harmônico, respeitando as características da paciente e preservando ao máximo a estrutura natural.",
  },
  {
    src: "/images/servicos/caso-2.webp",
    alt: "Antes e depois: dentes da frente com um incisivo mais escuro e, abaixo, os mesmos dentes com cor uniforme.",
    title: "Clareamento, troca de restaurações e recontorno",
    text: "O planejamento envolveu mais de uma etapa. Fizemos o clareamento, substituímos restaurações insatisfatórias que estavam escurecidas e manchadas e realizamos o recontorno com resina composta. O objetivo foi deixar o sorriso mais uniforme e equilibrado.",
  },
  {
    src: "/images/servicos/caso-3.webp",
    alt: "Modelo de gesso da arcada com peças em resina nos dentes de trás e, abaixo, a ponta de um material de resina.",
    title: "Reabilitação com table tops",
    text: "Os dentes posteriores estavam desgastados. Para devolver forma e função, foram confeccionadas fora da boca peças em resina composta, chamadas table tops, que depois são cimentadas sobre a região desgastada. Esse tipo de reabilitação é planejado de forma individualizada, de acordo com a necessidade de cada paciente.",
  },
  {
    src: "/images/servicos/caso-4.webp",
    alt: "Pincel com flúor junto aos dentes e, abaixo, uma gota de flúor caindo no pincel.",
    title: "Aplicação de flúor",
    text: "O flúor é aplicado durante a limpeza como parte do cuidado preventivo. Ele auxilia na remineralização do esmalte e ajuda a reduzir o risco de cárie, sendo um complemento importante para a saúde bucal.",
  },
  {
    src: "/images/servicos/caso-5.webp",
    alt: "Pasta profilática sobre os dentes e, abaixo, a pasta saindo do tubo.",
    title: "Profilaxia",
    text: "Esta etapa da limpeza utiliza pastas profiláticas para remover a placa bacteriana e polir a superfície dos dentes, contribuindo para a prevenção e a manutenção da saúde bucal.",
  },
];
