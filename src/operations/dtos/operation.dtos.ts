/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
<<<<<<< HEAD
  IsDate,
  IsOptional,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
=======
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
>>>>>>> sofi

export class CreateOperationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `operation's code` })
  readonly code: string;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  @Type(() => Date)
  readonly date: Date;

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
  readonly operationToStateId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly cartId: number;
}

export class UpdateOperationDto extends PartialType(CreateOperationDto) {}
