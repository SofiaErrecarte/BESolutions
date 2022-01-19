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

export class CreateLineDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  @ApiProperty()
  readonly code2: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(3)
  @ApiProperty()
  readonly code3: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly orderr: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly image: string;
}

export class UpdateLineDto extends PartialType(CreateLineDto) {}

export class FilterLineDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty()
  limit: number;

  @IsOptional()
  @Min(0)
  @ApiProperty()
  offset: number;
}
