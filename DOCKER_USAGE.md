# 🐳 Panduan Penggunaan Docker untuk SIK-SEB

## 📋 Prasyarat

Pastikan Anda telah menginstall:

-   Docker Desktop
-   Docker Compose

## 🚀 Cara Menjalankan Project

### 1. Script Utama (Recommended)

```bash
# Jalankan development environment
./run-docker.sh dev
# atau
./dev.sh

# Jalankan production environment
./run-docker.sh prod
# atau
./prod.sh

# Hentikan semua container
./run-docker.sh stop
# atau
./stop.sh

# Bersihkan Docker resources
./run-docker.sh clean

# Lihat bantuan
./run-docker.sh help
```

### 2. Manual Docker Commands

#### Development Environment

```bash
# Build dan jalankan development
docker-compose -f docker-compose.dev.yml up --build -d

# Lihat logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop development
docker-compose -f docker-compose.dev.yml down
```

#### Production Environment

```bash
# Build dan jalankan production
docker-compose up --build -d

# Lihat logs
docker-compose logs -f

# Stop production
docker-compose down
```

## 🌐 Akses Aplikasi

Setelah container berjalan, aplikasi dapat diakses di:

-   **URL**: http://localhost:3000
-   **Port**: 3000

## 📁 Struktur Docker

-   `Dockerfile` - Konfigurasi untuk production
-   `Dockerfile.dev` - Konfigurasi untuk development
-   `docker-compose.yml` - Konfigurasi production
-   `docker-compose.dev.yml` - Konfigurasi development

## 🔧 Perbedaan Development vs Production

### Development

-   Hot reload enabled
-   Volume mounting untuk live changes
-   NODE_ENV=development
-   Menggunakan Dockerfile.dev

### Production

-   Optimized build
-   No volume mounting
-   NODE_ENV=production
-   Menggunakan Dockerfile

## 🛠️ Troubleshooting

### Container tidak bisa start

```bash
# Cek status container
docker ps -a

# Cek logs
docker-compose logs

# Restart container
docker-compose restart
```

### Port 3000 sudah digunakan

```bash
# Cek proses yang menggunakan port 3000
lsof -i :3000

# Kill proses tersebut
kill -9 <PID>
```

### Bersihkan semua Docker resources

```bash
# Hentikan semua container
./run-docker.sh stop

# Bersihkan resources
./run-docker.sh clean

# Atau manual
docker system prune -a
```

## 📝 Catatan Penting

1. Pastikan Docker Desktop berjalan sebelum menjalankan script
2. Untuk development, gunakan `./dev.sh` untuk kemudahan
3. Untuk production, gunakan `./prod.sh`
4. Selalu stop container setelah selesai development
5. Gunakan `./run-docker.sh clean` secara berkala untuk membersihkan resources

## 🆘 Bantuan

Jika mengalami masalah, jalankan:

```bash
./run-docker.sh help
```
