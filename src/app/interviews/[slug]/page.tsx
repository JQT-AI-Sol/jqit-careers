import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { interviews, type Interview } from "@/lib/content";
import { asset } from "@/lib/asset";

// 顔の写らない抽象画像（m1〜m6）を一覧上の並びで循環利用。
// Members.tsx のカード画像と同じ index ロジックで、一覧↔詳細の絵柄を一致させる。
const memberImages = [
  "/images/members/m1.jpg",
  "/images/members/m3.jpg",
  "/images/members/m5.jpg",
  "/images/members/m2.jpg",
  "/images/members/m4.jpg",
  "/images/members/m6.jpg",
];

function imageFor(index: number) {
  return memberImages[index % memberImages.length];
}

export async function generateStaticParams() {
  return interviews.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = interviews.find((m) => m.slug === slug);
  if (!member) return { title: "社員インタビュー" };
  return {
    title: member.title,
    description: member.excerpt,
  };
}

type Block = { kicker: string; heading: string; body: string };

export default async function InterviewDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = interviews.findIndex((m) => m.slug === slug);
  if (index === -1) notFound();

  const member = interviews[index] as Interview;
  const prev = index > 0 ? interviews[index - 1] : null;
  const next = index < interviews.length - 1 ? interviews[index + 1] : null;

  const blocks = [
    { kicker: "Why JQIT", heading: "入社のきっかけ", body: member.reason },
    { kicker: "My Work", heading: "いまの仕事", body: member.work },
    { kicker: "Growth", heading: "成長と変化", body: member.growth },
    { kicker: "Message", heading: "挑戦するあなたへ", body: member.message },
  ].filter((b): b is Block => Boolean(b.body));

  return (
    <article>
      {/* キービジュアル */}
      <section className="pt-10 md:pt-16">
        <Container>
          <FadeIn>
            <Link
              href="/interviews"
              className="font-mono text-[12px] tracking-[0.12em] text-muted uppercase transition-colors hover:text-brand"
            >
              ← Members
            </Link>
          </FadeIn>
          <FadeIn className="mt-6">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-card bg-ink">
              <Image
                src={asset(imageFor(index))}
                alt=""
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1160px"
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />
              <span
                aria-hidden
                className="absolute top-5 left-7 font-serif text-7xl leading-none text-white/40 md:text-8xl"
              >
                &ldquo;
              </span>
              <div className="absolute bottom-7 left-7 right-7">
                <span className="font-mono text-[11px] tracking-[0.18em] text-brand uppercase md:text-[13px]">
                  {member.role}
                </span>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="font-serif text-4xl tracking-[0.08em] text-white md:text-5xl">
                    {member.name}
                  </span>
                  {member.dept && (
                    <span className="font-mono text-[11px] tracking-[0.12em] text-white/75 uppercase">
                      {member.dept}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* 見出し（インタビュー引用＋経歴） */}
      <section className="pt-12 md:pt-16">
        <Container>
          <FadeIn className="max-w-[820px]">
            <h1 className="font-serif text-[27px] font-medium leading-[1.6] tracking-[0.02em] text-ink md:text-[40px]">
              {member.title}
            </h1>
            {member.career && (
              <p className="mt-6 font-mono text-[13px] tracking-[0.08em] text-muted">
                {member.career}
              </p>
            )}
          </FadeIn>
        </Container>
      </section>

      {/* 本文セクション */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto flex max-w-[820px] flex-col gap-14 md:gap-20">
            {blocks.map((b, i) => (
              <FadeIn
                key={b.heading}
                style={
                  { transitionDelay: `${i * 60}ms` } as React.CSSProperties
                }
              >
                <div className="border-l-2 border-brand/30 pl-6 md:pl-9">
                  <Kicker>{b.kicker}</Kicker>
                  <h2 className="mt-4 font-serif text-[21px] font-medium leading-[1.6] text-ink md:text-[26px]">
                    {b.heading}
                  </h2>
                  <p className="mt-5 font-sans text-[15px] leading-[2.05] text-body md:text-[16px]">
                    {b.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* 前後ナビ */}
      {(prev || next) && (
        <section className="border-t border-line">
          <Container>
            <nav className="grid grid-cols-1 gap-px md:grid-cols-2">
              {prev ? (
                <Link
                  href={`/interviews/${prev.slug}`}
                  className="group flex flex-col gap-2 py-9 transition-colors hover:bg-cream md:pr-10"
                >
                  <span className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                    ← Prev
                  </span>
                  <span className="font-serif text-[16px] leading-[1.6] text-ink transition-colors group-hover:text-brand">
                    {prev.name}・{prev.title}
                  </span>
                </Link>
              ) : (
                <span className="hidden md:block" />
              )}
              {next && (
                <Link
                  href={`/interviews/${next.slug}`}
                  className="group flex flex-col items-start gap-2 py-9 transition-colors hover:bg-cream md:items-end md:pl-10 md:text-right"
                >
                  <span className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                    Next →
                  </span>
                  <span className="font-serif text-[16px] leading-[1.6] text-ink transition-colors group-hover:text-brand">
                    {next.name}・{next.title}
                  </span>
                </Link>
              )}
            </nav>
          </Container>
        </section>
      )}

      {/* 末尾CTA */}
      <section className="bg-cream py-[88px] text-center md:py-[120px]">
        <Container>
          <div className="flex justify-center">
            <Kicker>Join Us</Kicker>
          </div>
          <h2 className="mt-6 font-serif text-[26px] font-medium leading-[1.6] tracking-[0.03em] text-ink md:text-[38px]">
            次は、あなたの
            <span className="text-brand">成長ストーリー</span>を。
          </h2>
          <p className="mt-6 font-sans text-[15px] text-muted">
            未経験からでも、経験者でも。まずはカジュアル面談からお気軽に。
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Button href="/entry" variant="primary">
              エントリーする
            </Button>
            <Button href="/interviews" variant="arrow">
              一覧に戻る
            </Button>
          </div>
        </Container>
      </section>
    </article>
  );
}
