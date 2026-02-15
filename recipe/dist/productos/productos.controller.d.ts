import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
export declare class ProductosController {
    private readonly productosService;
    constructor(productosService: ProductosService);
    create(createProductoDto: CreateProductoDto): Promise<import("./entities/producto.entity").Producto>;
    findAll(): Promise<import("./entities/producto.entity").Producto[]>;
    findOne(id: number): Promise<import("./entities/producto.entity").Producto>;
    update(id: number, updateProductoDto: UpdateProductoDto): Promise<import("./entities/producto.entity").Producto & UpdateProductoDto>;
    remove(id: number): Promise<import("./entities/producto.entity").Producto>;
}
