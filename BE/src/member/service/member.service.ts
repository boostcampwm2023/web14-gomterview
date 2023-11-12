import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { MemberRepository } from '../repository/member.repository';

@Injectable()
export class MemberService {
  constructor(private memberRepository: MemberRepository) {}
  getNameForInterview(req: Request) {
    if (!req.cookies['accessToken']) {
      return '면접자';
    }
    // repository 로직 구현
    return '실제 회원 이름';
  }
}
