"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { interviews, memberImageFor } from "@/lib/content";
import { asset } from "@/lib/asset";

const COPIES = 3;

/**
 * 社員紹介スライダー：自動スクロール（右→左）＋ドラッグ/スワイプ操作。
 * 先頭3件を3セット複製してシームレスにループ。ホバーで一時停止、
 * ドラッグ後のクリックは抑止。prefers-reduced-motion では自動送りを停止。
 * ホバー演出（グレースケール解除・拡大・見出し赤化・浮き上がり）は group-hover で表現。
 */
export function MembersCarousel() {
  const items = interviews.slice(0, 3);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const view = viewportRef.current;
    if (!track || !view) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const children = Array.from(track.children) as HTMLElement[];
    const perSet = Math.max(1, Math.round(children.length / COPIES));

    let setWidth = 0;
    const measure = () => {
      const gap = parseFloat(getComputedStyle(track).columnGap) || 28;
      setWidth = 0;
      for (let i = 0; i < perSet; i++) {
        setWidth += children[i].getBoundingClientRect().width + gap;
      }
    };
    measure();

    let x = 0;
    const speed = reduce ? 0 : 0.55;
    let paused = false;
    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    let moved = false;
    let raf = 0;

    const norm = () => {
      if (setWidth <= 0) return;
      while (x < 0) x += setWidth;
      while (x >= setWidth) x -= setWidth;
    };
    const apply = () => {
      track.style.transform = `translateX(${-x}px)`;
    };
    const step = () => {
      if (!paused && !dragging) {
        x += speed;
        norm();
        apply();
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const onEnter = () => {
      if (!dragging) paused = true;
    };
    const onLeave = () => {
      if (!dragging) paused = false;
    };
    const down = (cx: number) => {
      dragging = true;
      moved = false;
      startX = cx;
      startScroll = x;
      view.style.cursor = "grabbing";
    };
    const move = (cx: number) => {
      if (!dragging) return;
      const dx = cx - startX;
      if (Math.abs(dx) > 4) moved = true;
      x = startScroll - dx;
      norm();
      apply();
    };
    const up = () => {
      if (!dragging) return;
      dragging = false;
      view.style.cursor = "grab";
      paused = false;
    };

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      down(e.clientX);
    };
    const onMouseMove = (e: MouseEvent) => move(e.clientX);
    const onTouchStart = (e: TouchEvent) => down(e.touches[0].clientX);
    const onTouchMove = (e: TouchEvent) => move(e.touches[0].clientX);
    const onClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    view.addEventListener("mouseenter", onEnter);
    view.addEventListener("mouseleave", onLeave);
    view.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", up);
    view.addEventListener("touchstart", onTouchStart, { passive: true });
    view.addEventListener("touchmove", onTouchMove, { passive: true });
    view.addEventListener("touchend", up);
    track.addEventListener("click", onClickCapture, true);
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(raf);
      view.removeEventListener("mouseenter", onEnter);
      view.removeEventListener("mouseleave", onLeave);
      view.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", up);
      view.removeEventListener("touchstart", onTouchStart);
      view.removeEventListener("touchmove", onTouchMove);
      view.removeEventListener("touchend", up);
      track.removeEventListener("click", onClickCapture, true);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div
      ref={viewportRef}
      className="relative ml-[calc(50%-50vw)] w-screen cursor-grab overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_2%,black_98%,transparent)]"
    >
      <div
        ref={trackRef}
        className="flex w-max items-stretch gap-7 py-1.5 will-change-transform"
      >
        {Array.from({ length: COPIES }).flatMap((_, copy) =>
          items.map((m, i) => {
            const clone = copy > 0;
            return (
              <Link
                key={`${copy}-${m.slug}`}
                href={`/interviews/${m.slug}`}
                aria-hidden={clone}
                tabIndex={clone ? -1 : undefined}
                draggable={false}
                className="group flex w-[clamp(282px,82vw,372px)] shrink-0 flex-col rounded-[18px] border border-[#ececec] bg-paper p-3.5 shadow-[0_1px_3px_rgba(20,20,15,0.05)] no-underline transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(20,20,15,0.13)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-ink">
                  <Image
                    src={asset(memberImageFor(m, i))}
                    alt=""
                    fill
                    draggable={false}
                    sizes="372px"
                    className={`object-cover transition-[filter,transform] duration-500 ease-out group-hover:scale-[1.04] ${m.photo ? "object-[center_30%]" : "grayscale group-hover:grayscale-0"}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/10" />
                  <span
                    aria-hidden
                    className="absolute top-3 left-5 font-serif text-5xl leading-none text-white/45"
                  >
                    &ldquo;
                  </span>
                  <div className="absolute bottom-3 left-4 flex items-baseline gap-2.5">
                    <span className="font-serif text-2xl tracking-[0.08em] text-white">
                      {m.name}
                    </span>
                    {m.dept && (
                      <span className="font-mono text-[10px] tracking-[0.12em] text-white/70 uppercase">
                        {m.dept}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-6">
                  <span className="font-mono text-[11px] tracking-[0.16em] text-brand uppercase">
                    {m.role}
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-[19px] font-medium leading-[1.6] text-ink transition-colors group-hover:text-brand">
                  {m.title}
                </h3>
                <p className="mt-3 font-sans text-[13.5px] leading-[1.9] text-muted">
                  {m.excerpt}
                </p>
                {m.career && (
                  <p className="mt-3 font-sans text-[12px] text-muted/80">
                    {m.career}
                  </p>
                )}
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 font-mono text-[11px] tracking-[0.12em] text-ink uppercase">
                  Read More <span aria-hidden>→</span>
                </span>
              </Link>
            );
          }),
        )}
      </div>
    </div>
  );
}
