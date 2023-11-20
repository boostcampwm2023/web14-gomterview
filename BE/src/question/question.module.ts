import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entity/question';
import { TokenModule } from 'src/token/token.module';
import { Category } from '../category/entity/category';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Category]), TokenModule],
})
export class QuestionModule {}
