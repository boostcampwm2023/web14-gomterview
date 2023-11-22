import { ApiProperty } from '@nestjs/swagger';
import { createPropertyOption } from '../../util/swagger.util';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAnswerRequest {
  @ApiProperty(createPropertyOption(1, '문제 ID', Number))
  @IsNumber()
  @IsNotEmpty()
  questionId: number;

  @ApiProperty(
    createPropertyOption(
      '이장희는 존잘 백엔드 캠퍼!',
      '등록할 답변 내용',
      String,
    ),
  )
  @IsString()
  @IsNotEmpty()
  content: string;

  constructor(questionId: number, content: string) {
    this.questionId = questionId;
    this.content = content;
  }
}
