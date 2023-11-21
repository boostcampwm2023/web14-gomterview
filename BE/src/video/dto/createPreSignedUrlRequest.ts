import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { createPropertyOption } from 'src/util/swagger.util';

export class CreatePreSignedUrlRequest {
  @ApiProperty(createPropertyOption(1, '문제 ID', Number))
  @IsNumber()
  @IsNotEmpty()
  questionId: number;

  constructor(questionId: number) {
    this.questionId = questionId;
  }
}
