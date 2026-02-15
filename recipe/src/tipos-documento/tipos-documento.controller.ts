import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { TiposDocumentoService } from './tipos-documento.service';
import { CreateTipoDocumentoDto } from './dto/create-tipo-documento.dto';

@Controller('tipos-documento')
export class TiposDocumentoController {
  constructor(private readonly service: TiposDocumentoService) {}

  @Post('/register')
  create(@Body() dto: CreateTipoDocumentoDto) {
    return this.service.create(dto);
  }

  @Get('/list')
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }
}