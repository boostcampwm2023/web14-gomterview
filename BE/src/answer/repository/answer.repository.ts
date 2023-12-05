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
    await this.repository.insert(answer);
    return answer;
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

  async findAllByQuestionId(questionId: number) {
    return this.repository
      .createQueryBuilder('answer')
      .leftJoinAndSelect('answer.member', 'member')
      .leftJoinAndSelect('answer.question', 'question')
      .where('question.id = :questionId', { questionId })
      .orderBy('answer.createdAt', 'DESC')
      .getMany();
  }

  async remove(answer: Answer) {
    await this.repository.remove(answer);
  }
}
