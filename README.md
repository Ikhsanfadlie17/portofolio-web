# Website Portofolio · Ikhsan Nur Fadlie

Portofolio pribadi (Data Analyst & AI Engineer) dengan Next.js 16, Tailwind CSS 4, dan Motion.

## Mengubah isi
Semua teks ada di **`src/data/profil.ts`**: profil, statistik, proyek, pengalaman, keahlian, pendidikan, sertifikasi, dan organisasi.
Foto dan gambar ada di `public/img/`, CV di `public/cv-ikhsan-nur-fadlie.pdf`, demo dashboard (data fiktif) di `public/demo/*/dashboard.html`.
Nama file demo sengaja **bukan** `index.html`: Vercel tidak menyajikan `/folder/index.html` secara langsung, sedangkan `next dev` tidak menyajikan `/folder/`.

## Menjalankan
```
npm install
npm run dev      # http://localhost:3000
npm run build    # hasil statis di folder out/
```

## Hosting
- **Vercel** (disarankan): import repo di vercel.com → Deploy. Tidak perlu pengaturan tambahan.
- **GitHub Pages**: unggah isi folder `out/` (atau pakai GitHub Actions "Next.js" bawaan Pages).
