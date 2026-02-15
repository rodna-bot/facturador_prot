import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTipoDocumentoDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del tipo de documento es obligatorio' })
  @Length(3, 50)
  nombre: string; // Ejemplo: "Factura Electrónica"
}