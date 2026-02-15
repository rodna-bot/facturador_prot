import { SedesService } from './sedes.service';
import { CreateSedeDto } from './dto/create-sede.dto';
export declare class SedesController {
    private readonly sedesService;
    constructor(sedesService: SedesService);
    create(createSedeDto: CreateSedeDto): Promise<import("./entities/sede.entity").Sede>;
    findAll(): Promise<import("./entities/sede.entity").Sede[]>;
    findOne(id: number): Promise<import("./entities/sede.entity").Sede>;
    remove(id: number): Promise<import("./entities/sede.entity").Sede>;
}
