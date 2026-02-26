import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

const commonConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'recipe',
  password: 'RecipePassword',
  database: 'recipe_db',
  synchronize: false,
  entities: ['dist/database/entities/*.entity.js'],
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
