# KriptoTool

Modern Cryptography Utility - Caesar & Vigenere Cipher

Aplikasi web utilitas untuk enkripsi dan dekripsi pesan menggunakan algoritma
kriptografi klasik: Caesar Cipher dan Vigenere Cipher. Seluruh proses berjalan
di sisi klien (client-side), sehingga data tidak pernah dikirim ke server mana pun.

Live Demo: https://kriptotool.ponpesalamin.com


## Fitur

- Caesar Cipher - Substitusi alfabet dengan pergeseran numerik (slider + input manual)
- Vigenere Cipher - Substitusi polialfabetik dengan kata kunci
- Dark / Light Mode - Tema tersimpan di localStorage
- Fully Responsive - Sidebar collapsible, optimal di desktop dan mobile
- 100% Client-Side - Diproses di browser menggunakan PyScript (Python via WebAssembly)
- Copy to Clipboard - Salin hasil dengan satu klik
- Live Character Counter - Hitung jumlah karakter input secara real-time
- Keyboard Shortcut - Ctrl + B untuk toggle sidebar
- Modern UI - Glassmorphism, gradient orbs, animasi halus, ikon Lucide
- Docker Ready - Siap deploy di server dengan Nginx


## Tech Stack

Frontend        : HTML5, Tailwind CSS (CDN), Vanilla JavaScript
Icons           : Lucide Icons
Logic           : PyScript (Python 3.11 via WebAssembly)
Web Server      : Nginx Alpine
Containerization: Docker & Docker Compose


## Struktur Project

KriptoTool/
├── src/
│   ├── index.html      # UI utama aplikasi
│   ├── script.js       # Logika UI (sidebar, tab, tema)
│   └── logika.py       # Algoritma cipher + event handler
├── Dockerfile          # Image build (Nginx Alpine)
├── docker-compose.yml  # Orkestrasi container
└── README.md


## Cara Menjalankan

Prasyarat:
- Docker
- Docker Compose

Langkah:

1. Clone repository

   git clone https://github.com/AjiThomthom/KriptoTool.git
   cd KriptoTool

2. Build dan jalankan container

   docker-compose up -d --build

3. Akses aplikasi

   Buka browser: http://localhost:80

4. Stop container

   docker-compose down


## Konfigurasi Network (Opsional)

Jika menggunakan reverse proxy (Nginx Proxy Manager, Traefik, dll), aplikasi ini
sudah terhubung ke network eksternal bernama "proxy_network". Buat network-nya
terlebih dahulu:

   docker network create proxy_network

Lalu ubah file docker-compose.yml sesuai kebutuhan.


## Cara Pakai

1. Pilih algoritma di sidebar: Caesar Cipher atau Vigenere Cipher.
2. Masukkan plaintext (atau ciphertext untuk dekripsi) di textarea.
3. Untuk Caesar: atur kunci pergeseran (0-25) via slider atau input manual.
4. Untuk Vigenere: masukkan kata kunci (contoh: KUNCI).
5. Klik ENKRIPSI untuk menyandikan, atau DEKRIPSI untuk mengembalikan.
6. Hasil muncul di panel kanan. Klik Copy untuk menyalinnya.


## Contoh Pengujian

Caesar Cipher (shift = 3)

   Plaintext     : KRIPTOGRAFI
   Shift Key     : 3
   Ciphertext    : NULSWRJUDIL
   Hasil Dekripsi: KRIPTOGRAFI

Vigenere Cipher (keyword = KUNCI)

   Plaintext     : KRIPTOGRAFI
   Keyword       : KUNCI
   Ciphertext    : ULVRBYAECNS
   Hasil Dekripsi: KRIPTOGRAFI

Catatan: Rumus Vigenere yang digunakan adalah C = (P + K) mod 26, dengan A=0,
B=1, ..., Z=25.


## Keamanan dan Privasi

- Tidak ada data yang dikirim ke server. Semua proses enkripsi dan dekripsi
  terjadi di browser Anda.
- Tidak ada log. console.log sengaja di-suppress untuk produksi.
- Open source. Kode bisa diaudit siapa saja.

Disclaimer: Caesar dan Vigenere adalah algoritma kriptografi klasik yang TIDAK
aman untuk aplikasi produksi. Gunakan hanya untuk keperluan pembelajaran,
tugas, atau hobi.


## Kontribusi

Kontribusi selalu diterima. Silakan:

1. Fork repository ini
2. Buat branch fitur baru (git checkout -b fitur-baru)
3. Commit perubahan (git commit -m "Menambah fitur X")
4. Push ke branch (git push origin fitur-baru)
5. Buat Pull Request


## Special Thanks

Terima kasih yang sebesar-besarnya kepada:

Bapak Hemdani Rahendra Herlianto, S.Kom., M.Kom.
Dosen Pengampu Mata Kuliah Kriptografi
Universitas Pelita Bangsa

Atas bimbingan, ilmu, dan kesabaran yang telah diberikan selama proses
pembelajaran. Semoga ilmu yang diajarkan menjadi berkah dan bermanfaat.


## Author

Megatama Setiaji

GitHub   : https://github.com/AjiThomthom
LinkedIn : https://linkedin.com/in/megatama-setiaji
WhatsApp : https://wa.me/6281234567890

Network Engineer | SysAdmin | DevOps | Cyber Security Enthusiast


## License

Project ini dilisensikan di bawah MIT License. Bebas digunakan, dimodifikasi,
dan didistribusikan. Lihat file LICENSE untuk detail.


Dibuat oleh Megatama Setiaji

Jika project ini bermanfaat, jangan lupa beri bintang di repository ini.
