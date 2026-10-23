import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

/**
 * Any address the site does not have. Header and footer come from the root
 * layout; the type is the hero's, so a wrong link still lands on the brand.
 */
export default function NotFound() {
  return (
    <main
      data-header-theme="light"
      className="flex flex-1 flex-col justify-center bg-light-base text-dark-base"
    >
      <div className="mx-auto w-full max-w-[78rem] px-6 pb-20 pt-32 sm:px-10 sm:pb-28 sm:pt-40">
        <span className="text-forest-900">
          <BrandMark height={48} />
        </span>

        <p className="tracking-brand mt-12 text-[0.6875rem] uppercase text-dark-base/70">Erro 404</p>

        <h1 className="mt-5 max-w-[13ch] font-display text-[clamp(3rem,6.6vw,6rem)] font-normal leading-[0.95]">
          Esta página <span className="italic text-forest-700">não existe</span>
        </h1>

        <p className="mt-8 max-w-[34ch] text-[1.0625rem] leading-[1.65] text-dark-base/85">
          O endereço pode ter mudado ou ter sido digitado com algum erro.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex min-h-11 items-center text-[1.0625rem] underline underline-offset-4 pointer-fine:min-h-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark-base"
        >
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
