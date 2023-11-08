import { ApiProperty } from '@nestjs/swagger';
import { Question } from '../entity/question';
import { SingleQuestionResponse } from './singleQuestionResponse';
import { questionListExample } from '../util/question.util';
import { createPropertyOption } from '../../util/swagger.util';

export class QuestionListResponse {
  @ApiProperty(
    createPropertyOption(questionListExample, '질문 dto의 리스트', [
      SingleQuestionResponse,
    ]),
  )
  readonly questionsList: SingleQuestionResponse[];

  constructor(questionDtoList: SingleQuestionResponse[]) {
    this.questionsList = questionDtoList;
  }

  static from(question: Question[]): QuestionListResponse {
    return new QuestionListResponse(question.map(SingleQuestionResponse.from));
  }
}
