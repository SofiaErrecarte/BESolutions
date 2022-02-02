import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateOperationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `operation's code` })
  readonly code: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly date: string;

  @IsString()
  @ApiProperty()
  readonly comment: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly total: number;

  @IsPositive()
  @ApiProperty()
  readonly deliveryId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly cartId: number;
}

export class UpdateOperationDto extends PartialType(CreateOperationDto) {}
