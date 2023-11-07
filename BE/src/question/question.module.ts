import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../member/entity/member';
import { Question } from './entity/question';
import { QuestionService } from './service/question.service';
import {QuestionRepository} from "./repository/question.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Question, Member])],
  providers: [QuestionRepository, QuestionService],
})
export class QuestionModule {}
