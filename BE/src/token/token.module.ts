import { Module } from '@nestjs/common';
import { TokenService } from './service/token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entity/token';
import { Member } from '../member/entity/member';
import { TokenRepository } from './repository/token.repository';
import { MemberRepository } from '../member/repository/member.repository';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';
import { AccessTokenStrategy } from './strategy/access.token.strategy';
import { TokenController } from './token.controller';
import { TokenSoftGuard } from './guard/token.soft.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token, Member]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
      }),
    }),
  ],
  providers: [
    TokenService,
    TokenRepository,
    MemberRepository,
    AccessTokenStrategy,
    TokenSoftGuard,
  ],
  exports: [TokenService],
  controllers: [TokenController],
})
export class TokenModule {}
