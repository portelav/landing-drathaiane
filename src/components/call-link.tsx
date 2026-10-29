import type { ReactNode } from "react";
import { WHATSAPP_HREF } from "@/lib/contact";

/**
 * The call to book that closes Serviços and Contato, so it reads as a button
 * rather than another underlined link: an outlined block, square like the rest
 * of the page, the full width of a phone. From `sm` it is sized to its text,
 * unless `fill` keeps it as wide as what it sits under (her portrait, in
 * Contato), so the two read as one block.
 */
const CALL =
  "group flex min-h-14 w-full items-center justify-between gap-10 border border-dark-base px-5 font-medium no-underline hover:bg-dark-base hover:text-light-base focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark-base";

export function CallLink({ children, fill = false }: { children: ReactNode; fill?: boolean }) {
  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className={fill ? CALL : `${CALL} sm:w-fit`}
    >
      <span>
        {children}
        <span className="sr-only"> (abre em nova aba)</span>
      </span>
      <span
        aria-hidden
        className="transition-transform duration-200 ease-[var(--ease-out-quint)] motion-safe:group-hover:translate-x-1"
      >
        →
      </span>
    </a>
  );
}
