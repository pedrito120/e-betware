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
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/books/dtos/category.dto';

import { CategoryService } from 'src/books/services/category/category.service';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private service: CategoryService) {}
  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.service.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateCategoryDto) {
    return this.service.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
