import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateBooksDto,
  UpdateBooksDto,
  FilterBookDto,
} from 'src/books/dtos/book.dto';
import { Book } from 'src/books/entities/books.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    private categoryService: CategoryService,
  ) {}

  findAll(params?: FilterBookDto) {
    if (params) {
      const { limit, offset } = params;
      return this.bookRepo.find({
        relations: ['category'],
        take: limit,
        skip: offset,
      });
    }
    return this.bookRepo.find({ relations: ['category'] });
  }
  async findOne(id: number) {
    const book = await this.bookRepo.findOne(id);
    if (!book) {
      throw new NotFoundException(`Book #${id} not found`);
    }
    return book;
  }

  async create(data: CreateBooksDto) {
    const newBook = this.bookRepo.create(data);
    if (data.categoryId) {
      const category = await this.categoryService.findOne(data.categoryId);
      newBook.category = category;
    }
    return this.bookRepo.save(newBook);
  }

  async update(id: number, changes: UpdateBooksDto) {
    const book = await this.bookRepo.findOne(id);
    if (changes.categoryId) {
      const category = await this.categoryService.findOne(changes.categoryId);
      book.category = category;
    }
    this.bookRepo.merge(book, changes);
    return this.bookRepo.save(book);
  }

  remove(id: number) {
    return this.bookRepo.delete(id);
  }
}
