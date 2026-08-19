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
const HEIGHT_FROM = 0.36;
const HEIGHT_TO = 1;


/** Below this the section is a plain stacked block — no pinning, no opening. */
const PINNED_FROM = 1024;

const CREDENTIALS = [
  ["Formação", "Cirurgiã-dentista pela Universidade Federal de Alagoas"],
  ["Especialização", "Especialista e mestranda em Dentística"],
  ["Atuação", "Dentística estética e restauradora"],
  ["Clínica", "Innovare Odontologia — Maceió/AL"],
  ["Registro", "CRO/AL-6418"],
];

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

    const pinned = window.matchMedia(`(min-width: ${PINNED_FROM}px)`);
    const stillness = window.matchMedia("(prefers-reduced-motion: reduce)");
    let queued = 0;

    /** Parks the band fully open, which is how it should read without motion. */
    const rest = () => {
      band.style.width = "";
      band.style.height = "";
      photo.style.width = "";
      photo.style.height = "";
      copy.style.left = "";
      copy.style.opacity = "";
      copy.style.transform = "";
    };

    const draw = () => {
      queued = 0;

      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const rect = wrap.getBoundingClientRect();
      const runway = rect.height - viewportHeight;
      const progress = runway > 0 ? clamp(-rect.top / runway) : 0;

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

      if (!pinned.matches || stillness.matches) return;

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
      className="relative bg-light-base text-dark-base lg:h-[250svh] motion-reduce:lg:h-auto"
    >
      <div className="sticky top-0 flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-24 sm:px-10 lg:h-[100svh] lg:px-0 lg:py-0">
        <div
          ref={bandRef}
          className="relative flex w-full flex-col overflow-hidden lg:block lg:w-auto"
        >
          {/* The extended backdrop only exists where the band opens sideways.
              Stacked on a phone there is no panorama to continue, and carrying
              the gradient under the copy would step against the photo's own
              falloff. */}
          <div
            aria-hidden
            className="absolute inset-0 hidden lg:block"
            style={{ background: BACKDROP }}
          />

          <div
            ref={photoRef}
            className="relative aspect-[3/4] w-full shrink-0 lg:absolute lg:inset-y-0 lg:left-0 lg:aspect-auto lg:w-auto"
          >
            <Image
              src="/images/dra-thaiane.webp"
              alt="Dra. Thaiane Lessa"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />

            {/* Her shadow falls across the backdrop and would stop dead at the
                seam. This dissolves it into the exact colour the extension
                starts from, so the light reads as continuous. */}
            <div
              aria-hidden
              className="absolute inset-y-0 right-0 w-[11%]"
              style={{
                background: BACKDROP,
                maskImage: "linear-gradient(90deg, transparent, #000)",
                WebkitMaskImage: "linear-gradient(90deg, transparent, #000)",
              }}
            />
          </div>

          <div
            ref={copyRef}
            className="flex flex-col justify-center gap-8 pt-9 lg:absolute lg:inset-y-0 lg:right-0 lg:gap-10 lg:px-12 lg:pt-0"
          >
            <p className="tracking-brand text-[0.6875rem] uppercase text-dark-55">
              A dentista
            </p>

            {/* Light type only exists where the backdrop is behind it. Stacked
                on a phone the copy sits on the page's cream, where the same
                colour would vanish. */}
            <p className="max-w-[26ch] font-display text-[clamp(1.75rem,2.6vw,2.75rem)] leading-[1.12] lg:text-light-base">
              Entre técnicas, detalhes e planejamentos… Existe sempre o mais
              importante: o cuidado com quem está na cadeira.
            </p>

            <dl className="flex flex-col gap-2.5 border-t border-dark-10 pt-6 text-[0.8125rem] leading-snug lg:border-light-15">
              {CREDENTIALS.map(([label, value]) => (
                <div key={label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                  <dt className="tracking-brand shrink-0 text-[0.625rem] uppercase text-dark-55 sm:w-32 sm:pt-0.5">
                    {label}
                  </dt>
                  <dd className="m-0 lg:text-light-base">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
