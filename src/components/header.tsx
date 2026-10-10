"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { INSTAGRAM_HREF, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF } from "@/lib/contact";
import { BrandMark, MARK_FLIGHT } from "./brand-mark";

/** Only sections that exist on the page; one joins when its section lands. */
const NAV_LINKS = [
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

/** One shape for every social tile, so the row reads as a set. */
const SOCIAL_TILE =
  "pointer-events-auto flex h-11 w-11 items-center justify-center rounded-[16px] no-underline transition-transform duration-[420ms] ease-[var(--ease-soft-pop)] hover:scale-[1.2] focus-visible:scale-[1.2] motion-reduce:transition-none motion-reduce:hover:scale-100";

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
            <span className="opacity-70">Cirurgiã-Dentista</span>
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

        <div className="flex items-center gap-2.5">
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            aria-label="Falar no WhatsApp"
            title="Falar no WhatsApp"
            className={SOCIAL_TILE}
            style={{ background: "var(--c-whatsapp)", color: "var(--c-light-base)" }}
          >
            <WhatsAppIcon />
          </a>

          <a
            href={INSTAGRAM_HREF}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            aria-label="Instagram da Dra. Thaiane Lessa"
            title="Instagram"
            className={SOCIAL_TILE}
            style={{ background: "var(--g-instagram)", color: "var(--c-light-base)" }}
          >
            <InstagramIcon />
          </a>
        </div>
      </div>

      {/* Narrow screens have no middle to unfold into, so the same
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

/** Official WhatsApp mark: white glyph, brand-green disc supplied by the link. */
function WhatsAppIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
    </svg>
  );
}

/** Official Instagram mark: white glyph, gradient supplied by the link. */
function InstagramIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}
