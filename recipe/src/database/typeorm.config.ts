import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Rol } from 'src/auth/entities/rol.entity';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { Comprobante } from 'src/comprobantes/entities/comprobante.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { TipoDocumento } from 'src/tipos-documento/entities/tipo-documento.entity';
import { Sede } from 'src/sedes/entities/sede.entity';
import { DataSourceOptions } from 'typeorm';
import { Cliente } from 'src/clientes/entities/cliente.entity';

const commonConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'recipe',
  password: 'RecipePassword',
  database: 'recipe_db',
  entities: [Usuario, Rol, Sede, Producto, Cliente, Comprobante, TipoDocumento],
  synchronize: false,
  //entities: ['dist/**/entities/*.entity.js'],
  migrations: ['dist/database/migrations/**/*.js'],
  migrationsTableName: 'migration',
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  ...commonConfig,
  autoLoadEntities: true,
  retryAttempts: 5,
  retryDelay: 3000,
};

export const dataSourceConfig: DataSourceOptions = {
  ...commonConfig,
};
