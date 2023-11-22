import { ApiProperty } from '@nestjs/swagger';
import { createPropertyOption } from '../../util/swagger.util';
import { AnswerResponse } from './answerResponse';

export class AnswerListResponse {
  @ApiProperty(
    createPropertyOption(
      [
        new AnswerResponse(
          1,
          'answerContent',
          1,
          '이장희',
          'https://jangsarchive.tistory.com',
        ),
      ],
      '답변 ID',
      [AnswerResponse],
    ),
  )
  answerResponseList: AnswerResponse[];

  constructor(answerResponseList: AnswerResponse[]) {
    this.answerResponseList = answerResponseList;
  }

  static of(answerResponseList: AnswerResponse[]) {
    return new AnswerListResponse(answerResponseList);
  }
}
