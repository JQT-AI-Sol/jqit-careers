import Link from "next/link";
import { footerNav } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-ink pt-20 pb-9 font-sans text-[#b7b7b1]">
      <div className="mx-auto w-full max-w-[1160px] px-5 md:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <Logo light />
            <p className="mt-5 max-w-[280px] font-serif text-[13px] leading-[2] text-[#b7b7b1]">
              技術の力でお客様の本質的な課題を解決する、ITのプロフェッショナル集団。
            </p>
          </div>
          {Object.entries(footerNav).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="mb-5 font-mono text-[11px] font-semibold tracking-[0.18em] text-white uppercase">
                {heading}
              </h4>
              {links.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </div>
          ))}
        </div>
        <div className="mt-14 flex items-center justify-between border-t border-[#2d2d28] pt-6 font-mono text-[11px] tracking-[0.1em] text-[#76766f]">
          <span>© 2026 JQIT INC.</span>
          <span>CAREERS</span>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const cls =
    "block py-1 text-[13px] leading-[2.2] text-[#b7b7b1] transition-colors hover:text-white";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {label}
    </Link>
  );
}
