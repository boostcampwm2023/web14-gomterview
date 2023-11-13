import { Injectable } from '@nestjs/common';
import { Member } from 'src/member/entity/member';

@Injectable()
export class VideoService {
  createVideo(member: Member, createVidoeRequest: any) {
    throw new Error('Method not implemented.');
  }
}
