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
import { validateAnswer } from '../util/answer.util';
import { validateQuestion } from '../../question/util/question.util';
import { AnswerForbiddenException } from '../exception/answer.exception';
import { WorkbookRepository } from '../../workbook/repository/workbook.repository';
import { WorkbookForbiddenException } from '../../workbook/exception/workbook.exception';

@Injectable()
export class AnswerService {
  constructor(
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionRepository,
    private workbookRepository: WorkbookRepository,
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

    const workbook = await this.workbookRepository.findById(
      question.workbook.id,
    );

    if (!workbook.isOwnedBy(member)) {
      throw new WorkbookForbiddenException();
    }

    const answer = await this.answerRepository.findById(
      defaultAnswerRequest.answerId,
    );

    validateAnswer(answer);

    question.setDefaultAnswer(answer);
    await this.questionRepository.save(question);
  }

  async deleteAnswer(id: number, member: Member) {
    const answer = await this.answerRepository.findById(id);

    validateAnswer(answer);

    if (answer.isOwnedBy(member)) {
      await this.answerRepository.remove(answer);
      return;
    }

    throw new AnswerForbiddenException();
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
      const defaultAnswerResponse = AnswerResponse.from(
        question.defaultAnswer,
        question.defaultAnswer.member,
      );

      const resultList = answers.filter(
        (response) => response.answerId != defaultAnswerResponse.answerId,
      );
      resultList.unshift(defaultAnswerResponse);
      return resultList;
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
