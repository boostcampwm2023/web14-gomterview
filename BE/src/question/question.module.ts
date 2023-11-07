import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../member/entity/member';
import { Question } from './entity/question';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Member])],
})
export class QuestionModule {}
