import { ADDRESS_LINES, HOURS, PARKING, ROUTE_HREF, WHATSAPP_HREF } from "@/lib/contact";

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
];

const LABEL = "tracking-brand text-[0.6875rem] uppercase text-dark-base/70";
/** 44 px for touch, 32 px with a mouse, like the footer's channels. */
const LINK =
  "inline-flex min-h-11 items-center underline underline-offset-4 pointer-fine:min-h-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark-base";

/**
 * Where the visitor learns how to arrive, what the first visit is and the one
 * question everybody asks. Static on purpose: after three scroll-driven
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
                <a
                  href={ROUTE_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${LINK} mt-2 text-[0.9375rem]`}
                >
                  Ver a rota no Maps
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
                <dl className="mt-6 flex flex-col gap-5 text-[1.0625rem] leading-[1.65] text-dark-base/85">
                  <div>
                    <dt className={LABEL}>Estacionamento</dt>
                    <dd className="m-0 mt-1">{PARKING}</dd>
                  </div>
                  <div>
                    <dt className={LABEL}>Horário</dt>
                    <dd className="m-0 mt-1">{HOURS}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className={LABEL}>Primeira consulta</h3>
                <ol className="m-0 mt-4 flex list-none flex-col gap-5 p-0">
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
                  <details key={item.question} className="group border-b border-dark-10">
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
