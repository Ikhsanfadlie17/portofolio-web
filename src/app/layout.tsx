import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { profil } from "@/data/profil";
import LatarNeural from "@/components/LatarNeural";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const display = Space_Grotesk({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(profil.situs),
  title: {
    default: `${profil.nama} · Data Analyst & AI Engineer`,
    template: `%s · ${profil.nama}`,
  },
  description: profil.tagline,
  openGraph: {
    title: `${profil.nama} · Data Analyst & AI Engineer`,
    description: profil.tagline,
    images: [profil.fotoAvatar],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} ${display.variable} antialiased`}>
      <body className="min-h-screen">
        <LatarNeural />
        <Navbar />
        <div className="relative z-10">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
