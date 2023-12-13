import { Injectable } from '@nestjs/common';
import { AnswerRepository } from '../repository/answer.repository';
import { QuestionRepository } from '../../question/repository/question.repository';
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
import { QuestionForbiddenException } from '../../question/exception/question.exception';
import { validateWorkbook } from '../../workbook/util/workbook.util';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class AnswerService {
  constructor(
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionRepository,
    private workbookRepository: WorkbookRepository,
  ) {}

  @Transactional()
  async addAnswer(createAnswerRequest: CreateAnswerRequest, member: Member) {
    const question = await this.questionRepository.findOriginById(
      createAnswerRequest.questionId,
    );

    validateQuestion(question);

    const answer = await this.saveAnswerAndQuestion(
      createAnswerRequest,
      question,
      member,
    );
    return AnswerResponse.from(answer, member);
  }

  @Transactional()
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
    validateWorkbook(workbook);
    if (!workbook.isOwnedBy(member)) {
      throw new QuestionForbiddenException();
    }

    const answer = await this.answerRepository.findById(
      defaultAnswerRequest.answerId,
    );

    validateAnswer(answer);

    question.setDefaultAnswer(answer);
    await this.questionRepository.update(question);
  }

  @Transactional()
  async deleteAnswer(id: number, member: Member) {
    const answer = await this.answerRepository.findById(id);

    validateAnswer(answer);

    if (answer.isOwnedBy(member)) {
      await this.answerRepository.remove(answer);
      return;
    }

    throw new AnswerForbiddenException();
  }

  @Transactional()
  async getAnswerList(id: number) {
    const question =
      await this.questionRepository.findQuestionWithOriginById(id);
    validateQuestion(question);
    const questionId = question.origin ? question.origin.id : question.id;

    const answers = (
      await this.answerRepository.findAllByQuestionId(questionId)
    ).map((answer) => AnswerResponse.from(answer, answer.member));

    if (question.defaultAnswer) {
      return this.createAnswerResponsesWithDefaultAnswer(question, answers);
    }

    return answers;
  }

  private createAnswerResponsesWithDefaultAnswer(
    question: Question,
    answers: AnswerResponse[],
  ) {
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

  private async saveAnswerAndQuestion(
    createAnswerRequest: CreateAnswerRequest,
    question: Question,
    member: Member,
  ) {
    const answer = Answer.of(createAnswerRequest.content, member, question);
    return await this.answerRepository.save(answer);
  }
}
