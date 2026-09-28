// Semua isi website ada di file ini. Ubah teks di sini tanpa perlu menyentuh komponen.

export const profil = {
  nama: "Ikhsan Nur Fadlie",
  namaPendek: "Ikhsan",
  inisial: "INF",
  peran: ["Data Analyst", "AI Engineer", "Data Scientist", "GraphRAG & LLM Builder"],
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
    "Skripsi saya membangun sistem rekomendasi latihan fitness berbasis GraphRAG, yaitu gabungan knowledge graph Neo4j dan LLM yang jawabannya bisa dijelaskan secara ilmiah. Di dunia kerja, saya membangun dashboard monitoring untuk instansi pemerintah dan sistem manajemen klinik full-stack.",
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
    slug: "dashboard-kinerja-lspro",
    judul: "Dashboard Kinerja Sertifikasi & Peta Sebaran",
    kategori: "Business Intelligence · Geospasial · SLA",
    ringkas:
      "Web app 6 halaman untuk LSPro BSPJI Pekanbaru: ringkasan eksekutif, klien, progres audit, kepatuhan SLA, komoditas, hingga peta sebaran permohonan per kabupaten/kota.",
    periode: "September 2026",
    peran: "Data Analyst Intern · BSPJI Pekanbaru",
    warna: "emerald",
    stack: ["Google Apps Script", "Leaflet", "OpenStreetMap", "Nominatim Geocoding", "Chart.js", "JavaScript", "clasp"],
    sorotan: ["6 halaman analitik", "Peta Leaflet + geocoding", "Pengingat audit & survailen"],
    konteks:
      "LSPro memantau seluruh alur sertifikasi produk, mulai dari permohonan di SIINas sampai sertifikat terbit, dalam satu sheet dengan lebih dari 60 kolom per permohonan. Pimpinan membutuhkan satu tempat untuk melihat kinerja, kepatuhan SLA, dan sebaran klien.",
    masalah: [
      "Lebih dari 60 kolom per permohonan sulit dibaca langsung dari spreadsheet.",
      "Kepatuhan SLA dan titik macet (bottleneck) proses tidak terlihat.",
      "Belum ada gambaran geografis sebaran klien untuk merencanakan perjalanan dinas.",
    ],
    pendekatan: [
      {
        judul: "Backend ringan & cache",
        isi: "Apps Script membaca sheet LK, hanya mengirim kolom yang dipakai frontend, lalu menyimpan hasilnya di cache yang dipecah per 30 ribu karakter agar lolos batas 100 KB Apps Script.",
      },
      {
        judul: "6 halaman analitik",
        isi: "Ringkasan Eksekutif, Klien & Permohonan, Jadwal & Progres Audit (tahapan, pengingat audit, jadwal survailen), SLA & Kepatuhan, Komoditas & Geografis, dan Peta Sebaran.",
      },
      {
        judul: "Peta sebaran tanpa API key",
        isi: "Leaflet + OpenStreetMap dengan bubble per kabupaten/kota, mode jumlah permohonan atau perusahaan unik, filter dan warna per jenis dinas, serta mode gelap/terang.",
      },
      {
        judul: "Geocoding alamat pabrik",
        isi: "Alamat pabrik dicari koordinatnya lewat Nominatim dengan cache permanen dan jeda 1 permintaan/detik sesuai kebijakan layanan; bila gagal, otomatis memakai titik kabupaten/kota.",
      },
      {
        judul: "Analisis yang bisa diklik",
        isi: "Setiap grafik bisa diklik untuk membuka daftar kasus di baliknya, lengkap dengan modal detail klien dan penanda kasus kritis yang mendekati batas tutup temuan.",
      },
    ],
    metrik: [
      { nilai: "6", label: "Halaman analitik dalam satu web app" },
      { nilai: "66", label: "Kolom data per permohonan diolah" },
      { nilai: "4", label: "Jenis dinas dipetakan dengan warna berbeda" },
      { nilai: "Rp0", label: "Biaya API peta (OpenStreetMap)" },
    ],
    gambar: [],
    demo: [
      {
        judul: "Demo: Dashboard Kinerja LSPro",
        href: "/demo/lspro-kinerja/index.html",
        deskripsi: "Pilih menu di sidebar untuk berpindah halaman. Buka layar penuh untuk melihat peta sebaran.",
      },
    ],
    catatan:
      "Semua data di demo fiktif. Demo dibuat dengan menjalankan kode Apps Script asli terhadap clone sheet berisi data dummy. Geocoding alamat dimatikan karena alamat dummy fiktif, sehingga peta memakai titik kabupaten/kota; dua permohonan luar negeri sengaja muncul sebagai \"tanpa koordinat\".",
  },
  {
    slug: "dashboard-monitoring",
    judul: "Dashboard Monitoring Penugasan Auditor",
    kategori: "Data Analytics · Dashboard · Otomasi",
    ringkas:
      "Dua dashboard untuk unit LSPro dan LPH di BSPJI Pekanbaru: data monitoring di Google Sheets langsung menjadi jadwal, beban kerja, dan rekomendasi giliran auditor.",
    periode: "Agustus 2026 – sekarang",
    peran: "Data Analyst Intern · BSPJI Pekanbaru",
    warna: "cyan",
    stack: ["Google Apps Script", "Google Sheets", "JavaScript", "Chart.js", "clasp", "Python", "Data Cleaning"],
    sorotan: ["2 dashboard produksi", "12 ruang lingkup halal dicek otomatis", "Demo interaktif"],
    konteks:
      "Penugasan auditor sebelumnya diputuskan dengan membaca spreadsheet monitoring baris demi baris. Pemerataan tugas, kewenangan ruang lingkup, dan masa berlaku sertifikat harus dicek manual.",
    masalah: [
      "Sulit melihat siapa yang sudah berapa kali dinas dalam kota, luar kota darat, udara, atau luar negeri.",
      "Kewenangan auditor per ruang lingkup dan masa berlaku sertifikat dicek terpisah.",
      "Data monitoring tidak seragam: teks bebas, sel kosong, tanggal bercampur teks.",
    ],
    pendekatan: [
      {
        judul: "Audit kualitas data",
        isi: "Memetakan masalah data sheet monitoring (format tidak seragam, rumus salah rentang, validasi yang tidak berfungsi) lalu memperbaikinya bertahap bersama tim.",
      },
      {
        judul: "Validasi berbasis kompetensi",
        isi: "Matriks auditor × 12 ruang lingkup halal beserta masa berlaku sertifikat, dengan dropdown dan pemformatan bersyarat yang menandai penugasan di luar kewenangan.",
      },
      {
        judul: "Apps Script tanpa server",
        isi: "Kode membaca kolom lewat nama header, memecah tim audit menjadi satu baris per auditor, di-cache 60 detik, dan otomatis dibersihkan setiap sheet diedit.",
      },
      {
        judul: "Rekomendasi giliran",
        isi: "Auditor diurutkan dari tugas paling sedikit di jenis dinas yang sama, lalu tugas terakhir paling lama. Yang tidak berwenang, sertifikatnya habis, atau jadwalnya bentrok otomatis dilewati.",
      },
    ],
    metrik: [
      { nilai: "2", label: "Dashboard produksi (LSPro & LPH)" },
      { nilai: "4", label: "Jenis dinas dipantau per auditor" },
      { nilai: "12", label: "Ruang lingkup halal dicek kewenangannya" },
      { nilai: "30 dtk", label: "Dashboard memuat ulang data otomatis" },
    ],
    gambar: [],
    demo: [
      {
        judul: "Demo LPH: Jadwal Auditor Halal",
        href: "/demo/lph/index.html",
        deskripsi: "Rekomendasi giliran, matriks ruang lingkup, sertifikat habis, dan aturan unit kerja.",
      },
      {
        judul: "Demo LSPro: Jadwal per Jenis Dinas",
        href: "/demo/lspro/index.html",
        deskripsi: "5 peran tim audit, matriks personil × komoditi, dan 3 grafik analisis.",
      },
    ],
    catatan:
      "Semua data di demo fiktif. Demo dibuat dengan menjalankan kode Apps Script asli terhadap clone sheet berisi data dummy, sehingga logikanya sama dengan versi produksi tanpa membuka data instansi.",
  },
  {
    slug: "sistem-klinik",
    judul: "Sistem Manajemen Klinik Full-Stack",
    kategori: "Full-Stack · Backend · Dashboard Analitik",
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
      { judul: "Arsitektur full-stack Next.js", isi: "Merancang dan membangun sistem manajemen klinik berbasis web dengan pembagian peran backend dan frontend yang terstruktur." },
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
      "Membangun dashboard kinerja sertifikasi LSPro 6 halaman (KPI, SLA, komoditas) dengan peta sebaran klien berbasis Leaflet + OpenStreetMap.",
      "Membangun dua dashboard monitoring penugasan auditor (LSPro & LPH) dengan Google Apps Script dan Chart.js.",
      "Mengaudit kualitas data monitoring klien dan merancang validasi berbasis kompetensi auditor untuk 12 ruang lingkup halal.",
      "Menganalisis dan mengolah data hasil pengujian produk/laboratorium agar siap diolah lebih lanjut.",
    ],
    tag: ["Data Analysis", "Dashboard", "Apps Script", "Data Cleaning"],
  },
  {
    jabatan: "Asisten Dosen",
    tempat: "Universitas Islam Riau",
    jenis: "Freelance",
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
      "Merancang dan membangun sistem manajemen klinik berbasis web dengan Full-Stack Next.js.",
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
    item: ["Data Analysis", "Data Cleaning", "Data Visualization", "Microsoft Excel", "Google Sheets", "Power BI"],
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
  "Google Apps Script", "Chart.js", "Power BI", "Excel", "Streamlit", "Git", "Machine Learning", "GraphRAG",
];

export const pendidikan = [
  {
    kampus: "Universitas Islam Riau",
    program: "S1 Teknik Informatika",
    periode: "Sep 2022 – Apr 2026",
    detail: [
      "Lulus dalam 3 tahun 6 bulan · Cumlaude",
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
      "Terpilih melalui seleksi nasional untuk satu semester di UGM",
      "Perkuliahan lintas disiplin selama satu semester penuh",
    ],
    ipk: null,
  },
];

export const sertifikasi = [
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
    isi: "Memimpin 26 mahasiswa dari 19 universitas dan 13 provinsi dalam kegiatan kebhinekaan, inspirasi, refleksi, dan kontribusi sosial.",
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
