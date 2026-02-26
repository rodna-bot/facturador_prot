import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('empresas')
export class Empresa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 11, unique: true })
  ruc: string;

  @Column()
  razon_social: string;

  @Column({ nullable: true })
  nombre_comercial: string;

  @Column({ nullable: true })
  ubigeo: string;

  @Column({ nullable: true })
  direccion_fiscal: string;

  @Column({ default: 'BETA' })
  sunat_env: string;

  @Column({ nullable: true })
  sol_usuario: string;

  @Column({ nullable: true })
  sol_clave: string;

  @Column({ type: 'bytea', nullable: true })
  cert_pfx: Buffer;

  @Column({ nullable: true })
  cert_password: string;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
