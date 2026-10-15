"""Buat data DUMMY (fiktif) sheet LK + Master Dropdown untuk demo Dashboard LPH.

Semua nama usaha, auditor, nomor SPK/daftar/LHA, dan tanggal di sini karangan; tidak ada data instansi.
Keluaran: <folder>/lk.json dan <folder>/md.json (format sama dengan alat/ekspor_lk.py di repo dashboard-lph).
Pakai: python tools/demo-lph/buat-data.py <folder-keluaran>
"""
import json, os, random, sys
from datetime import date, timedelta

random.seed(17)
HARI_INI = date(2026, 10, 15)
D = lambda d: {"__d": d.isoformat()} if d else ""

LINGKUP = ["Makanan", "Minuman", "Obat", "Kosmetik", "Produk Kimiawi", "Barang Gunaan", "Jasa Pengolahan",
           "Jasa Penyimpanan", "Jasa Pengemasan", "Jasa Pendistribusian", "Jasa Penjualan", "Jasa Penyajian"]
PRODUK = {
    "Makanan": ["Produk bakeri", "Makanan ringan siap santap", "Kembang gula/permen dan cokelat",
                "Garam, rempah, sup, saus, salad, serta produk protein", "Daging dan produk olahan daging",
                "Ikan dan produk perikanan dengan pengolahan", "Gula dan pemanis termasuk madu",
                "Buah dan sayur dengan pengolahan", "Serealia dan produk serealia"],
    "Minuman": ["Minuman dengan pengolahan", "Kelompok bahan minuman"],
    "Kosmetik": ["Kosmetika"],
    "Obat": ["Obat bebas terbatas"],
    "Barang Gunaan": ["Penutup kepala"],
    "Jasa Penyajian": ["Penyediaan makanan dan minuman dengan pengolahan", "Jasa penyajian tanpa proses pengolahan/memasak"],
    "Jasa Penyimpanan": ["Jasa Penyimpanan"],
    "Jasa Pendistribusian": ["Jasa Pendistribusian"],
}
BOBOT_LINGKUP = [("Makanan", 55), ("Minuman", 16), ("Jasa Penyajian", 12), ("Kosmetik", 4),
                 ("Jasa Penyimpanan", 3), ("Jasa Pendistribusian", 3), ("Barang Gunaan", 2), ("Obat", 2)]

# Wilayah: (provinsi, kab/kota, jenis dinas, bobot)
WILAYAH = [
    ("Riau", "Kota Pekanbaru", "Dalam Kota", 44), ("Riau", "Kab. Kampar", "Luar Kota Darat", 12),
    ("Riau", "Kab. Siak", "Luar Kota Darat", 8), ("Riau", "Kab. Pelalawan", "Luar Kota Darat", 6),
    ("Riau", "Kab. Bengkalis", "Luar Kota Darat", 5), ("Riau", "Kota Dumai", "Luar Kota Darat", 5),
    ("Riau", "Kab. Rokan Hulu", "Luar Kota Darat", 4), ("Riau", "Kab. Indragiri Hilir", "Luar Kota Darat", 3),
    ("Riau", "Kab. Kuantan Singingi", "Luar Kota Darat", 3), ("Riau", "Kab. Kepulauan Meranti", "Luar Kota Udara", 2),
    ("Kepulauan Riau", "Kota Batam", "Luar Kota Udara", 4), ("Kepulauan Riau", "Kab. Karimun", "Luar Kota Udara", 2),
    ("Sumatera Barat", "Kota Padang", "Luar Kota Darat", 2), ("Jambi", "Kota Jambi", "Luar Kota Udara", 1),
]
SKALA = [("Mikro", 52), ("Kecil", 30), ("Menengah", 13), ("Besar", 5)]

AWAL = ["Kue", "Bolu", "Keripik", "Sambal", "Kopi", "Roti", "Dodol", "Madu", "Rendang", "Teh", "Sirup", "Kerupuk",
        "Lempok", "Bakso", "Mie", "Abon", "Susu", "Jamu", "Pempek", "Sate"]
TOKOH = ["Bu Ani", "Pak Udin", "Mak Ijah", "Bang Jali", "Uni Rina", "Kak Tini", "Pak Harun", "Bu Sari", "Datuk Rajo",
         "Mbak Yuni", "Om Rudi", "Cik Lina", "Pak Kasim", "Bu Leni", "Wak Dolah", "Nek Ipah", "Abah Ujang", "Teh Euis"]
SIFAT = ["Lancang Kuning", "Sialang", "Tuah Negeri", "Bumi Lestari", "Sungai Jernih", "Pucuk Rebung",
         "Selaso Jatuh", "Embun Pagi", "Tepian Kampar", "Bintang Timur", "Cahaya Pagi", "Nusa Indah"]
BENTUK = ["CV", "PT", "UD", "Rumah Makan", "Kedai", "Dapur"]

AUDITOR = [  # nama, berlaku s/d, lingkup (indeks LINGKUP), urutan dk/lkd/lku/ln, unit
    ("Rina Kartika", date(2029, 3, 12), "all", (1, 1, 1, 1), ""),
    ("Dedi Saputra", date(2028, 8, 30), "all", (2, 2, 2, 2), ""),
    ("Fitri Handayani", date(2029, 11, 4), "all", (3, 3, 3, ""), ""),
    ("Ahmad Fauzi", date(2028, 5, 21), [0, 1, 5, 6, 7, 8, 9, 10, 11], (4, 4, 4, ""), ""),
    ("Wulan Sari", date(2027, 12, 18), [0, 1, 6, 7, 8, 9, 10, 11], (5, 5, 5, ""), ""),
    ("Hendra Gunawan", date(2029, 6, 9), [0, 1, 2, 3, 4, 6, 11], (6, 6, 6, ""), ""),
    ("Nurul Aini", date(2026, 7, 31), "all", (7, 7, "", ""), ""),           # sertifikat habis
    ("Bayu Pratama", date(2028, 2, 14), [0, 1, 11], (8, 8, 7, ""), ""),
    ("Yusuf Hamdani", date(2029, 1, 25), "all", ("", "", 8, ""), "BSPJI Kepri"),  # unit lain: hanya wilayah Kepri
    ("Sinta Maharani", None, [0, 1], ("", "", "", ""), ""),                 # auditor tambahan (belum lengkap)
]


def pilih(bobot):
    return random.choices([b[0] for b in bobot], weights=[b[1] for b in bobot])[0] if len(bobot[0]) == 2 \
        else random.choices(bobot, weights=[b[-1] for b in bobot])[0]


def boleh(a, lingkup, wilayah):
    if a[1] is None or a[2] != "all" and LINGKUP.index(lingkup) not in a[2]:
        return False
    if a[4] == "BSPJI Kepri":
        return wilayah[0] == "Kepulauan Riau"
    return True


jadwal = {}  # nama auditor -> set tanggal audit (supaya tidak bentrok)


def tim_audit(mulai, lama, lingkup, wilayah, berdua):
    hari = {mulai + timedelta(i) for i in range(lama)}
    calon = [a for a in AUDITOR if boleh(a, lingkup, wilayah) and (a[1] is None or a[1] >= mulai)
             and not (hari & jadwal.get(a[0], set()))]
    if wilayah[0] == "Kepulauan Riau":
        calon.sort(key=lambda a: a[4] != "BSPJI Kepri")
    else:
        calon = [a for a in calon if a[4] == ""]
        calon.sort(key=lambda a: len(jadwal.get(a[0], ())) + random.random() * 6)
    pilihan = calon[:2 if berdua else 1]
    for a in pilihan:
        jadwal.setdefault(a[0], set()).update(hari)
    return [a[0] for a in pilihan]


def hari_kerja(d):
    while d.weekday() >= 5:
        d += timedelta(1)
    return d


nama_terpakai = set()


def nama_usaha():
    while True:
        r = random.random()
        if r < .45:
            n = f"{random.choice(AWAL)} {random.choice(TOKOH)}"
        elif r < .8:
            n = f"{random.choice(BENTUK)} {random.choice(SIFAT)}"
        else:
            n = f"{random.choice(BENTUK)} {random.choice(AWAL)} {random.choice(SIFAT)}"
        if n not in nama_terpakai:
            nama_terpakai.add(n)
            return n


JUDUL = ["No", "Tahun", "Nama Pelanggan", "Asal Instansi/Perusahaan", "Provinsi", "Kab/Kota", "Skala Usaha",
         "Ruang Lingkup", "Jenis Produk", "Nomor Daftar", "Tgl Pelanggan Bayar", "Nomor SPK", "Tanggal SPK",
         "Tim Audit", "Jenis Dinas", "Perhitungan", "Tanggal Audit Mulai", "Tanggal Audit Selesai",
         "Tanggal TP Closed", "Nomor LHA", "Tanggal LHA", "Hasil (L/TL)", "Dikirim ke Komisi Fatwa", "Tanggal KH",
         "Tanggal SH", "Status Permohonan", "Status", "Tertagih", "SLA", "Cek Posisi", "Catatan", "",
         "Daftar tanggal merah"]
K = {j: i for i, j in enumerate(JUDUL) if j}

baris = []
nomor = {"spk": {2025: 0, 2026: 0}, "lha": {2025: 0, 2026: 0}, "daftar": 0}


def buat(spk_tgl, tahun_kolom=None, nasib="normal"):
    """nasib: normal | gagal | tahan:<tahap> (berhenti di tahap itu, sudah lama)"""
    wil = pilih(WILAYAH)
    lingkup = pilih(BOBOT_LINGKUP)
    nama = nama_usaha()
    r = [""] * len(JUDUL)
    r[K["Nama Pelanggan"]] = nama
    r[K["Asal Instansi/Perusahaan"]] = nama
    r[K["Provinsi"]], r[K["Kab/Kota"]] = wil[0], wil[1]
    r[K["Skala Usaha"]] = pilih(SKALA)
    r[K["Ruang Lingkup"]] = lingkup
    r[K["Jenis Produk"]] = random.choice(PRODUK[lingkup])
    nomor["daftar"] += 1
    r[K["Nomor Daftar"]] = f"SH-DEMO-{nomor['daftar']:04d}"
    r[K["Cek Posisi"]] = "OK"
    r[K["Tertagih"]] = "Lunas"
    r[K["Status"]] = "Open"
    if spk_tgl is None:  # belum ber-SPK
        r[K["Tahun"]] = tahun_kolom or HARI_INI.year
        r[K["Status Permohonan"]] = "Menunggu SPK"
        r[K["Tertagih"]] = "Belum Lunas"
        return r
    y = spk_tgl.year
    nomor["spk"][y] += 1
    r[K["Tahun"]] = y
    r[K["Nomor SPK"]] = f"{nomor['spk'][y]:03d}/SPK/LPH-DEMO/{y}"
    r[K["Tgl Pelanggan Bayar"]] = D(spk_tgl - timedelta(random.randint(0, 6)))
    r[K["Tanggal SPK"]] = D(spk_tgl)

    tahan = nasib.split(":")[1] if nasib.startswith("tahan") else None
    status = "Proses Penjadwalan"
    mulai = hari_kerja(spk_tgl + timedelta(random.choice([random.randint(6, 25), random.randint(20, 45)])))
    if tahan == "jadwal" or mulai > HARI_INI:
        r[K["Status Permohonan"]] = status
        return r
    lama = random.choices([1, 2, 3], [55, 35, 10])[0]
    selesai = mulai + timedelta(lama - 1)
    berdua = lama > 1 or r[K["Skala Usaha"]] in ("Menengah", "Besar")
    tim = tim_audit(mulai, lama, lingkup, wil, berdua)
    r[K["Tim Audit"]] = ", ".join(tim)
    r[K["Jenis Dinas"]] = wil[2]
    if mulai >= date(2026, 5, 1):
        r[K["Perhitungan"]] = "Ya"
    r[K["Tanggal Audit Mulai"]] = D(mulai)
    if selesai > HARI_INI:
        r[K["Status Permohonan"]] = "Proses Audit"
        return r
    r[K["Tanggal Audit Selesai"]] = D(selesai)
    tp = selesai + timedelta(random.choice([random.randint(4, 18), random.randint(15, 50)]))
    if tahan == "temuan" or tp > HARI_INI:
        r[K["Status Permohonan"]] = "Perbaikan Temuan"
        return r
    r[K["Tanggal TP Closed"]] = D(tp)
    lha = hari_kerja(tp + timedelta(random.randint(1, 8)))
    if tahan == "lha" or lha > HARI_INI:
        r[K["Status Permohonan"]] = "Penyusunan LHA"
        return r
    nomor["lha"][lha.year] += 1
    r[K["Nomor LHA"]] = f"LHA/DEMO/{lha.year}/{nomor['lha'][lha.year]:03d}"
    r[K["Tanggal LHA"]] = D(lha)
    r[K["Hasil (L/TL)"]] = "TL" if nasib == "gagal" else "L"
    r[K["Status"]] = "Closed"
    r[K["Dikirim ke Komisi Fatwa"]] = D(lha + timedelta(random.randint(0, 3)))
    kh = lha + timedelta(random.randint(6, 24))
    if tahan == "kf" or kh > HARI_INI:
        r[K["Status Permohonan"]] = "Proses Komisi Fatwa"
        return r
    r[K["Tanggal KH"]] = D(kh)
    if nasib == "gagal":
        r[K["Status Permohonan"]] = "Tidak Terbit SH"
        r[K["SLA"]] = random.choice(["M", "TM"])
        return r
    sh = kh + timedelta(random.randint(2, 12))
    if tahan == "sh" or sh > HARI_INI:
        r[K["Status Permohonan"]] = "Menunggu SH"
        return r
    r[K["Tanggal SH"]] = D(sh)
    r[K["Status Permohonan"]] = "Terbit SH"
    r[K["SLA"]] = "M" if (sh - spk_tgl).days <= 75 else random.choice(["M", "TM", "TM"])
    return r


def tgl_acak(a, b):
    return hari_kerja(a + timedelta(random.randint(0, (b - a).days)))


# 2025: 52 pengajuan, hampir semua selesai
spk25 = sorted(tgl_acak(date(2025, 2, 1), date(2025, 12, 10)) for _ in range(52))
for i, s in enumerate(spk25):
    baris.append(buat(s, nasib="gagal" if i in (9, 33) else "normal"))
# 2026: 72 pengajuan ber-SPK + 6 belum ber-SPK
spk26 = sorted(tgl_acak(date(2026, 1, 8), date(2026, 10, 9)) for _ in range(72))
tahan = {20: "tahan:temuan", 27: "tahan:jadwal", 31: "tahan:lha", 38: "tahan:kf", 44: "tahan:temuan", 49: "tahan:sh"}
for i, s in enumerate(spk26):
    baris.append(buat(s, nasib="gagal" if i == 15 else tahan.get(i, "normal")))
for _ in range(6):
    baris.append(buat(None))

# Faserhal (fiktif): 4 pengajuan SPK 2025 dicatat ulang sebagai order 2026 -> baris kembaran dengan Nomor SPK sama
for r in random.sample(baris[30:50], 4):
    k = list(r)
    k[K["Nama Pelanggan"]] = "Faserhal"
    k[K["Tgl Pelanggan Bayar"]] = D(date(2026, random.randint(1, 3), random.randint(5, 25)))
    baris.append(k)
# 2 baris BPJPH (dilewati dashboard)
for _ in range(2):
    k = [""] * len(JUDUL)
    k[K["Nama Pelanggan"]] = "BPJPH"
    k[K["Asal Instansi/Perusahaan"]] = "Rekap pembayaran BPJPH"
    baris.append(k)

# Masalah data yang sengaja ditanam supaya halaman Kesehatan Data punya contoh
d26 = [r for r in baris if r[K["Tahun"]] == 2026 and r[K["Nama Pelanggan"]] not in ("Faserhal", "BPJPH")]
jalan = [r for r in d26 if r[K["Tanggal Audit Selesai"]] and not r[K["Tanggal LHA"]]]
jalan[0][K["Status"]] = "Closed"                          # PNBP Closed, LHA di LK belum diisi
selesai = [r for r in d26 if r[K["Tanggal SH"]]]
selesai[3][K["Jenis Produk"]] = ""
selesai[5][K["Skala Usaha"]] = ""
selesai[8][K["Nomor Daftar"]] = ""
selesai[11][K["SLA"]] = ""
v = selesai[14][K["Tanggal TP Closed"]]["__d"].split("-")
selesai[14][K["Tanggal TP Closed"]] = f"{int(v[2])}-{['JAN','FEB','MAR','APR','MEI','JUN','JUL','AGU','SEP','OKT','NOV','DES'][int(v[1]) - 1]}-{v[0]}"
baru = [r for r in d26 if r[K["Perhitungan"]] == "Ya" and r[K["Tanggal Audit Mulai"]]["__d"] >= "2026-09-01"]
baru[0][K["Perhitungan"]] = ""                             # Perhitungan belum dipilih
baru[1][K["Jenis Dinas"]] = ""                             # Perhitungan Ya, Jenis Dinas kosong
for r in d26:                                              # salah ketik nama auditor
    if r[K["Tim Audit"]].startswith("Rina Kartika") and r[K["Tanggal SH"]]:
        r[K["Tim Audit"]] = r[K["Tim Audit"]].replace("Rina Kartika", "Rina Kartik", 1)
        break
# Satu rombongan 5 pengajuan dengan tanggal LHA dan KH persis sama (contoh "Catatan data")
rombongan = [r for r in d26 if r[K["Tanggal KH"]] and r[K["Tanggal SH"]]][20:25]
for r in rombongan:
    r[K["Tanggal LHA"]] = D(date(2026, 6, 8))
    r[K["Dikirim ke Komisi Fatwa"]] = D(date(2026, 6, 8))
    r[K["Tanggal KH"]] = D(date(2026, 6, 10))
    for kol in ("Tanggal TP Closed", "Tanggal Audit Selesai", "Tanggal Audit Mulai", "Tanggal SPK", "Tgl Pelanggan Bayar"):
        if isinstance(r[K[kol]], dict) and r[K[kol]]["__d"] > "2026-06-08":
            r[K[kol]] = D(date(2026, 6, 5))
    if r[K["Tanggal SH"]]["__d"] < "2026-06-10":
        r[K["Tanggal SH"]] = D(date(2026, 6, 16))

# Nomor urut dan daftar tanggal merah (kolom terpisah di sisi kanan)
LIBUR = ["2025-01-01", "2025-01-29", "2025-03-31", "2025-04-01", "2025-04-18", "2025-05-01", "2025-05-29",
         "2025-06-06", "2025-06-27", "2025-08-17", "2025-09-05", "2025-12-25", "2026-01-01", "2026-02-17",
         "2026-03-20", "2026-03-21", "2026-04-03", "2026-05-01", "2026-05-14", "2026-05-27", "2026-06-01",
         "2026-06-16", "2026-08-17", "2026-08-25", "2026-12-25"]
for i, r in enumerate(baris):
    r[K["No"]] = i + 1
    if i < len(LIBUR):
        r[K["Daftar tanggal merah"]] = {"__d": LIBUR[i]}

lk = [["MONITORING KLIEN LPH (DATA DUMMY UNTUK DEMO)"] + [""] * (len(JUDUL) - 1), JUDUL] + baris

# Master Dropdown: urutan mentor per jenis dinas, nama, masa berlaku, 12 ruang lingkup, unit kerja
md = [["dk", "lk d", "lk u", "ln", "Nama Auditor", "Berlaku s/d"] + LINGKUP + ["Unit Kerja"]]
for a in AUDITOR:
    bisa = range(12) if a[2] == "all" else a[2]
    md.append(list(a[3]) + [a[0], D(a[1])] + [i in bisa for i in range(12)] + [a[4]])

out = sys.argv[1]
os.makedirs(out, exist_ok=True)
json.dump(lk, open(os.path.join(out, "lk.json"), "w"), ensure_ascii=False)
json.dump(md, open(os.path.join(out, "md.json"), "w"), ensure_ascii=False)
print("LK", len(baris), "baris; roster", len(AUDITOR), "auditor")
