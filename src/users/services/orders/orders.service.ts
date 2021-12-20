import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto, UpdateOrderDto } from 'src/users/dtos/order.dto';
import { Customer } from 'src/users/entities/customer.entity';
import { Order } from 'src/users/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}
  findAll() {
    return this.orderRepo.find();
  }
  async findOne(id: number) {
    const order = await this.orderRepo.findOne(id, {
      relations: ['books', 'books.book'],
    });
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  async create(data: CreateOrderDto) {
    const order = new Order();
    if (data.customerId) {
      const customer = await this.customerRepo.findOne(data.customerId);
      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.orderRepo.findOne(id);
    if (changes.customerId) {
      const customer = await this.customerRepo.findOne(changes.customerId);
      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  remove(id: number) {
    return this.orderRepo.delete(id);
  }
}
