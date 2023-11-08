import { ApiProperty } from '@nestjs/swagger';
import { Question } from '../entity/question';
import {createPropertyOption} from "../../util/swagger.util";

export class SingleQuestionResponse {
  @ApiProperty(createPropertyOption('1', '게시물 ID', Number))
  readonly id: number;

  @ApiProperty(createPropertyOption( 'CS/BE/FE/CUSTOM', '질문에 대한 카테고리', String))
  readonly category: string;

  @ApiProperty(createPropertyOption('CS는 무슨 단어의 약자일까요?', '질문 내용', String))
  readonly content: string;

  constructor(id: number, category: string, content: string) {
    this.id = id;
    this.category = category;
    this.content = content;
  }

  static from(question: Question): SingleQuestionResponse {
    return new SingleQuestionResponse(
      question.id,
      question.category,
      question.content,
    );
  }
}
