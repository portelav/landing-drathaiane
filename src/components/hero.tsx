"use client";

import { useEffect, useRef } from "react";
import { HERO_POSTER } from "@/lib/media";
import { useLoopWhileVisible, VideoToggle } from "./video-toggle";

/** VP9 for browsers that decode it, H.264 at level 4.0 for everything else. */
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
    muted: "text-light-base/70",
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
    muted: "text-dark-base/70",
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
const PANEL_WIDTH = 1 / 3;
const FRAME_ASPECT = 16 / 9;
const WINDOW_START = PANEL_WIDTH * FRAME_ASPECT;

/**
 * Below this the opening cannot happen: framing one panel needs a window of
 * `0.5931 × height`, which on a phone is wider than the screen itself. There
 * is nothing left to reveal, so narrow screens get the full frame from the
 * start and keep only the line crossing it.
 *
 * The test is the ratio itself, never a pixel count — a 900×700 window has
 * room to spare while a tall phone never does, however many pixels across it
 * is. 427/720 is WINDOW_START as an exact fraction; the `wide:` variant in
 * `globals.css` carries the same number for the layout that follows it.
 */
const OPENS_ABOVE = "(min-aspect-ratio: 427/720)";

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

/** Maps scroll progress to a stage's own 0..1 range. */
const stage = (progress: number, from: number, to: number) =>
  clamp((progress - from) / (to - from));

export function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const runwayRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLSpanElement>(null);
  const mobileBannerRef = useRef<HTMLSpanElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Decorative playback: the poster carries the first paint, and the video
  // loops only while it is on screen and the visitor has not stopped it.
  const playback = useLoopWhileVisible(videoRef);

  // Scroll-driven reveal. Everything animated here is absolutely positioned, so
  // resizing the window costs no reflow of the page around it.
  useEffect(() => {
    const wrap = wrapRef.current;
    const frame = frameRef.current;
    const track = runwayRef.current;
    const intro = introRef.current;
    const banner = bannerRef.current;
    const mobileBanner = mobileBannerRef.current;
    const veil = veilRef.current;
    const video = videoRef.current;
    if (!wrap || !frame || !track || !intro || !banner || !mobileBanner || !veil || !video) return;

    const pinned = window.matchMedia(OPENS_ABOVE);
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

      // One panel is `0.5931 × height` wide, which on a squarer screen is most
      // of it — the opening text would have to start on top of the footage.
      // Ceding half the width keeps the two apart; the frame then starts inside
      // the centre panel rather than exactly on it, which costs the precise
      // framing and saves the headline. Above a 1.186 ratio the panel is the
      // smaller of the two and nothing changes.
      const start = Math.min(viewportHeight * WINDOW_START, viewportWidth / 2);
      frame.style.width = `${lerp(start, viewportWidth, opening)}px`;

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
     * Narrow screens: the frame is already full width, so there is no window
     * to open. It still holds the screen like the wide layout does, though —
     * `track` is taller than the viewport and the frame sticks inside it — and
     * the line crosses it while it is held.
     *
     * A full-height frame on a phone crops to roughly a quarter of the source,
     * which is narrower than a single panel. So instead of opening outwards the
     * crop pans across the triptych: the three panels arrive one after another
     * rather than all at once, and the line drifts against them.
     */
    const drawLoose = () => {
      const viewportWidth = window.innerWidth;
      const rect = track.getBoundingClientRect();
      const held = rect.height - frame.clientHeight;
      const progress = held > 0 ? clamp(-rect.top / held) : 0;

      // Spend the whole pan while the frame is held.
      video.style.objectPosition = `${stage(progress, 0.05, 0.95) * 100}% 50%`;

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
      className={`relative ${skin.section} wide:h-[300svh] motion-reduce:wide:h-auto`}
    >
      <div className="flex min-h-[100svh] flex-col wide:sticky wide:top-0 wide:block wide:h-[100svh] wide:overflow-hidden">
        <div
          ref={introRef}
          className="relative z-10 flex flex-col justify-end gap-7 px-6 pb-10 pt-28 sm:gap-10 sm:px-10 sm:pb-14 sm:pt-32 wide:absolute wide:inset-y-0 wide:left-0 wide:w-1/2 wide:pb-16 wide:pt-40"
        >
          <p className={`tracking-brand text-[0.6875rem] uppercase ${skin.muted}`}>
            Odontologia estética e restauradora
          </p>

          <h1 className="max-w-[13ch] font-display text-[clamp(3rem,6.6vw,6rem)] font-normal leading-[0.95]">
            sorrir é sempre{" "}
            <span className={`italic ${skin.accent}`}>uma boa ideia</span>
          </h1>

          <div
            className={`flex flex-col gap-8 border-t ${skin.rule} pt-8 sm:flex-row sm:items-end sm:justify-between wide:flex-col wide:items-start`}
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

        {/* Narrow: the runway the frame sticks in while the triptych pans. It
            drops out of the layout on `wide:`, where the stage above sticks. */}
        <div ref={runwayRef} className="h-[300svh] motion-reduce:h-auto wide:contents">
          {/* Opens from one panel of the triptych to the full frame. As tall
              as the screen with the browser bars collapsed (`lvh`): at `svh`
              it stops short once Safari tucks its toolbar away mid-scroll,
              and the section's cream shows in the gap. */}
          <div
            ref={frameRef}
            className="sticky top-0 h-[100lvh] w-full overflow-hidden wide:absolute wide:inset-y-0 wide:right-0 wide:h-auto wide:w-[min(59.31svh,50vw)]"
          >
            {/* Decorative: the browser otherwise offers picture-in-picture and
                hover playback controls over any video this size, which is not a
                choice this footage should present. */}
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="none"
              poster={HERO_POSTER}
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
              className={`absolute inset-0 ${skin.veil} opacity-30 wide:opacity-0`}
            />
  
            {/* Keeps the header legible wherever the frame reaches under it. */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: skin.gradient }}
            />
  
            <span
              ref={mobileBannerRef}
              className={`pointer-events-none absolute left-0 top-1/2 block whitespace-nowrap font-display text-[clamp(2.5rem,13vw,4.5rem)] italic leading-none ${skin.banner} wide:hidden`}
            >
              seu sorriso, no seu tempo
            </span>
  
            {playback.playable && (
              <VideoToggle
                paused={playback.paused}
                onToggle={playback.toggle}
                subject="do consultório"
              />
            )}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden items-center wide:flex">
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
