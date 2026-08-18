import Image from "next/image";
import { Preloader } from "@/components/preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <main className="flex flex-1 flex-col items-center justify-center bg-white">
        <Image
          src="/logos/logoescura-drathaianelessa.png"
          alt="Dra. Thaiane Lessa, Cirurgiã-Dentista"
          width={220}
          height={275}
          priority
        />
      </main>
    </>
  );
}
