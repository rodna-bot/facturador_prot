import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Importación de Módulos de Negocio
import { AuthModule } from './auth_old/auth.module';
import { TiposDocumentoModule } from './tipos-documento/tipos-documento.module';
import { EmpresaModule } from './empresa/empresa.module';
import { typeOrmConfig } from './database/typeorm.config';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'postgres', // Nombre del servicio en docker-compose
    //   port: 5432,
    //   username: 'recipe',
    //   password: 'RecipePassword',
    //   database: 'recipe_db',
    //   entities: [
    //     Usuario, Rol, Sede,
    //     Producto, Cliente, Comprobante,
    //     TipoDocumento
    //   ],
    //   synchronize: true,
    //   autoLoadEntities: true,
    //   // RECOMENDADO: Intentar conectar 5 veces si falla al inicio
    //   retryAttempts: 5,
    //   retryDelay: 3000,
    // }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    TiposDocumentoModule,
    EmpresaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
