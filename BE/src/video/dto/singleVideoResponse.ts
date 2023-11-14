import { Video } from '../entity/video';

export class SingleVideoResponse {
  readonly id: number;
  readonly thumbnail: string;
  readonly videoName: string;
  readonly videoLength: string;
  readonly isPublic: boolean;
  readonly createdAt: number;

  constructor(
    id: number,
    thumbnail: string,
    videoName: string,
    videoLength: string,
    isPublic: boolean,
    createdAt: number,
  ) {
    this.id = id;
    this.thumbnail = thumbnail;
    this.videoName = videoName;
    this.videoLength = videoLength;
    this.isPublic = isPublic;
    this.createdAt = createdAt;
  }

  static from(video: Video) {
    return new SingleVideoResponse(
      video.id,
      'https://test-thumbnail.com',
      video.name,
      '02:42',
      video.isPublic,
      video.createdAt.getTime(),
    );
  }
}
