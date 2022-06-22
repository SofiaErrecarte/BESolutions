/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min,
  IsDate,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

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

export class CreateOperationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `operation's code` })
  readonly code: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  @Type(() => Date)
  readonly date: Date;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly comment: string;

  // @IsNumber()
  // @IsNotEmpty()
  // @ApiProperty()
  // total: number;

  // @IsNumber()
  @IsOptional()
  @ApiProperty()
  readonly deliveryId: number;

  // @IsNumber()
  @IsOptional()
  @ApiProperty()
  readonly operationToStateId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly cartId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly stateId: number;  
}

export class UpdateOperationDto extends PartialType(CreateOperationDto) {}
