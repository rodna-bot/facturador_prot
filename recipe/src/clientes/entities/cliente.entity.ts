import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Comprobante } from '../../comprobantes/entities/comprobante.entity';

@Entity('clientes')
export class Cliente {

  @PrimaryGeneratedColumn()
  codigo: number;

  @Column({ length: 100 })
  nombre: string;

  // 🔹 Si es true → empresa (pide RUC)
  // 🔹 Si es false → persona (pide DNI)
  @Column({ default: false })
  esEmpresa: boolean;

  // DNI (8 dígitos) - opcional
  @Column({ length: 8, nullable: true })
  dni?: string;

  // RUC (11 dígitos) - opcional
  @Column({ length: 11, nullable: true })
  ruc?: string;

  @OneToMany(() => Comprobante, (comprobante) => comprobante.cliente)
  comprobantes: Comprobante[];
}
