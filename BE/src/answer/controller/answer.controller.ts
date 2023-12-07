import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
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
import { Request, Response } from 'express';
import { createApiResponseOption } from '../../util/swagger.util';
import { Member } from '../../member/entity/member';
import { AnswerResponse } from '../dto/answerResponse';
import { DefaultAnswerRequest } from '../dto/defaultAnswerRequest';
import { TokenHardGuard } from 'src/token/guard/token.hard.guard';

@ApiTags('answer')
@Controller('/api/answer')
export class AnswerController {
  constructor(private answerService: AnswerService) {}

  @Post()
  @UseGuards(TokenHardGuard)
  @ApiCookieAuth()
  @ApiBody({ type: CreateAnswerRequest })
  @ApiOperation({
    summary: '질문에 새로운 답변 추가',
  })
  @ApiResponse(createApiResponseOption(201, '답변 생성 완료', AnswerResponse))
  @ApiResponse(createApiResponseOption(401, 'T01', null))
  @ApiResponse(createApiResponseOption(404, 'Q01', null))
  @ApiResponse(createApiResponseOption(410, 'T02', null))
  @ApiResponse(createApiResponseOption(500, 'SERVER', null))
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
  @UseGuards(TokenHardGuard)
  @ApiCookieAuth()
  @ApiBody({ type: DefaultAnswerRequest })
  @ApiOperation({
    summary: '질문의 대표답변 설정',
  })
  @ApiResponse(createApiResponseOption(201, '대표답변 설정 완료', null))
  @ApiResponse(createApiResponseOption(401, 'T01', null))
  @ApiResponse(createApiResponseOption(403, 'Q02', null))
  @ApiResponse(createApiResponseOption(404, 'A01, Q01', null))
  @ApiResponse(createApiResponseOption(410, 'T02', null))
  @ApiResponse(createApiResponseOption(500, 'SERVER', null))
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
    createApiResponseOption(200, '답변 리스트 캡슐화해 반환', [AnswerResponse]),
  )
  @ApiResponse(createApiResponseOption(404, 'Q01', null))
  async getQuestionAnswers(@Param('questionId') questionId: number) {
    return await this.answerService.getAnswerList(questionId);
  }

  @Delete(':answerId')
  @UseGuards(TokenHardGuard)
  @ApiCookieAuth()
  @ApiOperation({
    summary: '답변 삭제',
  })
  @ApiResponse(createApiResponseOption(204, '답변 삭제 완료', null))
  @ApiResponse(createApiResponseOption(401, 'T01', null))
  @ApiResponse(createApiResponseOption(403, 'A02', null))
  @ApiResponse(createApiResponseOption(404, 'A01', null))
  @ApiResponse(createApiResponseOption(410, 'T02', null))
  @ApiResponse(createApiResponseOption(500, 'SERVER', null))
  async deleteAnswer(
    @Param('answerId') answerId: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.answerService.deleteAnswer(answerId, req.user as Member);
    res.status(204).send();
  }
}
