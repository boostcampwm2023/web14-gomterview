import { ApiProperty } from '@nestjs/swagger';
import { Video } from '../entity/video';
import { SingleVideoResponse } from './singleVideoResponse';
import { createPropertyOption } from 'src/util/swagger.util';

const videoListExample = [
  {
    id: 5,
    thumbnail: 'https://test-thumbnail1.com',
    videoName: 'test1.webm',
    videoLength: '02:42',
    isPublic: false,
    createdAt: 1699983079205,
  },
  {
    id: 4,
    thumbnail: 'https://test-thumbnail2.com',
    videoName: 'test2.webm',
    videoLength: '03:29',
    isPublic: false,
    createdAt: 1699983079201,
  },
  {
    id: 3,
    thumbnail: 'https://test-thumbnail3.com',
    videoName: 'test.mp4',
    videoLength: '05:22',
    isPublic: false,
    createdAt: 1699858790176,
  },
];
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
