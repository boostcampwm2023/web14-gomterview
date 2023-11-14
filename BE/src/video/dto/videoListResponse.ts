import { Video } from '../entity/video';
import { SingleVideoResponse } from './singleVideoResponse';

export class VideoListResponse {
  readonly videoList: SingleVideoResponse[];
  constructor(videos: SingleVideoResponse[]) {
    this.videoList = videos;
  }

  static from(videoList: Video[]) {
    return new VideoListResponse(videoList.map(SingleVideoResponse.from));
  }
}
