import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from '../service/question.service';
import { CreateQuestionRequest } from '../dto/createQuestionRequest';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
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

@ApiTags('question')
@Controller('/api/question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth()
  @ApiBody({ type: CreateQuestionRequest })
  @ApiOperation({
    summary: '커스텀 질문 저장',
  })
  @ApiResponse(
    createApiResponseOption(201, '커스텀 질문 저장 완료', QuestionResponse),
  )
  async createCustomQuestion(
    @Body() createQuestionRequest: CreateQuestionRequest,
    @Req() req: Request,
  ) {
    return await this.questionService.createQuestion(
      createQuestionRequest,
      req.user as Member,
    );
  }

  @Get()
  @ApiOperation({
    summary: '카테고리별 질문 리스트 조회',
  })
  @ApiResponse(
    createApiResponseOption(200, 'QuestionResponse 리스트', [QuestionResponse]),
  )
  async findCategoryQuestions(@Query('category') categoryId: number) {
    return await this.questionService.findAllByCategory(categoryId);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth()
  @ApiOperation({
    summary: '질문 삭제',
  })
  @ApiResponse(createApiResponseOption(204, '질문 삭제', null))
  async deleteQuestionById(
    @Query('questionId') questionId: number,
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
