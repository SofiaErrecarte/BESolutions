/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsDate, IsOptional, IsPositive, Min, IsNumber } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Product } from '../entities/product.entity';

export class FilterPriceDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty()
  limit: number;

  @IsOptional()
  @Min(0)
  @ApiProperty()
  offset: number;
}

export class CreatePriceDto {
  @IsString()
  @IsNotEmpty()
  readonly descripcion: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  @Type(() => Date)
  readonly fecha: Date;

  @IsNumber()
  @IsNotEmpty()
  readonly product: Product;
}

export class UpdatePriceDto extends PartialType(CreatePriceDto) {}
