import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsPositive,
} from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'the email of user' })
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;
  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly customerId: number;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}
