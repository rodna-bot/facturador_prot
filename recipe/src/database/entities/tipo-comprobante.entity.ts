import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tipos_comprobante')
export class TipoComprobante {
  @PrimaryGeneratedColumn('increment', { type: 'smallint' })
  id: number;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 2 })
  codigo_sunat: string;

  @Column('text')
  nombre: string;

  @Column({ default: true })
  requiere_cliente: boolean;

  @Column({ default: true })
  permite_credito: boolean;

  @Column({ default: true })
  activo: boolean;
}
