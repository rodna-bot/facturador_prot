# 1. Usamos Node.js estable sobre Alpine (ligero)
FROM node:20-alpine

# 2. Instalamos pnpm globalmente dentro del contenedor
RUN npm install -g pnpm

# 3. Directorio de trabajo
WORKDIR /app

# 4. Copiamos los archivos de dependencias
# (El asterisco asegura que si no hay lockfile todavía, no falle)
COPY package.json pnpm-lock.yaml* ./

# 5. Instalamos las dependencias
RUN pnpm install

# 6. Copiamos el resto del código del frontend
COPY . .

# 7. Exponemos el puerto de Next.js
EXPOSE 3000

# 8. Arrancamos Next.js en modo desarrollo
# Usamos -H 0.0.0.0 para que sea accesible desde fuera del contenedor
CMD ["pnpm", "next", "dev", "-p", "3000", "-H", "0.0.0.0"]