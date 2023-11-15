import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { MemberRepository } from '../../member/repository/member.repository';
import { Request } from 'express';
import { TokenPayload } from '../interface/token.interface';

@Injectable()
export class AccessTokenSoftStrategy extends PassportStrategy(
  Strategy,
  'jwt-soft',
) {
  constructor(private memberRepository: MemberRepository) {
    super({
      jwtFromRequest: (req: Request) => {
        if (!req.cookies || !req.cookies['accessToken']) {
          return '';
        }
        return req.cookies['accessToken'].replace('Bearer ', '');
      },
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: TokenPayload) {
    const id = payload.id;
    const user = await this.memberRepository.findById(id);

    if (!user) {
      return undefined;
    }

    return user;
  }
}
