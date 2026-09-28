"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, Download, MapPin } from "lucide-react";
import { profil } from "@/data/profil";
import { Magnet } from "./Animasi";
import { IkonGithub, IkonLinkedin } from "./Ikon";

function MesinKetik({ kata }: { kata: string[] }) {
  const [i, setI] = useState(0);
  const [teks, setTeks] = useState("");
  const [hapus, setHapus] = useState(false);

  useEffect(() => {
    const target = kata[i % kata.length];
    let jeda = hapus ? 40 : 85;
    let langkah = () => setTeks(hapus ? target.slice(0, teks.length - 1) : target.slice(0, teks.length + 1));
    if (!hapus && teks === target) {
      jeda = 1800;
      langkah = () => setHapus(true);
    } else if (hapus && teks === "") {
      jeda = 250;
      langkah = () => {
        setHapus(false);
        setI((v) => v + 1);
      };
    }
    const t = setTimeout(langkah, jeda);
    return () => clearTimeout(t);
  }, [teks, hapus, i, kata]);

  return (
    <span className="font-mono text-cyan">
      {teks}
      <span className="caret" />
    </span>
  );
}

const CHIP = [
  { label: "GraphRAG", kelas: "top-6 -left-6 sm:-left-12", delay: 0 },
  { label: "Python", kelas: "top-1/3 -right-4 sm:-right-10", delay: 0.6 },
  { label: "Neo4j", kelas: "bottom-16 -left-4 sm:-left-14", delay: 1.2 },
  { label: "Data Viz", kelas: "-bottom-3 right-6", delay: 1.8 },
];

export default function Hero() {
  const { scrollY } = useScroll();
  const yFoto = useTransform(scrollY, [0, 600], [0, 80]);
  const opac = useTransform(scrollY, [0, 500], [1, 0.2]);
  const kataNama = profil.nama.split(" ");

  return (
    <section id="beranda" className="relative flex min-h-[100svh] items-center pt-28 pb-16">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.25fr_1fr]">
        <motion.div style={{ opacity: opac }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-ink-soft"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
            </span>
            Terbuka untuk peluang kerja · Data & AI
          </motion.div>

          <p className="mb-3 font-mono text-sm text-ink-faint">
            <span className="text-violet">const</span> halo = <span className="text-emerald">&quot;Saya&quot;</span>;
          </p>

          <h1 className="font-display text-[clamp(2.6rem,7vw,5rem)] leading-[1.02] font-bold tracking-tight">
            {kataNama.map((kata, k) => (
              <motion.span
                key={k}
                className="text-gradient mr-[0.25em] inline-block whitespace-nowrap"
                initial={{ opacity: 0, y: 40, rotateX: -80, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.15 + k * 0.14, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {kata}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-5 h-9 font-display text-[clamp(1.25rem,3vw,1.75rem)] font-semibold text-ink"
          >
            <MesinKetik kata={profil.peran} />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg"
          >
            {profil.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Magnet>
              <a
                href="#proyek"
                className="btn-glow group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white"
              >
                Lihat proyek saya
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </Magnet>
            <Magnet>
              <a
                href={profil.cv}
                download
                className="glass inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-cyan/50 hover:text-cyan"
              >
                <Download size={16} /> Unduh CV
              </a>
            </Magnet>
            <div className="flex items-center gap-1 pl-1">
              <a href={profil.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn"
                className="grid h-11 w-11 place-items-center rounded-xl text-ink-soft transition hover:bg-white/5 hover:text-cyan">
                <IkonLinkedin />
              </a>
              <a href={profil.github} target="_blank" rel="noopener" aria-label="GitHub"
                className="grid h-11 w-11 place-items-center rounded-xl text-ink-soft transition hover:bg-white/5 hover:text-white">
                <IkonGithub />
              </a>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-6 inline-flex items-center gap-1.5 text-sm text-ink-faint"
          >
            <MapPin size={14} /> {profil.lokasi}
          </motion.p>
        </motion.div>

        <motion.div
          style={{ y: yFoto }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[340px] lg:max-w-[380px]"
        >
          <div className="relative aspect-[4/5]">
            <div className="absolute -inset-[3px] overflow-hidden rounded-[2rem]">
              <div className="ring-spin absolute -inset-[60%]" />
            </div>
            <div className="absolute -inset-10 -z-10 rounded-full bg-violet-600/30 blur-3xl" />
            <div className="relative h-full overflow-hidden rounded-[1.85rem] bg-surface-solid">
              <Image
                src={profil.foto}
                alt={`Foto ${profil.nama}`}
                fill
                priority
                sizes="(max-width: 1024px) 340px, 380px"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/90 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[11px] text-ink-soft">
                <span>S.T. · Teknik Informatika</span>
                <span className="text-emerald">● online</span>
              </div>
            </div>
            {CHIP.map((c) => (
              <motion.span
                key={c.label}
                className={`glass absolute ${c.kelas} rounded-xl px-3 py-1.5 font-mono text-xs font-medium text-ink shadow-lg`}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                transition={{
                  opacity: { delay: 1.2 + c.delay * 0.3 },
                  scale: { delay: 1.2 + c.delay * 0.3 },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: c.delay },
                }}
              >
                {c.label}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#tentang"
        aria-label="Gulir ke bawah"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-ink-faint hover:text-white sm:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  );
}
