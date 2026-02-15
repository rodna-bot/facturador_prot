import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Comprobante } from '../../comprobantes/entities/comprobante.entity';

@Entity('productos_servicios')
export class Producto {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column()
  descripcion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_total: number;

  @OneToMany(() => Comprobante, (comprobante) => comprobante.producto)
  comprobantes: Comprobante[];
}