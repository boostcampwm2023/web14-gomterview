import { Category } from '../entity/category';

export class CategoryResponse {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  static from(category: Category) {
    return new CategoryResponse(category.id, category.name);
  }
}
