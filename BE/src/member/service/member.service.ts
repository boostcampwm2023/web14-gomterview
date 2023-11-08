import { Injectable } from '@nestjs/common';
import { MemberRepository } from '../repository/member.repository';
import { TokenService } from 'src/token/service/token.service';
import { MemberResponse } from '../dto/memberResponse';
import { ManipulatedTokenNotFiltered } from 'src/token/exception/token.exception';

@Injectable()
export class MemberService {
  constructor(
    private tokenService: TokenService,
    private memberRepository: MemberRepository,
  ) {}

  async getMyInfo(accessToken: string) {
    const memberId = (await this.tokenService.getPayload(accessToken)).id;
    const user = await this.memberRepository.findById(memberId);

    if (!memberId || !user) {
      throw new ManipulatedTokenNotFiltered();
    }

    return new MemberResponse(user);
  }
}
