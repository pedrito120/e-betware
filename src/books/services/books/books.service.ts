import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBooksDto } from 'src/books/dtos/book.dto';
import { Book } from 'src/books/entities/books.entity';

@Injectable()
export class BooksService {
  private counterId = 1;
  private book: Book[] = [
    {
      id: 1,
      frontpage: 'string',
      title: 'string',
      publication: 'string',
      synopsis: 'string',
      category: 'string',
    },
  ];
  findAll() {
    return this.book;
  }
  findOne(id: number) {
    const book = this.book.find((item) => item.id == id);
    if (!book) {
      throw new NotFoundException(`Book #${id} not found`);
    }
    return book;
  }
  create(payload: CreateBooksDto) {
    this.counterId = this.counterId + 1;
    const newBook = {
      id: this.counterId,
      ...payload,
    };
    this.book.push(newBook);
    return newBook;
  }
  update(id: number, payload: any) {
    const book = this.findOne(id);
    if (book) {
      const index = this.book.findIndex((item) => item.id === id);
      this.book[index] = {
        ...book,
        ...payload,
      };
      return this.book[index];
    }
    return null;
  }
  remove(id: number) {
    const index = this.book.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Book #${id} not found`);
    }
    this.book.splice(index, 1);
    return true;
  }
}
