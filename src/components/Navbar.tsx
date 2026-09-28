"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { Menu, X, Download } from "lucide-react";
import { navigasi, profil } from "@/data/profil";

export default function Navbar() {
  const pathname = usePathname();
  const diBeranda = pathname === "/";
  const [aktif, setAktif] = useState("");
  const [buka, setBuka] = useState(false);
  const [tergulir, setTergulir] = useState(false);
  const { scrollYProgress } = useScroll();
  const progres = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setTergulir(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!diBeranda) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setAktif(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navigasi.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [diBeranda]);

  const href = (id: string) => (diBeranda ? `#${id}` : `/#${id}`);

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400"
        style={{ scaleX: progres }}
      />
      <header className="fixed inset-x-0 top-3 z-40 px-3">
        <nav
          className={`mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-2xl px-3 py-2 transition-all duration-300 ${
            tergulir ? "glass shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]" : "border border-transparent"
          }`}
        >
          <Link href="/" className="group flex items-center gap-2 font-display font-bold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 text-[11px] font-bold text-white shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-transform group-hover:rotate-12">
              {profil.inisial}
            </span>
            <span className="hidden sm:inline">{profil.nama}</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navigasi.map((n) => (
              <li key={n.id} className="relative">
                <Link
                  href={href(n.id)}
                  className={`relative z-10 block rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    aktif === n.id ? "text-white" : "text-ink-soft hover:text-white"
                  }`}
                >
                  {n.label}
                </Link>
                {aktif === n.id && (
                  <motion.span
                    layoutId="nav-aktif"
                    className="absolute inset-0 rounded-lg bg-white/[0.07] ring-1 ring-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={profil.cv}
              download
              className="btn-glow hidden items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-white sm:inline-flex"
            >
              <Download size={15} /> CV
            </a>
            <button
              onClick={() => setBuka((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-lg text-ink-soft hover:bg-white/5 md:hidden"
              aria-label={buka ? "Tutup menu" : "Buka menu"}
            >
              {buka ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {buka && (
            <motion.ul
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              className="glass mx-auto mt-2 max-w-5xl rounded-2xl p-2 md:hidden"
            >
              {navigasi.map((n) => (
                <li key={n.id}>
                  <Link
                    href={href(n.id)}
                    onClick={() => setBuka(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-white/5 hover:text-white"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={profil.cv} download className="mt-1 block rounded-lg px-3 py-2.5 text-sm font-semibold text-cyan">
                  Unduh CV
                </a>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
