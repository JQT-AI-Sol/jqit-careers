import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/SectionHead";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { asset } from "@/lib/asset";
import data from "@/../content/messages.json";

const { ceo, leaders } = data;

const leaderPortraits = [
  { src: "/images/people/p1.jpg", position: "object-[50%_38%]" },
  { src: "/images/people/r6.jpg", position: "object-[50%_28%]" },
  { src: "/images/people/p3.jpg", position: "object-[50%_34%]" },
  { src: "/images/people/r8.jpg", position: "object-[50%_24%]" },
];

export function Messages() {
  return (
    <section className="bg-cream py-20 md:py-[120px]">
      <Container>
        {/* === 代表メッセージ === */}
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-[72px]">
          <FadeIn>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line bg-paper">
              <Image
                src={asset("/images/about/team.jpg")}
                alt="オフィスで協働するJQITのメンバー"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <span
                aria-hidden
                className="absolute bottom-7 left-7 font-mono text-[11px] tracking-[0.16em] text-white/80 uppercase"
              >
                Message
              </span>
            </div>
          </FadeIn>

          {/* 本文 */}
          <FadeIn style={{ transitionDelay: "90ms" } as React.CSSProperties}>
            <Kicker>{ceo.kicker}</Kicker>
            <p className="mt-5 font-mono text-[11px] tracking-[0.16em] text-brand uppercase">
              {ceo.role}
            </p>
            <h2 className="mt-4 max-w-[640px] font-serif text-[26px] font-medium leading-[1.55] tracking-[0.02em] text-ink md:text-[36px]">
              {ceo.title}
            </h2>
            <div className="mt-9 max-w-[640px] space-y-6">
              {ceo.body.map((para, i) => (
                <p
                  key={i}
                  className="font-sans text-[15px] leading-[2.1] text-body"
                >
                  {para}
                </p>
              ))}
            </div>
            <div className="mt-10 border-t border-line pt-6">
              <p className="font-serif text-[18px] tracking-[0.04em] text-ink">
                {ceo.name}
              </p>
              <p className="mt-3 font-sans text-[12px] leading-[1.8] text-muted">
                {ceo.note}
              </p>
            </div>
          </FadeIn>
        </div>

        {/* === 部門リーダー === */}
        <div className="mt-20 md:mt-[120px]">
          <FadeIn className="mb-12 max-w-[720px] md:mb-[72px]">
            <Kicker>{leaders.kicker}</Kicker>
            <h2 className="mt-6 font-serif text-[24px] font-medium leading-[1.5] tracking-[0.02em] text-ink md:text-[32px]">
              {leaders.title}
            </h2>
            <p className="mt-6 font-sans text-[15px] leading-[2] text-body">
              {leaders.lead}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
            {leaders.items.map((leader, i) => (
              <FadeIn
                key={leader.dept}
                style={
                  { transitionDelay: `${(i % 2) * 90}ms` } as React.CSSProperties
                }
                className="brand-line-card bg-paper p-9 md:p-12"
              >
                <div className="flex items-start gap-5">
                  <div className="relative size-[86px] shrink-0 overflow-hidden rounded-xl bg-line md:size-[104px]">
                    <Image
                      src={asset(leaderPortraits[i % leaderPortraits.length].src)}
                      alt=""
                      fill
                      sizes="104px"
                      className={`object-cover ${leaderPortraits[i % leaderPortraits.length].position}`}
                    />
                  </div>
                  <div className="min-w-0 pt-1">
                    <span className="font-mono text-[12px] tracking-[0.16em] text-brand uppercase">
                      {leader.dept}
                    </span>
                    <p className="mt-3 font-sans text-[12.5px] leading-[1.8] tracking-wide text-muted">
                      {leader.role}
                    </p>
                  </div>
                </div>
                <p className="mt-6 font-serif text-[17px] leading-[1.95] tracking-[0.01em] text-ink">
                  {leader.quote}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* === エントリー CTA === */}
        <FadeIn className="mt-16 flex flex-col items-start gap-6 border-t border-line pt-12 md:mt-20 md:flex-row md:items-center md:justify-between">
          <p className="font-serif text-[20px] leading-[1.6] text-ink md:text-[24px]">
            この未来を、一緒に切り拓きませんか。
          </p>
          <Button href="/entry" variant="primary">
            エントリーフォームへ
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
}
