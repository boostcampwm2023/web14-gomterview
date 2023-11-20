import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { IsNumber } from 'class-validator';

export class CreateQuestionRequest {
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  constructor(categoryId: number, content: string) {
    this.categoryId = categoryId;
    this.content = content;
  }
}
