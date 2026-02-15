import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
export declare class ProductosService {
    private readonly productoRepository;
    constructor(productoRepository: Repository<Producto>);
    create(createProductoDto: CreateProductoDto): Promise<Producto>;
    findAll(): Promise<Producto[]>;
    findOne(codigo: number): Promise<Producto>;
    update(codigo: number, updateProductoDto: UpdateProductoDto): Promise<Producto & UpdateProductoDto>;
    remove(codigo: number): Promise<Producto>;
}
