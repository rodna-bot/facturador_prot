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
import { Empresa } from './empresa.entity';

@Entity('productos_servicios')
@Unique('uq_prod_empresa_codigo', ['empresa_id', 'codigo_interno'])
@Index('idx_prod_empresa', ['empresa_id'])
export class ProductoServicio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // =========================
  // FK EMPRESA
  // =========================
  @Column('uuid')
  empresa_id: string;

  @ManyToOne(() => Empresa, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'empresa_id' })
  empresa: Empresa;

  // =========================
  // DATOS PRODUCTO
  // =========================

  @Column('text', { nullable: true })
  codigo_interno?: string;

  @Column('text')
  descripcion: string;

  @Column('text')
  unidad_medida: string; // catálogo SUNAT (NIU, ZZ, etc.)

  @Column({
    type: 'numeric',
    precision: 12,
    scale: 2,
  })
  precio_unitario: string;

  @Column('text')
  afectacion_igv: string; // catálogo SUNAT (10, 20, 30…)

  @Column({ type: 'boolean', default: false })
  es_servicio: boolean;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  // =========================
  // AUDITORÍA
  // =========================

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
