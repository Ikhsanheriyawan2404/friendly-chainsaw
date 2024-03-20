# eyo mabro.

## Table of Contents
- [Prerequisite](#prerequisite)
- [Installation](#install)
- [Result](#result)

## Prerequisite
* punya k6
* docker

## Install

1. Buat file `password.txt` di dalam direktori `db`:
    ```bash
    touch db/password.txt
    ```

2. Tulis kata sandi di dalam file `password.txt` (contohnya, "admin"):
    ```bash
    echo "admin" > db/password.txt
    ```

3. Jalankan Docker Compose:
    ```bash
    docker compose up -d
    ```


## Result
Kesimpulan Hasil Load Testing menggunakan k6

Spek Mesin untuk Testing:

RAM: 1 GB
CPU: 1 core
Storage: 25 GB SSD Internal

Load Testing:

Virtual User: 1000 per detik
Durasi: 30 detik

**Contoh Permintaan (Sample Request):**
Response JSON sederhana:
```json
{
    "message": "Hello World"
}
```

Tabel Hasil:

| Bahasa/Platform | Rata-rata Waktu Respon (ms) | Jumlah Request Berhasil | Jumlah Request Gagal |
|-----------------|------------------------------|----------------------------------|--------------------------------|
| Node.js (express) | 965.73ms                   | 15.715                           | 0                              |
| Golang          | 39.81ms                      | 29.203                           | 0                              |
| PHP (tanpa Swoole) | 300.41ms                  | 12.249                           | 869                            |
| PHP (dengan Swoole) | 50.88ms                  | 28.679                           | 0                              |
