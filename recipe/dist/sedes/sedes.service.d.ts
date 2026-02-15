import { Repository } from 'typeorm';
import { Sede } from './entities/sede.entity';
import { CreateSedeDto } from './dto/create-sede.dto';
export declare class SedesService {
    private readonly sedeRepository;
    constructor(sedeRepository: Repository<Sede>);
    create(createSedeDto: CreateSedeDto): Promise<Sede>;
    findAll(): Promise<Sede[]>;
    findOne(codigo: number): Promise<Sede>;
    remove(codigo: number): Promise<Sede>;
}
