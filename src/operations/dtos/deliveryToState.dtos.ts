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

export class CreateDeliveryToStateDto {
  @IsDate()
  @ApiProperty()
  @Type(() => Date)
  readonly date: Date;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly comment: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly deliveryId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly stateId: number;
}

export class UpdateDeliveryToStateDto extends PartialType(
  CreateDeliveryToStateDto,
) {}
