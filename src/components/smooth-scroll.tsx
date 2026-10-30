"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * The running Lenis, so a link can ask it to scroll instead of jumping. Null
 * before mount. On by design even when the system asks for less motion (PRD,
 * D52): without it the scroll-driven moments step instead of glide.
 */
let current: Lenis | null = null;

export function getLenis() {
  return current;
}

/**
 * Eases the page towards the scroll position instead of jumping to it. Without
 * this the pinned hero tracks the wheel one-to-one, which on Windows means a
 * stack of discrete jumps rather than a reveal.
 *
 * Lenis moves the real scroll position, so native `scroll` listeners and
 * `getBoundingClientRect` keep working — nothing else has to know it is here.
 */
export function SmoothScroll() {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let frame = 0;

    const start = () => {
      if (lenis) return;

      lenis = current = new Lenis({
        // Catch-up factor per frame: enough to smooth the steps, high enough
        // that the page still feels attached to the wheel.
        lerp: 0.1,
        wheelMultiplier: 1,
        // Touch devices already ease their own scrolling; doubling it feels wrong.
        syncTouch: false,
        // Lenis would turn its own easing off (lerp 1, every notch a jump) when
        // the system asks for less motion. The site glides either way (D52).
        respectReducedMotion: false,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    };

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      lenis?.destroy();
      lenis = current = null;
    };

    start();
    return stop;
  }, []);

  return null;
}
