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

Selesai 15 Okt (sesi kedua):
- Proyek baru **"Dashboard Monitoring Sertifikasi Halal (LPH)"** (slug `dashboard-sertifikasi-halal`): 9 halaman, narasi
  alur SIHALAL, metrik 9 halaman / ±130 pengajuan / 7 tahap / 17 pemeriksaan / 12 ruang lingkup (dikonfirmasi user,
  termasuk "dipakai tim LPH"). Demo `public/demo/lph-halal/`: 130 pengajuan fiktif, langsung terbuka sebagai admin (tanpa
  kode akses), logo asli BSPJI + Halal Indonesia di layar pembuka (pilihan user), lencana "DEMO · data fiktif".
- Bangun ulang demo: `python tools/demo-lph/buat-data.py <dir>` lalu `node tools/demo-lph/bangun.js <clone dashboard-lph> <dir>`.
  `Code.js` (berisi ID spreadsheet) tidak disalin; yang dipublikasikan hanya hasil olahan (`data.js`) dan frontend.
  Frontend memakai `DATA.diperbarui` sebagai "hari ini", jadi demo selalu tampil per 15 Okt 2026.
- Proyek lama "Dashboard Monitoring Penugasan Auditor" dihapus beserta demo `lph/` dan `lspro/` (permintaan user), sehingga
  metrik usang "30 dtk memuat ulang" ikut hilang.
- Proyek LSPro diperbarui mengikuti repo privat `dashboard-lspro`: 7 halaman (tambah Rotasi Tugas), kode akses, audit
  kualitas data. Demo `lspro-kinerja/` masih versi 6 halaman (disebut di catatan proyek).
- Ilustrasi kartu: varian `jadwal` diganti `halal` (angkanya sama dengan Ikhtisar demo).

Belum dikerjakan (urutan saran, tanya user dulu):
1. Periode proyek LPH ditulis "Oktober 2026 – sekarang" (commit pertama repo 7 Okt); konfirmasi ke user.
2. Demo LSPro belum memuat tab Rotasi Tugas; butuh data dummy + `DinasData.js` dari repo `dashboard-lspro`.
3. Klaim "SQL" di stack Sistem Klinik dan "Power BI" di keahlian: konfirmasi ke user apakah benar dipakai.
4. Sertifikasi: `page.tsx` sudah me-render semua isi `sertifikasi`, jadi ISO 9001 seharusnya sudah tampil; cek di situs live.
5. Beranda melebar ±20 px di layar HP (elemen `ring-spin` di Hero keluar dari layar); halaman proyek tidak.
