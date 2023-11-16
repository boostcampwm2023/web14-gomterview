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
  DecryptionException,
  EncryptionException,
  IDriveException,
  VideoAccessForbiddenException,
  VideoNotFoundException,
} from '../exception/video.exception';
import { VideoListResponse } from '../dto/videoListResponse';
import { CreateVideoRequest } from '../dto/createVideoRequest';
import { validateManipulatedToken } from 'src/util/token.util';
import { isEmpty, notEquals } from 'class-validator';
import { VideoDetailResponse } from '../dto/videoDetailResponse';
import * as crypto from 'crypto';
import 'dotenv/config';

const algorithm = 'aes-256-cbc';
const key = process.env.URL_ENCRYPT_KEY;
const iv = crypto.randomBytes(16);

@Injectable()
export class VideoService {
  constructor(
    private videoRepository: VideoRepository,
    private questionRepository: QuestionRepository,
  ) {}
  async createVideo(member: Member, createVidoeRequest: CreateVideoRequest) {
    validateManipulatedToken(member);

    const newVideo = Video.from(member, createVidoeRequest);
    await this.videoRepository.save(newVideo);
  }

  async getPreSignedUrl(
    member: Member,
    createPreSignedUrlRequest: CreatePreSignedUrlRequest,
  ) {
    const content = await this.getQuestionContent(
      createPreSignedUrlRequest.questionId,
    );
    const key = `${member.nickname}_${content}_${uuidv4()}.mp4`;

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

    if (isEmpty(video)) throw new VideoNotFoundException();
    if (notEquals(memberId, video.memberId))
      throw new VideoAccessForbiddenException();

    const hash = video.isPublic ? this.getEncryptedurl(video.url) : null;
    return VideoDetailResponse.from(video, hash);
  }

  async getVideoDetailByHash(hash: string) {
    const decryptedUrl = this.getDecryptedUrl(hash);
    const video = await this.videoRepository.findByUrl(decryptedUrl);

    if (!video.isPublic) throw new VideoAccessForbiddenException();
    return VideoDetailResponse.from(video, hash);
  }

  async getAllVideosByMemberId(member: Member) {
    validateManipulatedToken(member);
    const videoList = await this.videoRepository.findAllVideosByMemberId(
      member.id,
    );

    // TODO: 비디오의 썸네일과 길이에 대한 처리도 필요
    return VideoListResponse.from(videoList);
  }

  private async getQuestionContent(questionId: number) {
    const question = await this.questionRepository.findById(questionId);
    return question ? question.content : '삭제된 질문';
  }

  private getEncryptedurl(url: string) {
    try {
      const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
      let encrypted = cipher.update(url, 'utf-8', 'hex');
      encrypted += cipher.final('hex');
      return encrypted;
    } catch (error) {
      throw new EncryptionException();
    }
  }

  private getDecryptedUrl(encryptedUrl: string) {
    try {
      const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
      let decrypted = decipher.update(encryptedUrl, 'hex', 'utf-8');
      decrypted += decipher.final('utf-8');
      return decrypted;
    } catch (error) {
      throw new DecryptionException();
    }
  }
}
