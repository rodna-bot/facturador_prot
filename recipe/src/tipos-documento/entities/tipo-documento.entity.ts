import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Comprobante } from '../../comprobantes/entities/comprobante.entity';

@Entity('tipos_documento')
export class TipoDocumento {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column({ length: 50 })
  nombre: string;

  @OneToMany(() => Comprobante, (comprobante) => comprobante.tipo_documento)
  comprobantes: Comprobante[];
}