import { Module } from '@nestjs/common';
import { TokenService } from './service/token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../member/entity/member';
import { MemberRepository } from '../member/repository/member.repository';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';
import { AccessTokenStrategy } from './strategy/access.token.strategy';
import { TokenController } from './controller/token.controller';
import { TokenSoftGuard } from './guard/token.soft.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member]),
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
    MemberRepository,
    AccessTokenStrategy,
    TokenSoftGuard,
  ],
  exports: [TokenService],
  controllers: [TokenController],
})
export class TokenModule {}
