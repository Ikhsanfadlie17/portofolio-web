// Bangun demo statis Dashboard LPH dari data DUMMY.
// 1. Jalankan olahLK_/olahRoster_ dari Code.js asli (repo privat dashboard-lph) terhadap lk.json + md.json
//    hasil buat-data.py, dengan tiruan layanan Google (pola alat/uji-lokal.js).
// 2. Gabungkan Index.html + include (Styles, Logo, Pembuka, Scripts) menjadi satu halaman dengan tiruan google.script.run.
// Code.js tidak ikut disalin: yang dipublikasikan hanya hasil olahannya (data.js) dan frontend.
// Pakai: node tools/demo-lph/bangun.js <repo-dashboard-lph> <folder-data-dummy>
const fs = require('fs'), vm = require('vm'), path = require('path');
const [repo, dataDir] = process.argv.slice(2);
if (!repo || !dataDir) { console.error('Pakai: node tools/demo-lph/bangun.js <repo-dashboard-lph> <folder-data-dummy>'); process.exit(1); }
const src = path.join(repo, 'src');
const keluar = path.join(__dirname, '..', '..', 'public', 'demo', 'lph-halal');
const HARI_INI = '2026-10-15T09:30:00'; // "Data per" di demo; sama dengan HARI_INI di buat-data.py

const pad = n => String(n).padStart(2, '0');
const ctx = {
  Utilities: { formatDate: (d, tz, f) => f === 'yyyy-MM-dd'
    ? `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
    : `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00` },
  console
};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(src, 'Code.js'), 'utf8'), ctx);
ctx.lk = JSON.parse(fs.readFileSync(path.join(dataDir, 'lk.json'), 'utf8'));
ctx.md = JSON.parse(fs.readFileSync(path.join(dataDir, 'md.json'), 'utf8'));
// tanggal dibuat di dalam konteks vm supaya 'instanceof Date' di Code.js bernilai benar
const hasil = vm.runInContext(`(function () {
  function ubah(t) { return t.map(function (r) { return r.map(function (v) { return (v && v.__d) ? new Date(v.__d + 'T00:00:00') : (v == null ? '' : v); }); }); }
  var d = olahLK_(ubah(lk), new Date('${HARI_INI}'));
  d.roster = olahRoster_(ubah(md));
  return JSON.stringify(d);
})()`, ctx);

fs.mkdirSync(keluar, { recursive: true });
fs.writeFileSync(path.join(keluar, 'data.js'),
  '// Dihasilkan otomatis oleh tools/demo-lph/bangun.js dari data DUMMY (fiktif).\nwindow.__DEMO_DATA__ = ' + hasil + ';\n');

// Tiruan server: dibuka sebagai admin (tanpa layar kode akses); siklus manual disimpan di memori halaman saja.
const tiruan = `<script src="/demo/lph-halal/data.js"></script>
<script>
// Versi demo statis: pengganti google.script.run. Data dari data.js (DUMMY / fiktif).
(function () {
  var manual = [];
  function salin(v) { return JSON.parse(JSON.stringify(v)); }
  function Pelari(ok, gagal) { this.ok = ok || function () {}; this.gagal = gagal || function () {}; }
  Pelari.prototype.withSuccessHandler = function (f) { return new Pelari(f, this.gagal); };
  Pelari.prototype.withFailureHandler = function (f) { return new Pelari(this.ok, f); };
  Pelari.prototype.getDataLPH = function () {
    var ok = this.ok;
    setTimeout(function () {
      ok(Object.assign(salin(window.__DEMO_DATA__), { siklusManual: salin(manual), peran: 'admin', bolehAturSiklus: true, kodeDiatur: true }));
    }, 1200);
  };
  Pelari.prototype.tutupSiklus = function (tiket, dinas, no, catatan) {
    manual.push({ dinas: dinas, siklus: Number(no), catatan: catatan, tanggal: window.__DEMO_DATA__.diperbarui.slice(0, 10), oleh: 'admin (demo)' });
    var ok = this.ok; setTimeout(function () { ok(salin(manual)); }, 200);
  };
  Pelari.prototype.batalTutupSiklus = function (tiket, dinas) {
    for (var i = manual.length - 1; i >= 0; i--) if (manual[i].dinas === dinas) { manual.splice(i, 1); break; }
    var ok = this.ok; setTimeout(function () { ok(salin(manual)); }, 200);
  };
  Pelari.prototype.masukKode = Pelari.prototype.aturKodeAkses = function () {
    var gagal = this.gagal; setTimeout(function () { gagal(new Error('Kode akses tidak tersedia di versi demo.')); }, 200);
  };
  window.google = { script: { run: new Pelari() } };
})();
</script>`;
const lencana = `<style>.lencana-demo{position:fixed;left:14px;bottom:14px;z-index:40;padding:5px 12px;border-radius:999px;
background:#FFF4DB;color:#8A5A00;font:700 11.5px/1.4 "Plus Jakarta Sans",system-ui,sans-serif;letter-spacing:.02em;
box-shadow:0 4px 14px rgba(0,0,0,.15);pointer-events:none}@media print{.lencana-demo{display:none}}</style>
<div class="lencana-demo">DEMO · data fiktif</div>`;

let html = fs.readFileSync(path.join(src, 'Index.html'), 'utf8')
  .replace(/<\?!= include\('(\w+)'\); \?>/g, (_, n) => fs.readFileSync(path.join(src, n + '.html'), 'utf8'));
if (/<\?/.test(html)) throw new Error('Masih ada tag template Apps Script yang belum diganti.');
html = html
  .replace('<head>', '<head>\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>Demo · Dashboard LPH</title>')
  .replace('<body>', '<body>\n' + tiruan + '\n' + lencana);
fs.writeFileSync(path.join(keluar, 'dashboard.html'), html);
const d = JSON.parse(hasil);
console.log('pengajuan', d.pengajuan.length, '| roster', d.roster.auditor.length, '| catatan', JSON.stringify(d.catatan));
