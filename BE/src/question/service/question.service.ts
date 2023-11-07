import { Injectable } from '@nestjs/common';
import { QuestionRepository } from '../repository/question.repository';
import { CreateQuestionRequest } from '../dto/createQuestionRequest';
import { Member } from 'src/member/entity/member';
import { Question } from '../entity/question';

@Injectable()
export class QuestionService {
  constructor(private questionRepository: QuestionRepository) {}

  async createQuestion(
    createQuestionRequest: CreateQuestionRequest,
    member: Member,
  ) {
    const question = Question.from(createQuestionRequest, member);
    await this.questionRepository.save(question);
  }

  async findByCategory(category: string, member: Member) {
    return await this.questionRepository.findAllByCategoryOrderByCreatedAtDesc(
      category,
      member.id,
    );
  }
}
