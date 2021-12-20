import { Module } from '@nestjs/common';
import { BooksService } from './services/books/books.service';
import { BooksController } from './controllers/books/books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/books.entity';
import { CategoryController } from './controllers/category/category.controller';
import { CategoryService } from './services/category/category.service';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Category])],
  providers: [BooksService, CategoryService],
  controllers: [BooksController, CategoryController],
  exports: [BooksService, TypeOrmModule],
})
export class BooksModule {}
