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
  @IsNotEmpty()
  @ApiProperty({ description: `delivery's code` })
  readonly code: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly shipper: string;

  @IsString()
  @ApiProperty()
  readonly shipperCellphone: string;

  @IsString()
  @ApiProperty()
  readonly shipperAddress: string;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  @Type(() => Date)
  readonly estimatedDeliveryDate: Date;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly price: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly operationId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly deliveryToStateId: number;
}

export class UpdateDeliveryDto extends PartialType(CreateDeliveryDto) {}


