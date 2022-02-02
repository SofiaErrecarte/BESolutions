import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  IsDate,
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
  readonly operationId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly stateId: number;
}

export class UpdateOperationDto extends PartialType(CreateOperationDto) {}
