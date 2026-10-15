// Bangun demo statis Dashboard Kinerja LSPro (7 halaman, termasuk Rotasi Tugas) dari data DUMMY.
// 1. Jalankan Code.js + KodeAkses.js + DinasData.js asli (repo privat dashboard-lspro) terhadap data-dummy.json
//    (clone sheet LK + Master Dropdown berisi data fiktif) dengan tiruan layanan Google.
// 2. Gabungkan Index.html + include menjadi satu halaman dengan tiruan google.script.run.
// Kode server tidak ikut disalin: yang dipublikasikan hanya hasil olahannya (data.js) dan frontend.
// Pakai: node tools/demo-lspro/bangun.js <repo-dashboard-lspro>
const fs = require('fs'), vm = require('vm'), path = require('path'), crypto = require('crypto');
const [repo] = process.argv.slice(2);
if (!repo) { console.error('Pakai: node tools/demo-lspro/bangun.js <repo-dashboard-lspro>'); process.exit(1); }
const src = path.join(repo, 'src');
const baca = f => fs.readFileSync(path.join(src, f), 'utf8');
const keluar = path.join(__dirname, '..', '..', 'public', 'demo', 'lspro-kinerja');
const pad = n => String(n).padStart(2, '0');

// ---------- 1) server asli dengan tiruan layanan Google ----------
const sheets = {};
const tiruanSheet = nama => {
  const g = sheets[nama];
  return g ? {
    getDataRange: () => ({ getValues: () => g.map(r => r.slice()) }),
    getLastRow: () => g.length,
    getRange: (baris, kolom, jml, lebar) => ({
      getValues: () => g.slice(baris - 1, baris - 1 + jml).map(r => r.slice(kolom - 1, kolom - 1 + lebar)),
    }),
  } : null;
};
const ctx = {
  SpreadsheetApp: { openById: () => ({ getSheetByName: tiruanSheet }) },
  Session: { getScriptTimeZone: () => 'Asia/Jakarta' },
  Utilities: {
    formatDate: (d, tz, f) => f.replace(/yyyy|MM|dd|HH|mm|ss/g, k => ({
      yyyy: d.getFullYear(), MM: pad(d.getMonth() + 1), dd: pad(d.getDate()),
      HH: pad(d.getHours()), mm: pad(d.getMinutes()), ss: pad(d.getSeconds()) }[k])),
    sleep: () => {},
    DigestAlgorithm: { MD5: 'md5' },
    computeDigest: (alg, raw) => Array.from(crypto.createHash('md5').update(raw).digest()).map(b => (b > 127 ? b - 256 : b)),
  },
  // Geocoding dimatikan: alamat dummy fiktif, peta memakai titik kabupaten/kota dari Geo.html
  UrlFetchApp: { fetch: () => ({ getResponseCode: () => 503, getContentText: () => '[]' }) },
  PropertiesService: { getScriptProperties: () => ({ getProperty: () => null, setProperty: () => {}, deleteProperty: () => {} }) },
  CacheService: { getScriptCache: () => ({ get: () => null, getAll: () => ({}), put: () => {}, putAll: () => {}, remove: () => {}, removeAll: () => {} }) },
  HtmlService: {},
  console,
};
vm.createContext(ctx);
const DateCtx = vm.runInContext('Date', ctx); // supaya 'instanceof Date' di kode server bernilai benar
const grid = JSON.parse(fs.readFileSync(path.join(__dirname, 'data-dummy.json'), 'utf8'));
for (const [nama, baris] of Object.entries(grid)) {
  const lebar = Math.max(...baris.map(r => r.length));
  sheets[nama] = baris.map(r => Array.from({ length: lebar }, (_, c) => {
    const v = r[c];
    if (v && typeof v === 'object' && v.__date) { const [y, m, d] = v.__date.split('-').map(Number); return new DateCtx(y, m - 1, d); }
    return v == null ? '' : v;
  }));
}
for (const f of ['Code.js', 'KodeAkses.js', 'DinasData.js']) vm.runInContext(baca(f), ctx, { filename: f });
vm.runInContext('cekTiket_ = function () {};', ctx); // demo: tanpa kode akses
const lk = ctx.getLKData(true, 'demo');
lk.rows.forEach(r => { delete r.pabrikLat; delete r.pabrikLng; delete r.pabrikKota; });
const dinas = ctx.getDinasData(true, 'demo');

fs.mkdirSync(keluar, { recursive: true });
fs.writeFileSync(path.join(keluar, 'data.js'),
  '// Dihasilkan otomatis oleh tools/demo-lspro/bangun.js dari data DUMMY (fiktif).\n' +
  'window.__DEMO_DATA__ = ' + JSON.stringify(lk) + ';\nwindow.__DEMO_DINAS__ = ' + JSON.stringify(dinas) + ';\n');

// ---------- 2) rakit HTML ----------
const tiruan = `<script src="/demo/lspro-kinerja/data.js"></script>
<script>
// Versi demo statis: pengganti google.script.run. Data dari data.js (DUMMY / fiktif).
// Demo langsung terbuka tanpa kode akses: tiket demo disimpan sebelum Akses.html dimuat.
(function () {
  var TIKET = (Date.now() + 365 * 86400000) + '.demo';
  try { localStorage.setItem('lspro-tiket', TIKET); } catch (e) {}
  function salin(v) { return JSON.parse(JSON.stringify(v)); }
  function waktu() { var n = new Date(), p = function (x) { return String(x).padStart(2, '0'); };
    return n.getFullYear() + '-' + p(n.getMonth() + 1) + '-' + p(n.getDate()) + ' ' + p(n.getHours()) + ':' + p(n.getMinutes()) + ':' + p(n.getSeconds()); }
  function Pelari(ok, gagal) { this.ok = ok || function () {}; this.gagal = gagal || function () {}; }
  Pelari.prototype.withSuccessHandler = function (f) { return new Pelari(f, this.gagal); };
  Pelari.prototype.withFailureHandler = function (f) { return new Pelari(this.ok, f); };
  Pelari.prototype.getLKData = function () {
    var ok = this.ok; setTimeout(function () { ok(Object.assign(salin(window.__DEMO_DATA__), { fetchedAt: waktu() })); }, 700);
  };
  Pelari.prototype.getDinasData = function () {
    var ok = this.ok; setTimeout(function () { ok(Object.assign(salin(window.__DEMO_DINAS__), { updatedAt: new Date().toISOString() })); }, 500);
  };
  Pelari.prototype.masuk = function () { var ok = this.ok; setTimeout(function () { ok({ ok: true, tiket: TIKET }); }, 300); };
  window.google = { script: { run: new Pelari() } };
})();
</script>`;
const gayaDemo = `<style>
.demo-badge{display:inline-block;padding:2px 9px;border-radius:999px;background:#FFF4DB;color:#8A5A00;
  font-size:11px;font-weight:700;letter-spacing:.02em}
.demo-badge-side{margin:12px 16px 0}
.demo-back{display:block;margin:10px 16px 0;font-size:12.5px;color:#60a5fa;text-decoration:none}
.demo-back:hover{text-decoration:underline}
</style>`;

let html = baca('Index.html').replace(/<\?!=\s*include\('(\w+)'\);?\s*\?>/g, (_, n) => baca(n + '.html'));
if (/<\?/.test(html)) throw new Error('Masih ada tag template Apps Script yang belum diganti.');
const ganti = (cari, isi) => { if (!html.includes(cari)) throw new Error('Tidak ditemukan: ' + cari); html = html.replace(cari, isi); };
ganti('<base target="_top">', '<meta name="viewport" content="width=device-width, initial-scale=1">');
ganti('<title>BSPJI Dashboard LSPro</title>', '<title>Demo · Dashboard Kinerja LSPro</title>\n' + gayaDemo);
ganti('<body>', '<body>\n' + tiruan);
// Penanda demo di sidebar (judul halaman ditulis ulang saat pindah halaman, jadi label tidak ditaruh di judul)
ganti('<nav class="nav">', '<span class="demo-badge demo-badge-side">DEMO · data fiktif</span>\n      ' +
  '<a class="demo-back" href="/proyek/dashboard-kinerja-lspro/" target="_top">&larr; Kembali ke studi kasus</a>\n      <nav class="nav">');
fs.writeFileSync(path.join(keluar, 'dashboard.html'), html);
console.log('LK', lk.rows.length, 'baris | penugasan Rotasi Tugas', dinas.rows.length,
  '| roster', Object.entries(dinas.roster).map(([k, v]) => k + ' ' + v.length).join(', '));
