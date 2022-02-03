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
  @IsNotEmpty()
  @Length(10)
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cuitcuil: string;

  @IsNotEmpty()
  @ApiProperty()
  role: string;

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  lastname: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiProperty()
  birthday: Date;

  @IsNotEmpty()
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
