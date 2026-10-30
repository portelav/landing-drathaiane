import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SITE_URL } from "@/lib/site";
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

const TITLE = "Dra. Thaiane Lessa | Cirurgiã-Dentista em Maceió";
const DESCRIPTION =
  "Cirurgiã-dentista em Maceió, CRO/AL-6418. Conheça a Dra. Thaiane Lessa, veja como é a primeira consulta e como chegar ao consultório.";

export const metadata: Metadata = {
  // Link previews and the canonical need absolute URLs (PRD, D49).
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  // The preview image (opengraph-image.jpg, beside this file) carries name,
  // profession and CRO, because a shared link travels without the page.
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Dra. Thaiane Lessa",
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  // Indexed since her sign-off on the finished site (PRD, D51). The 404 keeps
  // the noindex Next.js gives every not-found page.
};

export const viewport: Viewport = {
  // light-base, the ground the page opens on.
  themeColor: "#f4f2ee",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`h-full antialiased ${instrumentSerif.variable} ${interTight.variable}`}
    >
      {/* min-h-svh, not min-h-full: Lenis sets html to height: auto, which
          leaves a percentage nothing to resolve against, and a short page
          (the 404) then stops short of the bottom of the screen. */}
      <body className="min-h-svh flex flex-col font-sans">
        <SmoothScroll />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
