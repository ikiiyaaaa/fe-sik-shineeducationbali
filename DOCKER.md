# Docker Setup untuk SIK Shine Education Bali

Dokumentasi ini menjelaskan cara menjalankan aplikasi menggunakan Docker.

## Prerequisites

Pastikan Anda sudah menginstall:

- Docker
- Docker Compose

## Cara Menjalankan

### Development Mode

Untuk menjalankan aplikasi dalam mode development:

```bash
# Menggunakan npm script
npm run docker:dev

# Atau langsung menggunakan docker-compose
docker-compose -f docker-compose.dev.yml up --build
```

### Production Mode

Untuk menjalankan aplikasi dalam mode production:

```bash
# Menggunakan npm script
npm run docker:prod

# Atau langsung menggunakan docker-compose
docker-compose up --build
```

### Build Image Manual

```bash
# Build image
npm run docker:build

# Run container
npm run docker:run
```

## Scripts yang Tersedia

- `npm run docker:build` - Build Docker image
- `npm run docker:run` - Run container dari image yang sudah di-build
- `npm run docker:dev` - Jalankan development environment
- `npm run docker:prod` - Jalankan production environment
- `npm run docker:down` - Stop dan remove containers

## Port

Aplikasi akan berjalan di port `3000`. Akses melalui `http://localhost:3000`

## Database (Opsional)

Jika Anda ingin menambahkan database PostgreSQL, uncomment bagian database di `docker-compose.yml` dan `docker-compose.dev.yml`.

## Troubleshooting

### Port sudah digunakan

Jika port 3000 sudah digunakan, ubah port di file docker-compose:

```yaml
ports:
  - "3001:3000" # Ganti 3001 dengan port yang tersedia
```

### Container tidak berjalan

```bash
# Check status container
docker ps -a

# Check logs
docker-compose logs

# Restart container
docker-compose restart
```

### Clean up

```bash
# Stop dan remove containers
docker-compose down

# Remove images
docker rmi sik-shineeducationbali

# Remove semua unused resources
docker system prune
```
