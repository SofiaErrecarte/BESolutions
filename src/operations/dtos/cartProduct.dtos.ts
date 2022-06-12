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

export class CreateCartProductDto {
  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly cartId: number;

  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly userId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly productId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly quantity: number;
}

export class FilterCartProductDto {
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
  @ApiProperty()
  cartId: number;
}

export class DeleteCartProductDto {
   @IsPositive()
   @IsOptional()
   @ApiProperty()
   readonly cartId: number;

   //@IsPositive()
  @IsOptional()
   @ApiProperty()
   readonly userId: number;

   //@IsPositive()
   @IsOptional()
   @ApiProperty()
  readonly productId: number;

}

export class UpdateCartProductDto extends PartialType(CreateCartProductDto) {}
