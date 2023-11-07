import { Injectable } from '@nestjs/common';
import { MemberRepository } from 'src/member/repository/member.repository';
import { OAuthRequest } from '../interface/auth.interface';
import { Member } from 'src/member/entity/member';
import { isEmpty } from 'class-validator';
import {TokenService} from "../../token/service/token.service";

const BEARER_PREFIX:string = "Bearer ";

@Injectable()
export class AuthService {
  constructor(private memberRepository: MemberRepository, private tokenService:TokenService) {}

  async login(oauthRequest: OAuthRequest) {
    let member = await this.memberRepository.findByEmail(oauthRequest.email);

    if (isEmpty(member)) {
      member = await this.createMember(oauthRequest);
    }

    return  BEARER_PREFIX + (await this.tokenService.assignToken((member.id)));
  }

  private async createMember(oauthRequest: OAuthRequest) {
    const member = new Member(
      undefined,
      oauthRequest.email,
      oauthRequest.name,
      oauthRequest.img,
      new Date(),
    );
    return await this.memberRepository.save(member);
  }
}
