#!/bin/sh
set -e

echo "🔄 Esperando a PostgreSQL..."
while ! nc -z postgres 5432; do
  sleep 1
done
echo "✅ PostgreSQL está listo"

echo "🚀 Ejecutando migraciones..."
npm run migration:run

# Si deseas ejecutar seeds automáticamente, descomenta la siguiente línea
echo "🌱 Ejecutando seeds..."
npm run seed || true

echo "✅ Iniciando aplicación en modo desarrollo..."
exec npm run start:dev