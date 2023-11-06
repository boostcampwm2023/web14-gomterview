import { Injectable } from '@nestjs/common';
import { MemberRepository } from 'src/member/repository/member.repository';
import { OAuthRequest } from '../dto/auth.interface';
import { Member } from 'src/member/entity/member';

@Injectable()
export class AuthService {
  constructor(private memberRepository: MemberRepository) {}

  async login(oauthRequest: OAuthRequest) {
    let member = await this.memberRepository.findByEmail(oauthRequest.email);

    if (isMemberNotFound(member)) {
      member = await this.createMember(oauthRequest);
    }
    // 3. finally 토큰 반환(일단 json반환)
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

const isMemberNotFound = (member: Member | undefined) => member === undefined;
