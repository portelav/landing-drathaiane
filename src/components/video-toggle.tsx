"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

/** Share of the video that has to be on screen before it plays. */
const VISIBLE = 0.4;

/**
 * Loops a decorative video for as long as it is on screen, and only then — a
 * forever loop scrolled past is spent battery. Anything that moves on its own
 * for more than five seconds also needs a way to stop it (WCAG 2.2.2), so the
 * visitor's own pause outranks being on screen until they lift it.
 *
 * Reduced motion keeps the poster, and so does a browser that refuses to play
 * (low power mode, data saver). `playable` stays false in both: a pause button
 * for something that never moved would only be noise.
 */
export function useLoopWhileVisible(videoRef: RefObject<HTMLVideoElement | null>) {
  const [playable, setPlayable] = useState(false);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const syncRef = useRef<() => void>(() => {});

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const stillness = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let attempts = 0;

    const attempt = () => {
      if (stillness.matches || !visible || pausedRef.current) return;
      video.play().catch(() => {
        // Some browsers refuse until enough data has arrived. Try again once
        // it has, a couple of times; past that the refusal is a real policy
        // and the poster is the right answer.
        if (attempts++ < 3) video.addEventListener("canplay", attempt, { once: true });
      });
    };

    const sync = () => {
      if (stillness.matches) {
        video.pause();
        video.currentTime = 0;
        setPlayable(false);
        // The button leaves with the motion. A pause kept past this point
        // would outlive its own control once the preference is lifted.
        pausedRef.current = false;
        setPaused(false);
      } else if (!visible || pausedRef.current) {
        video.pause();
      } else {
        attempts = 0;
        attempt();
      }
    };
    syncRef.current = sync;

    const onPlaying = () => setPlayable(true);

    // Both thresholds, because the ratio is what decides: an entry can still
    // be intersecting on its way out, with far less than the share on screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.intersectionRatio >= VISIBLE;
        sync();
      },
      { threshold: [0, VISIBLE] },
    );

    video.addEventListener("playing", onPlaying);
    stillness.addEventListener("change", sync);
    observer.observe(video);

    return () => {
      observer.disconnect();
      stillness.removeEventListener("change", sync);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("canplay", attempt);
    };
  }, [videoRef]);

  const toggle = useCallback(() => {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
    syncRef.current();
  }, []);

  return { playable, paused, toggle };
}

type VideoToggleProps = {
  paused: boolean;
  onToggle: () => void;
  /** Completes "Pausar o vídeo …", e.g. "do consultório". */
  subject: string;
};

/**
 * The pause control for a looping video, set in the video's bottom-right
 * corner. A 32 px square reads as quiet over footage; the button around it
 * keeps the full 44 px touch target. Square, like the rest of the page — the
 * only rounding on the site belongs to the header's social buttons and the
 * timeline's markers.
 */
export function VideoToggle({ paused, onToggle, subject }: VideoToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`${paused ? "Reproduzir" : "Pausar"} o vídeo ${subject}`}
      className="group absolute bottom-2 right-2 flex h-11 w-11 items-center justify-center focus-visible:outline-none"
    >
      <span className="flex h-8 w-8 items-center justify-center bg-light-base text-dark-base opacity-80 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 group-focus-visible:outline-2 group-focus-visible:-outline-offset-4 group-focus-visible:outline-dark-base">
        <svg aria-hidden viewBox="0 0 12 12" className="h-3 w-3" fill="currentColor">
          {paused ? (
            <path d="M3 1.5v9l7.5-4.5z" />
          ) : (
            <>
              <rect x="2" y="1.5" width="2.75" height="9" />
              <rect x="7.25" y="1.5" width="2.75" height="9" />
            </>
          )}
        </svg>
      </span>
    </button>
  );
}
