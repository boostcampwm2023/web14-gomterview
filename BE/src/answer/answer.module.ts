import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../member/entity/member';
import { Answer } from './entity/answer';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Answer])],
})
export class AnswerModule {}
