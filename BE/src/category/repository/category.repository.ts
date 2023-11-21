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

  async findAllByMemberId(memberId: number) {
    const queryBuilder = this.repository.createQueryBuilder('Category');

    if (memberId === null) {
      // Case 1: memberId가 null일 때, 연관관계가 Null인 Category를 조회
      return await queryBuilder
        .leftJoinAndSelect('Category.member', 'member')
        .where('Category.member IS NULL')
        .getMany();
    }
    // Case 2: memberId가 존재할 때, 해당 값을 id로 가지는 member와 매핑된 Category를 조회
    return await queryBuilder
      .leftJoinAndSelect('Category.member', 'member')
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
}
