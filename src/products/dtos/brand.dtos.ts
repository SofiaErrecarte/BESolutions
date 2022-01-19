import { IsString, IsUrl, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger'; // libreria obligatoria para la autodocumentacion de la api

export class CreateBrandDto {
  //estos decoradores sorven para validar los campos que vienen del request
  //estan para evitar consulta de la base de datos y detectar errores previos
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's name` })
  readonly name: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly image: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
