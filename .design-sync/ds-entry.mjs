// design-sync bundle entry — re-exports the scoped `ui/` primitives so the
// converter bundles exactly these into window.JqitCareers.
// Passed as cfg.entry; its location lets the converter walk up to the repo's
// package.json (the app isn't self-installed under node_modules/<pkg>).
// Imports resolve via .design-sync/tsconfig.build.json: `@/lib/cn` -> src,
// `next/link` -> .design-sync/shims/next-link.tsx.
export { Button } from "../src/components/ui/Button";
export { Container } from "../src/components/ui/Container";
export { SectionHead, Kicker } from "../src/components/ui/SectionHead";
export { FadeIn } from "../src/components/ui/FadeIn";
export { CountUp } from "../src/components/ui/CountUp";
export { GeoBackdrop } from "../src/components/ui/GeoBackdrop";
export { GeoMark } from "../src/components/ui/GeoMark";
