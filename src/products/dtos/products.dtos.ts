import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsArray,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger'; // libreria obligatoria para la autodocumentacion de la api

export class CreateProductDto {
  //estos decoradores sorven para validar los campos que vienen del request
  //estan para evitar consulta de la base de datos y detectar errores previos
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's name` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty() // este decorador es oblicatorio si se usa swagger para la auto documentacion
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly image: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly brandId: number;

  @IsArray() //sea un array
  @IsNotEmpty() //no este vacio
  @ApiProperty() //se mapee en la documentacion
  readonly categoriesIds: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty()
  limit: number;

  @IsOptional()
  @Min(0)
  @ApiProperty()
  offset: number;

  @IsOptional()
  @IsPositive()
  minPrice: number;

  @ValidateIf((item) => item.minPrice) //este decorador sirve para obligar a que venga un valor si es que viene otro. en este caso si de la vista me envia el minPrice tambien es obligatorio que venga el maxPrice
  @IsPositive()
  maxPrice: number;
}
