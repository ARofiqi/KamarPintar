#!/bin/bash

echo "================================="
echo "======= Starting Backend ========"
echo "================================="

# Pindah ke direktori server
cd server || { echo "❌ Folder 'server' tidak ditemukan!"; exit 1; }

echo "🔄 Menjalankan migrasi Prisma..."
npx prisma migrate dev --name "auto_migration"

echo "🔄 Generate Prisma Client..."
npx prisma generate

echo "🚀 Menjalankan server..."
npm run dev
