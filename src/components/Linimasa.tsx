"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { Briefcase } from "lucide-react";
import type { Pengalaman } from "@/data/profil";

// Linimasa pengalaman: garis tergambar mengikuti gulir, kartu muncul bergantian
export default function Linimasa({ data }: { data: Pengalaman[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const tinggi = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div ref={ref} className="relative">
      <div className="absolute top-2 bottom-2 left-[19px] w-px bg-white/10 sm:left-1/2" />
      <motion.div
        style={{ scaleY: tinggi }}
        className="absolute top-2 bottom-2 left-[19px] w-px origin-top bg-gradient-to-b from-violet via-cyan to-emerald sm:left-1/2"
      />
      <ol className="space-y-10">
        {data.map((p, i) => {
          const kanan = i % 2 === 1;
          return (
            <li key={p.jabatan + p.tempat} className="relative grid gap-4 pl-14 sm:grid-cols-2 sm:gap-12 sm:pl-0">
              <motion.span
                className="absolute top-5 left-[7px] grid h-6 w-6 place-items-center rounded-full bg-bg ring-2 ring-cyan sm:left-1/2 sm:-translate-x-1/2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <span className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_12px_#22d3ee]" />
              </motion.span>
              <motion.div
                className={`glass rounded-2xl p-6 ${kanan ? "sm:col-start-2" : "sm:col-start-1"}`}
                initial={{ opacity: 0, x: kanan ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs text-cyan">{p.periode}</span>
                  <span className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-ink-soft">{p.jenis}</span>
                </div>
                <h3 className="mt-3 flex items-center gap-2 font-display text-xl font-bold">
                  <Briefcase size={17} className="text-violet" /> {p.jabatan}
                </h3>
                <p className="text-sm font-medium text-ink-soft">{p.tempat}</p>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink-soft">
                  {p.poin.map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet" />
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tag.map((t) => (
                    <span key={t} className="rounded-md px-2 py-0.5 font-mono text-[11px] text-ink-faint ring-1 ring-white/10">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
