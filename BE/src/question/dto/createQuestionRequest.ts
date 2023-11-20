export class CreateQuestionRequest {
  categoryId: number;
  content: string;

  constructor(categoryId: number, content: string) {
    this.categoryId = categoryId;
    this.content = content;
  }
}
