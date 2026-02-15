import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Rol } from './rol.entity';
import { Comprobante } from '../../comprobantes/entities/comprobante.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column({ type: 'bigint', nullable: true })
  ruc: number;

  @Column({ name: 'razon_social', nullable: true })
  razonSocial: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column() // Recuerda encriptar esta contraseña luego
  password: string;

  @ManyToMany(() => Rol, (rol) => rol.usuarios)
  @JoinTable({ name: 'usuarios_roles' }) // Crea la tabla intermedia de tu diagrama
  roles: Rol[];

  @OneToMany(() => Comprobante, (comprobante) => comprobante.usuario)
  comprobantes: Comprobante[];
}