import { profil } from "@/data/profil";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-ink-faint sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profil.nama}
        </p>
        <p className="font-mono text-xs">Dibangun dengan Next.js · Tailwind CSS · Motion</p>
      </div>
    </footer>
  );
}
