import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { BooksService } from 'src/books/services/books/books.service';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dto';
import { User } from '../../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomersService } from '../customers/customers.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    private booksService: BooksService,
    @InjectRepository(User) private userRepo: Repository<User>,
    private customerService: CustomersService,
  ) {}
  findAll() {
    return this.userRepo.find({
      relations: ['customer'],
    });
  }
  async findOne(id: number) {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(`user #${id} not found`);
    }
    return user;
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    if (data.customerId) {
      const customer = await this.customerService.findOne(data.customerId);
      newUser.customer = customer;
    }
    return this.userRepo.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.userRepo.findOne(id);
    if (changes.customerId) {
      const customer = await this.customerService.findOne(changes.customerId);
      user.customer = customer;
    }
    this.userRepo.merge(user, changes);
    return this.userRepo.save(user);
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }

  async getOrderByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      books: await this.booksService.findAll(),
    };
  }
}
