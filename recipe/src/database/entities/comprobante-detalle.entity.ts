import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  Index,
} from 'typeorm';
import { Comprobante } from './comprobante.entity';
import { Empresa } from './empresa.entity';
import { ProductoServicio } from './producto-servicio.entity';

@Entity('comprobante_detalle')
@Unique('uq_detalle_comp_item', ['comprobante_id', 'item'])
@Index('idx_detalle_empresa', ['empresa_id'])
export class ComprobanteDetalle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // =========================
  // FKs
  // =========================

  @Column('uuid')
  comprobante_id: string;

  @ManyToOne(() => Comprobante, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'comprobante_id' })
  comprobante: Comprobante;

  @Column('uuid')
  empresa_id: string;

  @ManyToOne(() => Empresa)
  @JoinColumn({ name: 'empresa_id' })
  empresa: Empresa;

  @Column('integer')
  item: number;

  @Column('uuid', { nullable: true })
  producto_id?: string;

  @ManyToOne(() => ProductoServicio, { nullable: true })
  @JoinColumn({ name: 'producto_id' })
  producto?: ProductoServicio;

  // =========================
  // DATOS DEL ITEM
  // =========================

  @Column('text')
  descripcion: string;

  @Column('text')
  unidad_medida: string;

  @Column({ type: 'numeric', precision: 12, scale: 3 })
  cantidad: string;

  @Column({ type: 'numeric', precision: 12, scale: 6 })
  valor_unitario: string;

  @Column({ type: 'numeric', precision: 12, scale: 6 })
  precio_unitario: string;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  descuento: string;

  @Column('text')
  afectacion_igv: string;

  @Column({ type: 'numeric', precision: 14, scale: 2, default: 0 })
  igv_monto: string;

  @Column({
    type: 'numeric',
    precision: 14,
    scale: 2,
    default: 0,
    nullable: true,
  })
  isc_monto: string;

  @Column({ type: 'numeric', precision: 14, scale: 2 })
  total_linea: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
