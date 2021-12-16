import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateBooksDto } from 'src/books/dtos/book.dto';
import { BooksService } from 'src/books/services/books/books.service';

@Controller('books')
export class BooksController {
  constructor(private service: BooksService) {}
  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get(':userId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('userId', ParseIntPipe) userId: number) {
    return this.service.findOne(userId);
  }

  @Get(':userId/borrowed')
  @HttpCode(HttpStatus.ACCEPTED)
  getBorrowedBooks(@Param('userId', ParseIntPipe) userId: number) {
    return this.service.findOne(userId);
  }

  @Post()
  create(@Body() payload: CreateBooksDto) {
    this.service.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return this.service.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
