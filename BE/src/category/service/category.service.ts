import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repository/category.repository';
import { CreateCategoryRequest } from '../dto/createCategoryRequest';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async createCategory(createCategoryRequest: CreateCategoryRequest) {}
}
