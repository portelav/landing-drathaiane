import { About } from "@/components/about";
import { Hero } from "@/components/hero";
import { Preloader } from "@/components/preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <main className="flex min-h-screen flex-1 flex-col">
        <Hero />
        <About />
      </main>
    </>
  );
}
