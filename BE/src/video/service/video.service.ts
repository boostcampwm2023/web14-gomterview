import { Injectable } from '@nestjs/common';
import { Member } from 'src/member/entity/member';
import { CreateVideoRequest } from '../dto/CreateVideoRequest';

@Injectable()
export class VideoService {
  createVideo(member: Member, createVidoeRequest: CreateVideoRequest) {
    throw new Error('Method not implemented.');
  }
}
