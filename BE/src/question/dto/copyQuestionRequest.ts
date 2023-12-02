import { ApiProperty } from '@nestjs/swagger';
import { createPropertyOption } from '../../util/swagger.util';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CopyQuestionRequest {
  @ApiProperty(createPropertyOption('1', '문제집 id', Number))
  @IsNotEmpty()
  @IsNumber()
  workbookId: number;

  @ApiProperty(
    createPropertyOption([1, 2, 3, 4, 5], '복사할 질문들의 id', Number),
  )
  @IsNotEmpty()
  questionIds: number[];

  constructor(workbookId: number, questionIds: number[]) {
    this.workbookId = workbookId;
    this.questionIds = questionIds;
  }
}
