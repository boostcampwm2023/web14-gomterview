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

  async findWithOriginById(id: number): Promise<Question | null> {
    const question = await this.repository
      .createQueryBuilder('Question')
      .leftJoinAndSelect('Question.origin', 'origin')
      .where('Question.id = :id', { id })
      .getOne();

    if (!question) {
      return null;
    }

    const originQuestion = question.origin as Question | null;

    if (!originQuestion) {
      return question;
    }

    return originQuestion;
  }

  async remove(question: Question) {
    await this.repository.remove(question);
  }
}
