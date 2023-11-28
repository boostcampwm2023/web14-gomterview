import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entity/category';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category) private repository: Repository<Category>,
  ) {}

  async save(category: Category) {
    return await this.repository.save(category);
  }

  async remove(category: Category) {
    await this.repository.remove(category);
  }

  async findByCategoryId(categoryId: number) {
    return await this.repository.findOneBy({ id: categoryId });
  }

  async query(query: string) {
    return await this.repository.query(query);
  }

  async findAll() {
    return await this.repository.find({});
  }
}
