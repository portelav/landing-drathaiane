import { Fragment } from "react";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_HREF,
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_HREF,
} from "@/lib/contact";
import { BrandMark } from "./brand-mark";

const CHANNELS = [
  { label: "WhatsApp", href: WHATSAPP_HREF, external: true },
  { label: PHONE_DISPLAY, href: PHONE_HREF, external: false },
  { label: INSTAGRAM_HANDLE, href: INSTAGRAM_HREF, external: true },
];

/** Name, profession and registry: the CFO requires all three on every page. */
const IDENTIFICATION = ["Dra. Thaiane Lessa", "Cirurgiã-Dentista", "CRO/AL-6418"];

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light-base";

/**
 * Closes the page and, until the full contact section exists, is where the
 * menu's "Contato" lands. Nothing moves here: it is the rest after three
 * scroll-driven pieces in a row.
 */
export function Footer() {
  return (
    <footer
      id="contato"
      data-header-theme="dark"
      className="bg-forest-900 px-6 pb-10 pt-20 text-light-base sm:px-10 sm:pb-12 sm:pt-28"
    >
      <div className="flex flex-col gap-6">
        {/* The mark the preloader opened with, standing still at the end. */}
        <BrandMark height={40} />
        <h2 className="tracking-brand m-0 text-[0.6875rem] font-normal uppercase text-light-base/70">
          Contato
        </h2>
      </div>

      <ul className="mt-6 flex flex-col lg:flex-row lg:flex-wrap lg:gap-x-12">
        {CHANNELS.map((channel) => (
          <li key={channel.href}>
            <a
              href={channel.href}
              {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`inline-flex min-h-11 items-center font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-none no-underline opacity-85 transition-opacity duration-300 hover:opacity-100 ${FOCUS_RING}`}
            >
              {channel.label}
              {channel.external && <span className="sr-only"> (abre em nova aba)</span>}
            </a>
          </li>
        ))}
      </ul>

      {/* Identification and rights sit side by side when they fit and stack
          when they do not — the footer holds no media, so no ratio applies. */}
      <div className="mt-16 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-light-15 pt-6 sm:mt-24">
        <p className="m-0 text-[0.9375rem] leading-relaxed">
          {IDENTIFICATION.map((part, index) => (
            <Fragment key={part}>
              {index > 0 && " · "}
              <span className="whitespace-nowrap">{part}</span>
            </Fragment>
          ))}
        </p>
        <p className="m-0 text-[0.8125rem] leading-relaxed text-light-base/70">
          © 2026 Dra. Thaiane Lessa. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
