import { Injectable } from '@nestjs/common';
import { AnswerRepository } from '../repository/answer.repository';
import { QuestionRepository } from '../../question/repository/question.repository';

@Injectable()
export class AnswerService {
  private async;

  constructor(
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionRepository,
  ) {}

  // async addAnswer(createAnswerRequest: CreateAnswerRequest, member: Member) {
  //   const question = await this.questionRepository.findById(
  //     createAnswerRequest.questionId,
  //   );
  //
  //   if (isEmpty(question)) {
  //     throw new QuestionNotFoundException();
  //   }
  //
  //   if (isEmpty(question.origin)) {
  //     return await this.saveAnswerAndQuestion(
  //       createAnswerRequest,
  //       question,
  //       member,
  //     );
  //   }
  //
  //   return await this.saveAnswerAndQuestion(
  //     createAnswerRequest,
  //     question.origin,
  //     member,
  //   );
  // }
  //
  // private async saveAnswerAndQuestion(
  //   createAnswerRequest: CreateAnswerRequest,
  //   question: Question,
  //   member: Member,
  // ) {
  //   const answer = Answer.of(createAnswerRequest.content, member, question);
  //   return await this.answerRepository.save(answer);
  // }
}
