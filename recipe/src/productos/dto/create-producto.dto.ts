import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateProductoDto {
  @IsString({ message: 'La descripción debe ser texto' })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  descripcion: string;

  @IsNumber({}, { message: 'El precio debe ser un número' })
  @Min(0, { message: 'El precio no puede ser negativo' })
  precio: number;
}