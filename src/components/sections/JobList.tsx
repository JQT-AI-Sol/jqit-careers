import Link from "next/link";
import { jobs } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";
import { GeoMark } from "@/components/ui/GeoMark";
import { GhostNumber } from "@/components/ui/GhostNumber";

export function JobList() {
  return (
    <div className="border-t border-line">
      {jobs.map((job, i) => (
        <FadeIn
          key={job.slug}
          style={{ transitionDelay: `${i * 90}ms` } as React.CSSProperties}
        >
          <Link
            href={`/jobs#${job.slug}`}
            className="group relative grid grid-cols-1 items-start gap-2 overflow-hidden border-b border-line py-9 transition-all hover:bg-cream md:grid-cols-[1fr_auto] md:items-center md:gap-8 md:hover:pl-5"
          >
            <GhostNumber className="right-8 top-1/2 hidden -translate-y-1/2 text-[70px] md:block">
              {String(i + 1).padStart(2, "0")}
            </GhostNumber>
            <div className="relative">
              <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.16em] text-brand uppercase">
                <GeoMark index={i} size={14} />
                {job.category}
              </div>
              <h3 className="mt-3 font-serif text-[24px] font-medium tracking-[0.02em] text-ink md:text-[28px]">
                {job.title}
              </h3>
              <p className="mt-2 max-w-[560px] font-sans text-[13.5px] text-muted">
                {job.summary}
              </p>
              <div className="mt-3.5 flex gap-3.5 font-sans text-xs text-body">
                {job.acceptInexperienced && (
                  <span className="before:mr-1.5 before:text-brand before:content-['—']">
                    未経験OK
                  </span>
                )}
                {job.acceptExperienced && (
                  <span className="before:mr-1.5 before:text-brand before:content-['—']">
                    経験者歓迎
                  </span>
                )}
              </div>
            </div>
            <div className="relative hidden font-mono text-xl text-ink transition-all group-hover:translate-x-1.5 group-hover:text-brand md:block">
              →
            </div>
          </Link>
        </FadeIn>
      ))}
    </div>
  );
}
