import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

export const metadata: Metadata = {
  title: "Dra. Thaiane Lessa | Cirurgiã-Dentista",
  description: "Dra. Thaiane Lessa, cirurgiã-dentista.",
  // Preview only. The page still carries placeholder contact details, so it
  // must not be indexed under her professional name yet — drop this once the
  // real content lands.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`h-full antialiased ${instrumentSerif.variable} ${interTight.variable}`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SmoothScroll />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
