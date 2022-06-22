/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreatePriceCitiesDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()  
  cp_origen: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cp_destino: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  origen: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()  
  destino: string;

  // @IsString()
  @IsNotEmpty()
  @ApiProperty()  
  price: number;
}

export class UpdatePriceCitiesDto extends PartialType(CreatePriceCitiesDto) {}
