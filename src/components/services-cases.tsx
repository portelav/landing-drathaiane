"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CASES } from "@/lib/services";

const ARROW =
  "flex h-11 w-11 items-center justify-center border border-dark-10 text-lg text-dark-base transition-opacity duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-base";

const FADE = "transition-opacity duration-[400ms] ease-[var(--ease-out-quint)] motion-reduce:transition-none";

const pad = (n: number) => String(n).padStart(2, "0");

const COUNT = CASES.length;
/**
 * The track holds three runs of the cases and lives in the middle one, so the
 * last case already sits to the left of the first and the loop has no ends.
 */
const RUNS = 3;
const HOME = 1;
const SLOTS = Array.from({ length: COUNT * RUNS }, (_, slot) => slot);
/** Quiet time after the last scroll event before the track counts as settled. */
const SETTLE_MS = 140;

const cardsOf = (track: HTMLElement) => Array.from(track.children) as HTMLElement[];

/** Scroll position that puts a card's centre on the track's centre. */
const centreOf = (track: HTMLElement, card: HTMLElement) =>
  card.offsetLeft + card.offsetWidth / 2 - track.clientWidth / 2;

/** The slot whose centre is closest to the track's. */
const nearestSlot = (track: HTMLElement) => {
  let found = 0;
  let best = Infinity;
  cardsOf(track).forEach((card, slot) => {
    const distance = Math.abs(centreOf(track, card) - track.scrollLeft);
    if (distance < best) {
      best = distance;
      found = slot;
    }
  });
  return found;
};

/** Moves to a slot instantly, bypassing smooth scrolling. */
const jump = (track: HTMLElement, slot: number) => {
  const card = cardsOf(track)[slot];
  if (card) track.scrollTo({ left: centreOf(track, card), behavior: "instant" });
};

/**
 * The cases slide sideways under the thumb and stop on each photo (native
 * scroll snap: no scroll-driven moment of our own). The chosen case sits in
 * the middle, lit, with its neighbours dimmed on either side, so the edges
 * say there is more: the photo to 50%, the text only to 75%, the most it can
 * fade and still read (4.5:1 on the cream). Tapping a neighbour brings it to
 * the middle.
 *
 * It loops: once the track settles on a case in an outer run, it jumps,
 * without animation, to the same case in the middle run. Every copy of the
 * chosen case is lit, so the jump swaps nothing on screen. With reduced
 * motion nothing fades or zooms and the arrows jump instead of gliding.
 */
export function ServicesCases() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(HOME * COUNT);
  // Where a glide is headed. Mid-glide the nearest card is still the one it
  // left, so a second quick click counted from there would aim at the same
  // card and be lost; counted from here, every click is a step.
  const heading = useRef<number | null>(null);

  // Start in the middle run, before the first paint where the browser allows.
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (track) jump(track, HOME * COUNT);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let settle = 0;

    const home = () => {
      window.clearTimeout(settle);
      settle = 0;
      heading.current = null;
      const slot = nearestSlot(track);
      const run = Math.floor(slot / COUNT);
      if (run === HOME) return;
      const twin = (slot % COUNT) + HOME * COUNT;
      jump(track, twin);
      setActive(twin);
    };

    // The loop jumps only once scrolling has ended, glide and snap included: a
    // quiet spell with no scroll event, since a glide sends one every frame.
    // `scrollend` can say so sooner, but Chrome skipped it after the arrows'
    // glides in testing, so it only ever adds to the timer.
    const onScroll = () => {
      setActive(nearestSlot(track));
      window.clearTimeout(settle);
      settle = window.setTimeout(home, SETTLE_MS);
    };

    const onResize = () => jump(track, nearestSlot(track));

    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("scrollend", home);
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(settle);
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("scrollend", home);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const go = (slot: number) => {
    const track = trackRef.current;
    const to = Math.max(0, Math.min(SLOTS.length - 1, slot));
    const card = track && cardsOf(track)[to];
    if (!track || !card) return;
    heading.current = to;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: centreOf(track, card), behavior: reduce ? "auto" : "smooth" });
  };

  /** One case along from wherever the track is headed. */
  const step = (by: number) => go((heading.current ?? active) + by);

  const current = active % COUNT;

  return (
    <div className="-mx-6 sm:-mx-10 lg:mx-0">
      <div className="flex items-baseline justify-between px-6 sm:px-10 lg:px-0">
        <h3 className="tracking-brand text-[0.6875rem] uppercase text-dark-base/70">Casos</h3>
        <span aria-hidden className="tracking-brand text-[0.6875rem] tabular-nums text-dark-base/70">
          {pad(current + 1)} / {pad(COUNT)}
        </span>
      </div>

      <ul
        ref={trackRef}
        id="services-cases"
        tabIndex={0}
        aria-label="Casos, deslize para o lado"
        className="relative mt-4 flex snap-x snap-mandatory list-none gap-3 overflow-x-auto overscroll-x-contain p-0 px-[8vw] [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-base sm:gap-5 sm:px-[calc(50%-11rem)] lg:px-[calc(50%-10rem)] [&::-webkit-scrollbar]:hidden"
      >
        {SLOTS.map((slot) => {
          const index = slot % COUNT;
          const item = CASES[index];
          const copy = Math.floor(slot / COUNT) !== HOME;
          const lit = index === current;
          return (
            // The click is a pointer convenience only: keyboard and screen
            // reader users have the arrows and the track's own scrolling. The
            // outer runs are copies, hidden from assistive technology.
            <li
              key={slot}
              aria-hidden={copy || undefined}
              aria-label={copy ? undefined : `Caso ${index + 1} de ${COUNT}`}
              onClick={slot === active ? undefined : () => go(slot)}
              className={`flex w-[84vw] shrink-0 snap-center flex-col gap-4 sm:w-[22rem] lg:w-[20rem] ${lit ? "" : "cursor-pointer"}`}
            >
              <div className={`${FADE} overflow-hidden bg-dark-10 ${lit ? "" : "motion-safe:opacity-50"}`}>
                <Image
                  src={item.src}
                  alt={copy ? "" : item.alt}
                  width={1080}
                  height={1350}
                  sizes="(min-width: 1024px) 20rem, (min-width: 640px) 22rem, 84vw"
                  className={`block h-auto w-full transition-transform duration-700 ease-[var(--ease-out-quint)] motion-reduce:transition-none ${lit ? "" : "motion-safe:scale-[1.04]"}`}
                />
              </div>
              <div className={`${FADE} ${lit ? "" : "motion-safe:opacity-75"}`}>
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
              className={`h-0.5 w-4 transition-colors duration-300 ${index === current ? "bg-dark-base" : "bg-dark-10"}`}
            />
          ))}
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            aria-label="Caso anterior"
            aria-controls="services-cases"
            onClick={() => step(-1)}
            className={ARROW}
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Próximo caso"
            aria-controls="services-cases"
            onClick={() => step(1)}
            className={ARROW}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
