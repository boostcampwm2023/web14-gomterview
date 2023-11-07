import { Controller, Get, Param, Req } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { QuestionService } from '../service/question.service';
import { Request } from 'express';
import { getTokenValue } from 'src/util/token.util';
import { TokenService } from 'src/token/service/token.service';

@Controller('question')
export class QuestionController {
  constructor(
    private questionService: QuestionService,
    private tokenService: TokenService,
  ) {}

  @Get('')
  @ApiResponse({ status: 200, description: '회원가입을 위한 요청 api' })
  async findAllByCategory(
    @Param('category') category: string,
    @Req() request: Request,
  ): Promise<any> {
    return await this.questionService.findByCategory(
      category,
      await this.findMember(request),
    );
  }

  private async findMember(request: Request) {
    try {
      const token = getTokenValue(request);
      return await this.tokenService.findMemberbyAccessToken(token);
    } catch (e) {
      return undefined;
    }
  }
}
