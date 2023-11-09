import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../interface/token.interface';
import 'dotenv/config';
import { MemberRepository } from '../../member/repository/member.repository';
import { InvalidTokenException } from '../exception/token.exception';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private memberRepository: MemberRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: TokenPayload) {
    const id = payload.id;
    const user = await this.memberRepository.findById(id);
    if (!user) throw new InvalidTokenException(); // 회원이 조회가 되지 않았다면, 탈퇴한 회원의 token을 사용한 것이므로 유효하지 않은 토큰을 사용한 것임
    return user;
  }
}
