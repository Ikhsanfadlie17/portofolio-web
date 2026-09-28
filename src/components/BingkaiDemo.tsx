"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Maximize2 } from "lucide-react";

// Pratinjau langsung demo dashboard: iframe selebar 1280px diperkecil agar pas dengan kotak
export default function BingkaiDemo({ href, judul }: { href: string; judul: string }) {
  const kotak = useRef<HTMLDivElement>(null);
  const [skala, setSkala] = useState(0.5);
  const [muat, setMuat] = useState(false);

  useEffect(() => {
    const el = kotak.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSkala(el.clientWidth / 1280));
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setMuat(true), { rootMargin: "300px" });
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div className="glass overflow-hidden rounded-2xl">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        <span className="ml-2 truncate font-mono text-xs text-ink-faint">{judul}</span>
        <a href={href} target="_blank" rel="noopener" className="ml-auto inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-cyan hover:bg-white/5">
          <Maximize2 size={13} /> Layar penuh
        </a>
      </div>
      <div ref={kotak} className="relative aspect-[16/10] bg-[#EEF2FA]">
        {muat && (
          <iframe
            src={href}
            title={judul}
            className="absolute top-0 left-0 border-0"
            style={{ width: 1280, height: 800, transform: `scale(${skala})`, transformOrigin: "0 0" }}
          />
        )}
      </div>
      <a href={href} target="_blank" rel="noopener" className="flex items-center justify-center gap-1.5 py-3 text-sm font-medium text-ink-soft hover:text-white sm:hidden">
        Buka demo interaktif <ExternalLink size={14} />
      </a>
    </div>
  );
}
