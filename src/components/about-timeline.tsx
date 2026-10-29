"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const MILESTONES = [
  {
    year: "2019",
    items: ["Início da graduação em Odontologia, Universidade Federal de Alagoas"],
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
 * Below this the wheel does not turn, and the phone gets its own stage: the
 * photo on top, the years counting up underneath (PRD, D42).
 *
 * A pinned stage has to hold the wheel and the portrait side by side, and on
 * a screen taller than wide there is no room for both. The same test the band
 * uses, for the same reason: room for two columns is a question of ratio, not
 * of width alone.
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

/**
 * The trajectory arrives at her: the photo opens as the wheel turns and is
 * whole by the time 2026 comes to rest. A slice already shows at 2019, so the
 * right side of the stage is never an empty panel.
 */
const PHOTO_SHOWN = 0.15;
/** Progress at which the photo is fully open, just before 2026's plateau. */
const PHOTO_FULL = 0.9;
/** The photo settles from this zoom to 1 while it opens. */
const PHOTO_ZOOM = 1.08;

/**
 * On the phone the years take turns over the photo instead of riding a wheel,
 * so the handover is quicker than the wheel's: one year is gone before the
 * next is fully there, and two lines of light copy never stack over the face.
 */
const PHONE_PLATEAU = 0.12;
const PHONE_VANISH = 0.42;
/** How far a year rises while it hands over, in px. */
const PHONE_RISE = 36;
/** The phone photo starts this far zoomed in and settles to 1. */
const PHONE_ZOOM = 1.1;
/** The dark wash over the phone photo, at 2019 and once it is in focus. */
const PHONE_SHADE = 0.55;
const PHONE_SHADE_END = 0.1;

const clamp = (value: number, low: number, high: number) =>
  Math.min(high, Math.max(low, value));
const rad = (degrees: number) => (degrees * Math.PI) / 180;

/** How fully a year's copy is present at `offset` seats from its own. */
const presenceAt = (offset: number) =>
  clamp((VANISH - Math.abs(offset)) / (VANISH - PLATEAU), 0, 1);

/**
 * How far the photo has opened, 0 to 1, eased so the opening starts and
 * lands gently instead of tracking the scroll like a ruler.
 */
const openingAt = (progress: number) => {
  const reveal = clamp(progress / PHOTO_FULL, 0, 1);
  return reveal * reveal * (3 - 2 * reveal);
};

/** The veil slides down off the photo while it settles from its zoom. */
const openPhoto = (picture: HTMLElement, veil: HTMLElement, progress: number) => {
  const eased = openingAt(progress);
  // The individual `translate` and `scale` properties, the ones Tailwind's
  // classes set, so the phone's resting classes are overridden, not stacked.
  veil.style.display = "block";
  veil.style.translate = `0 ${(PHOTO_SHOWN + (1 - PHOTO_SHOWN) * eased) * 100}%`;
  picture.style.scale = `${PHOTO_ZOOM - (PHOTO_ZOOM - 1) * eased}`;
};

export function AboutTimeline() {
  const wrapRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const columnRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLHeadingElement>(null);
  const pictureRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const years = useRef<(HTMLSpanElement | null)[]>([]);
  const seats = useRef<(HTMLSpanElement | null)[]>([]);
  const slots = useRef<(HTMLDivElement | null)[]>([]);
  const phoneRunwayRef = useRef<HTMLDivElement>(null);
  const phoneStageRef = useRef<HTMLDivElement>(null);
  const phonePictureRef = useRef<HTMLDivElement>(null);
  const phoneBlurRef = useRef<HTMLDivElement>(null);
  const phoneShadeRef = useRef<HTMLDivElement>(null);
  const phoneEntries = useRef<(HTMLDivElement | null)[]>([]);
  const phoneBars = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    const column = columnRef.current;
    const arc = arcRef.current;
    const marker = markerRef.current;
    const label = labelRef.current;
    const picture = pictureRef.current;
    const veil = veilRef.current;
    const phoneRunway = phoneRunwayRef.current;
    const phoneStage = phoneStageRef.current;
    const phonePicture = phonePictureRef.current;
    const phoneBlur = phoneBlurRef.current;
    const phoneShade = phoneShadeRef.current;
    if (
      !wrap ||
      !stage ||
      !column ||
      !arc ||
      !marker ||
      !label ||
      !picture ||
      !veil ||
      !phoneRunway ||
      !phoneStage ||
      !phonePicture ||
      !phoneBlur ||
      !phoneShade
    )
      return;

    const turning = window.matchMedia(OPENS_BESIDE);
    const stillness = window.matchMedia("(prefers-reduced-motion: reduce)");
    let queued = 0;
    let frame: (() => void) | null = null;

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
      picture.style.scale = "";
      veil.style.cssText = "";
      [...phoneEntries.current, ...phoneBars.current].forEach((element) => {
        if (element) element.style.cssText = "";
      });
      phonePicture.style.scale = "";
      phoneBlur.style.opacity = "";
      phoneShade.style.opacity = "";
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
        const presence = presenceAt(offset);

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

      openPhoto(picture, veil, progress);
    };

    /** The phone's version of the wheel: the same progress, told upright.
     *  The photo comes into focus as the years go by over it, and is sharp
     *  and bright by the time 2026 comes to rest. */
    const drawPhone = () => {
      queued = 0;

      const rect = phoneRunway.getBoundingClientRect();
      const runway = rect.height - phoneStage.clientHeight;
      const progress = runway > 0 ? clamp(-rect.top / runway, 0, 1) : 0;
      const position = progress * (MILESTONES.length - 1);

      phoneEntries.current.forEach((entry, i) => {
        if (!entry) return;
        const offset = i - position;
        const presence = clamp(
          (PHONE_VANISH - Math.abs(offset)) / (PHONE_VANISH - PHONE_PLATEAU),
          0,
          1,
        );
        entry.style.transform = `translateY(${offset * PHONE_RISE}px)`;
        entry.style.opacity = `${presence}`;
      });

      phoneBars.current.forEach((bar, i) => {
        if (bar) bar.style.scale = `${clamp(position - i + 1, 0, 1)} 1`;
      });

      const focus = openingAt(progress);
      phoneBlur.style.opacity = `${1 - focus}`;
      phoneShade.style.opacity = `${PHONE_SHADE - (PHONE_SHADE - PHONE_SHADE_END) * focus}`;
      phonePicture.style.scale = `${PHONE_ZOOM - (PHONE_ZOOM - 1) * focus}`;
    };

    const onScroll = () => {
      if (!queued && frame) queued = requestAnimationFrame(frame);
    };

    const apply = () => {
      if (queued) {
        cancelAnimationFrame(queued);
        queued = 0;
      }

      window.removeEventListener("scroll", onScroll);
      rest();

      frame = stillness.matches ? null : turning.matches ? draw : drawPhone;
      if (!frame) return;

      frame();
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
      {/* The phone stage: the photo fills the screen, out of focus and dim,
          and comes into focus as the years go by over it. Pinned for a short
          run of scroll. Gone on `beside:`, where the wheel takes over, and
          with reduced motion, where the plain list below stands in for it.
          Dark under the header, so the bar inverts over the photo. */}
      <div
        ref={phoneRunwayRef}
        data-header-theme="dark"
        className="relative h-[320svh] beside:hidden motion-reduce:hidden"
      >
        <div
          ref={phoneStageRef}
          className="sticky top-0 h-[100lvh] overflow-hidden bg-dark-base text-light-base"
        >
          <div ref={phonePictureRef} className="absolute inset-0 scale-[1.1] will-change-transform">
            <Image
              src="/images/dra-thaiane-paramentada.webp"
              alt="Dra. Thaiane Lessa, de touca e máscara"
              fill
              sizes="100vw"
              className="object-cover object-[70%_30%]"
            />
          </div>

          {/* Out of focus is a second copy of the photo, blurred once by the
              stylesheet and faded away, so the scroll only ever animates
              opacity, never the blur itself. Same file, same request. */}
          <div
            ref={phoneBlurRef}
            aria-hidden
            className="absolute inset-0 scale-[1.12] blur-[14px] saturate-[0.7] will-change-[opacity]"
          >
            <Image
              src="/images/dra-thaiane-paramentada.webp"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-[70%_30%]"
            />
          </div>

          <div
            ref={phoneShadeRef}
            aria-hidden
            className="absolute inset-0 bg-dark-base opacity-55 will-change-[opacity]"
          />

          {/* Light copy over a photo needs ground of its own at both ends:
              the label over the cap, the years over the gown. The top one is
              the stronger: once in focus the clinic behind the label is pale,
              and 11 px text needs 4.5:1 there. */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-[40%] bg-linear-to-b from-dark-base/85 to-transparent"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-t from-dark-base/90 to-transparent"
          />

          <div className="absolute inset-x-6 top-24 flex flex-col gap-3 sm:inset-x-10">
            <h3 className="tracking-brand text-[0.6875rem] uppercase text-light-base">
              Formação e trajetória
            </h3>
            {/* One bar per year, filling like stories as the scroll goes by. */}
            <div aria-hidden className="grid grid-cols-4 gap-1">
              {MILESTONES.map((milestone, index) => (
                <span key={milestone.year} className="h-0.5 overflow-hidden bg-light-base/30">
                  <span
                    ref={(node) => {
                      phoneBars.current[index] = node;
                    }}
                    className={`block h-full origin-left bg-light-base ${
                      index === 0 ? "" : "scale-x-0"
                    }`}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* The years take turns at the foot of the screen: the one on the
              seat fades out rising, the next fades in from below. The stage
              is `lvh` tall so it fills the screen with the toolbar tucked
              away; the offset keeps the years above the toolbar while it is
              still out. */}
          <div className="absolute inset-x-6 bottom-[calc(100lvh-100svh+2.5rem)] h-48 sm:inset-x-10">
            {MILESTONES.map((milestone, index) => (
              <div
                key={milestone.year}
                ref={(node) => {
                  phoneEntries.current[index] = node;
                }}
                className={`absolute inset-x-0 bottom-0 will-change-[transform,opacity] ${
                  index === 0 ? "" : "opacity-0"
                }`}
              >
                <span className="block font-display text-[4.25rem] leading-none tabular-nums">
                  {milestone.year}
                </span>
                <div className="mt-2 flex flex-col gap-1.5">
                  {milestone.items.map((item) => (
                    <p key={item} className="m-0 text-[0.9375rem] leading-snug text-light-base/90">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={stageRef}
        className="hidden flex-col gap-14 px-6 pb-28 motion-reduce:flex beside:flex sm:px-10 sm:pb-36 beside:sticky beside:top-0 beside:h-[100svh] beside:flex-row beside:items-center beside:gap-16 beside:overflow-hidden beside:px-10 beside:py-24 motion-reduce:beside:static motion-reduce:beside:h-auto motion-reduce:beside:overflow-visible"
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

        {/* The wheel tells the trajectory; she anchors it in the present.
            Capped at the stage's height so a wide, short screen crops the
            photo instead of pushing it past the pinned frame. */}
        <div className="relative aspect-[3/4] w-[82%] shrink-0 overflow-hidden beside:max-h-full beside:w-[30%]">
          <div ref={pictureRef} className="absolute inset-0 beside:will-change-transform">
            <Image
              src="/images/dra-thaiane-paramentada.webp"
              alt="Dra. Thaiane Lessa, de touca e máscara"
              fill
              sizes="(min-width: 64rem) and (min-aspect-ratio: 6/5) 30vw, 82vw"
              className="object-cover"
            />
          </div>

          {/* Only the turning wheel shows it; stacked, or with reduced motion,
              the photo is whole from the start. */}
          <div
            ref={veilRef}
            aria-hidden
            className="absolute inset-0 hidden bg-light-base will-change-transform"
          />
        </div>
      </div>
    </section>
  );
}
