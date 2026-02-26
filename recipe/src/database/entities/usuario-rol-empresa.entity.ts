import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  Unique,
} from 'typeorm';
import { Usuario } from './usuario.entity';
import { Empresa } from './empresa.entity';
import { Rol } from './rol.entity';
import { Sede } from './sede.entity';

@Entity('usuarios_empresas_roles')
@Unique(['usuario_id', 'empresa_id', 'rol_id', 'sede_id'])
@Index('idx_uer_lookup', ['usuario_id', 'empresa_id', 'sede_id'])
export class UsuarioEmpresaRol {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  usuario_id: string;

  @Column('uuid', { nullable: true })
  empresa_id?: string | null;

  @Column('smallint')
  rol_id: number;

  @Column('uuid', { nullable: true })
  sede_id?: string | null; // NULL = rol global dentro de la empresa

  @ManyToOne(() => Usuario, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @ManyToOne(() => Empresa, { onDelete: 'RESTRICT', nullable: true })
  @JoinColumn({ name: 'empresa_id' })
  empresa?: Empresa;

  @ManyToOne(() => Rol, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'rol_id' })
  rol: Rol;

  @ManyToOne(() => Sede, { onDelete: 'RESTRICT', nullable: true })
  @JoinColumn({ name: 'sede_id' })
  sede?: Sede;

  @Column('boolean', { default: true })
  activo: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
