import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repository/category.repository';
import { CategoryResponse } from '../dto/categoryResponse';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async findUsingCategories() {
    const categories = await this.categoryRepository.findAll();

    return categories.map(CategoryResponse.from);
  }
}
