import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dra. Thaiane Lessa | Cirurgiã-Dentista",
  description: "Dra. Thaiane Lessa, cirurgiã-dentista.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
