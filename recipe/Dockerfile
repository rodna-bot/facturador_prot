FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci 

COPY . .

# Copiar y dar permisos al entrypoint
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

# RUN npm run migration:run

# RUN npm run seed

EXPOSE 4000

ENTRYPOINT ["./entrypoint.sh"]

# EXPOSE 4000

#CMD ["npm", "run", "start:dev"]