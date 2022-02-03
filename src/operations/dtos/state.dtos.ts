/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateStateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `states's name` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;
}

export class UpdateStateDto extends PartialType(CreateStateDto) {}
