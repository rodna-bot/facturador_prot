import { Cliente } from '../../clientes/entities/cliente.entity';
import { Usuario } from '../../auth/entities/usuario.entity';
import { Sede } from '../../sedes/entities/sede.entity';
import { Producto } from '../../productos/entities/producto.entity';
import { TipoDocumento } from 'src/tipos-documento/entities/tipo-documento.entity';
export declare class Comprobante {
    codigo: number;
    fecha_emision: Date;
    fecha_vencimiento: Date;
    moneda: string;
    igv: number;
    tipo_pago: string;
    nro_cuotas: number;
    cliente: Cliente;
    usuario: Usuario;
    sede: Sede;
    producto: Producto;
    tipo_documento: TipoDocumento;
}
