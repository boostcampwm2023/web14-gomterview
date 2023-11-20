import { Injectable, UnauthorizedException } from '@nestjs/common';
import { QuestionRepository } from '../repository/question.repository';
import { CreateQuestionRequest } from '../dto/createQuestionRequest';
import { CategoryRepository } from '../../category/repository/category.repository';
import { isEmpty } from 'class-validator';
import { CategoryNotFoundException } from '../../category/exception/category.exception';
import { Question } from '../entity/question';
import { Category } from '../../category/entity/category';
import { QuestionResponse } from '../dto/questionResponse';
import { Member } from '../../member/entity/member';
import { NeedToFindByCategoryIdException } from '../exception/question.exception';

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

    this.validateCreateRequest(category);

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

  private validateCreateRequest(category: Category) {
    if (isEmpty(category)) {
      throw new CategoryNotFoundException();
    }
  }
}
