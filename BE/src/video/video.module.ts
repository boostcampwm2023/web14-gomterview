import { Module } from '@nestjs/common';
import { VideoController } from './controller/video.controller';
import { VideoService } from './service/video.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entity/video';
import { VideoRepository } from './repository/video.repository';
import { QuestionRepository } from 'src/question/repository/question.repository';
import { Question } from 'src/question/entity/question';

@Module({
  imports: [TypeOrmModule.forFeature([Video, Question])],
  controllers: [VideoController],
  providers: [VideoService, VideoRepository, QuestionRepository],
})
export class VideoModule {}
