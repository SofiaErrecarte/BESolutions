import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsDate,
  Length,
  IsPositive,
  IsOptional,
  Min,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'the username of user' })
  username: string;

  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'the email of user' })
  email: string;

  @IsString()
  @IsOptional()
  @Length(10)
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cuitcuil: string;

  @IsOptional()
  @ApiProperty()
  role: string;

  @IsOptional()
  @ApiProperty()
  phone: string;

  @IsNotEmpty()
  @ApiProperty()
  cp: string;

  @IsNotEmpty()
  @ApiProperty()
  ciudad: string;

  @IsNotEmpty()
  @ApiProperty()
  provincia: string;

  @IsNotEmpty()
  @ApiProperty()
  razonsocial: string;

  @IsNotEmpty()
  @ApiProperty()
  direccion: string;

  @IsOptional()
  @ApiProperty()
  estado: string;

  // @IsDate()
  // @IsOptional()
  // @Type(() => Date)
  // @ApiProperty()
  // birthday: Date;

  @IsOptional()
  @ApiProperty()
  image: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class FilterUserDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty()
  limit: number;

  @IsOptional()
  @Min(0)
  @ApiProperty()
  offset: number;
}
