// design-sync shim for `next/link`.
// The DS bundle renders standalone in claude.ai/design (no Next runtime), so
// next/link is aliased to a plain <a> via .design-sync/tsconfig.build.json paths.
// Mirrors the props Button.tsx actually uses (href, className, children).
import * as React from "react";

type LinkProps = {
  href: string;
  children?: React.ReactNode;
  className?: string;
} & Record<string, unknown>;

export default function Link({ href, children, ...rest }: LinkProps) {
  return React.createElement("a", { href, ...rest }, children);
}
