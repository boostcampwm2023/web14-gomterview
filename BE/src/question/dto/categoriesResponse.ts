import { ApiProperty } from '@nestjs/swagger';
import { createPropertyOption } from '../../util/swagger.util';

const CATEGORIES_EXAMPLE = ['CS', 'BE', 'FE', '나만의 질문'];

export class CategoriesResponse {
  @ApiProperty(
    createPropertyOption(CATEGORIES_EXAMPLE, '질문 dto의 리스트', [String]),
  )
  categories: string[];

  constructor(categories: string[]) {
    this.categories = categories;
  }
}
