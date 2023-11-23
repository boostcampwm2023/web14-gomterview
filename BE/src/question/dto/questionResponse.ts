import { Question } from '../entity/question';
import { ApiProperty } from '@nestjs/swagger';
import { createPropertyOption } from '../../util/swagger.util';
import { isEmpty } from 'class-validator';

export class QuestionResponse {
  @ApiProperty(createPropertyOption(1, '질문의 ID', Number))
  questionId: number;
  @ApiProperty(
    createPropertyOption('이장희는 누구인가요?', '질문 내용', String),
  )
  questionContent: string;
  @ApiProperty(createPropertyOption(1, '대표답변의 ID', Number))
  answerId: number;
  @ApiProperty(
    createPropertyOption('존잘 백엔드 캠퍼!', '대표답변 내용', String),
  )
  answerContent: string;

  constructor(
    questionId: number,
    questionContent: string,
    answerId: number,
    answerContent: string,
  ) {
    this.questionId = questionId;
    this.questionContent = questionContent;
    this.answerId = answerId;
    this.answerContent = answerContent;
  }

  static from(question: Question) {
    const answer = question.defaultAnswer;
    if (isEmpty(answer))
      return new QuestionResponse(question.id, question.content, null, null);

    return new QuestionResponse(
      question.id,
      question.content,
      answer.id,
      answer.content.toString(),
    );
  }
}
