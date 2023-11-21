import { QuestionResponse } from './questionResponse';

export class QuestionResponseList {
  questionResponses: QuestionResponse[];

  constructor(questionResponses: QuestionResponse[]) {
    this.questionResponses = questionResponses;
  }

  static of(questionResponses: QuestionResponse[]) {
    return new QuestionResponseList(questionResponses);
  }
}
