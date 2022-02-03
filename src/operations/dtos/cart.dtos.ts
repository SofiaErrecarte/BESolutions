/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsArray,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly subtotal: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly productsIds: number[];
}

export class UpdateCartDto extends PartialType(CreateCartDto) {}
