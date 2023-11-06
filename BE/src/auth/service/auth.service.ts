import { Injectable } from '@nestjs/common';
import { MemberRepository } from 'src/member/repository/member.repository';

@Injectable()
export class AuthService {
  constructor(private memberRepository: MemberRepository) {}
}
