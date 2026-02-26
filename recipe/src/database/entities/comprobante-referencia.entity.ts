/**
 * Entidad que representa las referencias entre comprobantes (ej: NC/ND que afectan a una factura)
 * Se utiliza para registrar las relaciones entre comprobantes, como por ejemplo:
 * - Una Nota de Crédito que afecta a una Factura
 * - Una Nota de Débito que afecta a una Factura
 * - Otros casos de relación entre comprobantes según SUNAT
 *
 * Esta entidad es esencial para cumplir con los requisitos de SUNAT en cuanto a la documentación de las relaciones entre comprobantes.
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  Unique,
} from 'typeorm';
import { Empresa } from './empresa.entity';
import { Comprobante } from './comprobante.entity';

@Entity('comprobante_referencias')
@Index('idx_ref_empresa', ['empresa_id'])
@Index('idx_ref_comprobante', ['comprobante_id'])
@Index('idx_ref_comprobante_afectado', ['ref_comprobante_id'])
@Unique('uq_ref_unica', ['comprobante_id', 'ref_comprobante_id'])
export class ComprobanteReferencia {
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

  // =========================
  // COMPROBANTE EMISOR (NC/ND)
  // =========================

  @Column('uuid')
  comprobante_id: string;

  @ManyToOne(() => Comprobante, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'comprobante_id' })
  comprobante: Comprobante;

  // =========================
  // COMPROBANTE AFECTADO
  // =========================

  @Column('uuid')
  ref_comprobante_id: string;

  @ManyToOne(() => Comprobante, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ref_comprobante_id' })
  comprobanteAfectado: Comprobante;

  // =========================
  // MOTIVO SUNAT
  // =========================

  @Column({ type: 'varchar', length: 2 })
  tipo_relacion: string; // catálogo SUNAT 09

  @Column({ type: 'text', nullable: true })
  motivo?: string;
}
