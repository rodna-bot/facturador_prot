import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { SedesService } from './sedes.service';
import { CreateSedeDto } from './dto/create-sede.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorators';

@Controller('sedes')
@UseGuards(JwtAuthGuard) 
export class SedesController {
  constructor(private readonly sedesService: SedesService) {}
  @Roles('admin')
  @Post('/register')
  create(@Body() createSedeDto: CreateSedeDto) {
    return this.sedesService.create(createSedeDto);
  }
  @Roles('usuario','admin')
  @Get('/list')
  findAll() {
    return this.sedesService.findAll();
  }
  @Roles('usuario','admin')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sedesService.findOne(id);
  }
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sedesService.remove(id);
  }
}