import { interviews } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";

export function Members() {
  return (
    <div className="grid grid-cols-1 gap-9 md:grid-cols-3">
      {interviews.map((m, i) => (
        <FadeIn
          key={m.slug}
          style={{ transitionDelay: `${i * 90}ms` } as React.CSSProperties}
        >
          <div className="relative h-[300px] rounded-card bg-gradient-to-br from-[#cfcdc7] to-[#6f6d68] grayscale">
            <span className="absolute bottom-0 left-0 h-1 w-12 bg-brand" />
          </div>
          <div className="mt-6 font-mono text-[11px] tracking-[0.16em] text-brand uppercase">
            {m.role}
          </div>
          <h3 className="mt-3 font-serif text-xl font-medium leading-[1.6] text-ink">
            {m.title}
          </h3>
          <p className="mt-3 font-sans text-[13.5px] leading-[1.9] text-muted">
            {m.excerpt}
          </p>
        </FadeIn>
      ))}
    </div>
  );
}
