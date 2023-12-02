import { Injectable } from '@nestjs/common';
import { Member } from 'src/member/entity/member';
import { Video } from '../entity/video';
import { VideoRepository } from '../repository/video.repository';
import {
  createObjectParamsForPreSign,
  getIdriveS3Client,
} from 'src/util/idrive.util';
import { CreatePreSignedUrlRequest } from '../dto/createPreSignedUrlRequest';
import { v4 as uuidv4 } from 'uuid';
import { PreSignedUrlResponse } from '../dto/preSignedUrlResponse';
import { QuestionRepository } from 'src/question/repository/question.repository';
import {
  IDriveException,
  Md5HashException,
  VideoAccessForbiddenException,
  VideoNotFoundException,
  VideoOfWithdrawnMemberException,
} from '../exception/video.exception';
import { CreateVideoRequest } from '../dto/createVideoRequest';
import { validateManipulatedToken } from 'src/util/token.util';
import { isEmpty, notEquals } from 'class-validator';
import { VideoDetailResponse } from '../dto/videoDetailResponse';
import * as crypto from 'crypto';
import 'dotenv/config';
import { VideoHashResponse } from '../dto/videoHashResponse';
import { MemberRepository } from 'src/member/repository/member.repository';
import {
  deleteFromRedis,
  getValueFromRedis,
  saveToRedis,
} from 'src/util/redis.util';
import { SingleVideoResponse } from '../dto/singleVideoResponse';
import { MemberNotFoundException } from 'src/member/exception/member.exception';

@Injectable()
export class VideoService {
  constructor(
    private videoRepository: VideoRepository,
    private questionRepository: QuestionRepository,
    private memberRepository: MemberRepository,
  ) {}

  async createVideo(member: Member, createVideoRequest: CreateVideoRequest) {
    validateManipulatedToken(member);

    const newVideo = Video.from(member, createVideoRequest);
    await this.videoRepository.save(newVideo);
  }

  async getPreSignedUrl(
    member: Member,
    createPreSignedUrlRequest: CreatePreSignedUrlRequest,
  ) {
    validateManipulatedToken(member);

    const content = await this.getQuestionContent(
      createPreSignedUrlRequest.questionId,
    );
    const encodedFileName = encodeURIComponent(
      `${member.nickname}_${content}_${uuidv4()}`,
    );
    const key = `${encodedFileName}.webm`;

    const s3 = getIdriveS3Client();
    try {
      const preSignedUrl = await s3.getSignedUrlPromise(
        'putObject',
        createObjectParamsForPreSign('videos', key),
      );
      return new PreSignedUrlResponse(preSignedUrl, key);
    } catch (error) {
      throw new IDriveException();
    }
  }

  async getVideoDetail(videoId: number, member: Member) {
    validateManipulatedToken(member);
    const memberId = member.id;
    const video = await this.videoRepository.findById(videoId);
    this.validateVideoOwnership(video, memberId);

    const hash = video.isPublic ? this.getHashedUrl(video.url) : null;
    return VideoDetailResponse.from(video, member.nickname, hash);
  }

  async getVideoDetailByHash(hash: string) {
    const originUrl = await getValueFromRedis(hash);
    const video = await this.videoRepository.findByUrl(originUrl);
    if (!video.isPublic) throw new VideoAccessForbiddenException();
    if (isEmpty(video.memberId)) throw new VideoOfWithdrawnMemberException();

    const videoOwner = await this.memberRepository.findById(video.memberId);
    if (isEmpty(videoOwner)) throw new MemberNotFoundException();

    return VideoDetailResponse.from(video, videoOwner.nickname, hash);
  }

  async getAllVideosByMemberId(member: Member) {
    validateManipulatedToken(member);
    const videoList = await this.videoRepository.findAllVideosByMemberId(
      member.id,
    );

    return videoList.map(SingleVideoResponse.from);
  }

  async toggleVideoStatus(videoId: number, member: Member) {
    validateManipulatedToken(member);
    const memberId = member.id;
    const video = await this.videoRepository.findById(videoId);
    this.validateVideoOwnership(video, memberId);

    await this.videoRepository.toggleVideoStatus(videoId); // TODO: 좀 더 효율적인 Patch 로직이 있나 확인
    return this.updateVideoHashInRedis(video);
  }

  async deleteVideo(videoId: number, member: Member) {
    validateManipulatedToken(member);
    const memberId = member.id;
    const video = await this.videoRepository.findById(videoId);
    this.validateVideoOwnership(video, memberId);

    await this.videoRepository.remove(video);
  }

  private validateVideoOwnership(video: Video, memberId: number) {
    if (isEmpty(video)) throw new VideoNotFoundException();
    if (notEquals(memberId, video.memberId))
      throw new VideoAccessForbiddenException();
  }

  private async getQuestionContent(questionId: number) {
    const question = await this.questionRepository.findById(questionId);
    return question ? question.content : '삭제된 질문';
  }

  private getHashedUrl(url: string): string {
    try {
      const hash = crypto.createHash('md5').update(url).digest('hex');
      return hash;
    } catch (error) {
      throw new Md5HashException();
    }
  }

  private async updateVideoHashInRedis(video: Video) {
    const hash = this.getHashedUrl(video.url);

    if (video.isPublic) {
      // 현재가 public이었으면 토글 후 private이 되기에 redis에서 해시값 삭제 후 null 반환
      await deleteFromRedis(hash);
      return new VideoHashResponse(null);
    }

    await saveToRedis(hash, video.url);
    return new VideoHashResponse(hash);
  }
}
