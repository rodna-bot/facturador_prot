import { Rol } from './rol.entity';
import { Comprobante } from '../../comprobantes/entities/comprobante.entity';
export declare class Usuario {
    codigo: number;
    ruc: number;
    razonSocial: string;
    email: string;
    password: string;
    roles: Rol[];
    comprobantes: Comprobante[];
}
