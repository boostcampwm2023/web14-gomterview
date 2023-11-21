import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from 'src/token/service/token.service';
import { MemberRepository } from '../repository/member.repository';
import { getTokenValue } from 'src/util/token.util';
import { MemberNicknameResponse } from '../dto/memberNicknameResponse';

const companies = [
  '네이버',
  '카카오',
  '라인',
  '쿠팡',
  '우아한형제들',
  '당근',
  '비바리퍼블리카',
  'Microsoft',
  'Apple',
  'Google',
  'Amazon',
  'Meta',
];

@Injectable()
export class MemberService {
  constructor(
    private tokenService: TokenService,
    private memberRepository: MemberRepository,
  ) {}
  async getNameForInterview(req: Request) {
    if (!req.cookies['accessToken'])
      return new MemberNicknameResponse(`면접자`);

    // TODO: 추후에 랜덤 Prefix 생성할 필요가 있음
    return new MemberNicknameResponse(
      (await this.getMemberByToken(getTokenValue(req))).nickname,
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
