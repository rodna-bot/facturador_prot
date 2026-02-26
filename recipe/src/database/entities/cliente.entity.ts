import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  Index,
} from 'typeorm';
import { TipoIdentificacion } from './tipo-identificacion.entity';

@Entity('clientes')
@Unique('uq_clientes_tipo_doc', ['tipo_identificacion_id', 'nro_doc'])
@Index('idx_clientes_doc', ['tipo_identificacion_id', 'nro_doc'])
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'smallint' })
  tipo_identificacion_id: number;

  @ManyToOne(() => TipoIdentificacion, (tipo) => tipo.clientes, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'tipo_identificacion_id' })
  tipoIdentificacion: TipoIdentificacion;

  @Column({ type: 'text' })
  nro_doc: string;

  @Column({ type: 'text' })
  razon_social_nombre: string;

  @Column({ type: 'text', nullable: true })
  direccion?: string;

  @Column({ type: 'text', nullable: true })
  ubigeo?: string;

  @Column({ type: 'text', nullable: true })
  email?: string;

  @Column({ type: 'text', nullable: true })
  telefono?: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
