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

export class CreateOperationDto {
  @IsDate()
  @IsOptional()
  @ApiProperty()
  @Type(() => Date)
  readonly date: Date;

  @IsString()
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

export class UpdateOperationDto extends PartialType(CreateOperationDto) {}
