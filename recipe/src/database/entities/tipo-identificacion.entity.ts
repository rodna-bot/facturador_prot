import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
} from 'typeorm';
import { Cliente } from './cliente.entity';

@Entity('tipos_identificacion')
export class TipoIdentificacion {
  @PrimaryGeneratedColumn('increment', { type: 'smallint' })
  id: number;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 2 })
  codigo_sunat: string;

  @Column({ type: 'text' })
  nombre: string;

  @Column({ type: 'boolean', default: false })
  es_empresa: boolean;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @OneToMany(() => Cliente, (cliente) => cliente.tipoIdentificacion)
  clientes: Cliente[];
}
