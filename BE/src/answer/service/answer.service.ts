import { Injectable } from '@nestjs/common';
import { AnswerRepository } from '../repository/answer.repository';
import { QuestionRepository } from '../../question/repository/question.repository';
import { QuestionNotFoundException } from '../../question/exception/question.exception';
import { isEmpty } from 'class-validator';
import { CreateAnswerRequest } from '../dto/createAnswerRequest';
import { Member } from '../../member/entity/member';
import { Question } from '../../question/entity/question';
import { Answer } from '../entity/answer';
import { AnswerResponse } from '../dto/answerResponse';
import { DefaultAnswerRequest } from '../dto/defaultAnswerRequest';
import { CategoryRepository } from '../../category/repository/category.repository';
import { AnswerNotFoundException } from '../exception/answer.exception';
import { CategoryForbiddenException } from '../../category/exception/category.exception';

@Injectable()
export class AnswerService {
  constructor(
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  async addAnswer(createAnswerRequest: CreateAnswerRequest, member: Member) {
    const question = await this.questionRepository.findWithOriginById(
      createAnswerRequest.questionId,
    );

    if (isEmpty(question)) {
      throw new QuestionNotFoundException();
    }

    const answer = await this.saveAnswerAndQuestion(
      createAnswerRequest,
      await this.getOriginalQuestion(question),
      member,
    );
    return AnswerResponse.from(answer, member);
  }

  async setDefaultAnswer(
    defaultAnswerRequest: DefaultAnswerRequest,
    member: Member,
  ) {
    const question = await this.findQuestionById(
      defaultAnswerRequest.questionId,
    );
    if (isEmpty(question)) {
      throw new QuestionNotFoundException();
    }

    const category = await this.categoryRepository.findByCategoryId(
      question.category.id,
    );

    if (!category.isOwnedBy(member)) {
      throw new CategoryForbiddenException();
    }

    const answer = await this.answerRepository.findById(
      defaultAnswerRequest.answerId,
    );

    if (isEmpty(answer)) {
      throw new AnswerNotFoundException();
    }

    question.setDefaultAnswer(answer);
    await this.questionRepository.save(question);
  }

  private async saveAnswerAndQuestion(
    createAnswerRequest: CreateAnswerRequest,
    question: Question,
    member: Member,
  ) {
    const answer = Answer.of(createAnswerRequest.content, member, question);
    return await this.answerRepository.save(answer);
  }

  private async getOriginalQuestion(question: Question) {
    return isEmpty(question.origin)
      ? question
      : this.questionRepository.findById(question.origin.id);
  }

  private async findQuestionById(questionId: number) {
    return await this.questionRepository.findById(questionId);
  }
}
