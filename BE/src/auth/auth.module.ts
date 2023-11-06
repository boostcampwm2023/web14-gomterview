import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { MemberRepository } from 'src/member/repository/member.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/member/entity/member';
@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  providers: [AuthService, MemberRepository],
  controllers: [AuthController],
})
export class AuthModule {}
