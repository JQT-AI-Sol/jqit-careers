import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/site";

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
    <html lang="ja" className="antialiased">
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
