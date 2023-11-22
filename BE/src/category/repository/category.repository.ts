import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entity/category';
import { Repository } from 'typeorm';
import { isEmpty } from 'class-validator';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category) private repository: Repository<Category>,
  ) {}

  async save(category: Category) {
    return await this.repository.save(category);
  }

  async findAllByMemberId(memberId: number) {
    if (isEmpty(memberId)) {
      return await this.findCategoriesWithNullMember();
    }
    // Case 2: memberId가 존재할 때, 해당 값을 id로 가지는 member와 매핑된 Category를 조회
    return await this.repository
      .createQueryBuilder('Category')
      .leftJoinAndSelect('Category.member', 'Member')
      .where('Member.id = :memberId', { memberId })
      .getMany();
  }

  async remove(category: Category) {
    await this.repository.remove(category);
  }

  async findByCategoryId(categoryId: number) {
    return await this.repository.findOneBy({ id: categoryId });
  }

  async findByNameAndMember(name: string, memberId: number) {
    return await this.repository.findOneBy({
      name: name,
      member: { id: memberId },
    });
  }

  async query(query: string) {
    return await this.repository.query(query);
  }

  async findAll() {
    return await this.repository.find({});
  }

  async findCategoriesWithNullMember() {
    return await this.repository
      .createQueryBuilder('category')
      .leftJoin('category.member', 'member')
      .where('member.id IS NULL') // member가 null인 경우
      .getMany();
  }
}
