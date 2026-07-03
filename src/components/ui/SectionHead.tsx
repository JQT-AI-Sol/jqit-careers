import { cn } from "@/lib/cn";
import { FadeIn } from "@/components/ui/FadeIn";

export function Kicker({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "inverse"; // inverse: 暗背景（bg-ink等）用の白文字
}) {
  return (
    <span className={cn("kicker", tone === "inverse" && "kicker-inverse")}>
      {children}
    </span>
  );
}

export function SectionHead({
  kicker,
  title,
  lead,
  className,
  center,
  headingLevel = "h2",
}: {
  kicker: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
  center?: boolean;
  headingLevel?: "h1" | "h2";
}) {
  const Heading = headingLevel;

  return (
    <FadeIn
      className={cn(
        "mb-12 max-w-[720px] md:mb-[72px]",
        center && "mx-auto text-center",
        className,
      )}
    >
      <Kicker>{kicker}</Kicker>
      <Heading className="mt-6 text-balance font-serif text-[30px] font-medium leading-[1.45] tracking-[0.02em] text-ink md:text-[48px]">
        {title}
      </Heading>
      {lead && (
        <p className="mt-6 font-sans text-base leading-[2] text-body">{lead}</p>
      )}
    </FadeIn>
  );
}
