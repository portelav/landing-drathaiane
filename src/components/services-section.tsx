import { WHATSAPP_HREF } from "@/lib/contact";
import { SERVICES } from "@/lib/services";
import { ServicesCases } from "./services-cases";

/**
 * The section's one call to book, so it reads as a button rather than another
 * underlined link: an outlined block, square like the rest of the page, the
 * full width of a phone and sized to its text from `sm`.
 */
const CALL =
  "group flex min-h-14 w-full items-center justify-between gap-10 border border-dark-base px-5 font-medium no-underline hover:bg-dark-base hover:text-light-base focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark-base sm:w-fit";

/**
 * What she treats, then the cases. The list opens one service at a time and the
 * cases slide sideways, so the section stays about two screens tall on a phone
 * without becoming a fourth scroll-driven moment after hero, band and wheel.
 */
export function ServicesSection() {
  return (
    <section
      id="servicos"
      aria-labelledby="services-title"
      data-header-theme="light"
      className="bg-light-base text-dark-base"
    >
      <div className="mx-auto max-w-[78rem] px-6 pt-24 pb-24 sm:px-10 sm:pt-32 sm:pb-32">
        {/* Same frame as Contato: from `lg` the heading pins beside the content. */}
        <div className="lg:grid lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2
              id="services-title"
              className="m-0 font-display text-[clamp(2.75rem,6vw,3.75rem)] font-normal leading-[1.02]"
            >
              Serviços
            </h2>
          </div>

          <div className="mt-10 min-w-0 lg:mt-0">
            <div className="max-w-[60ch] border-t border-dark-10">
              {SERVICES.map((service, index) => (
                // `name` makes the list exclusive: opening one closes the others.
                <details
                  key={service.title}
                  name="services"
                  open={index === 0}
                  className="group border-b border-dark-10"
                >
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 font-display text-[1.5rem] leading-[1.15] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark-base [&::-webkit-details-marker]:hidden">
                    {service.title}
                    <span
                      aria-hidden
                      className="relative h-3.5 w-3.5 shrink-0 transition-transform duration-300 ease-[var(--ease-out-quint)] before:absolute before:inset-x-0 before:top-1/2 before:h-px before:-translate-y-1/2 before:bg-dark-base after:absolute after:inset-y-0 after:left-1/2 after:w-px after:-translate-x-1/2 after:bg-dark-base group-open:rotate-45 motion-reduce:transition-none"
                    />
                  </summary>
                  {/* Same entrance as the FAQ answers in Contato. */}
                  <p className="m-0 pb-5 text-[1.0625rem] leading-[1.65] text-dark-base/85 transition-[opacity,translate] duration-[450ms] ease-[cubic-bezier(0.33,1,0.68,1)] starting:opacity-0 motion-safe:starting:-translate-y-2">
                    {service.text}
                  </p>
                </details>
              ))}
            </div>

            <div className="mt-16">
              <ServicesCases />
            </div>

            <p className="mt-12 text-[1.0625rem] leading-[1.65]">
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className={CALL}>
                <span>
                  Agende aqui um horário
                  <span className="sr-only"> (abre em nova aba)</span>
                </span>
                <span
                  aria-hidden
                  className="transition-transform duration-200 ease-[var(--ease-out-quint)] motion-safe:group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
