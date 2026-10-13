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
 * Below this the section is a plain stacked block — no pinning, no opening.
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

  return (
    <section
      ref={wrapRef}
      id="sobre"
      data-header-theme="light"
      className="relative bg-light-base text-dark-base beside:h-[250svh] motion-reduce:beside:h-auto"
    >
      <div className="sticky top-0 flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-24 sm:px-10 beside:h-[100svh] beside:px-0 beside:py-0">
        <div
          ref={bandRef}
          className="relative flex w-full flex-col overflow-hidden beside:block beside:w-auto"
        >
          {/* The extended backdrop only exists where the band opens sideways.
              Stacked on a phone there is no panorama to continue, and carrying
              the gradient under the copy would step against the photo's own
              falloff. */}
          <div
            aria-hidden
            className="absolute inset-0 hidden beside:block"
            style={{ background: BACKDROP }}
          />

          <div
            ref={photoRef}
            className="relative aspect-[3/4] w-full shrink-0 beside:absolute beside:inset-y-0 beside:left-0 beside:aspect-auto beside:w-auto"
          >
            <Image
              src="/images/dra-thaiane.webp"
              alt="Dra. Thaiane Lessa"
              fill
              sizes="(min-width: 64rem) and (min-aspect-ratio: 6/5) 40vw, 100vw"
              className="object-cover"
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

          <div
            ref={copyRef}
            className="flex flex-col justify-center gap-8 pt-9 beside:absolute beside:inset-y-0 beside:right-0 beside:gap-10 beside:px-12 beside:pt-0"
          >
            {/* Over the backdrop the label goes full strength: the wall's
                mid-tones pull a 70% ink below AA, where on the cream it
                passes with room to spare. */}
            <p className="tracking-brand text-[0.6875rem] uppercase text-dark-base/70 beside:text-dark-base">
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
        </div>
      </div>
    </section>
  );
}
