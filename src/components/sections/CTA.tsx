import Link from "next/link";
import { Container } from "@/components/ui/Container";

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
 * ブランド赤の全面ブロックで締める（最後の最大インパクト）。
 * 各ボタンは見出し＋補足説明の2段構成で、選考のハードルの低さを伝える。
 */
export function CTA() {
  return (
    <section
      id="join"
      className="relative overflow-hidden bg-brand py-[96px] text-center md:py-[170px]"
    >
      {/* 深い赤の幾何学装飾（奥行き） */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-[340px] w-[340px] rounded-full bg-brand-dark/40 md:h-[520px] md:w-[520px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -bottom-40 h-[420px] w-[420px] rotate-12 bg-brand-dark/30 md:h-[620px] md:w-[620px]"
      />
      <Container className="relative">
        <span className="inline-flex items-center gap-3 font-mono text-[11px] font-semibold tracking-[0.22em] text-white uppercase">
          <span aria-hidden className="h-px w-8 bg-white/70" />
          Join Us
          <span aria-hidden className="h-px w-8 bg-white/70" />
        </span>
        <h2 className="mt-8 text-balance font-serif text-[34px] font-medium leading-[1.5] tracking-[0.03em] text-white md:text-[64px]">
          挑戦したいあなたを、
          <br />
          待っています。
        </h2>
        <p className="mt-7 font-sans text-[15px] text-white md:text-base">
          「まずは話を聞いてみたい」も大歓迎。あなたに合った入口を選んでください。
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-4 md:mt-14">
          <Link
            href="/entry"
            className="group inline-flex min-w-[248px] flex-col items-start gap-[5px] rounded-card bg-white px-8 py-[18px] text-left no-underline shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-px hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)]"
          >
            <span className="inline-flex items-center gap-2.5 font-sans text-[15px] font-bold whitespace-nowrap text-brand">
              カジュアル面談を申し込む
              <ArrowIcon />
            </span>
            <span className="font-mono text-[10.5px] tracking-[0.08em] text-ink/60">
              選考なし ・ 30分 ・ オンライン
            </span>
          </Link>
          <Link
            href="/entry?mode=full"
            className="group inline-flex min-w-[248px] flex-col items-start gap-[5px] rounded-card border border-white/75 px-8 py-[17px] text-left text-white no-underline transition-all duration-300 hover:-translate-y-px hover:bg-white/10"
          >
            <span className="inline-flex items-center gap-2.5 font-sans text-[15px] font-bold whitespace-nowrap">
              本応募エントリー
              <ArrowIcon />
            </span>
            <span className="font-mono text-[10.5px] tracking-[0.08em] text-white">
              職務経歴書でスピード選考
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
