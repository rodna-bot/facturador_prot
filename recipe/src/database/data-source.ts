import { DataSource } from 'typeorm';
import { dataSourceConfig } from './typeorm.config';

export default new DataSource(dataSourceConfig);
