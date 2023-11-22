import { QuestionResponse } from './questionResponse';
import { ApiProperty } from '@nestjs/swagger';
import { createPropertyOption } from '../../util/swagger.util';
import { questionFixture } from '../fixture/question.fixture';

export class QuestionResponseList {
  @ApiProperty(
    createPropertyOption(
      [QuestionResponse.from(questionFixture)],
      '질문과 대표답변 리스트',
      [QuestionResponse],
    ),
  )
  questionResponses: QuestionResponse[];

  constructor(questionResponses: QuestionResponse[]) {
    this.questionResponses = questionResponses;
  }

  static of(questionResponses: QuestionResponse[]) {
    return new QuestionResponseList(questionResponses);
  }
}
