import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  CreateBooksDto,
  FilterBookDto,
  UpdateBooksDto,
} from 'src/books/dtos/book.dto';
import { BooksService } from 'src/books/services/books/books.service';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private service: BooksService) {}

  @Public()
  @Get()
  getAll(@Query() params: FilterBookDto) {
    return this.service.findAll(params);
  }

  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateBooksDto) {
    return this.service.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateBooksDto) {
    return this.service.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
