import { Injectable } from '@nestjs/common';
import { MemberRepository } from 'src/member/repository/member.repository';
import { OAuthRequest } from '../dto/auth.interface';
import { Member } from 'src/member/entity/member';
import { isEmpty } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(private memberRepository: MemberRepository) {}

  async login(oauthRequest: OAuthRequest) {
    let member = await this.memberRepository.findByEmail(oauthRequest.email);

    if (isEmpty(member)) {
      member = await this.createMember(oauthRequest);
    }

    return JSON.stringify(member);
  }

  private async createMember(oauthRequest: OAuthRequest) {
    const member = new Member(
      undefined,
      oauthRequest.email,
      oauthRequest.name,
      oauthRequest.img,
      new Date(),
    );
    return await this.memberRepository.save(member);
  }
}
