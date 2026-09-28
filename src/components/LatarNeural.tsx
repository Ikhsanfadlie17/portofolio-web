"use client";

import { useEffect, useRef } from "react";

// Latar animasi "knowledge graph": node bergerak pelan, saling terhubung bila berdekatan,
// dan tertarik ke kursor. Terinspirasi dari visualisasi graf di skripsi GraphRAG.
const WARNA = ["34,211,238", "167,139,250", "244,114,182", "52,211,153", "250,204,21"];

type Node = { x: number; y: number; vx: number; vy: number; r: number; c: string };

export default function LatarNeural() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const glow = glowRef.current;
    if (!canvas || !glow) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const kurangGerak = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -9999, y: -9999, aktif: false };
    let nodes: Node[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;

    function ukur() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const jumlah = Math.min(90, Math.round((w * h) / 16000));
      nodes = Array.from({ length: jumlah }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 1.1,
        c: WARNA[Math.floor(Math.random() * WARNA.length)],
      }));
    }

    function gambar() {
      ctx!.clearRect(0, 0, w, h);
      const jarakMaks = 140;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (!kurangGerak) {
          if (mouse.aktif) {
            const dx = mouse.x - a.x;
            const dy = mouse.y - a.y;
            const d = Math.hypot(dx, dy);
            if (d < 200 && d > 1) {
              a.vx += (dx / d) * 0.012;
              a.vy += (dy / d) * 0.012;
            }
          }
          a.vx *= 0.995;
          a.vy *= 0.995;
          const v = Math.hypot(a.vx, a.vy);
          if (v < 0.12) {
            a.vx += (Math.random() - 0.5) * 0.04;
            a.vy += (Math.random() - 0.5) * 0.04;
          }
          a.x += a.vx;
          a.y += a.vy;
          if (a.x < -20) a.x = w + 20;
          if (a.x > w + 20) a.x = -20;
          if (a.y < -20) a.y = h + 20;
          if (a.y > h + 20) a.y = -20;
        }
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < jarakMaks) {
            ctx!.strokeStyle = `rgba(${a.c},${0.16 * (1 - d / jarakMaks)})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
        if (mouse.aktif) {
          const d = Math.hypot(a.x - mouse.x, a.y - mouse.y);
          if (d < 180) {
            ctx!.strokeStyle = `rgba(${a.c},${0.45 * (1 - d / 180)})`;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(mouse.x, mouse.y);
            ctx!.stroke();
          }
        }
        ctx!.fillStyle = `rgba(${a.c},0.85)`;
        ctx!.shadowColor = `rgba(${a.c},0.9)`;
        ctx!.shadowBlur = 8;
        ctx!.beginPath();
        ctx!.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }
    }

    function loop() {
      gambar();
      raf = requestAnimationFrame(loop);
    }

    function gerak(e: PointerEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.aktif = e.pointerType === "mouse";
      glow!.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
      glow!.style.opacity = mouse.aktif ? "1" : "0";
    }
    function keluar() {
      mouse.aktif = false;
      glow!.style.opacity = "0";
    }
    function visibilitas() {
      cancelAnimationFrame(raf);
      if (!document.hidden && !kurangGerak) loop();
    }

    ukur();
    if (kurangGerak) gambar();
    else loop();
    window.addEventListener("resize", ukur);
    window.addEventListener("pointermove", gerak);
    document.addEventListener("pointerleave", keluar);
    document.addEventListener("visibilitychange", visibilitas);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", ukur);
      window.removeEventListener("pointermove", gerak);
      document.removeEventListener("pointerleave", keluar);
      document.removeEventListener("visibilitychange", visibilitas);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="absolute top-[40%] -right-40 h-[420px] w-[520px] rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="grid-bg absolute inset-0" />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div
        ref={glowRef}
        className="absolute top-0 left-0 h-[600px] w-[600px] rounded-full opacity-0 transition-opacity duration-500"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.14), transparent 60%)" }}
      />
    </div>
  );
}
