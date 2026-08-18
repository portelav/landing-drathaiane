"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <motion.div layoutId="brand-mark" style={{ width: 32, height: 35 }}>
            <Image
              src="/logos/monograma-escuro.png"
              alt="Dra. Thaiane Lessa"
              width={32}
              height={35}
            />
          </motion.div>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm tracking-[0.15em]">DRA. THAIANE LESSA</span>
            <span className="text-[10px] tracking-[0.2em] text-black/60">
              CIRURGIÃ-DENTISTA
            </span>
          </span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm tracking-wide">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-black no-underline transition-colors hover:text-brand-green"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <a href="tel:+5500000000000" className="text-sm tracking-wide text-black no-underline">
            (00) 00000-0000
          </a>
          <a
            href="#contato"
            className="rounded-full bg-brand-green px-5 py-2 text-sm text-white transition-colors hover:bg-black"
          >
            Agendar consulta
          </a>
        </div>

        <button
          type="button"
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-6 bg-black transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 bg-black transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <div className="border-t border-black/10 px-6 py-6 md:hidden">
          <ul className="flex flex-col gap-4 text-sm tracking-wide">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-black no-underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-4">
            <a href="tel:+5500000000000" className="text-sm tracking-wide text-black no-underline">
              (00) 00000-0000
            </a>
            <a
              href="#contato"
              onClick={() => setOpen(false)}
              className="rounded-full bg-brand-green px-5 py-2 text-center text-sm text-white"
            >
              Agendar consulta
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
