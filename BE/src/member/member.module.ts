import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entity/member';
import { MemberRepository } from './repository/member.repository';
import { MemberController } from './controller/member.controller';
import { TokenModule } from 'src/token/token.module';
import { MemberService } from './service/member.service';

@Module({
  imports: [TypeOrmModule.forFeature([Member]), TokenModule],
  providers: [MemberRepository, MemberService],
  exports: [MemberRepository],
  controllers: [MemberController],
})
export class MemberModule {}
