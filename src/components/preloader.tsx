"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), reduce ? 300 : 1400);
    return () => clearTimeout(timer);
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.15 : 0.5, ease: EASE_IN_OUT }}
        >
          <motion.div
            initial={{ opacity: 0, transform: "scale(0.95)" }}
            animate={{ opacity: 1, transform: "scale(1)" }}
            transition={{ duration: reduce ? 0.15 : 0.6, ease: EASE_OUT }}
          >
            <Image
              src="/logos/monograma-claro.png"
              alt="Dra. Thaiane Lessa"
              width={72}
              height={80}
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
