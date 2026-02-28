#!/bin/sh
set -e
cd /app

# Wait for Postgres to be ready (handled by depends_on + healthcheck; short delay)
echo "Waiting for database..."
sleep 2

echo "Applying database schema..."
npx prisma db push --accept-data-loss || true

echo "Seeding database..."
npm run db:seed || true

echo "Starting app..."
exec "$@"
