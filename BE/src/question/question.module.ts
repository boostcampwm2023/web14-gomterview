import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entity/question';
import { TokenModule } from 'src/token/token.module';
import { QuestionService } from './service/question.service';
import { QuestionController } from './controller/question.controller';
import { QuestionRepository } from './repository/question.repository';
import { Member } from '../member/entity/member';
import { Answer } from '../answer/entity/answer';
import { Workbook } from '../workbook/entity/workbook';
import { WorkbookModule } from '../workbook/workbook.module';
import { WorkbookRepository } from '../workbook/repository/workbook.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, Workbook, Member, Answer]),
    TokenModule,
    WorkbookModule,
  ],
  providers: [QuestionService, QuestionRepository, WorkbookRepository],
  controllers: [QuestionController],
})
export class QuestionModule {}
