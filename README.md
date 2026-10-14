# Latihan JavaScript: Registrasi Mahasiswa & Pencarian Kode Pos

**Latihan JavaScript** merupakan website sederhana yang berisi dua fitur dalam satu halaman, yaitu formulir registrasi mahasiswa dengan dropdown dinamis dan pencarian kode pos berdasarkan wilayah. Website ini dibuat sebagai latihan mata kuliah Pemrograman Web untuk menerapkan manipulasi DOM, validasi form, dan penanganan event menggunakan JavaScript.

## 1. Tujuan

Website ini dibuat untuk:

* menyediakan formulir registrasi mahasiswa yang dilengkapi validasi input;
* menerapkan dropdown dinamis, yaitu pilihan dosen yang menyesuaikan mata kuliah yang dipilih;
* menyediakan pencarian kode pos Indonesia berdasarkan provinsi, kabupaten/kota, dan kecamatan;
* menerapkan konsep dasar JavaScript pada sisi client melalui pengolahan form dan interaksi pengguna;
* menghasilkan tampilan website yang bersih, elegan, dan mudah digunakan.

## 2. Fitur Website

### A. Registrasi Mahasiswa

Formulir digunakan untuk memasukkan informasi mahasiswa yang terdiri dari:

* **Nama Mahasiswa** — diisi langsung oleh pengguna.
* **NRP** — digunakan sebagai identitas mahasiswa.
* **Mata Kuliah** — pengguna memilih mata kuliah yang tersedia.
* **Dosen Pengampu** — pilihan dosen muncul sesuai mata kuliah yang dipilih.

Aturan validasi pada formulir:

| Kolom         | Aturan                                                         |
| ------------- | -------------------------------------------------------------- |
| Nama          | Wajib diisi, hanya huruf, minimal 3 karakter                   |
| NRP           | Wajib diisi, hanya angka, maksimal 10 digit                    |
| Mata Kuliah   | Wajib dipilih                                                  |
| Dosen         | Aktif setelah mata kuliah dipilih, wajib dipilih               |

Pesan kesalahan ditampilkan langsung di bawah kolom yang bermasalah.

### B. Tombol Daftar dan Reset

Tombol **Daftar** digunakan untuk mengirimkan data registrasi. Jika seluruh isian valid, ringkasan registrasi akan ditampilkan di bawah formulir. Tombol **Reset** digunakan untuk mengosongkan seluruh isian beserta pesan kesalahan.

### C. Pencarian Kode Pos

Pencarian kode pos menggunakan tiga dropdown yang saling terhubung:

| Dropdown           | Fungsi                                                    |
| ------------------ | --------------------------------------------------------- |
| Provinsi           | Memilih provinsi, lalu mengisi pilihan kabupaten/kota     |
| Kabupaten / Kota   | Memilih kabupaten/kota, lalu mengisi pilihan kecamatan    |
| Kecamatan          | Memilih kecamatan yang akan dicari kode posnya            |

Setelah tombol **Cari Kode Pos** ditekan, website menampilkan kode pos beserta informasi daerahnya (provinsi, kabupaten/kota, dan kecamatan).

> Data kode pos yang digunakan merupakan data contoh untuk keperluan latihan, mencakup beberapa wilayah di DKI Jakarta, Jawa Barat, Jawa Timur, dan DI Yogyakarta.

## 3. Alur Penggunaan

Alur penggunaan fitur registrasi mahasiswa:

```text
Membuka Website
       ↓
Mengisi Nama Mahasiswa
       ↓
Mengisi NRP
       ↓
Memilih Mata Kuliah
       ↓
Memilih Dosen Pengampu
       ↓
Klik "Daftar"
       ↓
Data Divalidasi
       ↓
Ringkasan Registrasi Ditampilkan
```

Alur penggunaan fitur pencarian kode pos:

```text
Memilih Provinsi
       ↓
Memilih Kabupaten / Kota
       ↓
Memilih Kecamatan
       ↓
Klik "Cari Kode Pos"
       ↓
Kode Pos dan Informasi Daerah Ditampilkan
```

Jika pengguna ingin mengulang pengisian, pengguna dapat memilih tombol **Reset**.

## 4. Struktur Halaman

Website terdiri dari dua kotak utama yang ditampilkan berdampingan pada satu halaman:

### Registrasi Mahasiswa

Bagian ini berfungsi sebagai area untuk memasukkan data mahasiswa. Pengguna dapat mengisi nama, NRP, serta memilih mata kuliah dan dosen pengampu.

### Pencarian Kode Pos

Bagian ini berfungsi untuk mencari kode pos berdasarkan wilayah melalui tiga dropdown bertingkat.

Pada layar yang lebih kecil, kedua kotak tersusun ke bawah agar tetap nyaman digunakan.

## 5. Struktur File

```text
Latihan-Javascript-Week-6/
├── index.html    # struktur halaman
├── style.css     # tampilan dan tata letak
├── script.js     # validasi form, dropdown dinamis, dan pencarian kode pos
└── README.md     # dokumentasi proyek
```

## 6. Teknologi yang Digunakan

Website dikembangkan menggunakan:

* **HTML** — untuk membangun struktur halaman;
* **CSS** — untuk mengatur tampilan dan tata letak, menggunakan palet warna *Coral Wave*;
* **JavaScript** — untuk menangani validasi, dropdown dinamis, dan pencarian kode pos tanpa library tambahan;
* **Google Fonts** — untuk jenis huruf pada judul dan teks;
* **Vercel** — untuk melakukan deployment website.

## 7. Menjalankan Website

Website dapat dijalankan secara lokal dengan membuka berkas `index.html` langsung melalui browser. Pastikan berkas `index.html`, `style.css`, dan `script.js` berada dalam satu folder yang sama.

## 8. Deployment

Website di-deploy menggunakan Vercel CLI dari terminal dengan langkah berikut:

```text
Login ke Vercel
     ↓
Masuk ke folder proyek
     ↓
Deploy preview
     ↓
Deploy production
     ↓
Website Dapat Diakses
```

Perintah yang digunakan:

```bash
vercel login
vercel
vercel --prod
```

Website dapat diakses melalui:

**[Latihan JavaScript](https://latihan-javascript-week-6-ehqrgjfkj-dev-projects19.vercel.app/)**
