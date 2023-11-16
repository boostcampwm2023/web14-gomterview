import { ApiProperty } from '@nestjs/swagger';
import { Video } from '../entity/video';
import { SingleVideoResponse } from './singleVideoResponse';
import { createPropertyOption } from 'src/util/swagger.util';
import { videoListExample } from '../fixture/video.fixture';

export class VideoListResponse {
  @ApiProperty(
    createPropertyOption(videoListExample, '질문 dto의 리스트', [
      SingleVideoResponse,
    ]),
  )
  readonly videoList: SingleVideoResponse[];
  constructor(videos: SingleVideoResponse[]) {
    this.videoList = videos;
  }

  static from(videoList: Video[]) {
    return new VideoListResponse(videoList.map(SingleVideoResponse.from));
  }
}
