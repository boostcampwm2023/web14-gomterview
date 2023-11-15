import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from '../entity/video';

@Injectable()
export class VideoRepository {
  constructor(
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
  ) {}

  async save(video: Video) {
    await this.videoRepository.save(video);
  }

  async findAllVideosByMemberId(memberId: number) {
    return this.videoRepository
      .createQueryBuilder('video')
      .where('video.memberId = :memberId', { memberId })
      .orderBy('video.createdAt', 'DESC')
      .getMany();
  }
}
