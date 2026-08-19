"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { MARK_FLIGHT, MONOGRAM_PATH } from "./brand-mark";

const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;

const SPECIALTY_LINE = "Dentística Estética & Restauradora";

/**
 * One timeline, in seconds. The monogram draws, then fills top-down; the line
 * fills left-to-right on the same beat, so both finish together.
 */
const DRAW = 2;
const MARK_FILL_AT = 1.9;
const MARK_FILL = 1;
const LINE_IN_AT = 0.55;
const LINE_FILL_AT = 1.35;
const LINE_FILL = 1.55;
/** Both fills land at 2.9s, so hold no longer than that or the screen freezes. */
const HOLD_MS = 2900;

/** Faint enough to be a whisper, bright enough to be read once filled. */
const LINE_DIM = "rgba(244, 242, 238, 0.2)";
const LINE_LIT = "rgba(244, 242, 238, 0.78)";

export function Preloader() {
  const [visible, setVisible] = useState(true);
  // Server-side this reads null, client-side the real media query. It only ever
  // feeds transition timings, never markup, so the two renders still match.
  const reduce = !!useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), reduce ? 300 : HOLD_MS);
    return () => clearTimeout(timer);
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.15 : MARK_FLIGHT, ease: EASE_IN_OUT }}
        >
          <motion.div
            layoutId="brand-mark"
            className="relative"
            style={{ width: 150, height: 166 }}
            transition={{ duration: reduce ? 0.15 : MARK_FLIGHT, ease: EASE_IN_OUT }}
          >
            <svg
              viewBox="0 0 480 530"
              width={150}
              height={166}
              className="absolute inset-0"
              aria-label="Dra. Thaiane Lessa"
            >
              <motion.path
                d={MONOGRAM_PATH}
                fillRule="evenodd"
                fill="none"
                stroke="#ffffff"
                strokeWidth={6}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: reduce ? 0.15 : DRAW, ease: EASE_IN_OUT }}
              />
            </svg>

            <motion.div
              className="absolute inset-0"
              initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={
                reduce
                  ? { duration: 0.15 }
                  : { duration: MARK_FILL, delay: MARK_FILL_AT, ease: EASE_IN_OUT }
              }
            >
              <svg viewBox="0 0 480 530" width={150} height={166}>
                <path d={MONOGRAM_PATH} fillRule="evenodd" fill="#ffffff" stroke="none" />
              </svg>
            </motion.div>
          </motion.div>

          <motion.p
            className="tracking-brand absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-center text-[0.5625rem] uppercase sm:bottom-9 sm:text-[0.6875rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={
              reduce
                ? { duration: 0.15 }
                : { duration: 0.6, delay: LINE_IN_AT, ease: EASE_IN_OUT }
            }
          >
            <span style={{ color: LINE_DIM }}>{SPECIALTY_LINE}</span>

            {/* Same words, brighter, wiped in from the left. */}
            <motion.span
              aria-hidden
              className="absolute inset-0 whitespace-nowrap"
              style={{ color: LINE_LIT }}
              initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={
                reduce
                  ? { duration: 0.15 }
                  : { duration: LINE_FILL, delay: LINE_FILL_AT, ease: EASE_IN_OUT }
              }
            >
              {SPECIALTY_LINE}
            </motion.span>
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
