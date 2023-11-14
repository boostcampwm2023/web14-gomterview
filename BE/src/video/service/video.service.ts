import { Injectable } from '@nestjs/common';
import { Member } from 'src/member/entity/member';
import { CreateVideoRequest } from '../dto/CreateVideoRequest';
import { Video } from '../entity/video';
import { VideoRepository } from '../repository/video.repository';
import {
  createObjectParamsForPreSign,
  getIdriveS3Client,
} from 'src/util/idrive.util';
import { CreatePreSignedUrlRequest } from '../dto/createPreSignedUrlRequest';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { PreSignedUrlResponse } from '../dto/preSignedUrlResponse';

@Injectable()
export class VideoService {
  constructor(private videoRepository: VideoRepository) {}
  async createVideo(member: Member, createVidoeRequest: CreateVideoRequest) {
    const newVideo = Video.from(member, createVidoeRequest);
    await this.videoRepository.save(newVideo);
  }

  async getPreSignedUrl(
    req: Request,
    createPreSignedUrlRequest: CreatePreSignedUrlRequest,
  ) {
    const member = req.user as Member;
    const s3 = getIdriveS3Client();
    const bucketName = 'videos';
    const key = `${member.nickname}_${
      createPreSignedUrlRequest.questionId
    }_${uuidv4()}`;
    let preSignedUrl: string;

    await s3
      .getSignedUrlPromise(
        'putObject',
        createObjectParamsForPreSign(bucketName, key),
      )
      .then((data) => {
        preSignedUrl = data;
      })
      .catch((error) => {
        console.error(error);
      });

    return new PreSignedUrlResponse(preSignedUrl, key);
  }
}
