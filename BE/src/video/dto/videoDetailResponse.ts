export class VideoDetailResponse {
  readonly id: number;
  readonly url: string;
  readonly videoName: string;
  readonly hash: string;
  readonly createdAt: number;

  constructor(
    id: number,
    url: string,
    videoName: string,
    hash: string,
    createdAt: number,
  ) {
    this.id = id;
    this.url = url;
    this.videoName = videoName;
    this.hash = hash;
    this.createdAt = createdAt;
  }
}
