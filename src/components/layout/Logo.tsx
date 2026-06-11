import { cn } from "@/lib/cn";

export function Logo({
  className,
  light,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[21px] font-semibold tracking-[0.06em]",
        light ? "text-white" : "text-ink",
        className,
      )}
    >
      <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand" />
      JQIT
    </span>
  );
}
