import { Injectable } from '@nestjs/common';
import { QuestionRepository } from '../repository/question.repository';
import { CreateQuestionRequest } from '../dto/createQuestionRequest';

@Injectable()
export class QuestionService {
  constructor(private repository: QuestionRepository) {}

  async createQuestion(createQuestionRequest: CreateQuestionRequest) {}
}
