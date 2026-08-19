"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { BrandMark, MARK_FLIGHT } from "./brand-mark";

const NAV_LINKS = [
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
];

const PHONE_DISPLAY = "(00) 00000-0000";
const PHONE_HREF = "tel:+5500000000000";

/** Vertical point the header samples to decide which section sits behind it. */
const PROBE_Y = 40;
/** Scrolled past this and a downward scroll tucks the header away. */
const HIDE_AFTER = 140;
/** Past the fold the header stops floating and takes a ground of its own. */
const ANCHOR_AFTER = 60;

const EASE = [0.22, 1, 0.36, 1] as const;

type Tone = "light" | "dark";

/**
 * Reads the tone of whatever section is currently under the header, so the
 * logo and controls can invert instead of carrying their own background.
 * Sections opt in with `data-header-theme="light" | "dark"`.
 */
function useSectionTone() {
  const [tone, setTone] = useState<Tone>("light");
  const [hidden, setHidden] = useState(false);
  const [anchored, setAnchored] = useState(false);

  useEffect(() => {
    let frame = 0;
    let lastY = window.scrollY;

    const measure = () => {
      frame = 0;
      const y = window.scrollY;

      setHidden(y > HIDE_AFTER && y > lastY);
      setAnchored(y > ANCHOR_AFTER);
      lastY = y;

      let found: Tone = "light";
      for (const el of document.querySelectorAll<HTMLElement>("[data-header-theme]")) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= PROBE_Y && rect.bottom > PROBE_Y) {
          found = el.dataset.headerTheme === "dark" ? "dark" : "light";
        }
      }
      setTone(found);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { tone, hidden, anchored };
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { tone, hidden, anchored } = useSectionTone();
  const reducedMotion = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Nothing is covered while the nav is open, so the page keeps scrolling and
  // keeps its scroll lock. Escape and a click outside are enough to dismiss.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const light = tone === "dark";
  const duration = reducedMotion ? 0 : 0.55;

  const veil = light ? "rgba(22, 48, 0, 0.5)" : "rgba(244, 242, 238, 0.72)";
  // The dropdown always needs a ground of its own — unlike the bar, it can be
  // open while the header is still floating over the top of the page.
  const drop = light ? "rgba(22, 48, 0, 0.95)" : "rgba(244, 242, 238, 0.95)";

  return (
    <header
      ref={headerRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 transition-[transform,color,background-color,backdrop-filter,box-shadow] duration-500 ease-[var(--ease-out-quint)] sm:px-10"
      style={{
        color: light ? "var(--c-light-base)" : "var(--c-dark-base)",
        transform: hidden && !open ? "translateY(-105%)" : "translateY(0)",
        backgroundColor: anchored ? veil : "transparent",
        backdropFilter: anchored ? "blur(12px)" : "none",
        WebkitBackdropFilter: anchored ? "blur(12px)" : "none",
        boxShadow: anchored
          ? `inset 0 -1px 0 ${light ? "var(--c-light-15)" : "var(--c-dark-10)"}`
          : "none",
      }}
    >
      <div className="flex items-center gap-8 lg:gap-10">
        <Link
          href="/"
          className="pointer-events-auto flex items-center gap-3.5 no-underline"
          onClick={close}
        >
          <motion.span
            layoutId="brand-mark"
            className="block"
            transition={{ duration: reducedMotion ? 0 : MARK_FLIGHT, ease: [0.77, 0, 0.175, 1] }}
          >
            <BrandMark height={34} />
          </motion.span>
          <span className="tracking-brand flex flex-col text-[0.6875rem] uppercase leading-[1.6]">
            <span>Dra. Thaiane Lessa</span>
            <span className="opacity-50">Cirurgiã-Dentista</span>
          </span>
        </Link>

        {/* The destinations unfold sideways into the bar's own empty middle —
            nothing on the page is ever covered. */}
        <motion.nav
          id="site-nav"
          className="pointer-events-auto hidden overflow-hidden lg:block"
          initial={false}
          animate={open ? "open" : "closed"}
          variants={{
            open: {
              maxWidth: 560,
              transition: { duration, ease: EASE, staggerChildren: 0.05, delayChildren: 0.08 },
            },
            closed: {
              maxWidth: 0,
              transition: { duration, ease: EASE, staggerChildren: 0.03, staggerDirection: -1 },
            },
          }}
        >
          <ul className="flex items-center gap-9 whitespace-nowrap pr-2">
            {NAV_LINKS.map((link) => (
              <motion.li
                key={link.href}
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 8 },
                }}
                transition={{ duration: reducedMotion ? 0 : 0.35, ease: EASE }}
              >
                <a
                  href={link.href}
                  onClick={close}
                  tabIndex={open ? undefined : -1}
                  className="text-[0.8125rem] no-underline opacity-70 transition-opacity duration-300 hover:opacity-100"
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.nav>
      </div>

      <div className="flex items-center gap-6 sm:gap-8">
        <a
          href={PHONE_HREF}
          className="pointer-events-auto hidden text-[0.8125rem] no-underline opacity-70 transition-opacity duration-300 hover:opacity-100 sm:block"
        >
          {PHONE_DISPLAY}
        </a>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="site-nav site-nav-compact"
          className="group pointer-events-auto flex items-center gap-2.5 text-[0.8125rem]"
        >
          <span className="tracking-brand uppercase">{open ? "Fechar" : "Menu"}</span>
          <BurgerIcon open={open} />
        </button>

        <a
          href="#contato"
          onClick={close}
          className="group pointer-events-auto hidden items-center justify-between gap-6 rounded-full py-2.5 pl-6 pr-2.5 text-[0.8125rem] no-underline transition-colors duration-300 ease-[var(--default-ease)] sm:flex"
          style={{
            backgroundColor: light ? "var(--c-light-base)" : "var(--c-forest-900)",
            color: light ? "var(--c-forest-900)" : "var(--c-light-base)",
          }}
        >
          Agendar consulta
          <ArrowBadge inverted={light} />
        </a>
      </div>

      {/* Narrow screens have no middle to unfold into, so the same four
          destinations drop just below the bar — a band, never the whole page. */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-nav-compact"
            className="pointer-events-auto absolute inset-x-0 top-full lg:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: reducedMotion ? 0 : 0.35, ease: EASE }}
            style={{
              backgroundColor: drop,
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: `inset 0 -1px 0 ${light ? "var(--c-light-15)" : "var(--c-dark-10)"}`,
            }}
          >
            <ul className="flex flex-col px-6 py-2 sm:px-10">
              {NAV_LINKS.map((link, index) => (
                <motion.li
                  key={link.href}
                  className={index > 0 ? "border-t" : undefined}
                  style={{
                    borderColor: light ? "var(--c-light-15)" : "var(--c-dark-10)",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.3,
                    delay: reducedMotion ? 0 : 0.06 + index * 0.045,
                  }}
                >
                  <a
                    href={link.href}
                    onClick={close}
                    className="block py-3.5 font-display text-2xl leading-none no-underline"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

/** Three rules that swap for a duplicate set on hover. */
function BurgerIcon({ open }: { open: boolean }) {
  const rotation = [45, 0, -45];

  return (
    <span className="relative block h-[9px] w-[18px]" aria-hidden>
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className="absolute left-0 block h-px w-full overflow-hidden transition-transform duration-500 ease-[var(--ease-out-quint)]"
          style={{
            top: index * 4,
            // Both outer rules travel to the middle rule's line before they
            // rotate, so the three collapse into one X rather than a chevron.
            transform: open
              ? `translateY(${(1 - index) * 4}px) rotate(${rotation[index]}deg)`
              : undefined,
            opacity: open && index === 1 ? 0 : 1,
          }}
        >
          <span
            className="block h-px w-full bg-current transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:translate-x-full"
            style={{ transitionDelay: `${index * 45}ms` }}
          />
          <span
            className="absolute left-0 top-0 h-px w-full -translate-x-full bg-current transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:translate-x-0"
            style={{ transitionDelay: `${index * 45}ms` }}
          />
        </span>
      ))}
    </span>
  );
}

/** Circular arrow that slides out and is replaced from the opposite corner. */
function ArrowBadge({ inverted = false }: { inverted?: boolean }) {
  return (
    <span
      className="relative block h-7 w-7 shrink-0 overflow-hidden rounded-full"
      style={{
        backgroundColor: inverted ? "var(--c-forest-900)" : "var(--c-light-base)",
        color: inverted ? "var(--c-light-base)" : "var(--c-forest-900)",
      }}
      aria-hidden
    >
      <Arrow className="absolute inset-0 m-auto transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:-translate-y-3 group-hover:translate-x-3" />
      <Arrow className="absolute inset-0 m-auto -translate-x-3 translate-y-3 transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:translate-x-0 group-hover:translate-y-0" />
    </span>
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={className}>
      <path
        d="M3.5 8.5L8.5 3.5M8.5 3.5H4.2M8.5 3.5V7.8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
