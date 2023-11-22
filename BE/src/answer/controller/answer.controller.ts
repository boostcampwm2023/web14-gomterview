import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AnswerService } from '../service/answer.service';
import { CreateAnswerRequest } from '../dto/createAnswerRequest';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { createApiResponseOption } from '../../util/swagger.util';
import { Member } from '../../member/entity/member';
import { AnswerResponse } from '../dto/answerResponse';
import { DefaultAnswerRequest } from '../dto/defaultAnswerRequest';
import { AnswerListResponse } from '../dto/answerListResponse';

@ApiTags('answer')
@Controller('/api/answer')
export class AnswerController {
  constructor(private answerService: AnswerService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth()
  @ApiBody({ type: CreateAnswerRequest })
  @ApiOperation({
    summary: '질문에 새로운 답변 추가',
  })
  @ApiResponse(createApiResponseOption(201, '답변 생성 완료', AnswerResponse))
  async createAnswer(
    @Body() createAnswerRequest: CreateAnswerRequest,
    @Req() req: Request,
  ) {
    return await this.answerService.addAnswer(
      createAnswerRequest,
      req.user as Member,
    );
  }

  @Post('default')
  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth()
  @ApiBody({ type: DefaultAnswerRequest })
  @ApiOperation({
    summary: '질문의 대표답변 설정',
  })
  @ApiResponse(createApiResponseOption(201, '대표답변 설정 완료', null))
  async updateDefaultAnswer(
    @Body() defaultAnswerRequest: DefaultAnswerRequest,
    @Req() req: Request,
  ) {
    return await this.answerService.setDefaultAnswer(
      defaultAnswerRequest,
      req.user as Member,
    );
  }

  @Get(':questionId')
  @ApiOperation({
    summary: '질문의 답변 리스트 반환',
  })
  @ApiResponse(
    createApiResponseOption(
      200,
      '답변 리스트 캡슐화해 반환',
      AnswerListResponse,
    ),
  )
  async getQuestionAnswers(@Param('questionId') questionId: number) {
    const answerList = await this.answerService.getAnswerList(questionId);
    return AnswerListResponse.of(answerList);
  }
}
