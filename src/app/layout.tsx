import type { Metadata } from "next";
import { Noto_Serif_JP, Noto_Sans_JP, Archivo, Anton } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/site";

const notoSerif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-serif",
  display: "swap",
  preload: false,
});

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans",
  display: "swap",
  preload: false,
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-archivo",
  display: "swap",
});

// ディスプレイ用：極太グロテスク。極薄の背景タイポ（Marquee）に存在感を与える。
const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} 採用サイト | 挑戦と革新で、未来を切り拓く`,
    template: `%s | ${site.name} 採用`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: `${site.name} 採用サイト`,
    title: `${site.name} 採用サイト`,
    description: site.description,
    locale: "ja_JP",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ja"
      className={`${notoSerif.variable} ${notoSans.variable} ${archivo.variable} ${anton.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only z-[100] rounded-card bg-paper px-4 py-3 font-sans text-sm font-bold text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:outline-2 focus:outline-brand"
        >
          本文へスキップ
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
