import { Repository } from 'typeorm';
import { Comprobante } from './entities/comprobante.entity';
import { CreateComprobanteDto } from './dto/create-comprobante.dto';
export declare class ComprobantesService {
    private readonly comprobanteRepository;
    constructor(comprobanteRepository: Repository<Comprobante>);
    create(dto: CreateComprobanteDto): Promise<Comprobante>;
    findAll(): Promise<Comprobante[]>;
}
