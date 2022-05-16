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

  // @IsNumber()
  @IsOptional()
  @ApiProperty()
  stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly image: string;

  // @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  user_id: number;

  @IsArray() //sea un array
  @IsOptional() //no este vacio
  @ApiProperty() //se mapee en la documentacion
  readonly categoriesIds: number[];
}

export class UpdateProductDto  {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: `product's name` })
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiProperty() // este decorador es oblicatorio si se usa swagger para la auto documentacion
  readonly description: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  stock: number;

  @IsUrl()
  @IsOptional()
  @ApiProperty()
  readonly image: string;

  // @IsNumber()
  @IsOptional()
  @ApiProperty()
  user_id: number;

  @IsArray() //sea un array
  @IsOptional() //no este vacio
  @ApiProperty() //se mapee en la documentacion
  readonly categoriesIds: number[];
}

export class FilterProductDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty()
  limit: number;

  @IsOptional()
  @Min(0)
  @ApiProperty()
  offset: number;
}
