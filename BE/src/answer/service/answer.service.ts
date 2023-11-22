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

@Injectable()
export class AnswerService {
  constructor(
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionRepository,
  ) {}

  async addAnswer(createAnswerRequest: CreateAnswerRequest, member: Member) {
    const question = await this.questionRepository.findById(
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
