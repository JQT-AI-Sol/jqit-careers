import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHead, Kicker } from "@/components/ui/SectionHead";
import { StrengthGrid } from "@/components/sections/StrengthGrid";
import { Messages } from "@/components/sections/Messages";
import { Button } from "@/components/ui/Button";
import { CTA } from "@/components/sections/CTA";
import { company } from "@/lib/content";
import { asset } from "@/lib/asset";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "私たちについて",
  description:
    "JQITのミッション・事業（ITソリューション／AIソリューション）・強み・自社製品NOVAをご紹介します。",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      {/* Mission */}
      <section className="py-20 md:py-[120px]">
        <Container>
          <Kicker>Why JQIT</Kicker>
          <h1 className="mt-7 max-w-[820px] font-serif text-[28px] font-medium leading-[1.6] tracking-[0.03em] text-ink md:text-[44px]">
            {company.mission}
          </h1>
          <p className="mt-10 max-w-[820px] font-sans text-[15px] leading-[2.1] text-body">
            {company.missionBody}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {company.values.map((v) => (
              <span
                key={v}
                className="rounded-card border border-line px-4 py-2 font-sans text-[13px] text-ink"
              >
                {v}
              </span>
            ))}
          </div>
          <div className="relative mt-14 h-[280px] w-full overflow-hidden rounded-2xl md:h-[420px]">
            <Image
              src={asset("/images/about/team.jpg")}
              alt="モダンなオフィスで協働するメンバー"
              fill
              sizes="(max-width: 768px) 100vw, 1096px"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      {/* Message（代表＋部門リーダー） */}
      <Messages />

      {/* Business */}
      <section className="bg-cream py-20 md:py-[120px]">
        <Container>
          <SectionHead kicker="Business" title="事業について" />
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
            {company.businesses.map((b) => (
              <div key={b.name} className="bg-paper p-9 md:p-12">
                <h3 className="font-serif text-[22px] font-medium text-ink">
                  {b.name}
                </h3>
                <p className="mt-4 font-sans text-[14px] leading-[2] text-muted">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Strength */}
      <section className="py-20 md:py-[120px]">
        <Container>
          <SectionHead
            kicker="Our Strength"
            title="4つの専門領域"
            lead="開発・インフラ・QA・AI。確かな技術力と日本品質で価値を生みます。"
          />
          <StrengthGrid />
        </Container>
      </section>

      {/* Product NOVA */}
      <section className="bg-ink py-20 text-white md:py-[120px]">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <Kicker>Our Product</Kicker>
              <h2 className="mt-6 font-serif text-[30px] font-medium text-white md:text-[40px]">
                {company.product.name}
              </h2>
              <p className="mt-5 max-w-[560px] text-pretty font-sans text-[15px] leading-[2] text-[#c9c9c4] [word-break:auto-phrase]">
                {company.product.body}
              </p>
              <div className="mt-9">
                <Button href={site.novaUrl} variant="primary">
                  製品サイトを見る
                </Button>
              </div>
            </div>
            <div className="relative flex h-[300px] w-full items-center overflow-hidden rounded-2xl border border-white/10 bg-white md:h-[400px]">
              <Image
                src={asset("/images/products/nova-pc-crop.png")}
                alt="NOVA管理画面のスクリーンショット"
                fill
                sizes="(max-width: 768px) 100vw, 540px"
                className="object-contain"
              />
            </div>
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
