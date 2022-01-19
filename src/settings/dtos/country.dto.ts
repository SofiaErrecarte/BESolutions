import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsPositive,
  IsOptional,
  Min,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCountryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  @ApiProperty()
  readonly alpha2code: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(3)
  @ApiProperty()
  readonly alpha3code: string;
}

export class UpdateCountryDto extends PartialType(CreateCountryDto) {}

export class FilterCountryDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty()
  limit: number;

  @IsOptional()
  @Min(0)
  @ApiProperty()
  offset: number;
}
