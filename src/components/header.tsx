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
    <header className="sticky top-0 z-40">
      <div className="flex h-24">
        <div className="flex flex-1 items-center justify-between bg-white px-6 sm:px-10">
          <Link href="/" className="flex items-center gap-3">
            <motion.div layoutId="brand-mark" style={{ width: 32, height: 35 }}>
              <Image
                src="/logos/monograma-escuro.png"
                alt="Dra. Thaiane Lessa"
                width={32}
                height={35}
              />
            </motion.div>
            <span className="flex flex-col text-lg font-semibold leading-[1.1] tracking-tight">
              <span>Dra. Thaiane</span>
              <span>Lessa</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Abrir menu"
            className="flex items-center gap-2.5 text-sm"
          >
            <span className="flex flex-col gap-[3px]">
              <span className="h-px w-5 bg-black" />
              <span className="h-px w-5 bg-black" />
              <span className="h-px w-5 bg-black" />
            </span>
            Menu
          </button>
        </div>

        <div className="hidden flex-1 items-center justify-end gap-8 bg-brand-green px-10 text-white sm:flex">
          <a href="tel:+5500000000000" className="text-sm text-white no-underline">
            (00) 00000-0000
          </a>
          <a
            href="#contato"
            className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm text-black no-underline transition-colors hover:bg-black hover:text-white"
          >
            Agendar consulta
            <span aria-hidden>+</span>
          </a>
        </div>
      </div>

      {open && (
        <div className="border-t border-black/10 bg-white px-6 py-6 sm:px-10">
          <ul className="flex flex-col gap-4 text-base tracking-wide">
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
          <div className="mt-6 flex flex-col gap-4 sm:hidden">
            <a href="tel:+5500000000000" className="text-sm text-black no-underline">
              (00) 00000-0000
            </a>
            <a
              href="#contato"
              onClick={() => setOpen(false)}
              className="rounded-full bg-brand-green px-5 py-2 text-center text-sm text-white no-underline"
            >
              Agendar consulta
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
