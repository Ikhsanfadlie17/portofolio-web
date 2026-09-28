"use client";

import { useState } from "react";
import { Check, Copy, Download, Mail } from "lucide-react";
import { profil } from "@/data/profil";
import { KartuTilt, Magnet, Muncul } from "./Animasi";
import { IkonGithub, IkonLinkedin } from "./Ikon";

export default function Kontak() {
  const [tersalin, setTersalin] = useState(false);

  async function salin() {
    try {
      await navigator.clipboard.writeText(profil.email);
      setTersalin(true);
      setTimeout(() => setTersalin(false), 2000);
    } catch {
      window.location.href = `mailto:${profil.email}`;
    }
  }

  return (
    <section id="kontak" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5">
        <Muncul>
          <KartuTilt className="rounded-[2rem]">
            <div className="glass relative overflow-hidden rounded-[2rem] px-6 py-14 text-center sm:px-14 sm:py-20">
              <div className="absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-violet-600/30 blur-3xl" />
              <div className="absolute -bottom-24 left-1/3 h-56 w-[28rem] rounded-full bg-cyan-500/20 blur-3xl" />
              <p className="relative font-mono text-xs tracking-widest text-cyan uppercase">06 — Kontak</p>
              <h2 className="relative mt-4 font-display text-[clamp(2rem,5.5vw,3.6rem)] leading-tight font-bold tracking-tight">
                Punya data yang perlu <span className="text-gradient">dijadikan keputusan?</span>
              </h2>
              <p className="relative mx-auto mt-5 max-w-xl text-ink-soft sm:text-lg">
                Saya terbuka untuk posisi Data Analyst, Data Scientist, dan AI Engineer, baik penuh waktu maupun
                proyek. Siap ditempatkan di mana saja.
              </p>

              <div className="relative mt-9 flex flex-wrap items-center justify-center gap-3">
                <Magnet>
                  <a href={`mailto:${profil.email}`} className="btn-glow inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-white">
                    <Mail size={18} /> Kirim email
                  </a>
                </Magnet>
                <button
                  onClick={salin}
                  className="glass inline-flex items-center gap-2 rounded-xl px-4 py-3.5 font-mono text-sm text-ink-soft transition hover:text-white"
                  aria-label="Salin alamat email"
                >
                  {tersalin ? <Check size={16} className="text-emerald" /> : <Copy size={16} />}
                  {tersalin ? "Tersalin!" : profil.email}
                </button>
              </div>

              <div className="relative mt-6 flex items-center justify-center gap-2">
                <a href={profil.linkedin} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-ink-soft transition hover:bg-white/5 hover:text-cyan">
                  <IkonLinkedin size={16} /> LinkedIn
                </a>
                <a href={profil.github} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-ink-soft transition hover:bg-white/5 hover:text-white">
                  <IkonGithub size={16} /> GitHub
                </a>
                <a href={profil.cv} download className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-ink-soft transition hover:bg-white/5 hover:text-emerald">
                  <Download size={16} /> CV
                </a>
              </div>
            </div>
          </KartuTilt>
        </Muncul>
      </div>
    </section>
  );
}
