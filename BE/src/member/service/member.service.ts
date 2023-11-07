import { Injectable } from '@nestjs/common';
import { MemberRepository } from '../repository/member.repository';
import { TokenService } from 'src/token/service/token.service';

@Injectable()
export class MemberService {
  constructor(
    private tokenService: TokenService,
    private memberRepository: MemberRepository,
  ) {}

  async getMyInfo(accessToken: string) {
    const memberId = (await this.tokenService.getPayload(accessToken)).id;
    const user = await this.memberRepository.findById(memberId);
    return user; // user 정보를 응답 형식에 맞게 dto화 후 반환 필요
  }
}
