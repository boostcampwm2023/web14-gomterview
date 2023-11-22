import { Module } from '@nestjs/common';
import { CategoryRepository } from './repository/category.repository';
import { CategoryService } from './service/category.service';
import { CategoryController } from './controller/category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entity/category';
import { Question } from '../question/entity/question';
import { TokenModule } from '../token/token.module';
import { Answer } from '../answer/entity/answer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Question, Answer]),
    TokenModule,
  ],
  providers: [CategoryRepository, CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
