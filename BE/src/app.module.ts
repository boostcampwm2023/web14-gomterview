import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MYSQL_OPTION } from './config/typeorm.config';
import { MemberModule } from './member/member.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { QuestionModule } from './question/question.module';
import { VideoModule } from './video/video.module';
import { CategoryModule } from './category/category.module';
import { AnswerModule } from './answer/answer.module';
import { CategoryRepository } from './category/repository/category.repository';
import { QuestionRepository } from './question/repository/question.repository';
import { AnswerRepository } from './answer/repository/answer.repository';
import { Category } from './category/entity/category';
import { Member } from './member/entity/member';
import { Question } from './question/entity/question';
import { Answer } from './answer/entity/answer';
import { WorkbookModule } from './workbook/workbook.module';
import { MulterModule } from '@nestjs/platform-express';
import { Workbook } from './workbook/entity/workbook';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(MYSQL_OPTION),
    TypeOrmModule.forFeature([Category, Member, Question, Answer, Workbook]),
    MulterModule.register({
      dest: './uploads', // 파일이 저장될 경로 설정
    }),
    MemberModule,
    AuthModule,
    TokenModule,
    QuestionModule,
    VideoModule,
    CategoryModule,
    AnswerModule,
    WorkbookModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CategoryRepository,
    QuestionRepository,
    AnswerRepository,
  ],
})
export class AppModule {}
