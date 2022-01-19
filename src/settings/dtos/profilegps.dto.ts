import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsPositive,
  IsOptional,
  Min,
  IsNumber,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProfilegpsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  @ApiProperty()
  readonly code: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly lineId: number;
}

export class UpdateProfilegpsDto extends PartialType(CreateProfilegpsDto) {}

export class FilterProfilegpsDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty()
  limit: number;

  @IsOptional()
  @Min(0)
  @ApiProperty()
  offset: number;
}
