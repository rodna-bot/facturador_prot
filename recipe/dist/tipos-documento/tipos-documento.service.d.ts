import { Repository } from 'typeorm';
import { TipoDocumento } from './entities/tipo-documento.entity';
import { CreateTipoDocumentoDto } from './dto/create-tipo-documento.dto';
export declare class TiposDocumentoService {
    private readonly repository;
    constructor(repository: Repository<TipoDocumento>);
    create(dto: CreateTipoDocumentoDto): Promise<TipoDocumento>;
    findAll(): Promise<TipoDocumento[]>;
    findOne(codigo: number): Promise<TipoDocumento>;
}
