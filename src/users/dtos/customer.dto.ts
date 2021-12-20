import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;
  @IsString()
  @IsNotEmpty()
  readonly phone: string;
}
export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
