import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { MemberRepository } from 'src/member/repository/member.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/member/entity/member';
import { GoogleStrategy } from './strategy/google.strategy';
import { TokenModule } from '../token/token.module';
import { Category } from '../category/entity/category';
import { Question } from '../question/entity/question';
import { Answer } from '../answer/entity/answer';
import { CategoryRepository } from '../category/repository/category.repository';
import { QuestionRepository } from '../question/repository/question.repository';
import { CategoryModule } from '../category/category.module';
import { QuestionModule } from '../question/question.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member, Category, Question, Answer]),
    TokenModule,
    CategoryModule,
    QuestionModule,
  ],
  providers: [
    AuthService,
    MemberRepository,
    GoogleStrategy,
    CategoryRepository,
    QuestionRepository,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
