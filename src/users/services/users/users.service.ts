import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { BooksService } from 'src/books/services/books/books.service';
import { CreateUserDto } from 'src/users/dtos/user.dto';
import { Order } from 'src/users/entities/order.entities';
import { User } from '../../entities/users.entity';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UsersService {
  constructor(
    private booksService: BooksService,
    @Inject('API_KEY') private apiKey: string,
    private configService: ConfigService,
  ) {}
  private counterId = 1;
  private user: User[] = [
    {
      id: 1,
      name: 'pedro ',
      lastName: 'de jesus cortez',
      celphone: '2381042124',
      email: 'pedrouriel_@hotmail.com',
      password: 'tengoambre',
    },
  ];
  findAll() {
    return this.user;
  }
  findOne(id: number) {
    const user = this.user.find((item) => item.id == id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }
  create(payload: CreateUserDto) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.user.push(newUser);
    return newUser;
  }
  update(id: number, payload: any) {
    const user = this.findOne(id);
    if (user) {
      const index = this.user.findIndex((item) => item.id === id);
      this.user[index] = {
        ...user,
        ...payload,
      };
      return this.user[index];
    }
    return null;
  }
  remove(id: number) {
    const index = this.user.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.user.splice(index, 1);
    return true;
  }

  getOrderByUser(id: number): Order {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      books: this.booksService.findAll(),
    };
  }
}
