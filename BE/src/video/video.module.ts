import { Module } from '@nestjs/common';
import { VideoController } from './controller/video.controller';
import { VideoService } from './service/video.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entity/video';
import { VideoRepository } from './repository/video.repository';
import { QuestionRepository } from 'src/question/repository/question.repository';
import { Question } from 'src/question/entity/question';
import { Member } from 'src/member/entity/member';
import { MemberRepository } from 'src/member/repository/member.repository';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [TypeOrmModule.forFeature([Video, Question, Member]), TokenModule],
  controllers: [VideoController],
  providers: [
    VideoService,
    VideoRepository,
    QuestionRepository,
    MemberRepository,
  ],
})
export class VideoModule {}
