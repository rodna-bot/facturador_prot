import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Importación de Entidades
import { Usuario } from './auth/entities/usuario.entity';
import { Rol } from './auth/entities/rol.entity';
import { Sede } from './sedes/entities/sede.entity';
import { Producto } from './productos/entities/producto.entity';
import { Cliente } from './clientes/entities/cliente.entity';
import { Comprobante } from './comprobantes/entities/comprobante.entity';
import { TipoDocumento } from './tipos-documento/entities/tipo-documento.entity';

// Importación de Módulos de Negocio
import { AuthModule } from './auth/auth.module';
import { ClientesModule } from './clientes/clientes.module';
import { SedesModule } from './sedes/sedes.module';
import { ProductosModule } from './productos/productos.module';
import { ComprobantesModule } from './comprobantes/comprobantes.module';
import { TiposDocumentoModule } from './tipos-documento/tipos-documento.module';
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
    ClientesModule,
    SedesModule,
    ProductosModule,
    ComprobantesModule,
    TiposDocumentoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
