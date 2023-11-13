import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '../entity/question';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionRepository {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async save(question: Question) {
    await this.questionRepository.save(question);
  }

  async findAllByCategoryOrderByCreatedAtDesc(
    category: string,
    memberId: number,
  ): Promise<Question[]> {
    return (await this.constructQueryBuilder(category, memberId))
      .orderBy('Question.createdAt', 'DESC')
      .getMany();
  }

  async findById(id: number) {
    return await this.questionRepository.findOneBy({ id: id });
  }

  async findCategories(): Promise<string[]> {
    const distinctCategories = (await this.questionRepository
      .createQueryBuilder()
      .select('DISTINCT category', 'category')
      .getRawMany()) as Question[];

    return distinctCategories.map((result) => result.category);
  }

  async findQuestionByIdAndMember_Id(questionId: number, memberId: number) {
    return this.questionRepository.findOneBy({
      members: { id: memberId },
      id: questionId,
    });
  }

  async remove(question: Question) {
    await this.questionRepository.remove(question);
  }

  private async constructQueryBuilder(category: string, memberId: number) {
    const queryBuilder = this.questionRepository.createQueryBuilder('Question');

    if (category === 'CUSTOM') {
      return queryBuilder
        .leftJoin('Question.id', 'QuestionMember')
        .leftJoin('QuestionMember.memberId', 'Member')
        .where('Question.category = :category', { category })
        .andWhere('member.id = :memberId', { memberId });
    }

    return queryBuilder.where('Question.category = :category', { category });
  }
}
