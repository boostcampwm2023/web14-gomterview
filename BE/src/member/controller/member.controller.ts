import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { MemberService } from '../service/member.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { MemberResponse } from '../dto/memberResponse';
import {
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiHeader,
} from '@nestjs/swagger';

@Controller('/api/member')
@ApiTags('member')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth() // 문서 상에 자물쇠 아이콘을 표시하여 JWT가 필요하다는 것을 나타냄
  @ApiOperation({
    summary: '회원 정보를 반환하는 메서드',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Access Token (Bearer Token)',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: '현재 사용자의 정보를 반환한다.',
    type: MemberResponse,
  })
  async getMyInfo(@Req() req: Request) {
    const token = getTokenValue(req);
    return await this.memberService.getMyInfo(token);
  }
}

const getTokenValue = (request: Request) =>
  request.header('Authorization').split(' ').pop(); // 리뷰 후 Util로 빼기
