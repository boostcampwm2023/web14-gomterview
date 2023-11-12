import { Injectable } from '@nestjs/common';
import { MemberRepository } from '../repository/member.repository';

@Injectable()
export class MemberService {
  constructor(private memberRepository: MemberRepository) {}
  getNameForInterview() {
    throw new Error('Method not implemented.');
  }
}
