import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../entity/member';

@Injectable()
export class MemberRepository {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}

  async save(member: Member) {
    await this.memberRepository.save(member);
  }

  async findById(id: number) {
    return await this.memberRepository.findOneBy({ id: id });
  }

  async findByEmail(email: string) {
    return await this.memberRepository.findOneBy({ email: email });
  }
}
