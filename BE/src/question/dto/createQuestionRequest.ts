import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { createPropertyOption } from '../../util/swagger.util';

export class CreateQuestionRequest {
  @ApiProperty(createPropertyOption('1', '카테고리 id', Number))
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @ApiProperty(createPropertyOption('이장희는 누구일까요', '질문 내용', String))
  @IsNotEmpty()
  @IsString()
  content: string;

  constructor(categoryId: number, content: string) {
    this.categoryId = categoryId;
    this.content = content;
  }
}
