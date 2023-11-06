import { Injectable } from '@nestjs/common';
import { MemberRepository } from 'src/member/repository/member.repository';
import { OAuthRequest } from '../dto/auth.interface';

@Injectable()
export class AuthService {
  constructor(private memberRepository: MemberRepository) {}

  async login(oauthRequest: OAuthRequest) {
    // 1. DB에서 조회
    // 2. 없다면 회원 저장
    // 3. finally 토큰 반환(일단 json반환)
  }
}
