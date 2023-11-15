import { Category } from '../entity/category';
import { ApiProperty } from '@nestjs/swagger';
import { createPropertyOption } from '../../util/swagger.util';

export class CategoryResponse {
  @ApiProperty(createPropertyOption(1, '카테고리 ID', Number))
  id: number;

  @ApiProperty(createPropertyOption('BE', '카테고리 이름', String))
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  static from(category: Category) {
    return new CategoryResponse(category.id, category.name);
  }
}
