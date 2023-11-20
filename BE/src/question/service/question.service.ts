import { Injectable } from '@nestjs/common';
import { QuestionRepository } from '../repository/question.repository';
import { CreateQuestionRequest } from '../dto/createQuestionRequest';
import { CategoryRepository } from '../../category/repository/category.repository';
import { isEmpty } from 'class-validator';
import { CategoryNotFoundException } from '../../category/exception/category.exception';
import { ContentNotFoundException } from '../exception/question.exception';
import { Question } from '../entity/question';
import { Category } from '../../category/entity/category';
import { QuestionResponse } from '../dto/questionResponse';

@Injectable()
export class QuestionService {
  constructor(
    private questionRepository: QuestionRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  async createQuestion(createQuestionRequest: CreateQuestionRequest) {
    const category = await this.categoryRepository.findByCategoryId(
      createQuestionRequest.categoryId,
    );

    this.validateCreateRequest(category, createQuestionRequest.content);

    const question = await this.questionRepository.save(
      Question.of(category, null, createQuestionRequest.content),
    );

    return QuestionResponse.from(question);
  }

  private validateCreateRequest(category: Category, content: string) {
    if (isEmpty(category)) {
      throw new CategoryNotFoundException();
    }

    if (isEmpty(content)) {
      throw new ContentNotFoundException();
    }
  }
}
