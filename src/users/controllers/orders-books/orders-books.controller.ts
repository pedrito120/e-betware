import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  CreateOrderBookDto,
  UpdateOrderBookDto,
} from 'src/users/dtos/order-book.dto';
import { OrdersBooksService } from 'src/users/services/orders-books/orders-books.service';

@ApiTags('Orders Books')
@Controller('orders-books')
export class OrdersBooksController {
  constructor(private service: OrdersBooksService) {}
  @Post()
  create(@Body() payload: CreateOrderBookDto) {
    return this.service.create(payload);
  }
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOrderBookDto,
  ) {
    return this.service.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
