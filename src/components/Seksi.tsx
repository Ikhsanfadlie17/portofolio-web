import type { ReactNode } from "react";
import { Muncul } from "./Animasi";

export function JudulSeksi({ nomor, label, judul, sub }: { nomor: string; label: string; judul: ReactNode; sub?: string }) {
  return (
    <Muncul className="mb-12 max-w-2xl">
      <p className="mb-3 flex items-center gap-3 font-mono text-xs tracking-widest text-cyan uppercase">
        <span className="text-ink-faint">{nomor}</span>
        <span className="h-px w-10 bg-gradient-to-r from-cyan to-transparent" />
        {label}
      </p>
      <h2 className="font-display text-[clamp(1.9rem,4.5vw,3rem)] leading-tight font-bold tracking-tight">{judul}</h2>
      {sub && <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">{sub}</p>}
    </Muncul>
  );
}

export function Seksi({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl px-5">{children}</div>
    </section>
  );
}
