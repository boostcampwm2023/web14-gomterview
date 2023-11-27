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

  async findByNameAndMemberId(name: string, memberId: number) {
    return await this.repository.findOneBy({
      name: name,
      member: { id: memberId },
    });
  }
}
