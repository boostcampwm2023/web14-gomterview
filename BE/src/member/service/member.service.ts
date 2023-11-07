import { Injectable } from '@nestjs/common';
import { MemberRepository } from '../repository/member.repository';

@Injectable()
export class MemberService {
  constructor(private memberRepository: MemberRepository) {}

  getMyInfo(accessToken: string) {
    const user = this.memberRepository.findById(null); // tokenService에서 토큰 소유자의 id 알아낸 후 repository 단에 넘겨주기 구현 필요
    return user; // user 정보를 응답 형식에 맞게 dto화 후 반환 필요
  }
}
