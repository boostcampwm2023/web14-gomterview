import { Module } from '@nestjs/common';
import { MemberService } from './service/member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entity/member';
import { MemberRepository } from './repository/member.repository';
import { MemberController } from './controller/member.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  providers: [MemberRepository, MemberService],
  exports: [MemberRepository],
  controllers: [MemberController],
})
export class MemberModule {}
