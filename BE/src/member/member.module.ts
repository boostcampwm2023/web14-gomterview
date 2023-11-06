import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entity/member';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  providers: [MemberService],
})
export class MemberModule {}
