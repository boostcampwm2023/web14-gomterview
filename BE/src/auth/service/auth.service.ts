import { Injectable } from '@nestjs/common';
import { MemberRepository } from 'src/member/repository/member.repository';
import { OAuthRequest } from '../interface/auth.interface';
import { Member } from 'src/member/entity/member';
import { isEmpty } from 'class-validator';
import { TokenService } from '../../token/service/token.service';
import { BEARER_PREFIX } from 'src/constant/constant';
import { getValueFromRedis } from 'src/util/redis.util';

@Injectable()
export class AuthService {
  constructor(
    private memberRepository: MemberRepository,
    private tokenService: TokenService,
  ) {}

  async login(oauthRequest: OAuthRequest) {
    let member = await this.memberRepository.findByEmail(oauthRequest.email);

    if (isEmpty(member)) {
      member = await this.createMember(oauthRequest);
    }

    const savedAccessToken = await getValueFromRedis(member.email);
    if (isEmpty(savedAccessToken)) {
      return (
        BEARER_PREFIX +
        (await this.tokenService.assignToken(member.id, member.email))
      );
    }
    return BEARER_PREFIX + savedAccessToken;
  }

  async logout(accessToken: string) {
    await this.tokenService.removeToken(accessToken);
  }

  async reissue(accessToken: string) {
    return BEARER_PREFIX + (await this.tokenService.reissue(accessToken));
  }

  private async createMember(oauthRequest: OAuthRequest) {
    let member = new Member(
      undefined,
      oauthRequest.email,
      oauthRequest.name,
      oauthRequest.img,
      new Date(),
    );
    member = await this.memberRepository.save(member);
    return member;
  }
}
