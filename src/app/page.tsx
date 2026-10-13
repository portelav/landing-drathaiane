import { preload } from "react-dom";
import { About } from "@/components/about";
import { AboutText } from "@/components/about-text";
import { AboutTimeline } from "@/components/about-timeline";
import { ContactSection } from "@/components/contact-section";
import { Hero } from "@/components/hero";
import { Preloader } from "@/components/preloader";
import { HERO_POSTER } from "@/lib/media";

export default function Home() {
  // The hero's poster is the first paint on every screen size (LCP), so it
  // goes out ahead of the scripts and the footage instead of sharing the line.
  preload(HERO_POSTER, { as: "image", fetchPriority: "high", type: "image/webp" });

  return (
    <>
      <Preloader />
      <main className="flex min-h-screen flex-1 flex-col">
        <Hero />
        <About />
        <AboutText />
        <AboutTimeline />
        <ContactSection />
      </main>
    </>
  );
}
