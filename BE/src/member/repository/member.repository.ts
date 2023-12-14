import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../entity/member';
import { HOUR_IN_SECONDS } from '../../constant/constant';

@Injectable()
export class MemberRepository {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}

  async save(member: Member) {
    return await this.memberRepository.save(member);
  }

  async findById(id: number) {
    return await this.memberRepository.findOne({
      where: { id },
      cache: HOUR_IN_SECONDS * 1000, // milliSecond로
    });
  }

  async findByEmail(email: string) {
    return await this.memberRepository.findOne({
      where: { email },
      cache: HOUR_IN_SECONDS * 1000,
    });
  }

  async query(query: string) {
    return await this.memberRepository.query(query);
  }
}
