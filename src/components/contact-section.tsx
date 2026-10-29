import Image from "next/image";
import {
  ACCESSIBILITY,
  ADDRESS_LINES,
  HOURS,
  MAP_SRC,
  PARKING,
  ROUTE_HREF,
  WHATSAPP_HREF,
} from "@/lib/contact";

const STEPS = [
  {
    title: "Conversa e orientação de higiene oral",
    text: "Ouço o que você sente e o que você quer, e oriento sobre escovação e fio dental.",
  },
  {
    title: "Limpeza",
    text: "Remoção de placa e tártaro, quando indicada.",
  },
  {
    title: "Avaliação",
    text: "Exame dos dentes, da gengiva e da mordida.",
  },
  {
    title: "Planejamento",
    text: "Explico o que encontrei e proponho o plano de tratamento, com as opções e a ordem das etapas.",
  },
];

const QUESTIONS = [
  {
    question: "Quanto custa o tratamento?",
    answer:
      "O valor depende do que você precisa, então só consigo informar depois da avaliação, quando monto seu plano de tratamento.",
  },
  {
    question: "Com que frequência devo fazer a limpeza?",
    answer:
      "Em geral, de 6 em 6 meses, mas pode ser mais ou menos frequente conforme a saúde da sua gengiva e seus hábitos. Na avaliação eu te oriento.",
  },
  {
    question: "O clareamento estraga o dente?",
    answer:
      "Não. Quando bem indicado e acompanhado por uma dentista, é um procedimento seguro e de mínima intervenção.",
  },
  {
    question: "A restauração dói? Preciso de anestesia?",
    answer:
      "Cuidamos do seu conforto do começo ao fim. Antes de iniciar, explico cada etapa, e quando necessário usamos anestesia local. Se você tem receio, conversamos antes para que tudo seja feito no seu ritmo.",
  },
  {
    question: "Quanto tempo duram as facetas e as restaurações?",
    answer:
      "É algo individualizado, pois varia de paciente para paciente. Depende dos cuidados de higiene e alimentação e do acompanhamento periódico. Com as revisões, cuidamos do seu tratamento juntos, para que ele seja mantido da melhor forma possível.",
  },
];

const LABEL = "tracking-brand text-[0.6875rem] uppercase text-dark-base/70";
/** 44 px for touch, 32 px with a mouse, like the footer's channels. */
const LINK =
  "inline-flex min-h-11 items-center underline underline-offset-4 pointer-fine:min-h-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark-base";

/**
 * Where the visitor learns how to arrive, what the first visit is and the
 * questions patients ask most. Static on purpose: after three scroll-driven
 * moments this is where the page rests, like the footer below it.
 */
export function ContactSection() {
  return (
    <section
      id="contato"
      aria-labelledby="contact-title"
      data-header-theme="light"
      className="bg-light-base text-dark-base"
    >
      <div className="mx-auto max-w-[78rem] px-6 pb-24 sm:px-10 sm:pb-32">
        {/* From `lg` the heading stays pinned while the details scroll past it, and
            lets go when they end. Below that it is one column and nothing pins:
            a two-line title held at the top of a phone would eat the screen. */}
        <div className="lg:grid lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className={LABEL}>Contato</p>
            <h2
              id="contact-title"
              className="mt-6 max-w-[16ch] font-display text-[clamp(2.25rem,4.6vw,3.75rem)] font-normal leading-[1.06]"
            >
              Como chegar e o que esperar
            </h2>
          </div>

          <div className="mt-12 lg:mt-0">
            <div className="grid gap-14 sm:grid-cols-2 sm:gap-12 lg:grid-cols-1">
              <div>
                <h3 className={LABEL}>Como chegar</h3>
                <address className="mt-4 text-[1.0625rem] not-italic leading-[1.65] text-dark-base/85">
                  {ADDRESS_LINES.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                {/* The map is the route link: one tap opens the directions. The
                    text link stays for the day the token is missing, and the
                    section never shows a broken picture. */}
                {MAP_SRC ? (
                  <a
                    href={ROUTE_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative mt-5 block aspect-[16/9] overflow-hidden bg-dark-10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark-base"
                  >
                    <Image
                      src={MAP_SRC}
                      alt="Mapa com o pino no consultório, na Av. Comendador Gustavo Paiva."
                      fill
                      sizes="(min-width: 1024px) 46rem, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <span className="absolute bottom-0 left-0 bg-light-base px-3 py-2 text-[0.8125rem] text-dark-base">
                      Abrir a rota no Maps
                      <span className="sr-only"> (abre em nova aba)</span>
                    </span>
                  </a>
                ) : (
                  <a
                    href={ROUTE_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${LINK} mt-2 text-[0.9375rem]`}
                  >
                    Ver a rota no Maps
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                )}
                <dl className="mt-8 flex flex-col gap-5 text-[1.0625rem] leading-[1.65] text-dark-base/85">
                  <div>
                    <dt className={LABEL}>Estacionamento</dt>
                    <dd className="m-0 mt-1">{PARKING}</dd>
                  </div>
                  <div>
                    <dt className={LABEL}>Horário</dt>
                    <dd className="m-0 mt-1">{HOURS}</dd>
                  </div>
                  <div>
                    <dt className={LABEL}>Acessibilidade</dt>
                    <dd className="m-0 mt-1">{ACCESSIBILITY}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className={LABEL}>Primeira consulta</h3>
                <p className="m-0 mt-4 text-[1.0625rem] leading-[1.65] text-dark-base/85">
                  Dura em média 90 minutos.
                </p>
                <ol className="m-0 mt-5 flex list-none flex-col gap-5 p-0">
                  {STEPS.map((step, index) => (
                    <li key={step.title} className="flex gap-4">
                      <span
                        aria-hidden
                        className="w-6 shrink-0 font-display text-2xl leading-none tabular-nums text-forest-700"
                      >
                        {index + 1}
                      </span>
                      <p className="m-0 text-[1.0625rem] leading-[1.65] text-dark-base/85">
                        <strong className="font-medium text-dark-base">{step.title}.</strong>{" "}
                        {step.text}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="mt-14 max-w-[60ch]">
              <h3 className={LABEL}>Perguntas frequentes</h3>
              <div className="mt-2 border-t border-dark-10">
                {QUESTIONS.map((item) => (
                  <details
                    key={item.question}
                    className="group border-b border-dark-10 open:details-content:animate-details-in motion-safe:[--details-in-y:-0.5rem]"
                  >
                    <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-4 py-3 text-[1.0625rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark-base">
                      {item.question}
                      <span
                        aria-hidden
                        className="text-xl leading-none text-forest-700 group-open:hidden"
                      >
                        +
                      </span>
                      <span
                        aria-hidden
                        className="hidden text-xl leading-none text-forest-700 group-open:inline"
                      >
                        −
                      </span>
                    </summary>
                    {/* The answer fades in from just under the question when it opens,
                        instead of popping in; with reduced motion it only fades. An
                        ease-out cubic, gentler at the start than the quint. */}
                    <p className="m-0 pb-5 text-[1.0625rem] leading-[1.65] text-dark-base/85">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>

            <p className="mt-14 text-[1.0625rem] leading-[1.65]">
              Quer conversar antes de marcar?{" "}
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className={LINK}>
                Chamar no WhatsApp
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
