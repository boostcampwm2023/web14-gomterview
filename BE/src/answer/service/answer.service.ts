import { Injectable } from '@nestjs/common';
import { AnswerRepository } from '../repository/answer.repository';
import { QuestionRepository } from '../../question/repository/question.repository';
import { isEmpty } from 'class-validator';
import { CreateAnswerRequest } from '../dto/createAnswerRequest';
import { Member } from '../../member/entity/member';
import { Question } from '../../question/entity/question';
import { Answer } from '../entity/answer';
import { AnswerResponse } from '../dto/answerResponse';
import { DefaultAnswerRequest } from '../dto/defaultAnswerRequest';
import { CategoryRepository } from '../../category/repository/category.repository';
import { CategoryForbiddenException } from '../../category/exception/category.exception';
import { validateAnswer } from '../util/answer.util';
import { validateQuestion } from '../../question/util/question.util';

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

    validateQuestion(question);

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
    const question = await this.questionRepository.findById(
      defaultAnswerRequest.questionId,
    );
    validateQuestion(question);

    const category = await this.categoryRepository.findByCategoryId(
      question.category.id,
    );

    if (!category.isOwnedBy(member)) {
      throw new CategoryForbiddenException();
    }

    const answer = await this.answerRepository.findById(
      defaultAnswerRequest.answerId,
    );

    validateAnswer(answer);

    question.setDefaultAnswer(answer);
    await this.questionRepository.save(question);
  }

  async getAnswerList(questionId: number) {
    const question = await this.questionRepository.findById(questionId);
    const originalQuestion =
      await this.questionRepository.findWithOriginById(questionId);

    validateQuestion(originalQuestion);

    const answers = (
      await this.answerRepository.findAllByQuestionId(originalQuestion.id)
    ).map((answer) => AnswerResponse.from(answer, answer.member));

    if (question.defaultAnswer) {
      answers.unshift(
        AnswerResponse.from(question.defaultAnswer, question.category.member),
      );
    }

    return answers;
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
}
