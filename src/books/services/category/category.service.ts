import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/books/dtos/category.dto';
import { Category } from 'src/books/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepo.find();
  }
  async findOne(id: number) {
    const category = await this.categoryRepo.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  create(data: CreateCategoryDto) {
    const newCategory = this.categoryRepo.create(data);
    return this.categoryRepo.save(newCategory);
  }

  async update(id: number, changes: UpdateCategoryDto) {
    const category = await this.categoryRepo.findOne(id);
    this.categoryRepo.merge(category, changes);
    return this.categoryRepo.save(category);
  }

  remove(id: number) {
    return this.categoryRepo.delete(id);
  }
}
