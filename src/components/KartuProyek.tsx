import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Proyek } from "@/data/profil";
import { KartuTilt, Muncul } from "./Animasi";
import { IlustrasiDashboard, IlustrasiPeta } from "./Ilustrasi";

const AKSEN = {
  cyan: "from-cyan/30 text-cyan",
  violet: "from-violet/30 text-violet",
  emerald: "from-emerald/30 text-emerald",
};

export default function KartuProyek({ p, besar = false, delay = 0 }: { p: Proyek; besar?: boolean; delay?: number }) {
  const gambar = p.gambar[0];
  return (
    <Muncul delay={delay} className={besar ? "lg:col-span-2" : ""}>
      <KartuTilt className="h-full rounded-3xl">
        <Link
          href={`/proyek/${p.slug}/`}
          className={`glass group relative flex h-full flex-col overflow-hidden rounded-3xl ${besar ? "lg:flex-row" : ""}`}
        >
          <div className={`relative overflow-hidden ${besar ? "aspect-[16/10] lg:aspect-auto lg:w-[58%]" : "aspect-[16/10]"}`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${AKSEN[p.warna].split(" ")[0]} to-transparent opacity-60`} />
            <div className="absolute inset-3 overflow-hidden rounded-xl ring-1 ring-white/10 transition-transform duration-700 group-hover:scale-[1.03]">
              {gambar ? (
                <Image src={gambar.src} alt={gambar.alt} fill sizes="(max-width: 1024px) 100vw, 640px" className="object-cover object-left-top" />
              ) : p.slug === "dashboard-kinerja-lspro" ? (
                <IlustrasiPeta />
              ) : (
                <IlustrasiDashboard warna={p.warna} varian={p.slug === "sistem-klinik" ? "klinik" : "jadwal"} />
              )}
            </div>
          </div>

          <div className="flex flex-1 flex-col p-6 sm:p-7">
            <p className={`font-mono text-[11px] tracking-wider uppercase ${AKSEN[p.warna].split(" ")[1]}`}>{p.kategori}</p>
            <h3 className="mt-2 font-display text-xl font-bold tracking-tight sm:text-2xl">{p.judul}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.ringkas}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.sorotan.map((s) => (
                <li key={s} className="rounded-lg bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-ink ring-1 ring-white/10">
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex items-end justify-between gap-4 pt-6">
              <p className="font-mono text-xs text-ink-faint">{p.stack.slice(0, 4).join(" · ")}</p>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 transition-all duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-bg">
                <ArrowUpRight size={18} />
              </span>
            </div>
          </div>
        </Link>
      </KartuTilt>
    </Muncul>
  );
}
