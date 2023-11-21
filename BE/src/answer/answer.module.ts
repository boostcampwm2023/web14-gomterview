import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../member/entity/member';
import { Answer } from './entity/answer';
import { AnswerRepository } from './repository/answer.repository';
import { Question } from '../question/entity/question';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Answer, Question])],
  providers: [AnswerRepository],
})
export class AnswerModule {}
