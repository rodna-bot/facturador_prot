import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { SedesService } from './sedes.service';
import { CreateSedeDto } from './dto/create-sede.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('sedes')
@UseGuards(JwtAuthGuard) 
export class SedesController {
  constructor(private readonly sedesService: SedesService) {}

  @Post('/register')
  create(@Body() createSedeDto: CreateSedeDto) {
    return this.sedesService.create(createSedeDto);
  }

  @Get('/list')
  findAll() {
    return this.sedesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sedesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sedesService.remove(id);
  }
}