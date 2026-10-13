import { INSTAGRAM_HANDLE, INSTAGRAM_HREF, PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";
import { BrandMark } from "./brand-mark";

/**
 * 44 px for touch, 32 px with a mouse. The phone repeats the contact section
 * on purpose: this is where someone looking for a number at the bottom of the
 * page expects to find it.
 */
const LINK =
  "inline-flex min-h-11 items-center gap-1.5 no-underline opacity-70 transition-opacity duration-300 hover:opacity-100 pointer-fine:min-h-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark-base";

/**
 * A low strip on the page's own ground, on the same edge as the contact
 * section above it so the two read as one column. Name, profession and
 * registry number stay whole: the CFO requires all three on every page.
 */
export function Footer() {
  return (
    <footer data-header-theme="light" className="bg-light-base text-dark-base">
      <div className="mx-auto max-w-[78rem] px-6 sm:px-10">
        <div className="flex flex-col gap-6 border-t border-dark-10 pb-4 pt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
          <div className="flex items-center gap-4">
            <span className="text-forest-900">
              <BrandMark height={36} />
            </span>
            <p className="m-0 text-[0.9375rem] leading-snug">
              Dra. Thaiane Lessa
              <span className="block text-dark-base/70">Cirurgiã-Dentista · CRO/AL-6418</span>
            </p>
          </div>

          <ul className="m-0 flex list-none flex-wrap items-center gap-x-6 p-0 text-[0.9375rem]">
            <li>
              <a href={PHONE_HREF} className={LINK}>
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a href={INSTAGRAM_HREF} target="_blank" rel="noopener noreferrer" className={LINK}>
                {INSTAGRAM_HANDLE}
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </li>
            <li>
              <a href="#" className={LINK}>
                Voltar ao topo <span aria-hidden>↑</span>
              </a>
            </li>
          </ul>
        </div>

        <p className="m-0 pb-8 text-[0.8125rem] text-dark-base/70">
          © 2026 Dra. Thaiane Lessa. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
