import { ApiProperty } from '@nestjs/swagger';
import { createPropertyOption } from '../../util/swagger.util';
import { CategoryResponse } from './categoryResponse';
import {
  categoryListResponseFixture,
  customCategoryFixture,
} from '../fixture/category.fixture';

export class CategoryListResponse {
  @ApiProperty(
    createPropertyOption(
      CategoryResponse.from(customCategoryFixture),
      '커스텀 카테고리 정보',
      CategoryResponse,
    ),
  )
  customCategory: CategoryResponse | null;

  @ApiProperty(
    createPropertyOption(categoryListResponseFixture, '카테고리 리스트 응답', [
      CategoryResponse,
    ]),
  )
  categoryList: CategoryResponse[];

  constructor(
    customCategory: CategoryResponse,
    categoryList: CategoryResponse[],
  ) {
    this.customCategory = customCategory;
    this.categoryList = categoryList;
  }

  static of(categoryList: CategoryResponse[]) {
    const customCategory = categoryList.filter(
      (each) => each.name == '나만의 질문',
    )[0];

    const others = categoryList.filter((each) => each.name != '나만의 질문');

    return new CategoryListResponse(
      customCategory ? customCategory : null,
      others,
    );
  }
}
