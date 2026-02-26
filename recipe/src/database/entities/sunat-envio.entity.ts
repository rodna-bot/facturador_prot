/**
 * Entidad que representa el proceso de envío a SUNAT.
 * Esta entidad se utiliza para registrar cada intento de envío de un comprobante a SUNAT, incluyendo su estado, archivos relacionados y cualquier error que pueda ocurrir.
 * Es fundamental para el seguimiento y auditoría de los envíos a SUNAT, así como para implementar lógicas de reintentos en caso de errores temporales.
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  Index,
  Unique,
} from 'typeorm';
import { Empresa } from './empresa.entity';
import { Comprobante } from './comprobante.entity';
import { EstadoSunat } from 'src/shared/enums/estado-sunat.enum';

@Entity('sunat_envios')
@Index('idx_sunat_empresa_estado', ['empresa_id', 'estado'])
@Unique('uq_sunat_comprobante', ['comprobante_id'])
export class SunatEnvio {
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
  // RELACIÓN 1:1 CON COMPROBANTE
  // =========================

  @Column('uuid')
  comprobante_id: string;

  @OneToOne(() => Comprobante, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'comprobante_id' })
  comprobante: Comprobante;

  // =========================
  // ARCHIVOS
  // =========================

  @Column('text', { nullable: true })
  xml_path?: string;

  @Column('text', { nullable: true })
  zip_path?: string;

  @Column('text', { nullable: true })
  cdr_path?: string;

  @Column('text', { nullable: true })
  ticket?: string;

  // =========================
  // ESTADO SUNAT
  // =========================

  @Column({
    type: 'enum',
    enum: EstadoSunat,
    enumName: 'estado_sunat',
    default: EstadoSunat.PENDIENTE,
  })
  estado: EstadoSunat;

  @Column('text', { nullable: true })
  codigo_error?: string;

  @Column('text', { nullable: true })
  mensaje_error?: string;

  @Column({ type: 'integer', default: 0 })
  intentos: number;

  // =========================
  // FECHAS
  // =========================

  @Column({ type: 'timestamptz', nullable: true })
  fecha_envio?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  fecha_respuesta?: Date;
}
