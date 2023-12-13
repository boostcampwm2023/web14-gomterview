import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repository/category.repository';
import { CategoryResponse } from '../dto/categoryResponse';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  @Transactional()
  async findUsingCategories() {
    const categories = await this.categoryRepository.findAll();

    return categories.map(CategoryResponse.from);
  }
}
