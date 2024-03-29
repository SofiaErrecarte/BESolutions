/* eslint-disable prettier/prettier */
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
import { User } from 'src/users/entities/user.entity';

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

  @IsNotEmpty()
  @ApiProperty()
  price: number;

  // @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  stock: number;

  @IsOptional()
  @ApiProperty()
  readonly image: string;

  // @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  user_id: number;

  @IsNotEmpty()
  @ApiProperty()
  category_id: number;

  // @IsArray() //sea un array
  // @IsOptional() //no este vacio
  // @ApiProperty() //se mapee en la documentacion
  // readonly categoriesIds: number[];
}

export class UpdateProductDto  {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's name` })
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiProperty() // este decorador es oblicatorio si se usa swagger para la auto documentacion
  readonly description: string;

  @IsNotEmpty()
  @ApiProperty()
  category_id: number;
  
  //@IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  stock: number;

  @IsOptional()
  @ApiProperty()
  readonly image: string;

  // @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  user_id: number;

  @IsOptional()
  @ApiProperty()
  price: number;

  @IsString()
  @IsOptional()
  @ApiProperty() // este decorador es oblicatorio si se usa swagger para la auto documentacion
  state: string;

  @IsArray() //sea un array
  @IsOptional() //no este vacio
  @ApiProperty() //se mapee en la documentacion
  readonly categoriesIds: number[];
}

export class FilterProductDto {
  @IsOptional()
  @ApiProperty()
  limit: number;

  @IsOptional()
  @Min(0)
  @ApiProperty()
  offset: number;

  @IsOptional()
  @IsString()
  value: string;

  @IsOptional()
  seller: number;

  @IsOptional()
  category: number;

}

export class ExistsProductDto  {
  

  // @IsNumber()
  // @IsOptional()
  // @ApiProperty()
  // user_id: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  product_id: number;

}