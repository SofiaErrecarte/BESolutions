/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
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

  @IsNotEmpty()
  @ApiProperty()  
  days: number;

  @IsString()
  //@IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  readonly shipper: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly shipperCellphone: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly shipperAddress: string;
}

export class UpdatePriceCitiesDto extends PartialType(CreatePriceCitiesDto) {}
