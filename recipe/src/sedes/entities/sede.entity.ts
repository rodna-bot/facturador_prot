import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Comprobante } from '../../comprobantes/entities/comprobante.entity';

@Entity('sedes')
export class Sede {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column()
  direccion: string;

  @Column()
  departamento: string;

  @Column()
  provincia: string;

  @Column()
  distrito: string;

  @Column({ type: 'int' })
  telefono: number;

  @OneToMany(() => Comprobante, (comprobante) => comprobante.sede)
  comprobantes: Comprobante[];
}