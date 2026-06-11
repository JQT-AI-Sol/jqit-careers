import Link from "next/link";
import { jobs, jobSlugToValue } from "@/lib/content";

export function JobList() {
  return (
    <div className="border-t border-line">
      {jobs.map((job, i) => (
        <Link
          key={job.slug}
          href={`/entry?position=${jobSlugToValue[job.slug]}`}
          className="group grid grid-cols-[40px_1fr] items-start gap-6 border-b border-line py-9 transition-all hover:bg-cream md:grid-cols-[64px_1fr_auto] md:items-center md:gap-8 md:hover:pl-5"
        >
          <div className="font-mono text-[13px] text-muted">
            {String(i + 1).padStart(2, "0")}
          </div>
          <div>
            <div className="font-mono text-[11px] tracking-[0.16em] text-brand uppercase">
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
          <div className="hidden font-mono text-xl text-ink transition-all group-hover:translate-x-1.5 group-hover:text-brand md:block">
            →
          </div>
        </Link>
      ))}
    </div>
  );
}
