import { Injectable } from '@nestjs/common';
import { MemberRepository } from '../../member/repository/member.repository';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../interface/token.interface';
import {
  InvalidTokenException,
  ManipulatedTokenNotFiltered,
  NeedToLoginException,
  TokenExpiredException,
} from '../exception/token.exception';
import {
  ACCESS_TOKEN_EXPIRES_IN,
  HOUR_IN_SECONDS,
  REFRESH_TOKEN_EXPIRES_IN,
  WEEK_IN_SECONDS,
} from 'src/constant/constant';
import {
  deleteFromRedis,
  getValueFromRedis,
  saveToRedisWithExpireIn,
} from 'src/util/redis.util';
import { isEmpty } from 'class-validator';

@Injectable()
export class TokenService {
  constructor(
    readonly memberRepository: MemberRepository,
    readonly jwtService: JwtService,
  ) {}

  async assignToken(memberId: number, email: string) {
    return await this.createToken(memberId, email);
  }

  async removeToken(accessToken: string) {
    const memberId = (await this.getPayload(accessToken)).id;

    if (!memberId || !(await this.memberRepository.findById(memberId))) {
      throw new ManipulatedTokenNotFiltered();
    }
    await deleteFromRedis(accessToken);
  }

  async reissue(accessToken: string) {
    const refreshToken = await getValueFromRedis(accessToken);

    // Redis에 accessToken으로 조회 할 수 있는 것이 없다면, refreshToken에 대한 정보도 알 수 없는 것이므로 재로그인이 필요
    if (isEmpty(refreshToken)) {
      throw new NeedToLoginException();
    }

    return await this.updateToken(accessToken, refreshToken);
  }

  async getPayload(singleToken: string) {
    try {
      return (await this.jwtService.verify(singleToken)) as TokenPayload;
    } catch (error) {
      await this.parseJwtError(error.message);
    }
  }

  async findMemberByToken(
    singleToken: string,
    throwException: boolean = false,
  ) {
    try {
      const payload = await this.getPayload(singleToken);
      const memberId = payload.id;

      return await this.memberRepository.findById(memberId);
    } catch (error) {
      if (throwException) throw error;
      return null;
    }
  }

  async getDevToken() {
    return this.createToken(1, 'developndd@gmail.com'); // 1번은 developndd 이메일로 가입한 개발자용 회원임
  }

  private async updateToken(accessToken: string, refreshToken: string) {
    const payload = await this.validateRefreshToken(refreshToken);
    const newToken = await this.signToken(payload.id, ACCESS_TOKEN_EXPIRES_IN);
    await deleteFromRedis(accessToken); // 기존 토큰 삭제
    await saveToRedisWithExpireIn(newToken, refreshToken, WEEK_IN_SECONDS); // 새로운 토큰 저장
    return newToken;
  }

  private async validateRefreshToken(refreshToken: string) {
    try {
      return (await this.jwtService.verify(refreshToken)) as TokenPayload;
    } catch (e) {
      throw new NeedToLoginException();
    }
  }

  private async parseJwtError(message: string) {
    switch (message) {
      // 토큰에 대한 오류를 판단합니다.
      case 'jwt expired':
        throw new TokenExpiredException();

      default:
        throw new InvalidTokenException();
    }
  }

  private async createToken(memberId: number, email: string) {
    const accessToken = await this.signToken(memberId, ACCESS_TOKEN_EXPIRES_IN);
    const refreshToken = await this.signToken(
      memberId,
      REFRESH_TOKEN_EXPIRES_IN,
    );
    await saveToRedisWithExpireIn(email, accessToken, HOUR_IN_SECONDS);
    await saveToRedisWithExpireIn(accessToken, refreshToken, WEEK_IN_SECONDS);
    return accessToken;
  }

  private async signToken(memberId: number, expiresIn: string) {
    return await this.jwtService.signAsync({ id: memberId } as TokenPayload, {
      expiresIn,
    });
  }
}
