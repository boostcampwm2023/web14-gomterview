import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from 'src/token/service/token.service';
import { MemberRepository } from '../repository/member.repository';
import { getTokenValue } from 'src/util/token.util';

@Injectable()
export class MemberService {
  constructor(
    private tokenService: TokenService,
    private memberRepository: MemberRepository,
  ) {}
  async getNameForInterview(req: Request) {
    if (!req.cookies['accessToken']) return '면접자';

    // TODO: 추후에 랜덤 Prefix 생성할 필요가 있음
    return (await this.getMemberByToken(getTokenValue(req))).nickname;
  }

  async getMemberByToken(tokenValue: string) {
    const memberId = (await this.tokenService.getPayload(tokenValue)).id;
    return await this.memberRepository.findById(memberId);
  }
}
