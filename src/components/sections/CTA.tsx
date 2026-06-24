import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/SectionHead";
import { GeoBackdrop } from "@/components/ui/GeoBackdrop";

function ArrowIcon() {
  return (
    <svg
      width="20"
      height="10"
      viewBox="0 0 20 10"
      fill="none"
      aria-hidden
      className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1.5"
    >
      <path
        d="M0.75 5H18M13.5 1 18 5l-4.5 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Join Us：カジュアル面談（主）と本応募エントリー（従）の2つの入口を提示するCTA。
 * 各ボタンは見出し＋補足説明の2段構成で、選考のハードルの低さを伝える。
 */
export function CTA() {
  return (
    <section
      id="join"
      className="relative overflow-hidden bg-cream py-[88px] text-center md:py-[150px]"
    >
      <GeoBackdrop />
      <Container className="relative">
        <div className="flex justify-center">
          <Kicker>Join Us</Kicker>
        </div>
        <h2 className="mt-6 font-serif text-[28px] font-medium leading-[1.6] tracking-[0.03em] text-ink md:text-[44px]">
          挑戦したいあなたを、
          <br />
          <span className="text-brand">待っています。</span>
        </h2>
        <p className="mt-6 font-sans text-[15px] text-muted">
          「まずは話を聞いてみたい」も大歓迎。あなたに合った入口を選んでください。
        </p>
        <div className="mt-11 flex flex-wrap justify-center gap-4">
          <Link
            href="/entry"
            className="group inline-flex min-w-[248px] flex-col items-start gap-[5px] rounded-card bg-brand px-8 py-[18px] text-left no-underline transition-all duration-300 hover:-translate-y-px hover:bg-brand-dark hover:shadow-[0_8px_22px_rgba(230,0,18,0.3)]"
          >
            <span className="inline-flex items-center gap-2.5 font-sans text-[15px] font-bold whitespace-nowrap text-white">
              カジュアル面談を申し込む
              <ArrowIcon />
            </span>
            <span className="font-mono text-[10.5px] tracking-[0.08em] text-white/80">
              選考なし ・ 30分 ・ オンライン
            </span>
          </Link>
          <Link
            href="/entry?mode=full"
            className="group inline-flex min-w-[248px] flex-col items-start gap-[5px] rounded-card border border-ink bg-paper px-8 py-[17px] text-left text-ink no-underline transition-all duration-300 hover:-translate-y-px hover:border-brand hover:text-brand hover:shadow-[0_8px_22px_rgba(20,20,15,0.12)]"
          >
            <span className="inline-flex items-center gap-2.5 font-sans text-[15px] font-bold whitespace-nowrap">
              本応募エントリー
              <ArrowIcon />
            </span>
            <span className="font-mono text-[10.5px] tracking-[0.08em] text-muted">
              職務経歴書でスピード選考
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
