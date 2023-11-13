import { Module } from '@nestjs/common';
import { VideoController } from './controller/video.controller';
import { VideoService } from './service/video.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entity/video';
import { VideoRepository } from './repository/video.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Video])],
  controllers: [VideoController],
  providers: [VideoService, VideoRepository],
})
export class VideoModule {}
