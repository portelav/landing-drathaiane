import type { Metadata } from "next";
import { preload } from "react-dom";
import { About } from "@/components/about";
import { AboutText } from "@/components/about-text";
import { AboutTimeline } from "@/components/about-timeline";
import { ContactSection } from "@/components/contact-section";
import { ServicesSection } from "@/components/services-section";
import { Hero } from "@/components/hero";
import { Preloader } from "@/components/preloader";
import { HERO_POSTER } from "@/lib/media";
import { PRACTICE_JSON_LD } from "@/lib/structured-data";

// On the home only: the 404 is not a page to point search engines at.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  // The hero's poster is the first paint on every screen size (LCP), so it
  // goes out ahead of the scripts and the footage instead of sharing the line.
  preload(HERO_POSTER, { as: "image", fetchPriority: "high", type: "image/webp" });

  return (
    <>
      <script
        type="application/ld+json"
        // `<` escaped so no string in the data can close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PRACTICE_JSON_LD).replace(/</g, "\\u003c") }}
      />
      <Preloader />
      <main className="flex min-h-screen flex-1 flex-col">
        <Hero />
        <About />
        <AboutText />
        <AboutTimeline />
        <ServicesSection />
        <ContactSection />
      </main>
    </>
  );
}
