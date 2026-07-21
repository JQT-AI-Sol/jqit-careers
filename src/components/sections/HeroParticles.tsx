"use client";

import { useEffect, useRef } from "react";

/**
 * 軽量コンステレーション（点と細い線のネットワーク）。
 * 親要素いっぱいに広がるcanvas。モノクロ＋赤の差し色、低密度・低速。
 * カーソルに微反応。prefers-reduced-motion では静止表示。依存なし。
 */
export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    type P = { x: number; y: number; vx: number; vy: number; r: number; red: boolean };
    let particles: P[] = [];
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;

    const resize = () => {
      width = parent.clientWidth;
      height = parent.clientHeight;
      if (width === 0 || height === 0) return;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(28, Math.min(72, Math.floor((width * height) / 15000)));
      particles = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.6 + 0.85,
        red: i % 9 === 0,
      }));
    };

    const LINK = 132;
    const MOUSE_LINK = 168;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      if (!reduce) {
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -2) p.x += width + 4;
          if (p.x > width + 2) p.x -= width + 4;
          if (p.y < -2) p.y += height + 4;
          if (p.y > height + 2) p.y -= height + 4;
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            const o = (1 - d / LINK) * 0.26;
            ctx.strokeStyle =
              a.red || b.red ? `rgba(230,0,18,${o})` : `rgba(20,20,15,${o})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const mdx = a.x - mouse.x;
        const mdy = a.y - mouse.y;
        const md = Math.hypot(mdx, mdy);
        if (md < MOUSE_LINK) {
          const o = (1 - md / MOUSE_LINK) * 0.32;
          ctx.strokeStyle = a.red
            ? `rgba(230,0,18,${o})`
            : `rgba(20,20,15,${o})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.red ? "rgba(230,0,18,0.9)" : "rgba(20,20,15,0.42)";
        ctx.fill();
      }

      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw();
    });
    ro.observe(parent);
    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);

    if (reduce) draw();
    else raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
