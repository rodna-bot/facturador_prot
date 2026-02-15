import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('roles')
export class Rol {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column({ length: 50 })
  nombre: string;

  @ManyToMany(() => Usuario, (usuario) => usuario.roles)
  usuarios: Usuario[];
}