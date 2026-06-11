import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "arrow";

const base =
  "inline-flex items-center gap-2.5 font-sans font-bold text-sm tracking-wide transition-all duration-200";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white px-9 py-4 rounded-card hover:bg-brand-dark",
  outline:
    "border border-ink text-ink px-9 py-4 rounded-card hover:bg-ink hover:text-white",
  arrow:
    "font-mono font-semibold text-[13px] tracking-[0.12em] text-ink border-b border-ink pb-1.5 hover:text-brand hover:border-brand hover:gap-4",
};

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
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
