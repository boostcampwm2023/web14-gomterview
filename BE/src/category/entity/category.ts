import { Column, Entity } from 'typeorm';
import { DefaultEntity } from '../../app.entity';
import { CreateCategoryRequest } from '../dto/createCategoryRequest';

@Entity({ name: 'Category' })
export class Category extends DefaultEntity {
  @Column()
  name: string;

  constructor(id: number, name: string, createdAt: Date) {
    super(id, createdAt);
    this.name = name;
  }

  static from(inputObj: CreateCategoryRequest | Category) {
    return new Category(null, inputObj.name, new Date());
  }

  static of(name: string) {
    return new Category(null, name, new Date());
  }
}
