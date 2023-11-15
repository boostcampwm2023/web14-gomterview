import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repository/category.repository';
import { CreateCategoryRequest } from '../dto/createCategoryRequest';
import { Member } from '../../member/entity/member';
import { isEmpty } from 'class-validator';
import { CategoryNameEmptyException } from '../exception/category.exception';
import { Category } from '../entity/category';
import { validateManipulatedToken } from 'src/util/token.util';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async createCategory(
    createCategoryRequest: CreateCategoryRequest,
    member: Member,
  ) {
    validateManipulatedToken(member);

    if (isEmpty(createCategoryRequest.name)) {
      throw new CategoryNameEmptyException();
    }

    return await this.categoryRepository.save(
      Category.from(createCategoryRequest, member),
    );
  }

  async findUsingCategories(member?: Member) {}
}
