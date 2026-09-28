"use client";

import { motion } from "motion/react";

const WARNA = {
  cyan: ["#22d3ee", "#0891b2"],
  violet: ["#a78bfa", "#7c3aed"],
  emerald: ["#34d399", "#059669"],
};

// Ilustrasi peta sebaran: bubble berdenyut di atas garis pantai Sumatra-Riau yang disederhanakan
const TITIK = [
  { x: 38, y: 44, r: 16, w: "#f59e0b" }, // Pekanbaru
  { x: 46, y: 30, r: 13, w: "#14b8a6" }, // Dumai
  { x: 30, y: 50, r: 10, w: "#14b8a6" }, // Kampar
  { x: 50, y: 58, r: 8, w: "#14b8a6" },
  { x: 72, y: 40, r: 11, w: "#a855f7" }, // Batam
  { x: 20, y: 22, r: 7, w: "#a855f7" }, // Medan
  { x: 90, y: 16, r: 5, w: "#a855f7" },
  { x: 60, y: 48, r: 6, w: "#14b8a6" },
];

export function IlustrasiPeta() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#070b17] font-mono text-[10px] text-ink-faint">
      <svg viewBox="0 0 100 70" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="kisi" width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M6 0H0V6" fill="none" stroke="rgba(148,163,255,0.06)" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100" height="70" fill="url(#kisi)" />
        <motion.path
          d="M4 8 C 14 12, 22 18, 30 28 S 44 46, 52 54 S 62 66, 70 70 L 58 70 C 50 62, 40 58, 32 52 S 16 36, 8 24 Z"
          fill="rgba(52,211,153,0.06)"
          stroke="rgba(52,211,153,0.35)"
          strokeWidth="0.4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6 }}
        />
        <path d="M68 36 q4 -2 7 1 q-3 4 -7 -1Z M86 12 q3 -1 4 2 q-3 2 -4 -2Z" fill="rgba(52,211,153,0.1)" stroke="rgba(52,211,153,0.3)" strokeWidth="0.3" />
        {TITIK.map((t, i) => (
          <g key={i}>
            <motion.circle
              cx={t.x}
              cy={t.y}
              r={t.r / 3}
              fill={t.w}
              fillOpacity={0.35}
              stroke={t.w}
              strokeWidth="0.4"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 200, damping: 12 }}
              style={{ transformOrigin: `${t.x}px ${t.y}px`, transformBox: "view-box" }}
            />
            <motion.circle
              cx={t.x}
              cy={t.y}
              r={t.r / 3}
              fill="none"
              stroke={t.w}
              strokeWidth="0.3"
              animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
              style={{ transformOrigin: `${t.x}px ${t.y}px`, transformBox: "view-box" }}
            />
          </g>
        ))}
      </svg>
      <div className="absolute top-3 left-3 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-red-400/70" />
        <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
        <span className="ml-2">peta-sebaran / kab-kota</span>
      </div>
      <div className="absolute right-3 bottom-3 space-y-1 rounded-md border border-white/5 bg-black/50 p-2 backdrop-blur">
        {[["#f59e0b", "Dalam Kota"], ["#14b8a6", "Luar Kota Darat"], ["#a855f7", "Luar Kota Udara"]].map(([w, l]) => (
          <div key={l} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: w }} />
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}

// Ilustrasi dashboard mini beranimasi (dipakai bila tidak ada tangkapan layar)
export function IlustrasiDashboard({ warna = "cyan", varian = "jadwal" }: { warna?: keyof typeof WARNA; varian?: "jadwal" | "klinik" }) {
  const [a, b] = WARNA[warna];
  const batang = varian === "jadwal" ? [62, 38, 80, 54, 70, 45, 88, 58] : [40, 55, 48, 72, 66, 90, 78, 84];
  const kotak = varian === "jadwal" ? ["Dalam Kota", "Darat", "Udara", "Luar Negeri"] : ["Pasien", "Obat masuk", "Obat keluar", "Stok"];
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#070b17] p-4 font-mono text-[10px] text-ink-faint">
      <div className="mb-3 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-red-400/70" />
        <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
        <span className="ml-2 truncate">{varian === "jadwal" ? "jadwal-dinas / dashboard" : "klinik / analitik"}</span>
      </div>
      <div className="mb-3 grid grid-cols-4 gap-2">
        {kotak.map((k, i) => (
          <motion.div
            key={k}
            className="rounded-md border border-white/5 bg-white/[0.03] p-2"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i }}
          >
            <div className="truncate">{k}</div>
            <div className="mt-1 text-sm font-bold text-ink" style={{ color: i === 0 ? a : undefined }}>
              {[28, 25, 6, 3][i] + (varian === "klinik" ? 40 : 0)}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex h-[45%] items-end gap-2 rounded-md border border-white/5 bg-white/[0.02] p-2">
        {batang.map((t, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t"
            style={{ background: `linear-gradient(to top, ${b}, ${a})` }}
            initial={{ height: 0 }}
            whileInView={{ height: `${t}%` }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.07, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </div>
      <svg viewBox="0 0 200 40" className="mt-2 h-[18%] w-full" preserveAspectRatio="none">
        <motion.path
          d="M0 30 C 20 10, 40 34, 60 20 S 100 6, 120 18 S 160 30, 200 8"
          fill="none"
          stroke={a}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.4 }}
        />
      </svg>
    </div>
  );
}
