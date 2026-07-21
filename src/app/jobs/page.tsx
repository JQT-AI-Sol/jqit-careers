import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { CTA } from "@/components/sections/CTA";
import { jobs, jobSlugToValue } from "@/lib/content";
import { site } from "@/lib/site";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "職種紹介・募集要項",
  description:
    "JQITの募集職種（開発／インフラ／QA／AI／営業）。仕事内容・求める人物像・歓迎スキルをご紹介します。経験者歓迎。",
  alternates: { canonical: "/jobs" },
};

function jobPostingLd() {
  return {
    "@context": "https://schema.org",
    "@graph": jobs.map((job) => ({
      "@type": "JobPosting",
      title: job.title,
      description: job.description,
      datePosted: "2026-06-11",
      employmentType: "FULL_TIME",
      hiringOrganization: {
        "@type": "Organization",
        name: "JQIT",
        sameAs: site.corporateUrl,
      },
      jobLocationType: "TELECOMMUTE",
      applicantLocationRequirements: { "@type": "Country", name: "JP" },
      directApply: true,
      url: `${site.url}/entry?position=${jobSlugToValue[job.slug]}`,
    })),
  };
}

export default function JobsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jobPostingLd()).replace(/</g, "\\u003c"),
        }}
      />
      <section className="py-20 md:py-[120px]">
        <Container>
          <SectionHead
            kicker="Jobs"
            title="職種紹介・募集要項"
            lead="あなたの経験と、挑戦したい領域で選べる5職種。チームを率いて活かせるポジションです。"
            headingLevel="h1"
          />

          <div className="flex flex-col gap-px overflow-hidden border border-line bg-line">
            {jobs.map((job) => (
              <article
                key={job.slug}
                id={job.slug}
                className="scroll-mt-24 bg-paper p-8 md:p-12"
              >
                <div className="relative mb-8 aspect-[3/2] w-full overflow-hidden rounded-2xl md:aspect-[3/1.65]">
                  <Image
                    src={asset(`/images/jobs/${jobSlugToValue[job.slug]}.jpg`)}
                    alt={`${job.title}のイメージ`}
                    fill
                    sizes="(max-width: 768px) 100vw, 1080px"
                    className="object-cover"
                  />
                </div>
                <div className="font-mono text-[11px] tracking-[0.16em] text-brand uppercase">
                  {job.category}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <h2 className="font-serif text-[26px] font-medium text-ink md:text-[30px]">
                    {job.title}
                  </h2>
                  <div className="flex gap-2">
                    {job.acceptInexperienced && (
                      <span className="rounded-card bg-brand px-3 py-1.5 font-sans text-[12px] font-bold text-white shadow-sm">
                        未経験可
                      </span>
                    )}
                    {job.acceptExperienced && (
                      <span className="rounded-card border border-ink px-2.5 py-1 font-sans text-[12px] font-bold text-ink">
                        経験者歓迎
                      </span>
                    )}
                  </div>
                </div>

                <p className="mt-5 max-w-[760px] font-sans text-[14.5px] leading-[2] text-body">
                  {job.description}
                </p>

                <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="font-serif text-[16px] font-medium text-ink">
                      求める人物像
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {job.idealProfile.map((p) => (
                        <li
                          key={p}
                          className="font-sans text-[13.5px] leading-[1.9] text-muted before:mr-2 before:text-brand before:content-['—']"
                        >
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-serif text-[16px] font-medium text-ink">
                      歓迎するスキル・経験
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {job.welcomeSkills.map((s) => (
                        <li
                          key={s}
                          className="font-sans text-[13.5px] leading-[1.9] text-muted before:mr-2 before:text-brand before:content-['—']"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {job.cases && job.cases.length > 0 && (
                  <div className="mt-8">
                    <h3 className="font-serif text-[16px] font-medium text-ink">
                      プロジェクト事例
                    </h3>
                    <ul className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
                      {job.cases.map((c) => (
                        <li
                          key={c}
                          className="font-sans text-[13px] leading-[1.8] text-muted before:mr-2 before:text-brand before:content-['▪']"
                        >
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-9">
                  <Button
                    href={`/entry?position=${jobSlugToValue[job.slug]}`}
                    variant="outline"
                  >
                    この職種でカジュアル面談する
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
