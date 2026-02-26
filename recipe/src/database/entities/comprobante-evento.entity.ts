/*
 * ComprobanteEvento Entity
 * Esta entidad representa un evento o acción relevante que ocurre en relación a un comprobante.
 * Ejemplos de eventos:
 * - Creación de un comprobante
 * - Modificación de un comprobante
 * - Envío a SUNAT
 * - Recepción de respuesta de SUNAT
 * - Anulación de un comprobante
 * - Relación con otro comprobante (ej. una Nota de Débito que afecta a una Factura)
 * - Otros casos de eventos relevantes según el negocio y requisitos de SUNAT
 *
 * Esta entidad es esencial para mantener un historial detallado de las acciones y eventos que afectan a cada comprobante, lo cual es crucial para auditorías, seguimiento y cumplimiento con los requisitos de SUNAT.
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  CreateDateColumn,
} from 'typeorm';
import { Empresa } from './empresa.entity';
import { Comprobante } from './comprobante.entity';
import { Usuario } from './usuario.entity';

@Entity('comprobante_eventos')
@Index('idx_eventos_empresa', ['empresa_id'])
@Index('idx_eventos_comprobante', ['comprobante_id'])
export class ComprobanteEvento {
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
  // COMPROBANTE
  // =========================

  @Column('uuid')
  comprobante_id: string;

  @ManyToOne(() => Comprobante, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'comprobante_id' })
  comprobante: Comprobante;

  // =========================
  // EVENTO
  // =========================

  @Column('text')
  tipo_evento: string;

  @Column('text', { nullable: true })
  detalle?: string;

  // =========================
  // ACTOR
  // =========================

  @Column('uuid', { nullable: true })
  actor_usuario_id?: string;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'actor_usuario_id' })
  actorUsuario?: Usuario;

  // =========================
  // AUDITORÍA
  // =========================

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
