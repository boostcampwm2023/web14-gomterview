import { Controller, Get, Req, UseGuards } from '@nestjs/common';
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
import { Member } from '../entity/member';
import {
  createApiHeaderOption,
  createApiResponseOption,
} from 'src/util/swagger.util';

@Controller('/api/member')
@ApiTags('member')
export class MemberController {
  constructor() {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth() // 문서 상에 자물쇠 아이콘을 표시하여 JWT가 필요하다는 것을 나타냄
  @ApiOperation({
    summary: '회원 정보를 반환하는 메서드',
  })
  @ApiHeader(
    createApiHeaderOption('Authorization', 'Access Token (Bearer Token)', true),
  )
  @ApiResponse(
    createApiResponseOption(
      200,
      '현재 사용자의 정보를 반환한다.',
      MemberResponse,
    ),
  )
  async getMyInfo(@Req() req: Request) {
    return MemberResponse.from(req.user as Member);
  }
}
