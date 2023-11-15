import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repository/category.repository';
import { CreateCategoryRequest } from '../dto/createCategoryRequest';
import { Member } from '../../member/entity/member';
import { isEmpty } from 'class-validator';
import { CategoryNameEmptyException } from '../exception/category.exception';
import { Category } from '../entity/category';
import { validateManipulatedToken } from 'src/util/token.util';
import { CategoryResponse } from '../dto/categoryResponse';

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

  async findUsingCategories(member: Member) {
    const categories = await this.categoryRepository.findAllByMemberId(
      isEmpty(member) ? null : member.id,
    );

    return categories.map(CategoryResponse.from);
  }
}
