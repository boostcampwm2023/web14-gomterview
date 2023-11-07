import { Injectable } from '@nestjs/common';
import { MemberRepository } from '../repository/member.repository';
import { TokenService } from 'src/token/service/token.service';
import { MemberResponse } from '../dto/memberResponse';

@Injectable()
export class MemberService {
  constructor(
    private tokenService: TokenService,
    private memberRepository: MemberRepository,
  ) {}

  async getMyInfo(accessToken: string) {
    const memberId = (await this.tokenService.getPayload(accessToken)).id;
    const user = await this.memberRepository.findById(memberId);
    return new MemberResponse(user);
  }
}
