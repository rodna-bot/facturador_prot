import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common'; // Añadimos Logger para ver qué pasa en Docker
// import { DataSource } from 'typeorm';
// import { runSeed } from './database/seeds/seed';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // 1. Configuración de CORS
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 2. Pipes de validación (¡Esto sí vale mucho!)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 3. BLOQUE DE SEEDING PARA DOCKER
  // try {
  //   const dataSource = app.get(DataSource);

  //   // Verificamos conexión con el Postgres de Docker
  //   if (!dataSource.isInitialized) {
  //     logger.log('📡 Conectando al DataSource en puerto 5432...');
  //     await dataSource.initialize();
  //   }

  //   logger.log('🌱 Ejecutando carga de datos iniciales (Farmacia)...');
  //   await runSeed(dataSource);
  //   logger.log('✅ Seeding completado.');

  // } catch (error) {
  //   logger.error('❌ Error en el proceso de Seeding:', error.message);
  //   // No detenemos la app, para que el resto de la API pueda subir
  // }

  const port = 4000;
  await app.listen(port, '0.0.0.0');

  logger.log(`🚀 API lista en: http://localhost:${port}`);
}
bootstrap();
