import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workbook } from '../entity/workbook';
import { Repository } from 'typeorm';

@Injectable()
export class WorkbookRepository {
  constructor(
    @InjectRepository(Workbook) private repository: Repository<Workbook>,
  ) {}

  async findById(id: number) {
    return await this.repository.findOneBy({ id: id });
  }

  async query(query: string) {
    return await this.repository.query(query);
  }

  async save(workbook: Workbook) {
    return await this.repository.save(workbook);
  }

  async findByNameAndMemberId(title: string, memberId: number) {
    return await this.repository.findOneBy({
      title: title,
      member: { id: memberId },
    });
  }

  async findAll() {
    return await this.repository
      .createQueryBuilder('Workbook')
      .leftJoinAndSelect('Workbook.category', 'category')
      .leftJoinAndSelect('Workbook.member', 'member')
      .getMany();
  }

  async findAllByCategoryId(categoryId: number) {
    return await this.repository
      .createQueryBuilder('Workbook')
      .leftJoinAndSelect('Workbook.member', 'member')
      .leftJoinAndSelect('Workbook.category', 'category')
      .where('category.id = :categoryId', { categoryId })
      .getMany();
  }

  async findTop5Workbooks() {
    return await this.repository
      .createQueryBuilder('Workbook')
      .select()
      .orderBy('Workbook.copyCount', 'DESC')
      .limit(5)
      .getMany();
  }

  async findMembersWorkbooks(memberId: number) {
    return await this.repository
      .createQueryBuilder('Workbook')
      .leftJoinAndSelect('Workbook.member', 'member')
      .where('member.id = :id', { memberId })
      .getMany();
  }
}
