@AGENTS.md

# Website portofolio Ikhsan Nur Fadlie: aturan kerja untuk Claude

Selalu jawab dalam Bahasa Indonesia. Situs live: https://ikhsannurfadlie.vercel.app (Vercel men-deploy otomatis setiap push ke `main`).
Target karier user: **Data Analyst** (data science baru sebatas minat; jangan diklaim sebagai pengalaman).

## Aturan wajib

1. **Hanya user yang menjadi contributor.** Jangan menambahkan baris `Co-Authored-By` atau atribusi Claude di commit dan
   PR. Author commit tetap akun user.
2. **Semua isi ada di `src/data/profil.ts`.** Ubah teks di sana; komponen di `src/components/` hanya untuk tampilan.
3. **Bahasa Indonesia saja** di situs. Gaya developer/AI engineer dengan animasi. IPK boleh tampil tapi tidak mencolok.
   Status "open to work" tidak ditampilkan.
4. **Tidak ada data asli instansi atau klien.** Semua demo (`public/demo/`) memakai data fiktif. Jangan menyalin nama
   pelaku usaha, nomor SPK, ID spreadsheet, atau tangkapan layar berisi data BSPJI/klinik.
5. **CV publik (`public/cv-ikhsan-nur-fadlie.pdf`) tanpa nomor HP.** Isi harus sama dengan CV terbaru user.
6. **Klaim harus sesuai pekerjaan nyata.** Jangan menambah keahlian, angka, atau dampak yang tidak bisa dibuktikan;
   kalau ragu, tanya user.

## Teknis

- Next.js 16 + Tailwind 4 + Motion, `output: 'export'`, `trailingSlash`. Baca `node_modules/next/dist/docs/` sebelum
  menulis kode Next (lihat AGENTS.md). Tipe `PageProps<'/route'>` dibuat saat build/dev; `params` berupa Promise.
- Keanehan Vercel: `public/demo/x/dashboard.html` disajikan sebagai `/demo/x/dashboard/`, dan `/x/index.html` jadi 404.
  Tautan demo bergantung lingkungan (`.html` saat dev, `/` saat produksi, lihat `BingkaiDemo.tsx`), dan `data.js` di HTML
  demo harus beralamat lengkap `/demo/x/data.js`.
- Sebelum selesai: `npx tsc --noEmit` dan `npm run build` harus lolos.

## Status (15 Okt 2026)

Sudah diperbarui: pengalaman BSPJI (5 poin sesuai CV terbaru), Asisten Dosen = Paruh Waktu, sertifikat ISO 9001:2015,
peran tanpa "Data Scientist", CV publik baru tanpa nomor HP.

Belum dikerjakan (urutan saran, tanya user dulu):
1. **Proyek "Dashboard Monitoring Penugasan Auditor"** masih menggambarkan versi lama (Jadwal Dinas, Sep 2026). Dashboard
   LPH sekarang 9 halaman: Ikhtisar, Lacak Pengajuan, Pelaku Usaha, Peta Halal, Auditor Halal (giliran + siklus),
   Kalender Audit, Ke Mana Waktu Pergi, Laporan Triwulan (cetak/PDF), Kesehatan Data (admin), plus layar pembuka dan
   kode akses. Pisahkan jadi proyek sendiri "Dashboard Monitoring Sertifikasi Halal (LPH)" dengan narasi alur SIHALAL.
   Demo baru butuh data dummy; kodenya ada di repo privat `dashboard-lph` (bukan di repo ini).
2. Metrik proyek yang sudah tidak berlaku (mis. "30 dtk memuat ulang") diperiksa ulang.
3. Klaim "SQL" di stack Sistem Klinik dan "Power BI" di keahlian: konfirmasi ke user apakah benar dipakai.
4. Bagian sertifikasi: tampilkan juga sertifikat ISO di halaman (cek komponen yang membaca `sertifikasi`).
