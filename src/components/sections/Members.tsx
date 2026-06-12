import Image from "next/image";
import Link from "next/link";
import { interviews } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";
import { asset } from "@/lib/asset";

// 顔の写らない抽象的な「働く人/職場」モノクロ画像（匿名化に整合）
const memberImages = [
  "/images/members/m1.jpg",
  "/images/members/m3.jpg",
  "/images/members/m5.jpg",
  "/images/members/m2.jpg",
  "/images/members/m4.jpg",
  "/images/members/m6.jpg",
];

export function Members({ limit }: { limit?: number }) {
  const items = limit ? interviews.slice(0, limit) : interviews;
  return (
    <div className="grid grid-cols-1 gap-9 md:grid-cols-3">
      {items.map((m, i) => (
        <FadeIn
          key={m.slug}
          style={{ transitionDelay: `${(i % 3) * 90}ms` } as React.CSSProperties}
        >
          <Link
            href={`/interviews/${m.slug}`}
            className="group flex h-full flex-col focus-visible:outline-none"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-ink">
              <Image
                src={asset(memberImages[i % memberImages.length])}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="object-cover grayscale transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/10" />
              <span
                aria-hidden
                className="absolute top-3 left-5 font-serif text-5xl leading-none text-white/45"
              >
                &ldquo;
              </span>
              <div className="absolute bottom-3 left-4 flex items-baseline gap-2.5">
                <span className="font-serif text-2xl tracking-[0.08em] text-white">
                  {m.name}
                </span>
                {m.dept && (
                  <span className="font-mono text-[10px] tracking-[0.12em] text-white/70 uppercase">
                    {m.dept}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-6">
              <span className="font-mono text-[11px] tracking-[0.16em] text-brand uppercase">
                {m.role}
              </span>
            </div>
            <h3 className="mt-3 font-serif text-[19px] font-medium leading-[1.6] text-ink transition-colors group-hover:text-brand">
              {m.title}
            </h3>
            <p className="mt-3 font-sans text-[13.5px] leading-[1.9] text-muted">
              {m.excerpt}
            </p>
            {m.career && (
              <p className="mt-3 font-sans text-[12px] text-muted/80">
                {m.career}
              </p>
            )}
            <span className="mt-auto inline-flex items-center gap-1.5 pt-4 font-mono text-[11px] tracking-[0.12em] text-ink uppercase transition-all group-hover:gap-2.5 group-hover:text-brand">
              Read More <span aria-hidden>→</span>
            </span>
          </Link>
        </FadeIn>
      ))}
    </div>
  );
}
