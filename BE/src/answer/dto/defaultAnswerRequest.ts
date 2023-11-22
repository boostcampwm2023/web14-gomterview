import { ApiProperty } from '@nestjs/swagger';
import { createPropertyOption } from '../../util/swagger.util';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DefaultAnswerRequest {
  @ApiProperty(createPropertyOption(1, '문제 ID', Number))
  @IsNumber()
  @IsNotEmpty()
  questionId: number;

  @ApiProperty(createPropertyOption(1, '답변 ID', Number))
  @IsNumber()
  @IsNotEmpty()
  answerId: number;

  constructor(questionId: number, answerId: number) {
    this.questionId = questionId;
    this.answerId = answerId;
  }
}
