'use strict';

const DOSEN_PER_MATKUL = {
  'Pemrograman Web': ['Fajar Baskoro, S.Kom., M.T.', 'Moch. Nafkhan Alzamzami, S.T., M.T.', 'Muhammad Arif Faizin, S.Kom., M.Kom.'],
  'Konsep Pengembangan Perangkat Lunak': ['Bintang Nuralamsyah, S.Kom., M.Kom.', 'Dr. Sarwosri, S.Kom., M.T.', 'Prof. Daniel Oranova Siahaan, S.Kom., M.Sc., PD.Eng.'],
  'Konsep Kecerdasan Artifisial': ['Aldinata Rizky Revanda, S.Kom., M.Kom.', 'Dini Adni Navastara, S.Kom., M.Sc.', 'Imam Mustafa Kamal, S.ST., Ph.D.', 'Prof. Dr.Eng. Chastine Fatichah, S.Kom., M.Kom.', 'Prof. Dr.Eng. Nanik Suciati, S.Kom., M.Kom.'],
  'Jaringan Komputer': ['Bagus Jati Santoso, S.Kom., Ph.D.', 'Ir. Ary Mazharuddin Shiddiqi, S.Kom., M.Comp.Sc., Ph.D.', 'Moch. Nafkhan Alzamzami, S.T., M.T.', 'Muhammad Arif Faizin, S.Kom., M.Kom.', 'Royyana Muslim Ijtihadie, S.Kom., M.Kom., Ph.D.'],
  'Matematika Diskrit': ['Dr.Eng. Muhamad Hilmil Muchtar Aditya Pradana, S. Kom., M. Sc.', 'Ilham Gurat Adillion, S.Kom., M.Eng.', 'Ir. Arya Yudhi Wijaya, S.Kom., M.Kom.']
};

const DATA_KODEPOS = {
  'DKI Jakarta': {
    'Jakarta Pusat': { 'Gambir': '10110', 'Menteng': '10310', 'Senen': '10410', 'Tanah Abang': '10250' },
    'Jakarta Selatan': { 'Kebayoran Baru': '12110', 'Tebet': '12810', 'Pasar Minggu': '12510' }
  },
  'Jawa Barat': {
    'Kota Bandung': { 'Coblong': '40132', 'Bandung Wetan': '40115', 'Sukajadi': '40162' },
    'Kota Bekasi': { 'Bekasi Barat': '17134', 'Bekasi Selatan': '17144' }
  },
  'Jawa Timur': {
    'Kota Surabaya': { 'Gubeng': '60281', 'Tegalsari': '60261', 'Genteng': '60275', 'Sukolilo': '60111' },
    'Kabupaten Sidoarjo': { 'Sidoarjo': '61211', 'Waru': '61256', 'Candi': '61271' },
    'Kota Malang': { 'Klojen': '65111', 'Lowokwaru': '65141' }
  },
  'DI Yogyakarta': {
    'Kota Yogyakarta': { 'Gondokusuman': '55221', 'Jetis': '55231', 'Umbulharjo': '55161' },
    'Kabupaten Sleman': { 'Depok': '55281', 'Mlati': '55285' }
  }
};

/* =========================================================
   HELPER
   ========================================================= */

const $ = (id) => document.getElementById(id);

/** Isi <select> dengan opsi dari array. */
function isiSelect(select, daftar, placeholder) {
  select.replaceChildren(new Option(placeholder, ''));
  daftar.forEach((item) => select.add(new Option(item, item)));
}

/** Tampilkan / hapus pesan error di bawah field. */
function setError(idField, pesan, idError = 'error-' + idField) {
  const el = $(idField);
  if (el) {
    el.classList.toggle('invalid', Boolean(pesan));
    el.setAttribute('aria-invalid', pesan ? 'true' : 'false');
  }
  const err = $(idError);
  if (err) err.textContent = pesan;
}

/** Buat kotak hasil dengan textContent (aman dari injeksi HTML). */
function tampilkanHasil(wadah, judul, baris, kodeBesar) {
  wadah.replaceChildren();

  const h3 = document.createElement('h3');
  h3.textContent = judul;
  wadah.append(h3);

  if (kodeBesar) {
    const kode = document.createElement('div');
    kode.className = 'kodepos-besar';
    kode.textContent = kodeBesar;
    wadah.append(kode);
  }

  const dl = document.createElement('dl');
  baris.forEach(([label, nilai]) => {
    const row = document.createElement('div');
    row.className = 'row';
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');
    dt.textContent = label;
    dd.textContent = nilai;
    row.append(dt, dd);
    dl.append(row);
  });
  wadah.append(dl);
  wadah.hidden = false;
}

/* =========================================================
   KOTAK 1: REGISTRASI MAHASISWA
   ========================================================= */

const formReg = $('form-registrasi');
const inputNama = $('nama');
const selectMatkul = $('matkul');
const selectDosen = $('dosen');

/* ---- Aturan validasi ---- */
const aturan = {
  nama: (v) => {
    if (!v) return 'Nama wajib diisi.';
    if (!/^[A-Za-z\s.'-]{3,}$/.test(v)) return 'Nama hanya boleh huruf (minimal 3 karakter).';
    return '';
  },
  nim: (v) => {
    if (!v) return 'NRP wajib diisi.';
    if (!/^\d{10,14}$/.test(v)) return 'NRP harus berupa angka 10 sampai 14 digit.';
    return '';
  },
  matkul: (v) => (v ? '' : 'Pilih salah satu mata kuliah.'),
  dosen: (v) => (v ? '' : 'Pilih dosen pengampu.')
};

function validasiField(id) {
  const pesan = aturan[id]($(id).value.trim());
  setError(id, pesan);
  return !pesan;
}

inputNama.addEventListener('blur', () => validasiField('nama'));

/* ---- Dropdown dinamis: mata kuliah -> dosen ---- */
isiSelect(selectMatkul, Object.keys(DOSEN_PER_MATKUL), 'Pilih mata kuliah');

selectMatkul.addEventListener('change', () => {
  const daftarDosen = DOSEN_PER_MATKUL[selectMatkul.value] || [];
  if (daftarDosen.length) {
    isiSelect(selectDosen, daftarDosen, 'Pilih dosen pengampu');
    selectDosen.disabled = false;
  } else {
    isiSelect(selectDosen, [], 'Pilih mata kuliah dulu');
    selectDosen.disabled = true;
  }
  setError('dosen', '');
  validasiField('matkul');
});

selectDosen.addEventListener('change', () => validasiField('dosen'));
$('nim').addEventListener('blur', () => validasiField('nim'));
$('nim').addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/\D/g, ''); // hanya angka
});

/* ---- Submit & reset ---- */
formReg.addEventListener('submit', (e) => {
  e.preventDefault();
  const valid = ['nama', 'nim', 'matkul', 'dosen']
    .map(validasiField)   // dijalankan semua agar semua error muncul sekaligus
    .every(Boolean);

  if (!valid) {
    $('hasil-registrasi').hidden = true;
    return;
  }

  tampilkanHasil($('hasil-registrasi'), 'Registrasi berhasil', [
    ['Nama', inputNama.value.trim()],
    ['NRP', $('nim').value.trim()],
    ['Mata Kuliah', selectMatkul.value],
    ['Dosen', selectDosen.value]
  ]);
});

formReg.addEventListener('reset', () => {
  ['nama', 'nim', 'matkul', 'dosen'].forEach((id) => setError(id, ''));
  isiSelect(selectDosen, [], 'Pilih mata kuliah dulu');
  selectDosen.disabled = true;
  $('hasil-registrasi').hidden = true;
});

/* =========================================================
   KOTAK 2: PENCARIAN KODE POS
   ========================================================= */

const formPos = $('form-kodepos');
const selProvinsi = $('provinsi');
const selKota = $('kota');
const selKecamatan = $('kecamatan');

isiSelect(selProvinsi, Object.keys(DATA_KODEPOS), 'Pilih provinsi');

selProvinsi.addEventListener('change', () => {
  const kota = Object.keys(DATA_KODEPOS[selProvinsi.value] || {});
  isiSelect(selKota, kota, kota.length ? 'Pilih kabupaten/kota' : 'Pilih provinsi dulu');
  selKota.disabled = kota.length === 0;
  isiSelect(selKecamatan, [], 'Pilih kabupaten/kota dulu');
  selKecamatan.disabled = true;
  $('hasil-kodepos').hidden = true;
  $('error-kodepos').textContent = '';
});

selKota.addEventListener('change', () => {
  const kec = Object.keys((DATA_KODEPOS[selProvinsi.value] || {})[selKota.value] || {});
  isiSelect(selKecamatan, kec, kec.length ? 'Pilih kecamatan' : 'Pilih kabupaten/kota dulu');
  selKecamatan.disabled = kec.length === 0;
  $('hasil-kodepos').hidden = true;
  $('error-kodepos').textContent = '';
});

formPos.addEventListener('submit', (e) => {
  e.preventDefault();
  const prov = selProvinsi.value;
  const kota = selKota.value;
  const kec = selKecamatan.value;

  [selProvinsi, selKota, selKecamatan].forEach((s) => s.classList.toggle('invalid', !s.value));

  if (!prov || !kota || !kec) {
    $('error-kodepos').textContent = 'Lengkapi provinsi, kabupaten/kota, dan kecamatan terlebih dahulu.';
    $('hasil-kodepos').hidden = true;
    return;
  }

  $('error-kodepos').textContent = '';
  const kode = DATA_KODEPOS[prov][kota][kec];

  tampilkanHasil($('hasil-kodepos'), 'Hasil pencarian', [
    ['Provinsi', prov],
    ['Kabupaten / Kota', kota],
    ['Kecamatan', kec]
  ], kode);
});

formPos.addEventListener('reset', () => {
  isiSelect(selKota, [], 'Pilih provinsi dulu');
  isiSelect(selKecamatan, [], 'Pilih kabupaten/kota dulu');
  selKota.disabled = true;
  selKecamatan.disabled = true;
  [selProvinsi, selKota, selKecamatan].forEach((s) => s.classList.remove('invalid'));
  $('error-kodepos').textContent = '';
  $('hasil-kodepos').hidden = true;
});