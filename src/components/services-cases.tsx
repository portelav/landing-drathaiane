"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { CASES } from "@/lib/services";

const ARROW =
  "flex h-11 w-11 items-center justify-center border border-dark-10 text-lg text-dark-base transition-opacity duration-300 disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-base";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The cases slide sideways under the thumb and stop on each photo (native
 * scroll snap: no scroll-driven moment of our own). On a phone the case in
 * view is lit and its neighbours sit at half opacity, so the edge of the next
 * one says there is more. With reduced motion nothing fades or zooms and the
 * arrows jump instead of gliding.
 */
export function ServicesCases() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const items = () => Array.from(trackRef.current?.children ?? []) as HTMLElement[];

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = items();
    const max = track.scrollWidth - track.clientWidth;
    if (max <= 0) return setActive(0);
    // The last card can never reach the snap line, so the end of the track is it.
    if (track.scrollLeft >= max - 2) return setActive(cards.length - 1);
    const base = cards[0].offsetLeft;
    let nearest = 0;
    cards.forEach((card, index) => {
      const distance = Math.abs(card.offsetLeft - base - track.scrollLeft);
      if (distance < Math.abs(cards[nearest].offsetLeft - base - track.scrollLeft)) nearest = index;
    });
    setActive(nearest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      track.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const go = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = items();
    const target = cards[Math.max(0, Math.min(cards.length - 1, index))];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({
      left: Math.min(target.offsetLeft - cards[0].offsetLeft, track.scrollWidth - track.clientWidth),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <div className="-mx-6 sm:-mx-10 lg:mx-0">
      <div className="flex items-baseline justify-between px-6 sm:px-10 lg:px-0">
        <h3 className="tracking-brand text-[0.6875rem] uppercase text-dark-base/70">Casos</h3>
        <span aria-hidden className="tracking-brand text-[0.6875rem] tabular-nums text-dark-base/70">
          {pad(active + 1)} / {pad(CASES.length)}
        </span>
      </div>

      <ul
        ref={trackRef}
        id="services-cases"
        tabIndex={0}
        aria-label="Casos, deslize para o lado"
        className="relative mt-4 flex snap-x snap-mandatory list-none gap-3 overflow-x-auto overscroll-x-contain scroll-px-6 p-0 px-6 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-base sm:gap-5 sm:scroll-px-10 sm:px-10 lg:scroll-px-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {CASES.map((item, index) => {
          const lit = index === active;
          return (
            <li
              key={item.src}
              aria-label={`Caso ${index + 1} de ${CASES.length}`}
              className={`flex w-[84%] shrink-0 snap-start flex-col gap-4 transition-opacity duration-[400ms] ease-[var(--ease-out-quint)] motion-reduce:transition-none sm:w-[22rem] lg:w-[20rem] ${lit ? "" : "max-sm:motion-safe:opacity-50"}`}
            >
              <div className="overflow-hidden bg-dark-10">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1080}
                  height={1350}
                  sizes="(min-width: 1024px) 20rem, (min-width: 640px) 22rem, 84vw"
                  className={`block h-auto w-full transition-transform duration-700 ease-[var(--ease-out-quint)] motion-reduce:transition-none ${lit ? "" : "max-sm:motion-safe:scale-[1.04]"}`}
                />
              </div>
              <div>
                <h4 className="m-0 font-display text-[1.5rem] font-normal leading-[1.15]">{item.title}</h4>
                <p className="m-0 mt-2 text-[1rem] leading-[1.6] text-dark-base/85">{item.text}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 flex items-center justify-between px-6 sm:px-10 lg:px-0">
        <div aria-hidden className="flex gap-1">
          {CASES.map((item, index) => (
            <span
              key={item.src}
              className={`h-0.5 w-4 transition-colors duration-300 ${index === active ? "bg-dark-base" : "bg-dark-10"}`}
            />
          ))}
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            aria-label="Caso anterior"
            aria-controls="services-cases"
            disabled={active === 0}
            onClick={() => go(active - 1)}
            className={ARROW}
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Próximo caso"
            aria-controls="services-cases"
            disabled={active === CASES.length - 1}
            onClick={() => go(active + 1)}
            className={ARROW}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
