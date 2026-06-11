"use client";

import { useState } from "react";
import Link from "next/link";
import { nav, site } from "@/lib/site";
import { Logo } from "./Logo";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-[78px] w-full max-w-[1160px] items-center justify-between px-5 md:px-8">
        <Link href="/" aria-label={`${site.name} 採用サイト トップ`}>
          <Logo />
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans text-[13.5px] font-medium tracking-wide text-body transition-colors hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/entry"
            className="rounded-card bg-brand px-6 py-3 font-sans text-[13px] font-bold text-white transition-colors hover:bg-brand-dark"
          >
            エントリー
          </Link>
        </nav>

        {/* mobile toggle */}
        <button
          type="button"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={cn(
              "h-px w-6 bg-ink transition-transform",
              open && "translate-y-[7px] rotate-45",
            )}
          />
          <span
            className={cn("h-px w-6 bg-ink transition-opacity", open && "opacity-0")}
          />
          <span
            className={cn(
              "h-px w-6 bg-ink transition-transform",
              open && "-translate-y-[7px] -rotate-45",
            )}
          />
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="fixed inset-0 top-[78px] z-40 bg-paper md:hidden">
          <nav className="flex flex-col px-6 py-6">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-5 font-serif text-xl text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/entry"
              onClick={() => setOpen(false)}
              className="mt-8 rounded-card bg-brand px-6 py-4 text-center font-sans font-bold text-white"
            >
              エントリー
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
