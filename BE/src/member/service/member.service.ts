import { Injectable } from '@nestjs/common';
import { MemberRepository } from '../repository/member.repository';

@Injectable()
export class MemberService {
  constructor(private memberRepository: MemberRepository) {}

  getMyInfo(memberId: number) {
    const user = this.memberRepository.findById(memberId);
    return user; // user 정보를 응답 형식에 맞게 dto화 후 반환 필요
  }
}
