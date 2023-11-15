import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repository/category.repository';
import { CreateCategoryRequest } from '../dto/createCategoryRequest';
import { Member } from '../../member/entity/member';
import { isEmpty } from 'class-validator';
import { CategoryNameEmptyException } from '../exception/category.exception';
import { ManipulatedTokenNotFiltered } from '../../token/exception/token.exception';
import { Category } from '../entity/category';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async createCategory(
    createCategoryRequest: CreateCategoryRequest,
    member: Member,
  ) {
    console.log(createCategoryRequest);
    if (isEmpty(createCategoryRequest.name)) {
      throw new CategoryNameEmptyException();
    }

    if (isEmpty(member)) {
      throw new ManipulatedTokenNotFiltered();
    }

    return await this.categoryRepository.save(
      Category.from(createCategoryRequest, member),
    );
  }
}
