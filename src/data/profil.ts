// Semua isi website ada di file ini. Ubah teks di sini tanpa perlu menyentuh komponen.

export const profil = {
  nama: "Ikhsan Nur Fadlie",
  namaPendek: "Ikhsan",
  inisial: "INF",
  situs: "https://ikhsannurfadlie.vercel.app",
  peran: ["Data Analyst", "Dashboard Developer", "AI Engineer", "GraphRAG & LLM Builder"],
  tagline:
    "Mengubah data mentah menjadi keputusan, mulai dari dashboard monitoring instansi hingga sistem rekomendasi berbasis GraphRAG dan Large Language Model.",
  lokasi: "Pekanbaru, Riau · siap ditempatkan di mana saja",
  email: "iksannurfadlie17@gmail.com",
  linkedin: "https://www.linkedin.com/in/ikhsannurfadlie",
  github: "https://github.com/Ikhsanfadlie17",
  cv: "/cv-ikhsan-nur-fadlie.pdf",
  foto: "/img/foto-portrait.webp",
  fotoAvatar: "/img/foto-avatar.webp",
  tentang: [
    "Saya lulusan S1 Teknik Informatika Universitas Islam Riau dengan fokus Kecerdasan Buatan dan Data Science. Saya senang memecahkan masalah nyata dengan data: merapikan data yang berantakan, menemukan polanya, lalu menyajikannya dalam bentuk yang langsung bisa dipakai untuk mengambil keputusan.",
    "Skripsi saya membangun sistem rekomendasi latihan fitness berbasis GraphRAG, yaitu gabungan knowledge graph Neo4j dan LLM yang jawabannya bisa dijelaskan secara ilmiah. Di dunia kerja, saya membangun dashboard monitoring untuk instansi pemerintah dan sistem manajemen klinik berbasis web.",
    "Di luar teknis, saya terbiasa memimpin: dari Ketua Modul Nusantara yang membawahi 26 mahasiswa dari 19 universitas, hingga Ketua Humas organisasi robotik & IoT.",
  ],
};

export const statistik = [
  { nilai: 4.65, desimal: 2, akhiran: "/5", label: "skor penilaian pakar untuk sistem GraphRAG skripsi" },
  { nilai: 95, desimal: 0, akhiran: "", label: "Context Precision retrieval knowledge graph" },
  { nilai: 3, desimal: 0, akhiran: "", label: "pengalaman kerja: data, backend, asisten dosen" },
  { nilai: 26, desimal: 0, akhiran: "", label: "mahasiswa dari 19 universitas yang saya pimpin" },
];

export type Metrik = { nilai: string; label: string };
export type Gambar = { src: string; alt: string; keterangan: string; lebar: number; tinggi: number };
export type Demo = { judul: string; href: string; deskripsi: string };

export type Proyek = {
  slug: string;
  judul: string;
  kategori: string;
  ringkas: string;
  periode: string;
  peran: string;
  warna: "cyan" | "violet" | "emerald";
  stack: string[];
  sorotan: string[];
  konteks: string;
  masalah: string[];
  pendekatan: { judul: string; isi: string }[];
  metrik: Metrik[];
  gambar: Gambar[];
  demo: Demo[];
  catatan?: string;
};

export const proyek: Proyek[] = [
  {
    slug: "graphrag-fitness",
    judul: "Sistem Rekomendasi Latihan Fitness Berbasis GraphRAG",
    kategori: "AI · LLM · Knowledge Graph · Skripsi",
    ringkas:
      "Asisten latihan yang menjawab dengan dasar ilmiah: knowledge graph Neo4j dari dataset MegaGym dan 10 literatur fisiologi latihan, digabung dengan LLM lewat graph-guided retrieval.",
    periode: "2025 – 2026",
    peran: "Peneliti & pengembang tunggal (skripsi S1)",
    warna: "violet",
    stack: ["Python", "Neo4j", "Cypher", "LangChain", "OpenAI GPT", "Flask", "Next.js", "RAG Evaluation"],
    sorotan: ["Overall Score 79,67 (Baik)", "Context Precision 95", "Skor pakar 4,65 / 5"],
    konteks:
      "Sistem rekomendasi fitness yang ada umumnya generik dan tidak bisa menjelaskan kenapa sebuah latihan direkomendasikan. Penelitian ini membangun sistem yang rekomendasinya akurat, berbasis bukti ilmiah, dan bisa ditelusuri.",
    masalah: [
      "Rekomendasi latihan yang ada bersifat generik dan tidak transparan.",
      "LLM biasa rawan berhalusinasi ketika menjawab pertanyaan domain spesifik.",
      "Pengetahuan fisiologi latihan tersebar di literatur ilmiah, tidak terstruktur.",
    ],
    pendekatan: [
      {
        judul: "Scientific Fitness Knowledge Graph",
        isi: "Membangun graf dengan 7 tipe node (Exercise, BodyPart, Equipment, Technique, InjuryRisk, ScienceConcept, Level) dan 6 tipe relasi dari dataset MegaGym serta 10 literatur ilmiah, disimpan di Neo4j.",
      },
      {
        judul: "Semantic typing dengan LLM",
        isi: "Konsep ilmiah dikelompokkan otomatis memakai pendekatan LLM-as-a-Clusterer; 91,5% node ScienceConcept masuk kategori yang kohesif secara semantik.",
      },
      {
        judul: "Graph-guided retrieval",
        isi: "Entity detection memilih Cypher query deterministik untuk mengambil subgraf yang relevan, lalu LLM menyusun jawaban yang merujuk konteks graf tersebut.",
      },
      {
        judul: "Aplikasi 4 lapis",
        isi: "Knowledge Graph Layer (Neo4j), Graph Retrieval Layer, LLM Generation Layer (LangChain-OpenAI), dan Application Layer (Next.js + Flask) dengan visualisasi graf interaktif.",
      },
      {
        judul: "Evaluasi 3 sisi",
        isi: "Metrik RAG berbasis LLM (faithfulness, answer relevance, context precision), validasi clustering dengan Likert scale, dan penilaian kualitas jawaban oleh dua pakar kebugaran.",
      },
    ],
    metrik: [
      { nilai: "79,67", label: "Overall Score · Exercise Question (Kategori B – Baik)" },
      { nilai: "88", label: "Faithfulness · Exercise Question" },
      { nilai: "95", label: "Context Precision · Exercise Question" },
      { nilai: "4,65/5", label: "Rata-rata penilaian dua pakar (Sangat Baik)" },
      { nilai: "91,5%", label: "Konsep ilmiah terkelompok kohesif" },
      { nilai: "7 × 6", label: "Tipe node × tipe relasi knowledge graph" },
    ],
    gambar: [
      {
        src: "/img/graphrag-exercise.webp",
        alt: "Tampilan Graph RAG Exercise Assistant: graf latihan punggung di kiri, jawaban rekomendasi di kanan",
        keterangan: "Mode Exercise Question: subgraf latihan punggung dan jawaban rekomendasi yang merujuk graf.",
        lebar: 1102,
        tinggi: 627,
      },
      {
        src: "/img/graphrag-knowledge-graph.webp",
        alt: "Visualisasi knowledge graph latihan chest dengan node berwarna per tipe",
        keterangan: "Visualisasi knowledge graph untuk latihan chest, dengan warna per tipe node dan klaster konsep ilmiah.",
        lebar: 882,
        tinggi: 834,
      },
      {
        src: "/img/graphrag-general.webp",
        alt: "Mode General Question menjelaskan konsep mechanical tension",
        keterangan: "Mode General Question: penjelasan konsep ilmiah dengan rujukan node ScienceConcept.",
        lebar: 1102,
        tinggi: 627,
      },
    ],
    demo: [],
    catatan:
      "Pengembangan lanjutan: semantic search berbasis vektor untuk pertanyaan konseptual, personalisasi profil pengguna, dan optimasi waktu respons.",
  },
  {
    slug: "dashboard-sertifikasi-halal",
    judul: "Dashboard Monitoring Sertifikasi Halal (LPH)",
    kategori: "Data Analytics · Dashboard · Data Quality",
    ringkas:
      "Web app 9 halaman untuk Lembaga Pemeriksa Halal BSPJI Pekanbaru: memantau ±130 pengajuan sertifikasi halal di sepanjang alur SIHALAL, dari SPK sampai Sertifikat Halal terbit, lengkap dengan giliran auditor, kalender audit, dan laporan triwulan.",
    periode: "September 2026 – sekarang",
    peran: "Data Analyst Intern · BSPJI Pekanbaru",
    warna: "cyan",
    stack: ["Google Apps Script", "Google Sheets", "JavaScript", "Leaflet", "clasp", "Python", "Data Quality"],
    sorotan: ["9 halaman, dipakai tim LPH", "17 pemeriksaan kualitas data", "Siklus giliran auditor"],
    konteks:
      "Setiap pengajuan sertifikasi halal melewati alur SIHALAL: SPK dan pembayaran, audit oleh auditor halal LPH, perbaikan temuan oleh pelaku usaha, Laporan Hasil Audit (LHA), sidang Komisi Fatwa, hingga Sertifikat Halal (SH) diterbitkan BPJPH. Semua tahap dicatat manual di satu sheet monitoring, sehingga posisi tiap pengajuan, beban auditor, dan lama proses sulit dibaca langsung.",
    masalah: [
      "Posisi ±130 pengajuan di tujuh tahap alur tidak terlihat sekaligus; mencari satu pengajuan berarti menelusuri baris demi baris.",
      "Waktu tunggu tercampur: tidak jelas berapa lama pengajuan berada di LPH, di pelaku usaha, di Komisi Fatwa, atau di BPJPH.",
      "Giliran auditor harus merata per jenis dinas sambil memperhatikan kewenangan 12 ruang lingkup, masa berlaku sertifikat, dan jadwal yang bentrok.",
      "Sheet diisi manual: kolom kosong, tanggal diketik sebagai teks, dan isian yang tertinggal dari catatan PNBP.",
    ],
    pendekatan: [
      {
        judul: "Model data alur SIHALAL",
        isi: "Apps Script membaca sheet monitoring lewat nama judul kolom (tahan terhadap kolom yang bergeser), menghitung satu pengajuan sekali per Nomor SPK, dan menentukan posisinya di 7 tahap dari tanggal terakhir yang terisi.",
      },
      {
        judul: "Lacak pengajuan & ke mana waktu pergi",
        isi: "Pencarian per nama usaha, SPK, atau auditor dengan linimasa tiap tahap. Lama proses dipecah menjadi waktu LPH, di luar kerja LPH, Komisi Fatwa, dan BPJPH, plus daftar pengajuan yang tertahan dibanding kuartil 3 tahap yang sama.",
      },
      {
        judul: "Giliran & siklus auditor",
        isi: "Rekomendasi giliran per jenis dinas: tugas paling sedikit lebih dulu, lalu yang paling lama tidak bertugas. Auditor yang tidak berwenang, sertifikatnya habis, atau jadwalnya bentrok otomatis dilewati, dan siklus giliran mencatat siapa yang sudah mendapat jatah.",
      },
      {
        judul: "Kalender, peta, dan laporan",
        isi: "Kalender audit bulanan per auditor dengan penanda bentrok dan tanggal merah, Peta Halal per kabupaten/kota dengan Leaflet, serta Laporan Triwulan TW I–IV yang angkanya bisa diklik dan siap dicetak ke PDF.",
      },
      {
        judul: "Kesehatan data",
        isi: "17 pemeriksaan otomatis bertingkat (wajib, penting, info), misalnya status PNBP sudah Closed tetapi LHA belum diisi atau urutan tanggal tahap terbalik, lengkap dengan daftar isian per pengajuan untuk admin.",
      },
      {
        judul: "Akses aman & uji lokal",
        isi: "Kode akses admin dan pengunjung disimpan sebagai hash bergaram dengan tiket harian bertanda tangan HMAC. Logika server diuji lokal dengan Node.js tanpa menyentuh Google Sheets.",
      },
    ],
    metrik: [
      { nilai: "9", label: "Halaman analitik dalam satu web app" },
      { nilai: "±130", label: "Pengajuan sertifikasi halal dipantau" },
      { nilai: "7", label: "Tahap alur SIHALAL, dari SPK sampai SH" },
      { nilai: "17", label: "Pemeriksaan kualitas data otomatis" },
      { nilai: "12", label: "Ruang lingkup halal dicek kewenangannya" },
    ],
    gambar: [],
    demo: [
      {
        judul: "Demo: Dashboard LPH",
        href: "/demo/lph-halal/dashboard",
        deskripsi: "Dibuka sebagai admin. Pilih menu Pengajuan, Audit, atau Laporan di bagian atas untuk berpindah di antara 9 halaman.",
      },
    ],
    catatan:
      "Semua data di demo fiktif: 130 pengajuan, nama usaha, auditor, dan nomor dokumen dibuat oleh skrip, lalu diolah dengan kode Apps Script asli sehingga logikanya sama dengan versi produksi. Demo langsung terbuka sebagai admin tanpa kode akses, dan peta butuh koneksi internet untuk memuat Leaflet.",
  },
  {
    slug: "dashboard-kinerja-lspro",
    judul: "Dashboard Kinerja Sertifikasi Produk (LSPro)",
    kategori: "Business Intelligence · Geospasial · SLA",
    ringkas:
      "Web app 7 halaman untuk LSPro BSPJI Pekanbaru: ringkasan eksekutif, klien, progres audit, rotasi tugas auditor, kepatuhan SLA, komoditas, hingga peta sebaran permohonan per kabupaten/kota.",
    periode: "September – Oktober 2026",
    peran: "Data Analyst Intern · BSPJI Pekanbaru",
    warna: "emerald",
    stack: ["Google Apps Script", "Leaflet", "OpenStreetMap", "Nominatim Geocoding", "Chart.js", "JavaScript", "clasp"],
    sorotan: ["7 halaman analitik", "Peta Leaflet + geocoding", "Rotasi tugas auditor & PPC"],
    konteks:
      "LSPro memantau seluruh alur sertifikasi produk, mulai dari permohonan di SIINas sampai sertifikat terbit, dalam satu sheet dengan lebih dari 60 kolom per permohonan. Pimpinan membutuhkan satu tempat untuk melihat kinerja, kepatuhan SLA, sebaran klien, dan pembagian tugas tim audit.",
    masalah: [
      "Lebih dari 60 kolom per permohonan sulit dibaca langsung dari spreadsheet.",
      "Kepatuhan SLA dan titik macet (bottleneck) proses tidak terlihat.",
      "Belum ada gambaran geografis sebaran klien untuk merencanakan perjalanan dinas.",
      "Pembagian tugas Lead Auditor, Auditor, dan PPC dicek manual dari baris demi baris.",
    ],
    pendekatan: [
      {
        judul: "Backend ringan & cache",
        isi: "Apps Script membaca sheet LK, hanya mengirim kolom yang dipakai frontend, lalu menyimpan hasilnya di cache yang dipecah per 30 ribu karakter agar lolos batas 100 KB Apps Script.",
      },
      {
        judul: "7 halaman analitik",
        isi: "Ringkasan Eksekutif, Klien & Permohonan, Jadwal & Progres Audit (tahapan, pengingat audit, jadwal survailen), Rotasi Tugas, SLA & Kepatuhan, Komoditas & Geografis, dan Peta Sebaran.",
      },
      {
        judul: "Peta sebaran tanpa API key",
        isi: "Leaflet + OpenStreetMap dengan bubble per kabupaten/kota dan warna per jenis dinas. Alamat pabrik dicari koordinatnya lewat Nominatim dengan cache permanen dan jeda 1 permintaan/detik; bila gagal, memakai titik kabupaten/kota.",
      },
      {
        judul: "Rotasi tugas yang merata",
        isi: "Giliran dihitung per peran (Lead Auditor, Auditor, PPC) dari baris yang ditandai ikut perhitungan. Semua personil boleh menangani semua komoditi agar semua belajar; satu-satunya pengecualian adalah jadwal yang bentrok.",
      },
      {
        judul: "Analisis yang bisa diklik",
        isi: "Setiap grafik bisa diklik untuk membuka daftar kasus di baliknya, lengkap dengan modal detail klien dan penanda kasus kritis yang mendekati batas tutup temuan.",
      },
      {
        judul: "Audit kualitas data",
        isi: "Memeriksa rumus dan isi sheet, misalnya durasi tahap yang bernilai negatif, baris tanpa rumus, dan daftar hari libur yang belum diperbarui, lalu melaporkannya ke tim untuk diperbaiki bertahap.",
      },
      {
        judul: "Kode akses",
        isi: "Kode disimpan di Properti Skrip, bukan di kode. Kode yang benar menghasilkan tiket HMAC yang berlaku satu hari; tiga kali salah mengunci layar selama 30 detik.",
      },
    ],
    metrik: [
      { nilai: "7", label: "Halaman analitik dalam satu web app" },
      { nilai: "66", label: "Kolom data per permohonan diolah" },
      { nilai: "3", label: "Peran tim audit dirotasi (Lead, Auditor, PPC)" },
      { nilai: "4", label: "Jenis dinas dipetakan dengan warna berbeda" },
      { nilai: "Rp0", label: "Biaya API peta (OpenStreetMap)" },
    ],
    gambar: [],
    demo: [
      {
        judul: "Demo: Dashboard Kinerja LSPro",
        href: "/demo/lspro-kinerja/dashboard",
        deskripsi: "Pilih menu di sidebar untuk berpindah halaman. Buka layar penuh untuk melihat peta sebaran.",
      },
    ],
    catatan:
      "Semua data di demo fiktif. Demo dibuat dengan menjalankan kode Apps Script asli terhadap clone sheet berisi data dummy dan memuat 6 halaman analitik; tab Rotasi Tugas dan kode akses tidak ikut di demo. Geocoding alamat dimatikan karena alamat dummy fiktif, sehingga peta memakai titik kabupaten/kota; dua permohonan luar negeri sengaja muncul sebagai \"tanpa koordinat\".",
  },
  {
    slug: "sistem-klinik",
    judul: "Sistem Manajemen Klinik Berbasis Web",
    kategori: "Backend · Next.js · Dashboard Analitik",
    ringkas:
      "Aplikasi web manajemen klinik dengan stok obat real-time, analisis data pasien, dan dashboard analitik untuk keputusan operasional.",
    periode: "Mei – Juli 2025",
    peran: "Backend Developer Intern · Klinik Elliya Husada",
    warna: "emerald",
    stack: ["Next.js", "TypeScript", "REST API", "SQL", "Chart.js / grafik real-time"],
    sorotan: ["Stok obat real-time", "Analisis kunjungan pasien", "Tim 2 orang"],
    konteks:
      "Klinik membutuhkan sistem terpusat untuk mencatat obat masuk dan keluar serta melihat pola kunjungan pasien, menggantikan pencatatan manual.",
    masalah: [
      "Pencatatan stok obat masuk dan keluar belum real-time.",
      "Data kunjungan dan riwayat pembelian obat pasien sulit dianalisis.",
      "Pengambilan keputusan operasional belum didukung data.",
    ],
    pendekatan: [
      { judul: "Backend Next.js", isi: "Membangun sistem manajemen klinik berbasis web dalam tim dua orang, dengan tanggung jawab utama pada sisi backend dan pembagian peran backend–frontend yang jelas." },
      { judul: "Modul stok obat", isi: "Mengembangkan pencatatan obat masuk dan keluar secara real-time." },
      { judul: "Analisis data pasien", isi: "Membangun fitur analisis tanggal kunjungan dan riwayat pembelian obat." },
      { judul: "Dashboard analitik", isi: "Visualisasi grafik real-time untuk mendukung keputusan operasional klinik." },
    ],
    metrik: [
      { nilai: "3 bln", label: "Durasi pengembangan" },
      { nilai: "2", label: "Anggota tim (backend & frontend)" },
      { nilai: "4", label: "Modul utama" },
    ],
    gambar: [],
    demo: [],
    catatan: "Tangkapan layar tidak ditampilkan untuk menjaga kerahasiaan data pasien.",
  },
];

export type Pengalaman = {
  jabatan: string;
  tempat: string;
  jenis: string;
  periode: string;
  poin: string[];
  tag: string[];
};

export const pengalaman: Pengalaman[] = [
  {
    jabatan: "Data Analyst",
    tempat: "BSPJI Pekanbaru",
    jenis: "Magang · On-site",
    periode: "Agu 2026 – sekarang",
    poin: [
      "Membangun dashboard pemantauan Lembaga Pemeriksa Halal (LPH) dengan Google Sheets dan Google Apps Script: perkembangan ±130 pengajuan sertifikasi halal per tahap, jadwal audit, peta sebaran, dan laporan triwulan.",
      "Membangun dashboard kinerja Lembaga Sertifikasi Produk (LSPro): indikator kinerja utama, ketepatan waktu layanan (SLA), dan peta sebaran klien.",
      "Merancang aturan pembagian tugas auditor yang merata berdasarkan jenis perjalanan dinas, kewenangan, masa berlaku sertifikat, dan jadwal yang bertabrakan.",
      "Mencocokkan data pemantauan klien dengan data Penerimaan Negara Bukan Pajak (PNBP) berdasarkan nomor SPK dan melaporkan data yang tidak sesuai kepada unit terkait.",
      "Menyusun 17 pemeriksaan kualitas data otomatis serta kode akses untuk melindungi data klien.",
    ],
    tag: ["Data Analysis", "Dashboard", "Apps Script", "Data Cleaning", "Data Quality"],
  },
  {
    jabatan: "Asisten Dosen",
    tempat: "Universitas Islam Riau",
    jenis: "Paruh Waktu",
    periode: "Apr 2025 – Jan 2026",
    poin: [
      "Membantu pengajaran dan praktikum Pengenalan Kecerdasan Buatan serta Organisasi & Arsitektur Komputer.",
      "Membimbing mahasiswa mengimplementasikan algoritma AI dengan Python.",
      "Menyusun materi pendukung dan mengevaluasi tugas mahasiswa.",
    ],
    tag: ["Python", "AI", "Public Speaking"],
  },
  {
    jabatan: "Backend Developer",
    tempat: "Klinik Elliya Husada",
    jenis: "Magang",
    periode: "Mei – Jul 2025",
    poin: [
      "Membangun sistem manajemen klinik berbasis web (Next.js) dalam tim dua orang, dengan fokus pada sisi backend.",
      "Mengembangkan modul stok obat real-time serta analisis data kunjungan dan pembelian obat pasien.",
      "Membangun dashboard analitik dengan grafik real-time untuk keputusan operasional.",
    ],
    tag: ["Next.js", "REST API", "Backend"],
  },
];

export const keahlian = [
  {
    kelompok: "AI & Data Science",
    ikon: "brain",
    item: ["Machine Learning", "Deep Learning", "GraphRAG", "RAG Evaluation", "LLM Prompt Engineering", "Knowledge Graph"],
  },
  {
    kelompok: "Data Analytics",
    ikon: "chart",
    item: ["Data Analysis", "Data Cleaning", "Data Visualization", "Microsoft Excel", "Google Sheets", "Dashboard & KPI"],
  },
  {
    kelompok: "Pemrograman",
    ikon: "code",
    item: ["Python", "SQL", "Cypher", "JavaScript", "TypeScript", "Google Apps Script"],
  },
  {
    kelompok: "Framework & Tools",
    ikon: "layers",
    item: ["Next.js", "Flask", "LangChain", "Neo4j", "Streamlit", "REST API", "Git", "Arduino (IoT)"],
  },
];

export const softSkill = [
  "Analytical Thinking",
  "Problem Solving",
  "Detail Oriented",
  "Leadership",
  "Teamwork",
  "Communication",
];

export const marquee = [
  "Python", "Neo4j", "LangChain", "OpenAI", "Next.js", "TypeScript", "SQL", "Cypher", "Flask",
  "Google Apps Script", "Chart.js", "Excel", "Streamlit", "Git", "Machine Learning", "GraphRAG",
];

export const pendidikan = [
  {
    kampus: "Universitas Islam Riau",
    program: "S1 Teknik Informatika",
    periode: "Sep 2022 – Apr 2026",
    detail: [
      "Lulus dengan predikat Cumlaude",
      "Fokus studi: Kecerdasan Buatan & Data Science",
      "Skripsi: Sistem Rekomendasi Latihan Fitness Berbasis Semantic Science-Based Training Menggunakan GraphRAG",
    ],
    ipk: "3,71 / 4,00",
  },
  {
    kampus: "Universitas Gadjah Mada",
    program: "Pertukaran Mahasiswa Merdeka · Ilmu Komputer",
    periode: "Feb – Jun 2024",
    detail: [
      "Lolos seleksi nasional Kemendikbudristek untuk mengikuti perkuliahan selama satu semester di UGM",
    ],
    ipk: null,
  },
];

export const sertifikasi = [
  {
    judul: "Pengenalan Sistem Manajemen Mutu ISO 9001:2015",
    penerbit: "LPK BSPJI Pekanbaru",
    tanggal: "Okt 2026",
    id: "019/BSPJI-Pekanbaru/LPKP/X/2026",
    link: null as string | null,
  },
  {
    judul: "Data Analyst",
    penerbit: "Dsarea (Digital Skills Area)",
    tanggal: "Jun 2026",
    id: "0017/DSA/DA/072026",
    link: null as string | null,
  },
  {
    judul: "Bootcamp: Introduction to Data Analytics Batch 10",
    penerbit: "DQLab",
    tanggal: "Feb 2026",
    id: "DQLABMBINTLC10GGBQGF",
    link: "https://academy.dqlab.id/Certificate_check/result/DQLABMBINTLC10GGBQGF",
  },
];

export const organisasi = [
  {
    peran: "Ketua Modul Nusantara",
    tempat: "Pertukaran Mahasiswa Merdeka · UGM",
    periode: "Feb – Jun 2024",
    isi: "Memimpin 26 mahasiswa dari 19 universitas dan 13 provinsi dalam kegiatan kebinekaan, inspirasi, refleksi, dan kontribusi sosial.",
  },
  {
    peran: "Ketua Humas",
    tempat: "GROOT – Organisasi Robotik & IoT UIR",
    periode: "Mei 2025 – Jan 2026",
    isi: "Memimpin divisi hubungan masyarakat: komunikasi eksternal, publikasi kegiatan, dan relasi mitra kampus.",
  },
  {
    peran: "Ketua Pelaksana Pelatihan Dasar Arduino",
    tempat: "GROOT – Universitas Islam Riau",
    periode: "2025",
    isi: "Merancang dan menjalankan pelatihan dasar Arduino untuk mahasiswa.",
  },
  {
    peran: "Staf Divisi PSDM",
    tempat: "Organisasi Internal PMM · UGM",
    periode: "Feb – Jun 2024",
    isi: "Merencanakan dan menjalankan acara internal serta program pengembangan kompetensi anggota.",
  },
];

export const navigasi = [
  { id: "tentang", label: "Tentang" },
  { id: "proyek", label: "Proyek" },
  { id: "pengalaman", label: "Pengalaman" },
  { id: "keahlian", label: "Keahlian" },
  { id: "pendidikan", label: "Pendidikan" },
  { id: "kontak", label: "Kontak" },
];
