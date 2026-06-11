import { cn } from "@/lib/cn";
import { FadeIn } from "@/components/ui/FadeIn";

export function Kicker({ children }: { children: React.ReactNode }) {
  return <span className="kicker">{children}</span>;
}

export function SectionHead({
  kicker,
  title,
  lead,
  className,
  center,
}: {
  kicker: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
  center?: boolean;
}) {
  return (
    <FadeIn
      className={cn(
        "mb-12 max-w-[720px] md:mb-[72px]",
        center && "mx-auto text-center",
        className,
      )}
    >
      <Kicker>{kicker}</Kicker>
      <h2 className="mt-6 font-serif text-[27px] font-medium leading-[1.5] tracking-[0.02em] text-ink md:text-[38px]">
        {title}
      </h2>
      {lead && (
        <p className="mt-6 font-sans text-base leading-[2] text-body">{lead}</p>
      )}
    </FadeIn>
  );
}
