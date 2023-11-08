import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from '../entity/token';
import { Repository } from 'typeorm';

@Injectable()
export class TokenRepository {
  constructor(
    @InjectRepository(Token) readonly tokenRepository: Repository<Token>,
  ) {}

  async save(token: Token) {
    return await this.tokenRepository.save(token);
  }

  async findByAccessToken(accessToken: string) {
    return await this.tokenRepository.findOneBy({ accessToken: accessToken });
  }

  async remove(token: Token) {
    await this.tokenRepository.remove(token);
  }

  async deleteByRefreshToken(refreshToken: string) {
    await this.tokenRepository.delete({ refreshToken: refreshToken });
  }
}
