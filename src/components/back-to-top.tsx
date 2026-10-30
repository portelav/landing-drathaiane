"use client";

import { getLenis } from "./smooth-scroll";

/** Long page, so a long glide: fast at the start, settling gently at the top. */
const DURATION = 1.8;
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * Takes the visitor back to the top with a glide instead of a jump. Lenis does
 * it where it runs (desktop), the browser's own smooth scroll does it elsewhere,
 * also when the system asks for less motion (PRD, D52). Without JavaScript the
 * link is still `#`, which jumps.
 */
export function BackToTop({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: DURATION, easing: easeOutQuart });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <a href="#" onClick={onClick} className={className}>
      {children}
    </a>
  );
}
