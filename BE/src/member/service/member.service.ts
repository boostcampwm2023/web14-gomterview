import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from 'src/token/service/token.service';
import { MemberRepository } from '../repository/member.repository';
import { getTokenValue } from 'src/util/token.util';
import { MemberNicknameResponse } from '../dto/memberNicknameResponse';
import { companies } from 'src/constant/constant';

@Injectable()
export class MemberService {
  constructor(
    private tokenService: TokenService,
    private memberRepository: MemberRepository,
  ) {}
  async getNameForInterview(req: Request) {
    if (!req.cookies['accessToken'])
      return new MemberNicknameResponse(this.getNameWithPrefix(`면접자`));

    return new MemberNicknameResponse(
      this.getNameWithPrefix(
        (await this.getMemberByToken(getTokenValue(req))).nickname,
      ),
    );
  }

  private async getMemberByToken(tokenValue: string) {
    const memberId = (await this.tokenService.getPayload(tokenValue)).id;
    return await this.memberRepository.findById(memberId);
  }

  private getNameWithPrefix(nickname: string) {
    const randomCompany =
      companies[Math.floor(Math.random() * companies.length)];
    return `${randomCompany} 최종 면접에 들어온 ${nickname}`;
  }
}
