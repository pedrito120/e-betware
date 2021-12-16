import { Book } from 'src/books/entities/books.entity';
import { User } from './users.entity';

export class Order {
  date: Date;
  user: User;
  books: Book[];
}
