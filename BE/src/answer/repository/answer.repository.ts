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
}
