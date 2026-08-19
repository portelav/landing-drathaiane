"use client";

import { useEffect, useRef } from "react";

const POSTER = "/video/hero-poster.webp";
const SOURCES = [
  { src: "/video/hero.webm", type: "video/webm" },
  { src: "/video/hero.mp4", type: "video/mp4" },
];

/** Flip this to compare the two grounds. Everything else follows. */
const TONE: "light" | "dark" = "light";

const PALETTE = {
  dark: {
    headerTheme: "dark",
    section: "bg-forest-900 text-light-base",
    muted: "text-light-40",
    rule: "border-light-15",
    accent: "",
    banner: "",
    veil: "bg-forest-900",
    veilPeak: 0.34,
    gradient:
      "linear-gradient(180deg, rgba(22,48,0,0.74) 0%, rgba(22,48,0,0.28) 19%, rgba(22,48,0,0) 36%)",
  },
  light: {
    headerTheme: "light",
    section: "bg-light-base text-dark-base",
    muted: "text-dark-55",
    rule: "border-dark-10",
    accent: "text-forest-700",
    banner: "text-forest-900",
    // Pale walls under dark type need a touch more cover than the reverse.
    veil: "bg-light-base",
    veilPeak: 0.56,
    gradient:
      "linear-gradient(180deg, rgba(244,242,238,0.84) 0%, rgba(244,242,238,0.36) 19%, rgba(244,242,238,0) 36%)",
  },
} as const;

const skin = PALETTE[TONE];

/**
 * The footage is a triptych: three vertical clips butted together inside one
 * 16:9 frame. With `object-cover`, a window this wide relative to its own
 * height frames exactly the centre panel — so the reveal starts on one panel
 * and widens onto the other two instead of landing on an arbitrary crop.
 */
const PANEL_WIDTH = 854 / 2560;
const FRAME_ASPECT = 16 / 9;
const WINDOW_START = PANEL_WIDTH * FRAME_ASPECT;

/**
 * Below this the opening cannot happen: framing one panel needs a window of
 * `0.5931 × height`, which on a phone is wider than the screen itself. There
 * is nothing left to reveal, so narrow screens get the full frame from the
 * start and keep only the line crossing it.
 */
const PINNED_FROM = 1024;

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

/** Maps scroll progress to a stage's own 0..1 range. */
const stage = (progress: number, from: number, to: number) =>
  clamp((progress - from) / (to - from));

export function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLSpanElement>(null);
  const mobileBannerRef = useRef<HTMLSpanElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Decorative playback: the poster carries the first paint, and the video only
  // starts once we know the visitor has not asked for reduced motion.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let attempts = 0;

    const attempt = () => {
      if (media.matches) return;
      video.play().catch(() => {
        // Some browsers refuse until enough data has arrived. Try again once
        // it has, a couple of times; past that the refusal is a real policy
        // (low power mode, data saver) and the poster is the right answer.
        if (attempts++ < 3) video.addEventListener("canplay", attempt, { once: true });
      });
    };

    const sync = () => {
      if (media.matches) {
        video.pause();
        video.currentTime = 0;
      } else {
        attempts = 0;
        attempt();
      }
    };

    sync();
    media.addEventListener("change", sync);
    return () => {
      media.removeEventListener("change", sync);
      video.removeEventListener("canplay", attempt);
    };
  }, []);

  // Scroll-driven reveal. Everything animated here is absolutely positioned, so
  // resizing the window costs no reflow of the page around it.
  useEffect(() => {
    const wrap = wrapRef.current;
    const frame = frameRef.current;
    const intro = introRef.current;
    const banner = bannerRef.current;
    const mobileBanner = mobileBannerRef.current;
    const veil = veilRef.current;
    const video = videoRef.current;
    if (!wrap || !frame || !intro || !banner || !mobileBanner || !veil || !video) return;

    const pinned = window.matchMedia(`(min-width: ${PINNED_FROM}px)`);
    const stillness = window.matchMedia("(prefers-reduced-motion: reduce)");
    let queued = 0;

    /** Parks every animated element where it reads correctly without motion. */
    const rest = () => {
      frame.style.width = "";
      intro.style.opacity = "";
      intro.style.transform = "";
      banner.style.opacity = "";
      banner.style.transform = "";
      veil.style.opacity = "";
      video.style.objectPosition = "";
      mobileBanner.style.transform = `translate3d(${
        (window.innerWidth - mobileBanner.offsetWidth) / 2
      }px, -50%, 0)`;
    };

    /** Desktop: the window opens from one panel to the full bleed. */
    const drawPinned = () => {
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const rect = wrap.getBoundingClientRect();
      const runway = rect.height - viewportHeight;
      const progress = runway > 0 ? clamp(-rect.top / runway) : 0;

      const opening = stage(progress, 0, 0.72);
      frame.style.width = `${lerp(viewportHeight * WINDOW_START, viewportWidth, opening)}px`;

      // Full bleed puts pale walls behind the display line, so the frame earns
      // a little more shade the wider it gets.
      veil.style.opacity = `${opening * skin.veilPeak}`;

      // The opening text clears out well before the footage takes the screen.
      const leaving = stage(progress, 0.05, 0.4);
      intro.style.opacity = `${1 - leaving}`;
      intro.style.transform = `translate3d(${-leaving * 12}vw, 0, 0)`;

      // The payoff line crosses the frame and settles centred, bleeding off
      // both edges the way an oversized display line should.
      const crossing = stage(progress, 0.22, 1);
      const settled = (viewportWidth - banner.offsetWidth) / 2;
      banner.style.opacity = `${stage(progress, 0.22, 0.42)}`;
      banner.style.transform = `translate3d(${lerp(viewportWidth, settled, crossing)}px, 0, 0)`;
    };

    /**
     * Narrow screens: the frame is already full width, so the line crosses it
     * as the frame itself travels through the viewport — no pinning, no runway.
     *
     * A full-height frame on a phone crops to roughly a quarter of the source,
     * which is narrower than a single panel. So instead of opening outwards the
     * crop pans across the triptych: the three panels arrive one after another
     * rather than all at once, and the line drifts against them.
     */
    const drawLoose = () => {
      const viewportWidth = window.innerWidth;
      const rect = frame.getBoundingClientRect();
      const travel = window.innerHeight + rect.height;
      const progress = clamp((window.innerHeight - rect.top) / travel);

      // Spend the whole pan while the frame is actually on screen.
      video.style.objectPosition = `${stage(progress, 0.18, 0.82) * 100}% 50%`;

      mobileBanner.style.transform = `translate3d(${lerp(
        viewportWidth,
        -mobileBanner.offsetWidth,
        progress,
      )}px, -50%, 0)`;
    };

    const draw = () => {
      queued = 0;
      if (pinned.matches) drawPinned();
      else drawLoose();
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

      if (stillness.matches) return;

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
      data-header-theme={skin.headerTheme}
      className={`relative ${skin.section} lg:h-[300svh] motion-reduce:lg:h-auto`}
    >
      <div className="sticky top-0 flex min-h-[100svh] flex-col overflow-hidden lg:block lg:h-[100svh]">
        <div
          ref={introRef}
          className="relative z-10 flex flex-col justify-end gap-7 px-6 pb-10 pt-28 sm:gap-10 sm:px-10 sm:pb-14 sm:pt-32 lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2 lg:pb-16 lg:pt-40"
        >
          <p className={`tracking-brand text-[0.6875rem] uppercase ${skin.muted}`}>
            Odontologia estética e restauradora
          </p>

          <h1 className="max-w-[13ch] font-display text-[clamp(3rem,6.6vw,6rem)] font-normal leading-[0.95]">
            sorrir é sempre{" "}
            <span className={`italic ${skin.accent}`}>uma boa ideia</span>
          </h1>

          <div
            className={`flex flex-col gap-8 border-t ${skin.rule} pt-8 sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-start`}
          >
            <p className={`max-w-[34ch] text-[0.9375rem] leading-relaxed ${skin.muted}`}>
              Cada plano de tratamento começa pela leitura do seu rosto —
              proporção, luz e expressão antes de qualquer procedimento.
            </p>
            <span className={`tracking-brand shrink-0 text-[0.6875rem] uppercase ${skin.muted}`}>
              Role para conhecer
            </span>
          </div>
        </div>

        {/* Opens from one panel of the triptych to the full frame. */}
        <div
          ref={frameRef}
          className="relative h-[100svh] w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[59.31svh]"
        >
          {/* Decorative: the browser otherwise offers picture-in-picture and
              hover playback controls over any video this size, which is not a
              choice this footage should present. */}
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            poster={POSTER}
            aria-hidden
            tabIndex={-1}
            disablePictureInPicture
            disableRemotePlayback
            controlsList="nodownload noplaybackrate noremoteplayback"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          >
            {SOURCES.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
          </video>

          <div
            ref={veilRef}
            aria-hidden
            className={`absolute inset-0 ${skin.veil} opacity-30 lg:opacity-0`}
          />

          {/* Keeps the header legible wherever the frame reaches under it. */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: skin.gradient }}
          />

          <span
            ref={mobileBannerRef}
            className={`pointer-events-none absolute left-0 top-1/2 block whitespace-nowrap font-display text-[clamp(2.5rem,13vw,4.5rem)] italic leading-none ${skin.banner} lg:hidden`}
          >
            seu sorriso, no seu tempo
          </span>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden items-center lg:flex">
          <span
            ref={bannerRef}
            className={`block whitespace-nowrap font-display text-[clamp(3rem,9vw,8rem)] italic leading-none opacity-0 ${skin.banner}`}
          >
            seu sorriso, no seu tempo
          </span>
        </div>
      </div>
    </section>
  );
}
