import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('roles')
@Unique(['nombre'])
export class Rol {
  @PrimaryGeneratedColumn('increment', { type: 'smallint' })
  id: number;

  @Column('text')
  nombre: string;

  @Column('text', { nullable: true })
  descripcion?: string;
}
