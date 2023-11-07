import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../member/entity/member';
import { Question } from './entity/question';
import { QuestionService } from './service/question.service';
import { QuestionRepository } from './repository/question.repository';
import { QuestionController } from './controller/question.controller';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Member]), TokenModule],
  providers: [QuestionRepository, QuestionService],
  controllers: [QuestionController],
})
export class QuestionModule {}
