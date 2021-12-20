import { PartialType, ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min,
} from 'class-validator';
export class CreateBooksDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly frontpage: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly publication: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly synopsis: string;
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly categoryId: number;
}

export class UpdateBooksDto extends PartialType(CreateBooksDto) {}

export class FilterBookDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty()
  limit: number;

  @IsOptional()
  @Min(0)
  @ApiProperty()
  offset: number;
}
