import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Info, UserRound } from "lucide-react";
import { proyek } from "@/data/profil";
import { HitungTeks, KartuTilt, Muncul } from "@/components/Animasi";
import BingkaiDemo from "@/components/BingkaiDemo";
import { IlustrasiDashboard } from "@/components/Ilustrasi";

export function generateStaticParams() {
  return proyek.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/proyek/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = proyek.find((x) => x.slug === slug);
  return p ? { title: p.judul, description: p.ringkas } : {};
}

export default async function HalamanProyek({ params }: PageProps<"/proyek/[slug]">) {
  const { slug } = await params;
  const i = proyek.findIndex((x) => x.slug === slug);
  if (i === -1) notFound();
  const p = proyek[i];
  const berikut = proyek[(i + 1) % proyek.length];

  return (
    <main className="mx-auto max-w-5xl px-5 pt-32 pb-20">
      <Muncul>
        <Link href="/#proyek" className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-white">
          <ArrowLeft size={15} /> Semua proyek
        </Link>
        <p className="mt-8 font-mono text-xs tracking-widest text-cyan uppercase">{p.kategori}</p>
        <h1 className="mt-3 font-display text-[clamp(2rem,5.5vw,3.6rem)] leading-[1.08] font-bold tracking-tight text-gradient">
          {p.judul}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-soft">{p.ringkas}</p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
          <span className="inline-flex items-center gap-1.5"><CalendarDays size={15} className="text-violet" /> {p.periode}</span>
          <span className="inline-flex items-center gap-1.5"><UserRound size={15} className="text-violet" /> {p.peran}</span>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span key={s} className="rounded-lg bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-ink ring-1 ring-white/10">{s}</span>
          ))}
        </div>
      </Muncul>

      {p.gambar[0] && (
        <Muncul delay={0.1} className="mt-12">
          <figure className="glass overflow-hidden rounded-2xl p-2">
            <Image src={p.gambar[0].src} alt={p.gambar[0].alt} width={p.gambar[0].lebar} height={p.gambar[0].tinggi} priority className="w-full rounded-xl" />
            <figcaption className="px-3 py-2.5 text-sm text-ink-faint">{p.gambar[0].keterangan}</figcaption>
          </figure>
        </Muncul>
      )}
      {!p.gambar[0] && p.demo.length === 0 && (
        <Muncul delay={0.1} className="mt-12">
          <div className="glass aspect-[16/8] rounded-2xl p-2">
            <IlustrasiDashboard warna={p.warna} varian="klinik" />
          </div>
          <p className="mt-2 text-center text-xs text-ink-faint">Ilustrasi, bukan tangkapan layar asli.</p>
        </Muncul>
      )}

      {/* Metrik */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold">Hasil</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          {p.metrik.map((m, k) => (
            <Muncul key={m.label} delay={k * 0.06}>
              <KartuTilt className="h-full rounded-2xl">
                <div className="glass h-full rounded-2xl p-5">
                  <p className="font-display text-3xl font-bold text-gradient sm:text-4xl"><HitungTeks teks={m.nilai} /></p>
                  <p className="mt-2 text-sm leading-snug text-ink-soft">{m.label}</p>
                </div>
              </KartuTilt>
            </Muncul>
          ))}
        </div>
      </section>

      {/* Konteks & masalah */}
      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <Muncul>
          <h2 className="font-display text-2xl font-bold">Konteks</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{p.konteks}</p>
        </Muncul>
        <Muncul delay={0.1}>
          <div className="glass rounded-2xl p-6">
            <h3 className="font-display text-lg font-bold text-pink">Masalah</h3>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-soft">
              {p.masalah.map((m) => (
                <li key={m} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-pink" />{m}</li>
              ))}
            </ul>
          </div>
        </Muncul>
      </section>

      {/* Pendekatan */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold">Yang saya kerjakan</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-2">
          {p.pendekatan.map((a, k) => (
            <Muncul key={a.judul} delay={k * 0.06}>
              <li className="glass h-full rounded-2xl p-6">
                <span className="font-mono text-xs text-cyan">{String(k + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-lg font-bold">{a.judul}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{a.isi}</p>
              </li>
            </Muncul>
          ))}
        </ol>
      </section>

      {/* Demo interaktif */}
      {p.demo.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold">Demo interaktif</h2>
          <p className="mt-2 text-ink-soft">Semua filter, grafik, dan panel detail berfungsi. Buka layar penuh untuk pengalaman terbaik.</p>
          <div className="mt-6 space-y-8">
            {p.demo.map((d) => (
              <Muncul key={d.href}>
                <h3 className="mb-1 font-display text-lg font-bold">{d.judul}</h3>
                <p className="mb-4 text-sm text-ink-soft">{d.deskripsi}</p>
                <BingkaiDemo href={d.href} judul={d.judul} />
              </Muncul>
            ))}
          </div>
        </section>
      )}

      {/* Galeri */}
      {p.gambar.length > 1 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold">Tampilan sistem</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {p.gambar.slice(1).map((g) => (
              <Muncul key={g.src}>
                <figure className="glass overflow-hidden rounded-2xl p-2">
                  <Image src={g.src} alt={g.alt} width={g.lebar} height={g.tinggi} className="w-full rounded-xl" />
                  <figcaption className="px-3 py-2.5 text-sm text-ink-faint">{g.keterangan}</figcaption>
                </figure>
              </Muncul>
            ))}
          </div>
        </section>
      )}

      {p.catatan && (
        <Muncul className="mt-12">
          <p className="flex gap-3 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5 text-sm leading-relaxed text-amber-100/80">
            <Info size={18} className="mt-0.5 shrink-0 text-amber-300" />
            {p.catatan}
          </p>
        </Muncul>
      )}

      <Muncul className="mt-20">
        <Link href={`/proyek/${berikut.slug}/`} className="glass group flex items-center justify-between gap-4 rounded-2xl p-6 transition hover:border-violet/40">
          <div>
            <p className="font-mono text-xs text-ink-faint">Proyek berikutnya</p>
            <p className="mt-1 font-display text-xl font-bold">{berikut.judul}</p>
          </div>
          <ArrowRight className="shrink-0 text-cyan transition-transform group-hover:translate-x-1" />
        </Link>
      </Muncul>
    </main>
  );
}
