import { interviews } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";

export function Members({ limit }: { limit?: number }) {
  const items = limit ? interviews.slice(0, limit) : interviews;
  return (
    <div className="grid grid-cols-1 gap-9 md:grid-cols-3">
      {items.map((m, i) => (
        <FadeIn
          key={m.slug}
          style={{ transitionDelay: `${(i % 3) * 90}ms` } as React.CSSProperties}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card bg-cream border border-line">
            <span
              aria-hidden
              className="absolute top-4 left-5 font-serif text-6xl leading-none text-brand/30"
            >
              &ldquo;
            </span>
            <span className="absolute inset-0 flex items-center justify-center font-serif text-[44px] tracking-[0.08em] text-ink">
              {m.name}
            </span>
            {m.dept && (
              <span className="absolute bottom-3 right-4 font-mono text-[10px] tracking-[0.12em] text-muted uppercase">
                {m.dept}
              </span>
            )}
          </div>
          <div className="mt-6">
            <span className="font-mono text-[11px] tracking-[0.16em] text-brand uppercase">
              {m.role}
            </span>
          </div>
          <h3 className="mt-3 font-serif text-[19px] font-medium leading-[1.6] text-ink">
            {m.title}
          </h3>
          <p className="mt-3 font-sans text-[13.5px] leading-[1.9] text-muted">
            {m.excerpt}
          </p>
          {m.career && (
            <p className="mt-3 font-sans text-[12px] text-muted/80">{m.career}</p>
          )}
        </FadeIn>
      ))}
    </div>
  );
}
