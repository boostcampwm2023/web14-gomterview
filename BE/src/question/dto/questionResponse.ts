import { Question } from '../entity/question';

export class QuestionResponse {
  questionId: number;
  questionContent: string;
  answerId: number;
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
    return new QuestionResponse(question.id, question.content, null, null);
  }
}
