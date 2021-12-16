import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty } from 'class-validator';
export class CreateBooksDto {
  @IsString()
  @IsNotEmpty()
  readonly frontpage: string;
  @IsString()
  @IsNotEmpty()
  readonly title: string;
  @IsString()
  @IsNotEmpty()
  readonly publication: string;
  @IsString()
  @IsNotEmpty()
  readonly synopsis: string;
  @IsString()
  @IsNotEmpty()
  readonly category: string;
}

export class UpdateBooksDto extends PartialType(CreateBooksDto) {}
