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

export class CreateOperationProductDto {
  @IsPositive()
 
  @ApiProperty()
  readonly operationId: number;

  @IsPositive()
 
  @ApiProperty()
  readonly cartId: number;

  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly userId: number;

  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly productId: number;

  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly quantity: number;
}

export class FilterOperationProductDto {
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
  operationId: number;
}

export class DeleteOperationProductDto {
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

export class UpdateOperationProductDto extends PartialType(CreateOperationProductDto) {}
