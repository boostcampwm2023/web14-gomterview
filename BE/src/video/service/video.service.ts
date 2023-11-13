import { Injectable } from '@nestjs/common';
import { Member } from 'src/member/entity/member';
import { CreateVideoRequest } from '../dto/CreateVideoRequest';
import { Video } from '../entity/video';
import { VideoRepository } from '../repository/video.repository';

@Injectable()
export class VideoService {
  constructor(private videoRepository: VideoRepository) {}
  async createVideo(member: Member, createVidoeRequest: CreateVideoRequest) {
    const newVideo = Video.from(member, createVidoeRequest);
    await this.videoRepository.save(newVideo);
  }

  async getPreSignedUrl(createPreSignedUrlRequest: any) {
    throw new Error('Method not implemented.');
  }
}
