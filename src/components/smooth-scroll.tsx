"use client";

import Lenis from "lenis";
import { useEffect } from "react";

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
    const stillness = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let frame = 0;

    const start = () => {
      if (lenis || stillness.matches) return;

      lenis = new Lenis({
        // Catch-up factor per frame: enough to smooth the steps, high enough
        // that the page still feels attached to the wheel.
        lerp: 0.1,
        wheelMultiplier: 1,
        // Touch devices already ease their own scrolling; doubling it feels wrong.
        syncTouch: false,
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
      lenis = null;
    };

    const sync = () => {
      if (stillness.matches) stop();
      else start();
    };

    sync();
    stillness.addEventListener("change", sync);
    return () => {
      stillness.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return null;
}
