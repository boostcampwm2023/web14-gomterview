import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuestionService } from '../service/question.service';
import { Request, Response } from 'express';
import { getTokenValue } from 'src/util/token.util';
import { TokenService } from 'src/token/service/token.service';
import { QuestionListResponse } from '../dto/questionListResponse';
import { createApiResponseOption } from '../../util/swagger.util';
import { AuthGuard } from '@nestjs/passport';
import { Member } from '../../member/entity/member';
import {CustomQuestionRequest} from "../dto/customQuestionRequest";

@Controller('api/question')
@ApiTags('question')
export class QuestionController {
  constructor(
    private questionService: QuestionService,
    private tokenService: TokenService,
  ) {}

  @Post('')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse(createApiResponseOption(201, '커스텀 질문 생성', null))
  async createCustomQuestion(@Req() req: Request, @Res() res: Response) {
    await this.questionService.createCustomQuestion(
      req.body as CustomQuestionRequest,
      req.user as Member,
    );
    res.send(201);
  }

  @Get('')
  @ApiResponse(
    createApiResponseOption(
      200,
      '카테고리별 게시물 조회 api',
      QuestionListResponse,
    ),
  )
  async findAllByCategory(
    @Param('category') category: string,
    @Req() request: Request,
  ): Promise<any> {
    return await this.questionService.findByCategory(
      category,
      await this.findMember(request),
    );
  }

  @Delete('')
  private async findMember(request: Request) {
    try {
      const token = getTokenValue(request);
      return Number((await this.tokenService.getPayload(token)).id);
    } catch (e) {
      return undefined;
    }
  }
}
