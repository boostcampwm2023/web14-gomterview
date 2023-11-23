import { Injectable, UnauthorizedException } from '@nestjs/common';
import { QuestionRepository } from '../repository/question.repository';
import { CreateQuestionRequest } from '../dto/createQuestionRequest';
import { CategoryRepository } from '../../category/repository/category.repository';
import { isEmpty } from 'class-validator';
import { Question } from '../entity/question';
import { QuestionResponse } from '../dto/questionResponse';
import { Member } from '../../member/entity/member';
import { NeedToFindByCategoryIdException } from '../exception/question.exception';
import { validateManipulatedToken } from '../../util/token.util';
import { validateQuestion } from '../util/question.util';
import { validateCategory } from '../../category/util/category.util';

@Injectable()
export class QuestionService {
  constructor(
    private questionRepository: QuestionRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  async createQuestion(
    createQuestionRequest: CreateQuestionRequest,
    member: Member,
  ) {
    const category = await this.categoryRepository.findByCategoryId(
      createQuestionRequest.categoryId,
    );

    validateCategory(category);

    if (!category.isOwnedBy(member)) {
      throw new UnauthorizedException();
    }

    const question = await this.questionRepository.save(
      Question.of(category, null, createQuestionRequest.content),
    );

    return QuestionResponse.from(question);
  }

  async findAllByCategory(categoryId: number) {
    if (isEmpty(categoryId)) {
      throw new NeedToFindByCategoryIdException();
    }

    const questions =
      await this.questionRepository.findByCategoryId(categoryId);
    return questions.map(QuestionResponse.from);
  }

  async deleteQuestionById(questionId: number, member: Member) {
    validateManipulatedToken(member);

    const question = await this.questionRepository.findById(questionId);

    validateQuestion(question);

    await this.validateMembersCategoryById(question.category.id, member);

    await this.questionRepository.remove(question);
  }

  private async validateMembersCategoryById(
    categoryId: number,
    member: Member,
  ) {
    const category = await this.categoryRepository.findByCategoryId(categoryId);

    validateCategory(category);

    if (!category.isOwnedBy(member)) {
      throw new UnauthorizedException();
    }
  }
}
