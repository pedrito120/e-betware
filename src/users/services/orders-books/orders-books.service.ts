import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/books/entities/books.entity';
import {
  CreateOrderBookDto,
  UpdateOrderBookDto,
} from 'src/users/dtos/order-book.dto';
import { OrderBook } from 'src/users/entities/order-book.entity';
import { Order } from 'src/users/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersBooksService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderBook) private orderBookRepo: Repository<OrderBook>,
    @InjectRepository(Book) private bookRepo: Repository<Book>,
  ) {}

  async create(data: CreateOrderBookDto) {
    const order = await this.orderRepo.findOne(data.orderId);
    const book = await this.bookRepo.findOne(data.bookId);
    const item = new OrderBook();
    item.order = order;
    item.book = book;
    item.quantity = data.quantity;
    return this.orderBookRepo.save(item);
  }

  async update(id: number, changes: UpdateOrderBookDto) {
    const item = await this.orderBookRepo.findOne(id);
    if (changes.orderId) {
      const order = await this.orderRepo.findOne(changes.orderId);
      item.order = order;
    }
    if (changes.bookId) {
      const book = await this.bookRepo.findOne(changes.bookId);
      item.book = book;
    }
    this.orderBookRepo.merge(item, changes);
    return this.orderBookRepo.save(item);
  }

  remove(id: number) {
    return this.orderBookRepo.delete(id);
  }
}
