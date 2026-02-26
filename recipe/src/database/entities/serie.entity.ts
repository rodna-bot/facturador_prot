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
import { TipoComprobante } from './tipo-comprobante.entity';

@Entity('series')
@Unique('uq_series_empresa_tipo_serie', [
  'empresa_id',
  'tipo_comprobante_id',
  'serie',
])
@Index('idx_series_empresa', ['empresa_id'])
export class Serie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // =========================
  // EMPRESA
  // =========================
  @Column('uuid')
  empresa_id: string;

  @ManyToOne(() => Empresa, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'empresa_id' })
  empresa: Empresa;

  // =========================
  // TIPO COMPROBANTE
  // =========================
  @Column('smallint')
  tipo_comprobante_id: number;

  @ManyToOne(() => TipoComprobante, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'tipo_comprobante_id' })
  tipoComprobante: TipoComprobante;

  // =========================
  // SERIE
  // =========================
  @Column('text')
  serie: string; // F001, B001, FC01…

  @Column({ type: 'integer', default: 0 })
  correlativo_actual: number;

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
