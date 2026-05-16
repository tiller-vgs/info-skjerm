#!/bin/sh
set -e

echo "Syncing database schema..."
npx prisma db push --skip-generate

echo "Starting server..."
exec npx tsx src/app.ts
