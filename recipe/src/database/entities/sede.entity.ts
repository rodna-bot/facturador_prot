import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Empresa } from './empresa.entity';

@Entity('sedes')
@Unique(['empresa_id', 'nombre'])
@Index('idx_sedes_empresa', ['empresa_id'])
export class Sede {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  empresa_id: string;

  @ManyToOne(() => Empresa)
  @JoinColumn({ name: 'empresa_id' })
  empresa: Empresa;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  ubigeo: string;

  @Column({ nullable: true })
  direccion: string;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
