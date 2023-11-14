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
    await this.repository.save(category);
  }

  async findAllByMemberId(memberId: number) {
    const option = memberId === null ? null : { id: memberId };
    return await this.repository.findBy({ member: option });
  }

  async remove(category: Category) {
    await this.repository.remove(category);
  }
}
