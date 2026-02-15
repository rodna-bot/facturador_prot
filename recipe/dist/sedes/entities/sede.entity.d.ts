import { Comprobante } from '../../comprobantes/entities/comprobante.entity';
export declare class Sede {
    codigo: number;
    direccion: string;
    departamento: string;
    provincia: string;
    distrito: string;
    telefono: number;
    comprobantes: Comprobante[];
}
