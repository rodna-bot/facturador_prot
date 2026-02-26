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
import { Sede } from './sede.entity';
import { Serie } from './serie.entity';
import { Cliente } from './cliente.entity';
import { Usuario } from './usuario.entity';
import { TipoComprobante } from './tipo-comprobante.entity';
import { EstadoComprobante } from 'src/shared/enums/estado-comprobante.enum';

@Entity('comprobantes')
@Unique('uq_comp_legal_numero', [
  'empresa_id',
  'tipo_comprobante_codigo',
  'serie',
  'correlativo',
])
@Index('idx_comp_empresa_fecha', ['empresa_id', 'fecha_emision'])
@Index('idx_comp_cliente', ['cliente_id'])
export class Comprobante {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // =========================
  // MULTI-TENANT
  // =========================

  @Column('uuid')
  empresa_id: string;

  @ManyToOne(() => Empresa, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'empresa_id' })
  empresa: Empresa;

  @Column('uuid')
  sede_id: string;

  @ManyToOne(() => Sede, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'sede_id' })
  sede: Sede;

  // =========================
  // SERIE (CONFIG)
  // =========================

  @Column('uuid')
  serie_id: string;

  @ManyToOne(() => Serie, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'serie_id' })
  serieRef: Serie;

  // =========================
  // CLIENTE
  // =========================

  @Column('uuid')
  cliente_id: string;

  @ManyToOne(() => Cliente, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  // =========================
  // TIPO COMPROBANTE
  // =========================

  @Column('smallint')
  tipo_comprobante_id: number;

  @ManyToOne(() => TipoComprobante, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'tipo_comprobante_id' })
  tipoComprobante: TipoComprobante;

  // SNAPSHOT LEGAL (CRÍTICO SUNAT)
  @Column({ type: 'varchar', length: 2 })
  tipo_comprobante_codigo: string; // 01, 03, 07, 08

  // =========================
  // NUMERACIÓN LEGAL
  // =========================

  @Column('text')
  serie: string; // snapshot

  @Column('integer')
  correlativo: number;

  // =========================
  // FECHAS Y MONEDA
  // =========================

  @Column({ type: 'timestamptz' })
  fecha_emision: Date;

  @Column({ type: 'varchar', length: 3 })
  moneda: string; // PEN, USD

  @Column({
    type: 'numeric',
    precision: 12,
    scale: 4,
    nullable: true,
  })
  tipo_cambio?: string;

  // =========================
  // TOTALES (NUMERIC → string)
  // =========================

  @Column({ type: 'numeric', precision: 14, scale: 2, default: 0 })
  total_gravadas: string;

  @Column({ type: 'numeric', precision: 14, scale: 2, default: 0 })
  total_inafectas: string;

  @Column({ type: 'numeric', precision: 14, scale: 2, default: 0 })
  total_exoneradas: string;

  @Column({ type: 'numeric', precision: 14, scale: 2, default: 0 })
  total_igv: string;

  @Column({ type: 'numeric', precision: 14, scale: 2, default: 0 })
  total_isc: string;

  @Column({ type: 'numeric', precision: 14, scale: 2, default: 0 })
  total_descuentos: string;

  @Column({ type: 'numeric', precision: 14, scale: 2 })
  total: string;

  // =========================
  // ESTADO
  // =========================

  @Column({
    type: 'enum',
    enum: EstadoComprobante,
    enumName: 'estado_comprobante',
    default: EstadoComprobante.DRAFT,
  })
  estado: EstadoComprobante;

  @Column('text', { nullable: true })
  observaciones?: string;

  // =========================
  // AUDITORÍA
  // =========================

  @Column('uuid', { nullable: true })
  created_by?: string;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  createdByUser?: Usuario;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
