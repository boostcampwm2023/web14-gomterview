import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entity/member';
import { MemberRepository } from './repository/member.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  providers: [MemberRepository, MemberService],
  exports: [MemberRepository],
})
export class MemberModule {}
