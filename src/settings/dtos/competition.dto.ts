import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsPositive,
  IsOptional,
  Min,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCompetitionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty()
  readonly format: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @ApiProperty()
  readonly level: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @ApiProperty()
  readonly gender: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  @ApiProperty()
  readonly divisionLevel: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly image: string;

  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly countryId: number;
}

export class UpdateCompetitionDto extends PartialType(CreateCompetitionDto) {}

export class FilterCompetitionDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty()
  limit: number;

  @IsOptional()
  @Min(0)
  @ApiProperty()
  offset: number;
}
