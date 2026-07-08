"use client";

import { useState } from "react";
import { faqs } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-line">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="brand-line-row border-b border-line">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className={cn(
                "flex w-full items-center justify-between gap-6 py-6 text-left transition-colors",
                isOpen && "border-l-2 border-brand pl-5",
              )}
            >
              <span className="brand-line-label font-serif text-[17px] font-medium text-ink md:text-[19px]">
                {item.q}
              </span>
              <span className="font-mono text-xl text-brand">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <p className="pb-7 pl-5 font-sans text-[14px] leading-[2] text-muted">
                {item.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
