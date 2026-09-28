import Image from "next/image";
import Link from "next/link";
import { Award, BookOpen, Brain, ChartColumn, Code2, ExternalLink, GraduationCap, Layers, Users } from "lucide-react";
import Hero from "@/components/Hero";
import KartuProyek from "@/components/KartuProyek";
import Linimasa from "@/components/Linimasa";
import Kontak from "@/components/Kontak";
import { HitungNaik, KartuTilt, Muncul } from "@/components/Animasi";
import { JudulSeksi, Seksi } from "@/components/Seksi";
import {
  keahlian,
  marquee,
  organisasi,
  pendidikan,
  pengalaman,
  profil,
  proyek,
  sertifikasi,
  softSkill,
  statistik,
} from "@/data/profil";

const IKON_KEAHLIAN = { brain: Brain, chart: ChartColumn, code: Code2, layers: Layers } as const;

export default function Beranda() {
  return (
    <main>
      <Hero />

      {/* 01 Tentang */}
      <Seksi id="tentang">
        <JudulSeksi
          nomor="01"
          label="Tentang saya"
          judul={
            <>
              Dari <span className="text-gradient">data berantakan</span> ke sistem yang bisa menjelaskan dirinya.
            </>
          }
        />
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            {profil.tentang.map((t, i) => (
              <Muncul key={i} delay={i * 0.1}>
                <p>{t}</p>
              </Muncul>
            ))}
            <Muncul delay={0.3}>
              <div className="flex flex-wrap gap-2 pt-2">
                {softSkill.map((s) => (
                  <span key={s} className="rounded-full px-3 py-1 text-sm text-ink ring-1 ring-white/10">
                    {s}
                  </span>
                ))}
              </div>
            </Muncul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {statistik.map((s, i) => (
              <Muncul key={s.label} delay={0.1 * i}>
                <KartuTilt className="h-full rounded-2xl">
                  <div className="glass flex h-full flex-col justify-between rounded-2xl p-5">
                    <p className="font-display text-4xl font-bold tracking-tight text-gradient sm:text-5xl">
                      <HitungNaik nilai={s.nilai} desimal={s.desimal} akhiran={s.akhiran} />
                    </p>
                    <p className="mt-3 text-sm leading-snug text-ink-soft">{s.label}</p>
                  </div>
                </KartuTilt>
              </Muncul>
            ))}
          </div>
        </div>
      </Seksi>

      {/* 02 Proyek */}
      <Seksi id="proyek">
        <JudulSeksi
          nomor="02"
          label="Proyek unggulan"
          judul={
            <>
              Hal yang sudah saya <span className="text-gradient">bangun</span>.
            </>
          }
          sub="Klik kartu untuk studi kasus lengkap: masalah, pendekatan, hasil, dan demo."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {proyek.map((p, i) => (
            <KartuProyek key={p.slug} p={p} besar={i === 0 || (i === proyek.length - 1 && proyek.length % 2 === 0)} delay={i * 0.08} />
          ))}
        </div>
      </Seksi>

      {/* 03 Pengalaman */}
      <Seksi id="pengalaman">
        <JudulSeksi
          nomor="03"
          label="Pengalaman"
          judul={
            <>
              Jejak <span className="text-gradient">kerja nyata</span>.
            </>
          }
        />
        <Linimasa data={pengalaman} />
      </Seksi>

      {/* 04 Keahlian */}
      <Seksi id="keahlian">
        <JudulSeksi
          nomor="04"
          label="Keahlian"
          judul={
            <>
              Perkakas yang saya <span className="text-gradient">pakai setiap hari</span>.
            </>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {keahlian.map((k, i) => {
            const Ikon = IKON_KEAHLIAN[k.ikon as keyof typeof IKON_KEAHLIAN];
            return (
              <Muncul key={k.kelompok} delay={i * 0.08}>
                <KartuTilt className="h-full rounded-2xl">
                  <div className="glass h-full rounded-2xl p-6">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet/25 to-cyan/20 text-cyan ring-1 ring-white/10">
                        <Ikon size={19} />
                      </span>
                      <h3 className="font-display text-lg font-bold">{k.kelompok}</h3>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {k.item.map((t) => (
                        <span
                          key={t}
                          className="rounded-lg bg-white/[0.04] px-3 py-1.5 text-sm text-ink ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:ring-cyan/50"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </KartuTilt>
              </Muncul>
            );
          })}
        </div>
        <div className="marquee mt-12 overflow-hidden py-2">
          <div className="marquee-track flex w-max gap-10">
            {[...marquee, ...marquee].map((t, i) => (
              <span key={i} className="font-display text-2xl font-semibold whitespace-nowrap text-white/15 sm:text-3xl">
                {t}
              </span>
            ))}
          </div>
        </div>
      </Seksi>

      {/* 05 Pendidikan, sertifikasi, organisasi */}
      <Seksi id="pendidikan">
        <JudulSeksi
          nomor="05"
          label="Pendidikan & kepemimpinan"
          judul={
            <>
              Belajar, <span className="text-gradient">memimpin</span>, lalu berbagi.
            </>
          }
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {pendidikan.map((e, i) => (
            <Muncul key={e.kampus} delay={i * 0.08}>
              <div className="glass h-full rounded-2xl p-6">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet/15 text-violet ring-1 ring-white/10">
                    <GraduationCap size={19} />
                  </span>
                  <span className="font-mono text-xs text-ink-faint">{e.periode}</span>
                </div>
                <h3 className="mt-4 font-display text-xl font-bold">{e.kampus}</h3>
                <p className="text-sm font-medium text-cyan">{e.program}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-ink-soft">
                  {e.detail.map((d) => (
                    <li key={d} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan" />
                      {d}
                    </li>
                  ))}
                </ul>
                {e.ipk && <p className="mt-4 font-mono text-xs text-ink-faint">IPK {e.ipk}</p>}
              </div>
            </Muncul>
          ))}
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.4fr]">
          <Muncul>
            <div className="glass h-full rounded-2xl p-6">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold">
                <Award size={18} className="text-emerald" /> Sertifikasi
              </h3>
              <ul className="mt-4 space-y-4">
                {sertifikasi.map((s) => (
                  <li key={s.judul} className="rounded-xl bg-white/[0.03] p-4 ring-1 ring-white/5">
                    <p className="font-semibold">{s.judul}</p>
                    <p className="text-sm text-ink-soft">
                      {s.penerbit} · {s.tanggal}
                    </p>
                    <p className="mt-1 font-mono text-[11px] break-all text-ink-faint">ID {s.id}</p>
                    {s.link && (
                      <a href={s.link} target="_blank" rel="noopener" className="mt-2 inline-flex items-center gap-1 text-sm text-cyan hover:underline">
                        Lihat kredensial <ExternalLink size={13} />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Muncul>
          <Muncul delay={0.1}>
            <div className="glass h-full rounded-2xl p-6">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold">
                <Users size={18} className="text-pink" /> Organisasi & kepemimpinan
              </h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {organisasi.map((o) => (
                  <li key={o.peran} className="rounded-xl bg-white/[0.03] p-4 ring-1 ring-white/5 transition hover:ring-pink/40">
                    <p className="font-semibold">{o.peran}</p>
                    <p className="text-xs text-ink-faint">
                      {o.tempat} · {o.periode}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{o.isi}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Muncul>
        </div>

        <Muncul className="mt-5">
          <div className="glass flex flex-col items-center gap-5 rounded-2xl p-6 sm:flex-row">
            <Image src={profil.fotoAvatar} alt="" width={72} height={72} className="rounded-full ring-2 ring-violet/60" />
            <div className="text-center sm:text-left">
              <p className="flex items-center justify-center gap-2 font-display font-bold sm:justify-start">
                <BookOpen size={16} className="text-cyan" /> Skripsi
              </p>
              <p className="mt-1 text-ink-soft">
                &ldquo;Sistem Rekomendasi Latihan Fitness Berbasis Semantic Science-Based Training Menggunakan GraphRAG&rdquo;,
                dengan penilaian pakar 4,65/5.{" "}
                <Link href="/proyek/graphrag-fitness/" className="text-cyan hover:underline">
                  Lihat studi kasus →
                </Link>
              </p>
            </div>
          </div>
        </Muncul>
      </Seksi>

      <Kontak />
    </main>
  );
}
