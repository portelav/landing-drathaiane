"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const STILLNESS = "(prefers-reduced-motion: reduce)";

/**
 * Whether the visitor asked for no motion. Here the markup depends on it —
 * words wrapped for the reveal or plain text — so the server has to render the
 * same thing the first client render does. `useReducedMotion` reads the
 * media query on the client's first render and fails hydration; the server
 * snapshot below keeps both renders equal and the real value lands right after.
 */
function useStillness() {
  return useSyncExternalStore(
    (notify) => {
      const query = window.matchMedia(STILLNESS);
      query.addEventListener("change", notify);
      return () => query.removeEventListener("change", notify);
    },
    () => window.matchMedia(STILLNESS).matches,
    () => false,
  );
}

/**
 * Entry-triggered, once, and then still.
 *
 * Everything else on this page is driven by scroll, and text driven by scroll
 * hijacks the reading pace — the words react to the finger instead of waiting
 * for the eye. This is the one moment on the site where something animates and
 * stops. The silence afterwards is the effect, not the absence of one.
 *
 * Each block carries its own trigger rather than the column carrying one for
 * all of them. Fired together, the whole section is over before a reader
 * scrolling at any normal pace reaches the first paragraph — the animation
 * exists but nobody sees it. Block by block, the reader never arrives at
 * something that already finished.
 *
 * `whileInView` runs on IntersectionObserver, so no scroll listener is
 * registered here at all.
 */
const VIEWPORT = { once: true, amount: 0.25 } as const;

/** Gap between one line and the next as it rises. */
const LINE_STEP = 0.07;

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Lines rise from under a mask. Per line, never per letter — letter by letter
 * inside a paragraph is unreadable.
 */
const RISE = {
  hidden: { y: "110%" },
  shown: (line: number) => ({
    y: "0%",
    transition: {
      duration: 0.8,
      delay: line * LINE_STEP,
      ease: EASE,
    },
  }),
};

const EYEBROW = "Sobre";
const NAME = "Dra. Thaiane Lessa";

const PARAGRAPHS = [
  "Escolhi dentística ainda na faculdade. Sempre gostei de detalhes e de trabalho manual, de desenhar — e dentística é onde isso vira resultado na boca de alguém. Um caso que conduzi na graduação chamou a atenção da liga de dentística, e foi ali que entendi que era esse o caminho.",
  "A primeira consulta é sem pressa. Faço uma anamnese detalhada e procuro entender seus hábitos, porque é deles que a boca costuma falar. Faço fotografias intraorais para te mostrar o que estou vendo, com as suas imagens. Limpeza, profilaxia e a higienização explicada passo a passo: qual escova, qual creme dental, para o seu caso. O básico precisa ser dito. Só depois disso a gente planeja.",
  "Concluí a especialização em dentística e emendei o mestrado — uma para voltar o olhar à clínica, o outro para entender o porquê de cada coisa que eu já fazia. Desde 2025 integro o grupo de creators da Ivoclar. Estética e saúde não existem uma sem a outra, e caso que dura é caso planejado e acompanhado. Trabalho melhor com tempo, sem relógio apitando para o próximo paciente. Quando você sair daqui, quero que se sinta cuidada nos detalhes que muitos dentistas consideram óbvios, e segura do planejamento que fizemos juntos.",
];

/**
 * Which visual line each word ended up on, counted across the whole column.
 *
 * A line only exists after layout, so it has to be measured: words sharing an
 * `offsetTop` share a line. Re-measured once the webfonts land, since they
 * change where the text breaks, and on resize for the same reason.
 */
function useLineIndices(container: React.RefObject<HTMLElement | null>, enabled: boolean) {
  const [lines, setLines] = useState<number[]>([]);

  useEffect(() => {
    const element = container.current;
    if (!element || !enabled) return;

    let current = "";

    const measure = () => {
      const words = element.querySelectorAll<HTMLElement>("[data-word]");
      let line = -1;
      let previousTop = Number.NaN;

      const next = Array.from(words, (word) => {
        const top = word.offsetTop;
        if (top !== previousTop) {
          line += 1;
          previousTop = top;
        }
        return line;
      });

      // The observer fires on every reflow, including the ones this state
      // change causes. Only a different set of breaks is worth a render.
      const key = next.join(",");
      if (key === current) return;
      current = key;
      setLines(next);
    };

    measure();
    document.fonts?.ready.then(measure).catch(() => {});

    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [container, enabled]);

  return lines;
}

/** One word, masked by its own overflow box so it can rise from under the line. */
function Word({ children, line }: { children: string; line: number }) {
  return (
    <>
      {/* The padding extends the visible box past the baseline, so descenders
          are not shaved off once the word has settled. */}
      <span
        data-word
        className="inline-block overflow-hidden pb-[0.18em] align-bottom -mb-[0.18em]"
      >
        <motion.span className="inline-block" variants={RISE} custom={line}>
          {children}
        </motion.span>
      </span>{" "}
    </>
  );
}

export function AboutText() {
  const reduce = useStillness();
  const columnRef = useRef<HTMLDivElement>(null);
  const lines = useLineIndices(columnRef, !reduce);

  // Running index across every block, so `lines` can stay one flat list. Each
  // block's delays count from its own first line, because each block waits for
  // its own turn — carrying the column's running total would leave the last
  // paragraph pausing a second before it moved.
  let cursor = 0;
  const take = (text: string) => {
    const first = lines[cursor] ?? 0;
    return text.split(" ").map((word) => {
      const key = cursor++;
      return { word, key, line: (lines[key] ?? 0) - first };
    });
  };

  const eyebrow = take(EYEBROW);
  const name = take(NAME);
  const paragraphs = PARAGRAPHS.map(take);

  const reveal = reduce
    ? {}
    : { initial: "hidden" as const, whileInView: "shown" as const, viewport: VIEWPORT };

  return (
    <section data-header-theme="light" className="bg-light-base text-dark-base">
      <div className="mx-auto max-w-[78rem] px-6 py-24 sm:px-10 sm:py-32">
        {/* Offset rather than centred. Only horizontal room decides this, which
            is the one question a width breakpoint answers correctly — unlike
            the band above, where the photo's height sets its width. */}
        <div ref={columnRef} className="lg:ml-[14%] xl:ml-[22%]">
          {/* The label and the name arrive as one unit: they are a few
              centimetres apart and separate triggers would fire together
              anyway. */}
          <motion.div {...reveal}>
            <p className="tracking-brand text-[0.6875rem] uppercase text-dark-base/70">
              {reduce
                ? EYEBROW
                : eyebrow.map((item) => (
                    <Word key={item.key} line={item.line}>
                      {item.word}
                    </Word>
                  ))}
            </p>

            {/* The page's only other heading is the hero's `h1`. */}
            <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(2.25rem,4.6vw,3.75rem)] font-normal leading-[1.06]">
              {reduce
                ? NAME
                : name.map((item) => (
                    <Word key={item.key} line={item.line}>
                      {item.word}
                    </Word>
                  ))}
            </h2>
          </motion.div>

          {/* No photo beside this. The block exists to be read, and an image
              here would compete with the large portrait directly above it. */}
          <div className="mt-10 flex max-w-[60ch] flex-col gap-6 text-[1.0625rem] leading-[1.65] text-dark-base/85 sm:mt-12 sm:gap-7">
            {paragraphs.map((words, index) => (
              <motion.p key={index} {...reveal}>
                {reduce
                  ? PARAGRAPHS[index]
                  : words.map((item) => (
                      <Word key={item.key} line={item.line}>
                        {item.word}
                      </Word>
                    ))}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
