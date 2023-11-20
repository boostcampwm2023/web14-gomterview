import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { QuestionService } from '../service/question.service';
import { CreateQuestionRequest } from '../dto/createQuestionRequest';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { createApiResponseOption } from '../../util/swagger.util';
import { QuestionResponse } from '../dto/questionResponse';

@Controller('question')
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
  ) {
    return await this.questionService.createQuestion(createQuestionRequest);
  }
}
