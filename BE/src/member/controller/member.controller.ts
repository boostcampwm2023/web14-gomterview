import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { MemberService } from '../service/member.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('/api/member')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getMyInfo(@Req() req: Request) {
    const token = getTokenValue(req);
    this.memberService.getMyInfo(token);
  }
}

const getTokenValue = (request: Request) =>
  request.header('Authorization').split(' ').pop(); // 리뷰 후 Util로 빼기
