import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { MemberRepository } from 'src/member/repository/member.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/member/entity/member';
import { GoogleStrategy } from './strategy/google.strategy';
import { Token } from '../token/entity/token';
import { TokenModule } from '../token/token.module';
@Module({
  imports: [TypeOrmModule.forFeature([Member, Token]), TokenModule],
  providers: [AuthService, MemberRepository, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
