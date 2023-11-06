import { Injectable } from '@nestjs/common';
import { MemberRepository } from 'src/member/repository/member.repository';
import { OAuthRequest } from '../dto/auth.interface';
import { Member } from 'src/member/entity/member';

@Injectable()
export class AuthService {
  constructor(private memberRepository: MemberRepository) {}

  async login(oauthRequest: OAuthRequest) {
    const member = await this.memberRepository.findByEmail(oauthRequest.email);

    if (isMemberNotFound(member)) {
      // 회원가입 진행
    }
    // 3. finally 토큰 반환(일단 json반환)
  }
}

const isMemberNotFound = (member: Member | undefined) => member === undefined;
