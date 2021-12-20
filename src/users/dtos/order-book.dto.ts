import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateOrderBookDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly orderId: number;
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly bookId: number;
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly quantity: number;
}
export class UpdateOrderBookDto extends PartialType(CreateOrderBookDto) {}
