"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * Sampled from the photo's own left and right edges at five heights, so the
 * band that opens out from behind her reads as the same seamless backdrop
 * continuing rather than a panel placed next to it.
 */
const BACKDROP =
  "linear-gradient(180deg, rgb(173,158,138) 0%, rgb(175,158,138) 25%, rgb(167,149,130) 50%, rgb(145,125,106) 75%, rgb(114,97,78) 100%)";

/**
 * The photo's own top row, sampled from the file at nine points across: the
 * wall is lighter in the middle than at the corners. Stacked, the copy sits on
 * this above her, and with the photo at full width the wall carries straight
 * on into it. A single edge colour left a visible step at the top of the photo.
 */
const WALL =
  "linear-gradient(90deg, rgb(173,157,137), rgb(176,160,142), rgb(179,164,145), rgb(179,165,147), rgb(180,165,147), rgb(179,164,146), rgb(178,163,145), rgb(176,161,143), rgb(173,157,138))";

const PHOTO_ASPECT = 3 / 4;

/** Band height as a share of the viewport, closed and open. */
const HEIGHT_FROM = 0.6;
const HEIGHT_TO = 1;

/**
 * Head start, as a share of the viewport. The stage is a full screen of cream
 * for as long as it takes to arrive, so the card starts growing while the
 * stage is still sliding in instead of waiting for the pin.
 */
const LEAD = 0.45;

/**
 * Stacked, the arrival follows the finger. Each piece runs while its own top
 * travels up the screen, from the bottom edge to this share of the height:
 * the copy has settled by the time it is in reading position, the photo by
 * the time her face is.
 */
const COPY_SETTLED = 0.4;
const PHOTO_SETTLED = 0.2;

/**
 * Below this the band stacks, copy over photo, and arrives with the scroll
 * instead of pinning and opening.
 *
 * The photo is 3:4, so its width follows its height: at full height it wants
 * `0.75 × viewport height`, which on a tall screen is the whole width and
 * leaves the copy standing outside it. Room for two columns is therefore a
 * question of ratio, not of width alone — the floor only keeps a small
 * landscape window from splitting into two columns too cramped to read. The
 * `beside:` variant in `globals.css` carries the same test for the layout.
 */
const OPENS_BESIDE = "(min-width: 64rem) and (min-aspect-ratio: 6/5)";

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const lerp = (from: number, to: number, t: number) => from + (to - from) * t;
const stage = (progress: number, from: number, to: number) =>
  clamp((progress - from) / (to - from));

export function About() {
  const wrapRef = useRef<HTMLElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const band = bandRef.current;
    const photo = photoRef.current;
    const copy = copyRef.current;
    if (!wrap || !band || !photo || !copy) return;

    const pinned = window.matchMedia(OPENS_BESIDE);
    const stillness = window.matchMedia("(prefers-reduced-motion: reduce)");
    let queued = 0;

    /** Hands the band back to the stylesheet, which stacks it as on a phone. */
    const rest = () => {
      band.style.width = "";
      band.style.height = "";
      photo.style.width = "";
      photo.style.height = "";
      copy.style.left = "";
      copy.style.opacity = "";
      copy.style.transform = "";
    };

    /** Lays the band out at a point in its opening, 0 closed to 1 fully open. */
    const place = (progress: number) => {
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      // First the card grows on its own, then the backdrop opens out from it.
      // The two overlap so there is no pause between them.
      const growing = stage(progress, 0, 0.55);
      const opening = stage(progress, 0.45, 1);

      const height = lerp(HEIGHT_FROM, HEIGHT_TO, growing) * viewportHeight;
      const photoWidth = height * PHOTO_ASPECT;

      band.style.height = `${height}px`;
      band.style.width = `${lerp(photoWidth, viewportWidth, opening)}px`;
      photo.style.height = `${height}px`;
      photo.style.width = `${photoWidth}px`;


      // The copy waits for room to exist before it arrives.
      const arriving = stage(progress, 0.58, 0.9);
      copy.style.left = `${photoWidth}px`;
      copy.style.opacity = `${arriving}`;
      copy.style.transform = `translate3d(${(1 - arriving) * 2}rem, 0, 0)`;
    };

    const draw = () => {
      queued = 0;

      const viewportHeight = window.innerHeight;
      const rect = wrap.getBoundingClientRect();
      const runway = rect.height - viewportHeight;
      const lead = LEAD * viewportHeight;
      place(runway > 0 ? clamp((lead - rect.top) / (runway + lead)) : 0);
    };

    const onScroll = () => {
      if (!queued) queued = requestAnimationFrame(draw);
    };

    const apply = () => {
      if (queued) {
        cancelAnimationFrame(queued);
        queued = 0;
      }

      window.removeEventListener("scroll", onScroll);
      rest();

      if (!pinned.matches) return;

      // Without motion there is nothing to scrub, and on this layout the
      // stylesheet gives the band no size at all: park it fully open.
      if (stillness.matches) {
        place(1);
        return;
      }

      draw();
      window.addEventListener("scroll", onScroll, { passive: true });
    };

    apply();
    pinned.addEventListener("change", apply);
    stillness.addEventListener("change", apply);
    window.addEventListener("resize", apply);

    return () => {
      if (queued) cancelAnimationFrame(queued);
      pinned.removeEventListener("change", apply);
      stillness.removeEventListener("change", apply);
      window.removeEventListener("resize", apply);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Stacked, the band arrives with the scroll: the label and the quote rise
  // in, and the photo settles from 1.08. Nothing pins, so it moves at the
  // finger's pace and plays back on the way up. The server renders the
  // finished state, which is also what reduced motion and `beside:` keep.
  useEffect(() => {
    const photo = photoRef.current;
    const copy = copyRef.current;
    const picture = photo?.querySelector("img");
    if (!photo || !copy || !picture) return;
    const [label, quote] = Array.from(copy.children) as HTMLElement[];
    if (!label || !quote) return;

    const pinned = window.matchMedia(OPENS_BESIDE);
    const stillness = window.matchMedia("(prefers-reduced-motion: reduce)");
    let queued = 0;

    /** 0 while `el`'s top is below the screen, 1 once it reaches `settled`. */
    const travel = (el: HTMLElement, settled: number) => {
      const viewportHeight = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      return clamp((viewportHeight - top) / (viewportHeight * (1 - settled)));
    };

    const rise = (el: HTMLElement, t: number) => {
      el.style.opacity = `${t}`;
      el.style.transform = `translate3d(0, ${(1 - t) * 1.5}rem, 0)`;
    };

    const draw = () => {
      queued = 0;
      const arriving = travel(copy, COPY_SETTLED);
      rise(label, stage(arriving, 0, 0.7));
      rise(quote, stage(arriving, 0.15, 1));
      picture.style.transform = `scale(${lerp(1.08, 1, travel(photo, PHOTO_SETTLED))})`;
    };

    const onScroll = () => {
      if (!queued) queued = requestAnimationFrame(draw);
    };

    const rest = () => {
      for (const el of [label, quote, picture]) {
        el.style.opacity = "";
        el.style.transform = "";
      }
    };

    const apply = () => {
      if (queued) {
        cancelAnimationFrame(queued);
        queued = 0;
      }
      window.removeEventListener("scroll", onScroll);
      rest();
      if (pinned.matches || stillness.matches) return;
      draw();
      window.addEventListener("scroll", onScroll, { passive: true });
    };

    apply();
    pinned.addEventListener("change", apply);
    stillness.addEventListener("change", apply);
    window.addEventListener("resize", apply);

    return () => {
      if (queued) cancelAnimationFrame(queued);
      pinned.removeEventListener("change", apply);
      stillness.removeEventListener("change", apply);
      window.removeEventListener("resize", apply);
      window.removeEventListener("scroll", onScroll);
      rest();
    };
  }, []);

  return (
    <section
      ref={wrapRef}
      id="sobre"
      data-header-hold
      data-header-theme="light"
      className="relative bg-light-base text-dark-base beside:h-[250svh] motion-reduce:beside:h-auto"
    >
      <div className="flex justify-center overflow-hidden sm:px-10 sm:py-24 beside:sticky beside:top-0 beside:h-[100svh] beside:items-center beside:px-0 beside:py-0">
        {/* On a phone the band runs edge to edge. Wider but still upright
            (an iPad), it holds a column so the photo stays under a screen. */}
        <div
          ref={bandRef}
          className="relative flex w-full flex-col overflow-hidden sm:max-w-[34rem] beside:block beside:w-auto beside:max-w-none"
        >
          {/* The extended backdrop only exists where the band opens sideways.
              Stacked, the wall continues upward instead: the photo's top row,
              carried on above her for the copy to sit on. */}
          <div
            aria-hidden
            className="absolute inset-0 hidden beside:block"
            style={{ background: BACKDROP }}
          />
          <div
            aria-hidden
            className="absolute inset-0 beside:hidden"
            style={{ background: WALL }}
          />

          <div
            ref={copyRef}
            className="relative flex flex-col justify-center gap-8 px-6 pb-10 pt-24 sm:px-10 sm:pt-14 beside:absolute beside:inset-y-0 beside:right-0 beside:gap-10 beside:px-12 beside:pb-0 beside:pt-0"
          >
            {/* Over the wall the label goes full strength, stacked or open:
                the wall's mid-tones pull a 70% ink below AA. */}
            <p className="tracking-brand text-[0.6875rem] uppercase text-dark-base">
              A dentista
            </p>

            {/* Full-strength ink like the label: cream type on the wall's
                mid-tones measured 2.52 to 3.00:1, under the 3:1 large-text
                floor. */}
            <p className="max-w-[26ch] font-display text-[clamp(1.75rem,2.6vw,2.75rem)] leading-[1.12]">
              Entre técnicas, detalhes e planejamentos… Existe sempre o mais
              importante: o cuidado com quem está na cadeira.
            </p>
          </div>

          <div
            ref={photoRef}
            className="relative aspect-[3/4] w-full shrink-0 overflow-hidden beside:absolute beside:inset-y-0 beside:left-0 beside:aspect-auto beside:w-auto"
          >
            <Image
              src="/images/dra-thaiane.webp"
              alt="Dra. Thaiane Lessa"
              fill
              sizes="(min-width: 64rem) and (min-aspect-ratio: 6/5) 40vw, (min-width: 40rem) 34rem, 100vw"
              className="object-cover"
            />

            {/* Stacked, the photo's top edge melts into the wall above it.
                Kept to 2%: her hair starts about 3% down, and a deeper blend
                washed it out. */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-[2%] beside:hidden"
              style={{
                background: WALL,
                maskImage: "linear-gradient(180deg, #000, transparent)",
                WebkitMaskImage: "linear-gradient(180deg, #000, transparent)",
              }}
            />

            {/* Her shadow falls across the backdrop and would stop dead at the
                seam. This dissolves it into the exact colour the extension
                starts from, so the light reads as continuous. Stacked on a
                phone there is no seam to hide, and the same gradient would
                just flatten the shadow the photo already carries. */}
            <div
              aria-hidden
              className="absolute inset-y-0 right-0 hidden w-[11%] beside:block"
              style={{
                background: BACKDROP,
                maskImage: "linear-gradient(90deg, transparent, #000)",
                WebkitMaskImage: "linear-gradient(90deg, transparent, #000)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
