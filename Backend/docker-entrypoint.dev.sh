#!/bin/sh
set -e

echo "Syncing database schema..."
npx prisma db push

echo "Starting backend in watch mode..."
exec npx tsx watch src/app.ts
