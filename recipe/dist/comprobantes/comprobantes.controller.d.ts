import { ComprobantesService } from './comprobantes.service';
import { CreateComprobanteDto } from './dto/create-comprobante.dto';
export declare class ComprobantesController {
    private readonly comprobantesService;
    constructor(comprobantesService: ComprobantesService);
    create(createComprobanteDto: CreateComprobanteDto): Promise<import("./entities/comprobante.entity").Comprobante>;
    findAll(): Promise<import("./entities/comprobante.entity").Comprobante[]>;
}
