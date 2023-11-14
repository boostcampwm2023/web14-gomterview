import { SingleVideoResponse } from './singleVideoResponse';

export class VideoListResponse {
  readonly videoList: SingleVideoResponse[];
  constructor(videos: SingleVideoResponse[]) {
    this.videoList = videos;
  }
}
