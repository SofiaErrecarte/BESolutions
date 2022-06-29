/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsDate,
  IsOptional,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateDeliveryDto {
  @IsString()
  //@IsNotEmpty()
  @IsOptional()
  @ApiProperty({ description: `delivery's code` })
  readonly code: string;

  // @IsString()
  // //@IsNotEmpty()
  // @IsOptional()
  // @ApiProperty()
  // readonly shipper: string;

  // @IsString()
  // @IsOptional()
  // @ApiProperty()
  // readonly shipperCellphone: string;

  // @IsString()
  // @IsOptional()
  // @ApiProperty()
  // readonly shipperAddress: string;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  @Type(() => Date)
  readonly estimatedDeliveryDate: Date;

  //@IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly priceId: number;

  @IsNumber()
  //@IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  readonly operationId: number;

//   @IsNumber()
// //@IsNotEmpty()
//   @ApiProperty()
//   readonly deliveryToStateId: number;
}

export class UpdateDeliveryDto extends PartialType(CreateDeliveryDto) {}


