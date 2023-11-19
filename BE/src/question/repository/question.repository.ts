import { Repository } from 'typeorm';
import { Question } from '../entity/question';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuestionRepository {
  constructor(
    @InjectRepository(Question) private repository: Repository<Question>,
  ) {}

  async save(question: Question) {
    return await this.repository.save(question);
  }

  async findByCategoryId(categoryId: number) {
    return await this.repository.findBy({ category: { id: categoryId } });
  }

  async findById(questionId: number) {
    return await this.repository.findOneBy({ id: questionId });
  }

  async remove(question: Question) {
    await this.repository.remove(question);
  }
}
