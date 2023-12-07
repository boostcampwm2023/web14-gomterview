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
import { QuestionService } from '../service/question.service';
import { CreateQuestionRequest } from '../dto/createQuestionRequest';
import { Request, Response } from 'express';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { createApiResponseOption } from '../../util/swagger.util';
import { QuestionResponse } from '../dto/questionResponse';
import { Member } from '../../member/entity/member';
import { CopyQuestionRequest } from '../dto/copyQuestionRequest';
import { WorkbookIdResponse } from '../../workbook/dto/workbookIdResponse';
import { TokenHardGuard } from 'src/token/guard/token.hard.guard';

@ApiTags('question')
@Controller('/api/question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Post()
  @UseGuards(TokenHardGuard)
  @ApiCookieAuth()
  @ApiBody({ type: CreateQuestionRequest })
  @ApiOperation({
    summary: '커스텀 질문 저장',
  })
  @ApiResponse(
    createApiResponseOption(201, '커스텀 질문 저장 완료', QuestionResponse),
  )
  @ApiResponse(createApiResponseOption(500, 'SERVER', null))
  @ApiResponse(createApiResponseOption(401, 'T01', null))
  @ApiResponse(createApiResponseOption(410, 'T02', null))
  @ApiResponse(createApiResponseOption(404, 'W01', null))
  @ApiResponse(createApiResponseOption(403, 'W02', null))
  async createCustomQuestion(
    @Body() createQuestionRequest: CreateQuestionRequest,
    @Req() req: Request,
  ) {
    return await this.questionService.createQuestion(
      createQuestionRequest,
      req.user as Member,
    );
  }

  @Post('/copy')
  @UseGuards(TokenHardGuard)
  @ApiCookieAuth()
  @ApiBody({ type: CopyQuestionRequest })
  @ApiOperation({
    summary: '질문 복제',
  })
  @ApiResponse(createApiResponseOption(201, '질문 복제', WorkbookIdResponse))
  @ApiResponse(createApiResponseOption(500, 'SERVER', null))
  @ApiResponse(createApiResponseOption(401, 'T01', null))
  @ApiResponse(createApiResponseOption(410, 'T02', null))
  @ApiResponse(createApiResponseOption(404, 'W01', null))
  @ApiResponse(createApiResponseOption(403, 'W02', null))
  async copyQuestions(
    @Body() copyQuestionRequest: CopyQuestionRequest,
    @Req() req: Request,
  ) {
    return await this.questionService.copyQuestions(
      copyQuestionRequest,
      req.user as Member,
    );
  }

  @Get(':workbookId')
  @ApiOperation({
    summary: '카테고리별 질문 리스트 조회',
  })
  @ApiResponse(
    createApiResponseOption(200, 'QuestionResponse 리스트', [QuestionResponse]),
  )
  @ApiResponse(createApiResponseOption(500, 'SERVER', null))
  @ApiResponse(createApiResponseOption(401, 'T01', null))
  @ApiResponse(createApiResponseOption(410, 'T02', null))
  @ApiResponse(createApiResponseOption(400, 'W03', null))
  async findWorkbookQuestions(@Param('workbookId') workbookId: number) {
    return await this.questionService.findAllByWorkbookId(workbookId);
  }

  @Delete(':questionId')
  @UseGuards(TokenHardGuard)
  @ApiCookieAuth()
  @ApiOperation({
    summary: '질문 삭제',
  })
  @ApiResponse(createApiResponseOption(204, '질문 삭제', null))
  @ApiResponse(createApiResponseOption(401, 'T01', null))
  @ApiResponse(createApiResponseOption(403, 'W02', null))
  @ApiResponse(createApiResponseOption(404, 'W01, Q01', null))
  @ApiResponse(createApiResponseOption(410, 'T02', null))
  @ApiResponse(createApiResponseOption(500, 'SERVER', null))
  async deleteQuestionById(
    @Param('questionId') questionId: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.questionService.deleteQuestionById(
      questionId,
      req.user as Member,
    );
    res.status(204).send();
  }
}
