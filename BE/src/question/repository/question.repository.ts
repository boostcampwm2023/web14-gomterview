import { Repository } from 'typeorm';
import { Question } from '../entity/question';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuestionRepository {
  constructor(
    @InjectRepository(Question) private repository: Repository<Question>,
  ) {}

  async query(query: string) {
    return await this.repository.query(query);
  }

  async save(question: Question) {
    return await this.repository.save(question);
  }

  async insert(question: Question) {
    await this.repository.insert(question);
    return question;
  }

  async saveAll(questions: Question[]) {
    await this.repository.insert(questions);
  }

  async findByWorkbookId(workbookId: number) {
    return await this.repository
      .createQueryBuilder('Question')
      .leftJoinAndSelect('Question.workbook', 'workbook')
      .leftJoinAndSelect('Question.origin', 'origin')
      .leftJoinAndSelect('Question.defaultAnswer', 'defaultAnswer')
      .where('workbook.id = :workbookId', { workbookId })
      .getMany();
  }

  async findAllByIds(ids: number[]) {
    return await this.repository
      .createQueryBuilder('Question')
      .leftJoinAndSelect('Question.workbook', 'workbook')
      .leftJoinAndSelect('Question.origin', 'origin')
      .leftJoinAndSelect('Question.defaultAnswer', 'defaultAnswer')
      .where('Question.id IN (:...ids)', { ids })
      .getMany();
  }

  async findById(questionId: number) {
    return await this.repository.findOneBy({ id: questionId });
  }

  async findQuestionWithOriginById(id: number) {
    return await this.repository
      .createQueryBuilder('Question')
      .leftJoinAndSelect('Question.origin', 'origin')
      .leftJoinAndSelect('Question.defaultAnswer', 'defaultAnswer')
      .where('Question.id = :id', { id })
      .getOne();
  }

  async findOriginById(id: number): Promise<Question | null> {
    const question = await this.findQuestionWithOriginById(id);
    return this.fetchOrigin(question);
  }

  async update(question: Question) {
    await this.repository.update({ id: question.id }, question);
  }

  async remove(question: Question) {
    await this.repository.remove(question);
  }

  private fetchOrigin(question: Question) {
    if (!question) {
      return null;
    }

    const originQuestion = question.origin as Question | null;

    if (!originQuestion) {
      return question;
    }

    return originQuestion;
  }
}
