import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Usuario } from '../../auth/entities/usuario.entity';
import { Sede } from '../../sedes/entities/sede.entity';
import { Producto } from '../../productos/entities/producto.entity';
import { TipoDocumento } from 'src/tipos-documento/entities/tipo-documento.entity';

@Entity('comprobantes')
export class Comprobante {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column({ type: 'date' })
  fecha_emision: Date;

  @Column({ type: 'date' })
  fecha_vencimiento: Date;

  @Column()
  moneda: string;

  @Column({ type: 'float' })
  igv: number;

  @Column()
  tipo_pago: string;

  @Column({ nullable: true })
  nro_cuotas: number;

  // RELACIONES (Las líneas rojas de tu diagrama)
  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'codigo_cliente' })
  cliente: Cliente;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'codigo_usuario' })
  usuario: Usuario;

  @ManyToOne(() => Sede)
  @JoinColumn({ name: 'codigo_sede' })
  sede: Sede;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'codigo_producto_servicio' })
  producto: Producto;

  @ManyToOne(() => TipoDocumento)
  @JoinColumn({ name: 'codigo_tipo_documento' })
  tipo_documento: TipoDocumento;
}