import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entity/question';
import { TokenModule } from 'src/token/token.module';
import { Category } from '../category/entity/category';
import { QuestionService } from './service/question.service';
import { QuestionController } from './controller/question.controller';
import { QuestionRepository } from './repository/question.repository';
import { CategoryModule } from '../category/category.module';
import { CategoryRepository } from '../category/repository/category.repository';
import { Member } from '../member/entity/member';
import { Answer } from '../answer/entity/answer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, Category, Member, Answer]),
    TokenModule,
    CategoryModule,
  ],
  providers: [QuestionService, QuestionRepository, CategoryRepository],
  controllers: [QuestionController],
})
export class QuestionModule {}
