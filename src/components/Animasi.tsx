"use client";

import { motion, useInView, useMotionValue, useSpring, animate } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

// Muncul saat masuk layar (fade + naik + blur)
export function Muncul({
  children,
  delay = 0,
  className,
  y = 28,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Angka berjalan dari 0 ke nilai saat terlihat
export function HitungNaik({ nilai, desimal = 0, akhiran = "" }: { nilai: number; desimal?: number; akhiran?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const terlihat = useInView(ref, { once: true, margin: "-40px" });
  const [teks, setTeks] = useState((0).toFixed(desimal));

  useEffect(() => {
    if (!terlihat) return;
    const c = animate(0, nilai, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setTeks(v.toFixed(desimal).replace(".", ",")),
    });
    return () => c.stop();
  }, [terlihat, nilai, desimal]);

  return (
    <span ref={ref} className="tabular-nums">
      {teks}
      {akhiran}
    </span>
  );
}

// Seperti HitungNaik, tapi dari teks ("79,67", "4,65/5", "91,5%"): angka depan dianimasikan, sisanya tetap
export function HitungTeks({ teks }: { teks: string }) {
  const m = teks.match(/^(\d+)(?:,(\d+))?(.*)$/);
  if (!m) return <>{teks}</>;
  const desimal = m[2] ? m[2].length : 0;
  const nilai = Number(m[1] + (m[2] ? "." + m[2] : ""));
  return <HitungNaik nilai={nilai} desimal={desimal} akhiran={m[3]} />;
}

// Kartu miring 3D mengikuti kursor + sorotan tepi
export function KartuTilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });

  function gerak(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    ry.set((px - 0.5) * 8);
    rx.set(-(py - 0.5) * 8);
  }
  function keluar() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={gerak}
      onPointerLeave={keluar}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      className={`spotlight ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Tombol "magnet" yang sedikit mengikuti kursor
export function Magnet({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 250, damping: 15 });
  const y = useSpring(0, { stiffness: 250, damping: 15 });
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={`inline-block ${className}`}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
