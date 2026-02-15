import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
import { Usuario } from './entities/usuario.entity';
import { Rol } from './entities/rol.entity';

@Module({
  imports: [
    // 1. Cargamos las entidades necesarias para este módulo
    TypeOrmModule.forFeature([Usuario, Rol]), 
    
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forRoot({
      isGlobal: true, // Esto hace que el secreto JWT esté disponible en AuthModule
    }),
    // 2. Configuración asíncrona del JWT (Mejor práctica para Docker)
    JwtModule.registerAsync({
      imports: [ConfigModule.forRoot({isGlobal: true,}),ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        // Lee el secreto de Docker/Env o usa uno por defecto
        secret: configService.get<string>('JWT_SECRET') || 'your-secret-key',
        signOptions: { expiresIn: '24h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    JwtStrategy, 
    RolesGuard
  ],
  // 3. Exportamos para que otros módulos (como Comprobantes) puedan usar la seguridad
  exports: [
    AuthService, 
    JwtStrategy, 
    PassportModule, 
    JwtModule
  ],
})
export class AuthModule {}