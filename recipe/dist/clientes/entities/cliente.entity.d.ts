import { Comprobante } from '../../comprobantes/entities/comprobante.entity';
export declare class Cliente {
    codigo: number;
    nombre: string;
    dni: string;
    comprobantes: Comprobante[];
}
