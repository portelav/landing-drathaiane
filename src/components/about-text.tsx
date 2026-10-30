"use client";

import { motion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getLenis } from "./smooth-scroll";

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
 * registered here at all. It plays even when the system asks for less motion
 * (PRD, D52).
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
  "Meu olhar é para os detalhes. Foi isso que me levou à dentística, porque é ali que eles se transformam em resultado no sorriso de alguém. Hoje atuo na clínica geral, com foco em dentística estética e restauradora.",
  "Reservo a primeira consulta para ouvir você com calma. Começo com uma anamnese detalhada e com a conversa sobre os seus hábitos, porque é deles que a boca costuma falar. Faço fotografias intraorais para te mostrar o que estou vendo. Explico a higienização passo a passo, inclusive qual escova e qual creme dental são indicados para o seu caso. O cuidado deve ser individualizado.",
  "Concluí a especialização em dentística e faço mestrado na área, para me aperfeiçoar cada vez mais. Desde 2025 faço parte do Ivoclar Creators, programa da Ivoclar, fabricante de materiais odontológicos, que reúne dentistas para produzir e compartilhar conteúdo educativo com colegas de profissão. Para mim, estética e saúde andam juntas, e caso que dura é caso planejado e acompanhado. Quero que a sua experiência aqui seja de cuidado em cada detalhe e de confiança no planejamento que fizemos juntos.",
];

/**
 * Which visual line each word ended up on, counted across the whole column.
 *
 * A line only exists after layout, so it has to be measured: words sharing an
 * `offsetTop` share a line. Re-measured once the webfonts land, since they
 * change where the text breaks, and on resize for the same reason.
 */
function useLineIndices(container: React.RefObject<HTMLElement | null>) {
  const [lines, setLines] = useState<number[]>([]);

  useEffect(() => {
    const element = container.current;
    if (!element) return;

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
  }, [container]);

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

/**
 * On a phone the column opens with the first paragraph only; the rest waits
 * behind "Leia mais", which then sits under the text as "Leia menos". Closing
 * pulls the text out from above the button, so the page is shifted back by
 * the same amount: the button stays under the finger with the first paragraph
 * right above it, instead of the reader landing in the middle of the next
 * section. Browsers with scroll anchoring have often done this already, hence
 * the measured correction rather than a fixed one.
 */
function useReadMore() {
  const [expanded, setExpanded] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const restRef = useRef<HTMLParagraphElement>(null);
  const toggleTop = useRef<number | null>(null);

  const toggle = () => {
    if (expanded) toggleTop.current = toggleRef.current?.getBoundingClientRect().top ?? null;
    setExpanded(!expanded);
  };

  useLayoutEffect(() => {
    if (expanded) {
      // A screen reader continues from the text that just opened, not from
      // the button that moved below it.
      restRef.current?.focus({ preventScroll: true });
      return;
    }

    const before = toggleTop.current;
    toggleTop.current = null;
    const button = toggleRef.current;
    if (before === null || !button) return;

    const shift = button.getBoundingClientRect().top - before;
    if (Math.abs(shift) < 1) return;

    const top = window.scrollY + shift;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(top, { immediate: true, force: true });
    else window.scrollTo({ top, behavior: "instant" });
  }, [expanded]);

  return { expanded, toggle, toggleRef, restRef };
}

export function AboutText() {
  const columnRef = useRef<HTMLDivElement>(null);
  const lines = useLineIndices(columnRef);
  const { expanded, toggle, toggleRef, restRef } = useReadMore();

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

  const reveal = { initial: "hidden" as const, whileInView: "shown" as const, viewport: VIEWPORT };

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
              {eyebrow.map((item) => (
                <Word key={item.key} line={item.line}>
                  {item.word}
                </Word>
              ))}
            </p>

            {/* The page's only other heading is the hero's `h1`. */}
            <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(2.25rem,4.6vw,3.75rem)] font-normal leading-[1.06]">
              {name.map((item) => (
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
              <motion.p
                key={index}
                {...reveal}
                id={index > 0 ? `about-more-${index}` : undefined}
                ref={index === 1 ? restRef : undefined}
                tabIndex={index === 1 ? -1 : undefined}
                // Hidden paragraphs never meet the viewport, so their line
                // reveal waits and plays the first time they open.
                className={`focus:outline-none ${index > 0 && !expanded ? "max-sm:hidden" : ""}`}
              >
                {words.map((item) => (
                  <Word key={item.key} line={item.line}>
                    {item.word}
                  </Word>
                ))}
              </motion.p>
            ))}
            <button
              ref={toggleRef}
              type="button"
              onClick={toggle}
              aria-expanded={expanded}
              aria-controls={PARAGRAPHS.slice(1)
                .map((_, index) => `about-more-${index + 1}`)
                .join(" ")}
              className="-mt-2 inline-flex min-h-11 cursor-pointer items-center self-start text-[0.9375rem] text-dark-base/70 underline decoration-dark-10 underline-offset-4 hover:text-dark-base hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark-base sm:hidden"
            >
              {expanded ? "Leia menos" : "Leia mais"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
