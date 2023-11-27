import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { createPropertyOption } from '../../util/swagger.util';

export class CreateQuestionRequest {
  @ApiProperty(createPropertyOption('1', '문제집 id', Number))
  @IsNotEmpty()
  @IsNumber()
  workbookId: number;

  @ApiProperty(createPropertyOption('이장희는 누구일까요', '질문 내용', String))
  @IsNotEmpty()
  @IsString()
  content: string;

  constructor(workbookId: number, content: string) {
    this.workbookId = workbookId;
    this.content = content;
  }
}
