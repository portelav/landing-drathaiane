"use client";

import { useEffect, useRef } from "react";

const MILESTONES = [
  {
    year: "2019",
    items: ["Início da graduação em Odontologia — Universidade Federal de Alagoas"],
  },
  {
    year: "2024",
    items: [
      "Formatura e registro CRO/AL-6418",
      "Início do atendimento na Innovare Odontologia, Maceió",
    ],
  },
  {
    year: "2025",
    items: [
      "Entrada no grupo de creators da Ivoclar, marca global de materiais odontológicos",
    ],
  },
  {
    year: "2026",
    items: ["Especialização em Dentística concluída", "Início do mestrado em Dentística"],
  },
];

/**
 * Below this the wheel does not turn: the section is a plain stacked list.
 *
 * A pinned stage has to hold the wheel and the portrait video side by side,
 * and stacked there is no viewport tall enough for both — the video alone is
 * three quarters of a phone screen. The same test the band uses, for the same
 * reason: room for two columns is a question of ratio, not of width alone.
 */
const OPENS_BESIDE = "(min-width: 64rem) and (min-aspect-ratio: 6/5)";

/**
 * The wheel's axis sits far off the left edge, so only a shallow slice of a
 * very large circle crosses the screen. The curve is implied rather than
 * drawn, which is what keeps all four years legible at once.
 */
const RADIUS = 1500;
/** Angle between neighbouring seats. */
const STEP = 4.2;

/** How far from the seat a year's copy is still fully present, in seats. */
const PLATEAU = 0.22;
/** How far from the seat it has gone completely. */
const VANISH = 0.78;

/**
 * Years off the seat dim, but never below this. `forest-700` at 60% over
 * `light-base` is 3.2:1, so every numeral still passes as large text (WCAG
 * AA); the mask, not the opacity, is what makes the far ones vanish.
 */
const YEAR_FLOOR = 0.6;

const clamp = (value: number, low: number, high: number) =>
  Math.min(high, Math.max(low, value));
const rad = (degrees: number) => (degrees * Math.PI) / 180;

export function AboutTimeline() {
  const wrapRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const columnRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLHeadingElement>(null);
  const years = useRef<(HTMLSpanElement | null)[]>([]);
  const seats = useRef<(HTMLSpanElement | null)[]>([]);
  const slots = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    const column = columnRef.current;
    const arc = arcRef.current;
    const marker = markerRef.current;
    const label = labelRef.current;
    if (!wrap || !stage || !column || !arc || !marker || !label) return;

    const turning = window.matchMedia(OPENS_BESIDE);
    const stillness = window.matchMedia("(prefers-reduced-motion: reduce)");
    let queued = 0;

    /** Hands the layout back to the stylesheet, which parks it as a list: stacked
     *  on narrow screens, and on `beside:` through the `motion-reduce:` classes. */
    const rest = () => {
      [...years.current, ...seats.current, ...slots.current].forEach((element) => {
        if (!element) return;
        element.style.transform = "";
        element.style.opacity = "";
        element.style.filter = "";
        element.style.width = "";
      });
      arc.style.cssText = "";
      marker.style.cssText = "";
      label.style.left = "";
    };

    const draw = () => {
      queued = 0;

      const width = column.clientWidth;
      const height = stage.clientHeight;
      const rect = wrap.getBoundingClientRect();
      const runway = rect.height - height;
      const progress = runway > 0 ? clamp(-rect.top / runway, 0, 1) : 0;
      const position = progress * (MILESTONES.length - 1);

      const scale = clamp(width / 700, 0.6, 1);
      const radius = RADIUS * scale;
      const seatX = 300 * scale;
      const centreX = seatX - radius;
      const centreY = height / 2;

      const copyLeft = seatX + 190 * scale;
      const copyWidth = clamp(width - copyLeft, 180, 440);

      MILESTONES.forEach((_, i) => {
        const year = years.current[i];
        const seat = seats.current[i];
        const slot = slots.current[i];
        if (!year || !seat || !slot) return;

        const offset = i - position;
        const angle = offset * STEP;
        const x = centreX + radius * Math.cos(rad(angle));
        const y = centreY + radius * Math.sin(rad(angle));
        const near = clamp(1 - Math.abs(angle) / (STEP * 2.3), 0, 1);

        year.style.transform = `translate(${x}px, ${y}px) translateY(-50%) rotate(${angle}deg) scale(${
          0.6 + near * 0.4
        })`;
        year.style.opacity = `${YEAR_FLOOR + near * (1 - YEAR_FLOOR)}`;

        // The dot rides the rule itself, a little ahead of the numeral.
        seat.style.transform = `translate(${x - 24 * scale}px, ${y}px)`;
        seat.style.opacity = `${near * 0.85}`;

        // The copy belongs to its year and travels with it: it arrives from
        // below, comes to rest against the marker, and leaves over the top.
        // Presence holds across a plateau around the seat, so there is a
        // window where the line is genuinely still and readable.
        const presence = clamp((VANISH - Math.abs(offset)) / (VANISH - PLATEAU), 0, 1);

        slot.style.width = `${copyWidth}px`;
        slot.style.transform = `translate(${copyLeft}px, ${y}px) translateY(-42%)`;
        slot.style.opacity = `${presence}`;
        // Blur bridges the two neighbours mid-travel, so the eye reads one
        // movement rather than two blocks of text overlapping.
        slot.style.filter = presence > 0.99 ? "" : `blur(${(1 - presence) * 2.5}px)`;
      });

      arc.style.width = arc.style.height = `${radius * 2}px`;
      arc.style.left = `${centreX - radius}px`;
      arc.style.top = `${centreY - radius}px`;

      marker.style.width = `${18 * scale}px`;
      marker.style.left = `${seatX - 42 * scale}px`;
      marker.style.top = `${centreY}px`;

      // The label belongs over the column of years, not at the box's edge.
      label.style.left = `${seatX}px`;
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

      if (!turning.matches || stillness.matches) return;

      draw();
      window.addEventListener("scroll", onScroll, { passive: true });
    };

    apply();
    turning.addEventListener("change", apply);
    stillness.addEventListener("change", apply);
    window.addEventListener("resize", apply);

    return () => {
      if (queued) cancelAnimationFrame(queued);
      turning.removeEventListener("change", apply);
      stillness.removeEventListener("change", apply);
      window.removeEventListener("resize", apply);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      ref={wrapRef}
      data-header-theme="light"
      className="relative bg-light-base text-dark-base beside:h-[380svh] motion-reduce:beside:h-auto"
    >
      <div
        ref={stageRef}
        className="flex flex-col gap-14 px-6 pb-28 sm:px-10 sm:pb-36 beside:sticky beside:top-0 beside:h-[100svh] beside:flex-row beside:items-center beside:gap-16 beside:overflow-hidden beside:px-10 beside:py-24 motion-reduce:beside:static motion-reduce:beside:h-auto motion-reduce:beside:overflow-visible"
      >
        {/* The vertical axis is the contrast neither earlier piece can give:
            the hero and the band both open sideways, and the site has never
            descended. Here it descends on a curve. */}
        <div ref={columnRef} className="beside:relative beside:flex-1 beside:self-stretch">
          <h3
            ref={labelRef}
            className="tracking-brand text-[0.6875rem] uppercase text-dark-base/70 beside:absolute beside:top-0 beside:z-10 motion-reduce:beside:static"
          >
            Formação e trajetória
          </h3>

          {/* The mask is why everything on the wheel lives in one box: years
              dissolve at the top and bottom instead of being cut off by the
              stage edge, and the arc stops before it can run across the label
              or trail off as a stray line. */}
          <div className="mt-2 beside:absolute beside:inset-0 beside:mt-0 beside:[mask-image:linear-gradient(to_bottom,transparent_0%,#000_20%,#000_80%,transparent_100%)] motion-reduce:beside:static motion-reduce:beside:mt-2 motion-reduce:beside:[mask-image:none]">
            <div
              ref={arcRef}
              aria-hidden
              className="hidden rounded-full border border-dark-10 beside:absolute beside:block motion-reduce:beside:hidden"
            />

            {MILESTONES.map((milestone, index) => (
              <div key={milestone.year} className="contents">
                <span
                  ref={(node) => {
                    years.current[index] = node;
                  }}
                  className="mt-10 block origin-left font-display text-[clamp(2.5rem,5.2vw,4rem)] leading-none tabular-nums text-forest-700 whitespace-nowrap beside:absolute beside:left-0 beside:top-0 beside:mt-0 beside:will-change-[transform,opacity] motion-reduce:beside:static motion-reduce:beside:mt-10"
                >
                  {milestone.year}
                </span>

                <span
                  ref={(node) => {
                    seats.current[index] = node;
                  }}
                  aria-hidden
                  className="hidden h-[5px] w-[5px] rounded-full bg-forest-700 beside:absolute beside:left-0 beside:top-0 beside:-ml-[2.5px] beside:-mt-[2.5px] beside:block beside:will-change-[transform,opacity] motion-reduce:beside:hidden"
                />

                <div
                  ref={(node) => {
                    slots.current[index] = node;
                  }}
                  className="mt-3 flex flex-col gap-2 beside:pointer-events-none beside:absolute beside:left-0 beside:top-0 beside:mt-0 beside:will-change-[transform,opacity] motion-reduce:beside:pointer-events-auto motion-reduce:beside:static motion-reduce:beside:mt-3"
                >
                  <div
                    aria-hidden
                    className="mb-0.5 hidden h-px w-10 bg-dark-10 beside:block motion-reduce:beside:hidden"
                  />
                  {milestone.items.map((item) => (
                    <p
                      key={item}
                      className="m-0 text-[0.9375rem] leading-normal text-dark-base/80"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* The fixed point the active year comes to rest against. Without
                something standing still, a wheel is just a crooked list. */}
            <span
              ref={markerRef}
              aria-hidden
              className="hidden h-px bg-forest-700 opacity-45 beside:absolute beside:block motion-reduce:beside:hidden"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
