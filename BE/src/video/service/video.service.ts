import { Injectable } from '@nestjs/common';
import { Member } from 'src/member/entity/member';
import { CreateVideoRequest } from '../dto/CreateVideoRequest';
import { Video } from '../entity/video';
import { VideoRepository } from '../repository/video.repository';

@Injectable()
export class VideoService {
  constructor(private videoRepository: VideoRepository) {}
  async createVideo(member: Member, createVidoeRequest: CreateVideoRequest) {
    const newVideo = new Video(
      member.id,
      createVidoeRequest.questionId,
      createVidoeRequest.name,
      createVidoeRequest.url,
      false,
    );
    await this.videoRepository.save(newVideo);
  }
}
