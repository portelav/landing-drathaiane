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

/**
 * Name, profession and registry number: the CFO requires all three on every
 * page. One per line, so the line never needs separators to stay readable.
 */
const IDENTIFICATION = ["Dra. Thaiane Lessa", "Cirurgiã-Dentista", "CRO/AL-6418"];

/**
 * Side by side, each identification line sits level with one channel: both
 * columns share the row height, 44 px for touch and 32 px for a mouse.
 */
const ROW = "flex items-center min-h-11 pointer-fine:min-h-8";

/**
 * A quiet colophon on the page's own ground rather than a block of colour:
 * the page ends the way it reads. Until the full contact section exists, this
 * is where the menu's "Contato" lands.
 */
export function Footer() {
  return (
    <footer
      id="contato"
      data-header-theme="light"
      className="bg-light-base px-6 text-dark-base sm:px-10"
    >
      <h2 className="sr-only">Contato</h2>

      <div className="flex flex-col gap-8 border-t border-dark-10 pb-10 pt-12 sm:flex-row sm:items-start sm:justify-between sm:gap-12 sm:pb-12 sm:pt-16">
        <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
          <span className="text-forest-900 sm:pt-1.5">
            <BrandMark height={36} />
          </span>
          <p className="m-0 text-[0.9375rem]">
            {IDENTIFICATION.map((line, index) => (
              <span
                key={line}
                className={`block leading-6 sm:flex sm:min-h-11 sm:items-center sm:pointer-fine:min-h-8 ${
                  index === 0 ? "" : "text-dark-base/70"
                }`}
              >
                {line}
              </span>
            ))}
          </p>
        </div>

        <ul className="m-0 list-none p-0 text-[0.9375rem]">
          {CHANNELS.map((channel) => (
            <li key={channel.href}>
              <a
                href={channel.href}
                {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`${ROW} w-fit no-underline opacity-70 transition-opacity duration-300 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark-base`}
              >
                {channel.label}
                {channel.external && <span className="sr-only"> (abre em nova aba)</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="m-0 pb-10 text-[0.8125rem] text-dark-base/70 sm:pb-12">
        © 2026 Dra. Thaiane Lessa. Todos os direitos reservados.
      </p>
    </footer>
  );
}
