import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "arrow";

const base =
  "group inline-flex items-center font-sans font-bold text-sm tracking-[0.02em] transition-all duration-300 ease-out";

const variants: Record<Variant, string> = {
  primary:
    "gap-3 bg-brand text-white px-10 py-[18px] rounded-card hover:bg-brand-dark active:translate-y-px",
  outline:
    "gap-3 border border-ink text-ink px-10 py-[18px] rounded-card hover:bg-ink hover:text-white active:translate-y-px",
  arrow:
    "gap-2.5 font-mono font-semibold text-[13px] tracking-[0.12em] text-ink border-b border-ink pt-4 pb-[10px] hover:text-brand hover:border-brand hover:gap-4",
};

function ArrowIcon() {
  return (
    <svg
      width="20"
      height="10"
      viewBox="0 0 20 10"
      fill="none"
      aria-hidden
      className="transition-transform duration-300 ease-out group-hover:translate-x-1.5"
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

export function Button({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  const isExternal = href.startsWith("http");
  const cls = cn(base, variants[variant], className);
  const content = (
    <>
      <span>{children}</span>
      {variant !== "arrow" && <ArrowIcon />}
    </>
  );
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
