<h1 align="center">🐈‍⬛ Wikipedia Race 🐈‍⬛</h1>
<h2 id="description">✨ Description </h2>

WikiRace atau Wiki Game adalah permainan yang melibatkan Wikipedia, sebuah ensiklopedia daring gratis yang dikelola oleh berbagai relawan di dunia,
dimana pemain mulai pada suatu artikel Wikipedia dan harus menelusuri artikel-artikel lain pada Wikipedia (dengan menekan tautan di dalam setiap artikel) 
untuk menuju suatu artikel lain yang telah ditentukan sebelumnya dalam waktu yang paling singkat atau klik (artikel) yang paling sedikit.

Website yang dibuat pada tugas ini bertujuan untuk memberikan jarak terpendek dari suatu artikel ke artikel lain di wikipedia. 
Pengguna dapat memilih untuk mendapatkan solusi tunggal atau solusi banyak, baik dengan menggunakan algoritma [BFS](https://en.wikipedia.org/wiki/Breadth-first_search) maupun [IDS](https://en.wikipedia.org/wiki/Iterative_deepening_depth-first_search).

<h2 id="table-of-contents">🔍 Table of Contents</h2>
- <a href="#description">Description</a><br/>
- <a href="#table-of-contents">Table of Contents</a><br/>
- <a href="#tech-stack">Tech Stack</a><br/>
- <a href="#how-to-run">How To Run</a><br/>
- <a href="#usage">Usage</a><br/>
- <a href="#author">Contributors</a>

<h2 id="tech-stack">💻 Tech Stack</h2>

- Go
- Gin
- Typescript
- Tailwind CSS
- Next.js
- Docker
- Node.js
- sweetalert2

<h2 id="how-to-run">🏃 How To Run</h2>

Projek ini terdiri atas dua repository, yaitu repository [frontend](https://github.com/ninoaddict/Tubes2_FE_Pembalap-Kapas) dan [backend](https://github.com/Farhannr28/Tubes2_BE_Pembalap-Kapas).
Anda dapat memilih untuk menjalankan projek ini menggunakan docker atau secara lokal (tanpa docker). Untuk memulai menjalankan program ini, clone repository backend_ dan frontend
```
git clone https://github.com/ninoaddict/Tubes2_FE_Pembalap-Kapas
git clone https://github.com/Farhannr28/Tubes2_BE_Pembalap-Kapas
```

### Dengan Docker
Untuk menjalankan projek ini dengan docker, pastikan docker desktop sudah terunduh pada perangkat Anda. 
Jika belum, Anda dapat mengunduhnya sesuai dengan perangkat Anda pada [link](https://www.docker.com/products/docker-desktop) berikut.
- Buat file .env.local pada directory Tubes2_FE_Pembalap-Kapas/src/ dan tambahkan kode berikut pada file tersebut
```
NEXT_PUBLIC_HOST=backend
```
- Lakukan build terhadap program _frontend_
```
cd Tubes2_FE_Pembalap-Kapas/src
docker-compose build
```
- Jalankan program _frontend_
```
docker-compose up
```
- Buka terminal baru pada root folder dan jalankan build terhadap program backend
```
cd Tubes2_BE_Pembalap-Kapas/src
docker-compose build
```
- Jalankan program backend
```
docker-compose up
```
- Jika Anda ingin menghentikan program, lakukan hal berikut, baik pada program frontend maupun backend
```
docker-compose down
```
### Tanpa Docker
Untuk menjalankan projek ini tanpa docker (secara lokal), Anda harus sudah meng-_install_ Node.js, npm (atau yarn), dan bahasa Go pada perangkat Anda.
- Buat file .env.local pada directory Tubes2_FE_Pembalap-Kapas/src/ dan tambahkan kode berikut pada file tersebut
```
NEXT_PUBLIC_HOST=localhost
```
- Lakukan install terhadap semua _dependencies_ pada program frontend Anda
```
cd Tubes2_FE_Pembalap-Kapas/src
npm install
```
- Jalankan program frontend
```
npm run dev
```
- Buka terminal baru pada root folder dan jalankan server backend Anda
```
cd Tubes2_BE_Pembalap-Kapas/src
go run ./api
```
Agar program dapat berjalan dengan baik, pastikan bahwa frontend berjalan pada [localhost:3000](http://localhost:3000) dan server backend berjalan pada [localhost:8080](http://localhost:8080). Selain itu, Anda dapat mengetes algoritma pada program ini menggunakan API
endpoints yang tersedia dengan metode POST. Endpoint untuk algoritma BFS tersedia pada ```localhost:8080/bfs?solution={single|multi}```, sedangkan endpoint untuk algoritma IDS tersedia pada ```localhost:8080/ids?solution={single|multi}```. Adapun JSON body 
untuk melakukan fetch terhadap API endpoints tersebut memiliki format sebagai berikut
```
{
    "origin": originUrl,
    "target": targetUrl
}
```

<h2 id="usage">📘 Usage</h2>

1. Masukkan judul dari halaman artikel wikipedia awal dan tujuan
   
   ![input titles](https://github.com/ninoaddict/Tubes2_FE_Pembalap-Kapas/blob/main/img/pic1.png)
   
2. Pilih algoritma dan banyak solusi yang diinginkan
   
   ![input algoritm and solution number](https://github.com/ninoaddict/Tubes2_FE_Pembalap-Kapas/blob/main/img/pic2.png)
   
3. Klik tombol search untuk melihat hasil
   
   ![click search](https://github.com/ninoaddict/Tubes2_FE_Pembalap-Kapas/blob/main/img/pic3.png)

<h2 id="author">🤵 Contributors</h2>
<table>
  <tr>
    <th>Nama</th>
    <th>NIM</th>
    <th>Email</th>
    <th>Github</th>
  </tr>
  <tr>
    <th>Kristo Anugrah</th>
    <th>13522024</th>
    <th>
      <a href="mailto:13522024@std.stei.itb.ac.id">13522024@std.stei.itb.ac.id</a>
    </th>
    <th>
      <a href="https://github.com/qrst0">
        qrst0
      </a>
    </th>
  </tr>
  <tr>
    <th>Farhan Nafis Rayhan</th>
    <th>13522037</th>
    <th>
      <a href="mailto:13522037@std.stei.itb.ac.id">13522037@std.stei.itb.ac.id</a>
    </th>
    <th>
      <a href="https://github.com/Farhannr28">
        Farhannr28
      </a>
    </th>
  </tr>
  <tr>
    <th>Adril Putra Merin</th>
    <th>13522068</th>
        <th>
      <a href="mailto:13522068@std.stei.itb.ac.id">13522068@std.stei.itb.ac.id</a>
    </th>
    <th>
      <a href="https://github.com/ninoaddict">
        ninoaddict
      </a>
    </th>
  </tr>
</table>
