import { Comprobante } from '../../comprobantes/entities/comprobante.entity';
export declare class Producto {
    codigo: number;
    descripcion: string;
    precio: number;
    precio_total: number;
    comprobantes: Comprobante[];
}
