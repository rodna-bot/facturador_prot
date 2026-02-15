import { TiposDocumentoService } from './tipos-documento.service';
import { CreateTipoDocumentoDto } from './dto/create-tipo-documento.dto';
export declare class TiposDocumentoController {
    private readonly service;
    constructor(service: TiposDocumentoService);
    create(dto: CreateTipoDocumentoDto): Promise<import("./entities/tipo-documento.entity").TipoDocumento>;
    findAll(): Promise<import("./entities/tipo-documento.entity").TipoDocumento[]>;
    findOne(id: number): Promise<import("./entities/tipo-documento.entity").TipoDocumento>;
}
