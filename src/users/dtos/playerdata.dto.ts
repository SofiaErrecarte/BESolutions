import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './user.dto';

export class CreatePlayerdataDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @ApiProperty()
  readonly height: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @ApiProperty()
  readonly weight: number;

  @IsOptional()
  @ApiProperty()
  @IsString()
  readonly foot: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  readonly gpsId: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  readonly hudlId: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  readonly nacsportsId: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  readonly longomatchId: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  readonly angleId: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  readonly tranfermarketId: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  readonly tranfermarketLink: string;

  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly userId: number;

  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly teamId: number;

  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly profilegpsId: number;

  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly positionId1: number;

  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly positionId2: number;

  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly positionId3: number;
}

export class UpdatePlayerdataDto extends PartialType(CreatePlayerdataDto) {}

export class FilterPlayerdataDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty()
  limit: number;

  @IsOptional()
  @Min(0)
  @ApiProperty()
  offset: number;
}
