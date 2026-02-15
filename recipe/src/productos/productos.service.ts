import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async create(createProductoDto: CreateProductoDto) {
    const nuevo = this.productoRepository.create(createProductoDto);
    return await this.productoRepository.save(nuevo);
  }

  async findAll() {
    return await this.productoRepository.find();
  }

  async findOne(codigo: number) {
    const producto = await this.productoRepository.findOneBy({ codigo });
    if (!producto) throw new NotFoundException('Producto no encontrado');
    return producto;
  }

  async update(codigo: number, updateProductoDto: UpdateProductoDto) {
    const producto = await this.findOne(codigo);
    const actualizado = Object.assign(producto, updateProductoDto);
    return await this.productoRepository.save(actualizado);
  }

  async remove(codigo: number) {
    const producto = await this.findOne(codigo);
    return await this.productoRepository.remove(producto);
  }
}