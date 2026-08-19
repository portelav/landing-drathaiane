import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
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
      </body>
    </html>
  );
}
