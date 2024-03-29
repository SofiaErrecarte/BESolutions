/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsArray,
  IsOptional,
  Min,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  subtotal: number;

  // @IsArray()
  // @IsNotEmpty()
  // @ApiProperty()
  // readonly productsIds: number[];

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly userId: number;

  @IsOptional()
  @ApiProperty()
  readonly state: boolean;

  @IsPositive()
  @ApiProperty()
  @IsOptional()
  readonly cartProductId: number;
}

export class FilterOperationDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty()
  limit: number;

  @IsOptional()
  @Min(0)
  @ApiProperty()
  offset: number;
}

export class UpdateCartDto extends PartialType(CreateCartDto) {}
