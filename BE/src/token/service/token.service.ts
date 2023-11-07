import { Injectable } from '@nestjs/common';
import { TokenRepository } from '../repository/token.repository';
import { MemberRepository } from '../../member/repository/member.repository';
import { JwtService } from '@nestjs/jwt';
import { Token } from '../entity/token';
import { TokenPayload } from '../interface/token.interface';
import {
  InvalidTokenException,
  ManipulatedTokenNotFiltered,
  NeedToLoginException,
  TokenExpiredException,
} from '../exception/token.exception';

const ACCESS_TOKEN_EXPIRES_IN = '1h'; // 1 시간
const REFRESH_TOKEN_EXPIRES_IN = '7d'; // 7 일

@Injectable()
export class TokenService {
  constructor(
    readonly tokenRepository: TokenRepository,
    readonly memberRepository: MemberRepository,
    readonly jwtService: JwtService,
  ) {}

  async assignToken(memberId: number) {
    return await this.createToken(memberId);
  }

  async removeToken(accessToken: string) {
    const memberId = (await this.getPayload(accessToken)).id;
    const token = await this.findByAccessToken(accessToken);

    if (
      !token ||
      !memberId ||
      !(await this.memberRepository.findById(memberId))
    ) {
      throw new ManipulatedTokenNotFiltered();
    }

    await this.tokenRepository.remove(token);
  }

  async reissue(accessToken: string) {
    const token = await this.findByAccessToken(accessToken);

    if (!token) {
      throw new ManipulatedTokenNotFiltered();
    }

    return this.updateToken(token);
  }

  async findMemberbyAccessToken(accessToken: string) {
    const id = (await this.getPayload(accessToken)).id;
    return await this.memberRepository.findById(id);
  }

  private async findByAccessToken(accessToken: string) {
    return await this.tokenRepository.findByAccessToken(accessToken);
  }

  private async getPayload(singleToken: string) {
    try {
      return (await this.jwtService.verify(singleToken)) as TokenPayload;
    } catch (error) {
      await this.parseJwtError(error.message);
    }
  }

  private async updateToken(token: Token) {
    await this.validateRefreshToken(token.refreshToken);
    const payload = await this.getPayload(token.accessToken);
    const newToken = await this.signToken(payload.id, ACCESS_TOKEN_EXPIRES_IN);
    token.updateAccessToken(newToken);
    await this.tokenRepository.save(token);
    return newToken;
  }

  private async validateRefreshToken(refreshToken: string) {
    try {
      await this.jwtService.verify(refreshToken);
    } catch (e) {
      this.tokenRepository.deleteByRefreshToken(refreshToken);
      throw new NeedToLoginException();
    }
  }

  private async parseJwtError(message: string) {
    switch (message) {
      // 토큰에 대한 오류를 판단합니다.
      case 'INVALID_TOKEN':
      case 'TOKEN_IS_ARRAY':
      case 'NO_USER':
        throw new InvalidTokenException();

      case 'EXPIRED_TOKEN':
        throw new TokenExpiredException();

      default:
        throw new Error(message);
    }
  }

  private async createToken(memberId: number) {
    const accessToken = await this.signToken(memberId, ACCESS_TOKEN_EXPIRES_IN);
    const refreshToken = await this.signToken(
      memberId,
      REFRESH_TOKEN_EXPIRES_IN,
    );
    const token = new Token(refreshToken, accessToken);
    await this.tokenRepository.save(token);
    return accessToken;
  }

  private async signToken(memberId: number, expiresIn: string) {
    return await this.jwtService.signAsync({ id: memberId } as TokenPayload, {
      expiresIn: expiresIn,
    });
  }
}
