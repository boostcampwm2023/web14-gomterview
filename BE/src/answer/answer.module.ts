import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../member/entity/member';
import { Answer } from './entity/answer';
import { AnswerRepository } from './repository/answer.repository';
import { Question } from '../question/entity/question';
import { AnswerService } from './service/answer.service';
import { AnswerController } from './controller/answer.controller';
import { QuestionRepository } from '../question/repository/question.repository';
import { QuestionModule } from '../question/question.module';
import { CategoryRepository } from '../category/repository/category.repository';
import { CategoryModule } from '../category/category.module';
import { Category } from '../category/entity/category';
import { Workbook } from '../workbook/entity/workbook';
import { WorkbookRepository } from '../workbook/repository/workbook.repository';
import { WorkbookModule } from '../workbook/workbook.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member, Answer, Question, Category, Workbook]),
    QuestionModule,
    CategoryModule,
    WorkbookModule,
    TokenModule,
  ],
  providers: [
    AnswerRepository,
    AnswerService,
    QuestionRepository,
    CategoryRepository,
    WorkbookRepository,
  ],
  controllers: [AnswerController],
})
export class AnswerModule {}
