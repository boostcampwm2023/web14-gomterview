import { Controller, Get, Param, Req } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuestionService } from '../service/question.service';
import { Request } from 'express';
import { getTokenValue } from 'src/util/token.util';
import { TokenService } from 'src/token/service/token.service';
import { QuestionListResponse } from '../dto/questionListResponse';

@Controller('api/question')
@ApiTags('question')
export class QuestionController {
  constructor(
    private questionService: QuestionService,
    private tokenService: TokenService,
  ) {}

  @Get('')
  @ApiResponse({
    status: 200,
    description: '카테고리별 게시물 조회 api',
    type: QuestionListResponse,
  })
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
      return Number((await this.tokenService.getPayload(token)).id);
    } catch (e) {
      return undefined;
    }
  }
}
