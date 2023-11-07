import { Module } from '@nestjs/common';
import { TokenService } from './service/token.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Token} from "./entity/token";
import {Member} from "../member/entity/member";
import {TokenRepository} from "./repository/token.repository";
import {MemberRepository} from "../member/repository/member.repository";
import {PassportModule} from "@nestjs/passport";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports:[TypeOrmModule.forFeature([Token, Member]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET"),
        signOptions: {
          expiresIn: `${configService.get("JWT_EXPIRATION_TIME")}s`,
        },
      }),
    }),],
  providers: [TokenService, TokenRepository, MemberRepository]
})
export class TokenModule {}
