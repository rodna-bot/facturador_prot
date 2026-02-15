import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Creamos la app
  const app = await NestFactory.create(AppModule);

  // 1. CORS dinámico para desarrollo
  // Esto asegura que tanto localhost como la IP de red funcionen
  app.enableCors({
    origin: true, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 2. Pipes de validación (Crucial para tus DTOs de facturación)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const port = 4000; 

  await app.listen(port, '0.0.0.0'); 
  
  console.log(`🚀 API del Facturador lista en: http://localhost:${port}`);
}
bootstrap();