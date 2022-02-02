import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

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

  @IsString()
  @ApiProperty()
  readonly estimatedDeliveryDate: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly price: number;
}

export class UpdateDeliveryDto extends PartialType(CreateDeliveryDto) {}
