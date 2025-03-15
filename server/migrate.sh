#!/bin/bash

echo "🔄 Memulai proses migrasi Prisma..."

# Setel permission agar script bisa dijalankan
chmod +x migrate.sh

# Jalankan migrasi Prisma
npx prisma migrate dev --name "auto_migration"

# Generate Prisma Client
npx prisma generate

echo "✅ Migrasi selesai!"
