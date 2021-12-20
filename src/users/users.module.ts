import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BooksModule } from 'src/books/books.module';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { CustomersController } from './controllers/customers/customers.controller';
import { CustomersService } from './services/customers/customers.service';
import { User } from './entities/users.entity';
import { Customer } from './entities/customer.entity';
import { OrderBook } from './entities/order-book.entity';
import { Order } from './entities/order.entity';
import { OrdersService } from './services/orders/orders.service';
import { OrdersController } from './controllers/orders/orders.controller';
import { OrdersBooksController } from './controllers/orders-books/orders-books.controller';
import { OrdersBooksService } from './services/orders-books/orders-books.service';

@Module({
  imports: [
    BooksModule,
    TypeOrmModule.forFeature([User, Customer, OrderBook, Order]),
  ],
  controllers: [
    UsersController,
    CustomersController,
    OrdersController,
    OrdersBooksController,
  ],
  providers: [
    UsersService,
    CustomersService,
    OrdersService,
    OrdersBooksService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
