export class CreateAnswerRequest {
  questionId: number;
  content: string;

  constructor(questionId: number, content: string) {
    this.questionId = questionId;
    this.content = content;
  }
}
