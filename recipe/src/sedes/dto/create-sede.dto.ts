import { IsNotEmpty, IsString, IsNumber, MinLength } from 'class-validator';

export class CreateSedeDto {
  @IsString()
  @IsNotEmpty({ message: 'La dirección es obligatoria' })
  direccion: string;

  @IsString()
  @IsNotEmpty()
  departamento: string;

  @IsString()
  @IsNotEmpty()
  provincia: string;

  @IsString()
  @IsNotEmpty()
  distrito: string;

  @IsNumber({}, { message: 'El teléfono debe ser un número' })
  telefono: number;
}