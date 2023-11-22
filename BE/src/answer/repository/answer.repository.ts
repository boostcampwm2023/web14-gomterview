import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from '../entity/answer';
import { Repository } from 'typeorm';

@Injectable()
export class AnswerRepository {
  constructor(
    @InjectRepository(Answer) private repository: Repository<Answer>,
  ) {}

  async save(answer: Answer) {
    return await this.repository.save(answer);
  }

  async findById(id: number) {
    return await this.repository.findOneBy({ id: id });
  }

  async findByContentMemberIdAndQuestionId(
    content: string,
    memberId: number,
    questionId: number,
  ) {
    return await this.repository.findOneBy({
      content: content,
      member: { id: memberId },
      question: { id: questionId },
    });
  }
}
