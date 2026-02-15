import { IsDateString, IsNotEmpty, IsNumber, IsString, IsOptional, Min } from 'class-validator';

export class CreateComprobanteDto {
  @IsDateString()
  fecha_emision: string;

  @IsDateString()
  fecha_vencimiento: string;

  @IsString()
  @IsNotEmpty()
  moneda: string;

  @IsNumber()
  @Min(0)
  igv: number;

  @IsString()
  tipo_pago: string;

  @IsNumber()
  @IsOptional()
  nro_cuotas?: number;

  // IDs de las relaciones (Las líneas rojas de tu diagrama)
  @IsNumber()
  codigo_cliente: number;

  @IsNumber()
  codigo_usuario: number;

  @IsNumber()
  codigo_sede: number;

  @IsNumber()
  codigo_producto_servicio: number;
  @IsNumber()
  codigo_tipo_documento: number;
}