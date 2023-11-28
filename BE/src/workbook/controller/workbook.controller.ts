import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { WorkbookService } from '../service/workbook.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { createApiResponseOption } from '../../util/swagger.util';
import { Request } from 'express';
import { CreateWorkbookRequest } from '../dto/createWorkbookRequest';
import { Member } from '../../member/entity/member';
import { WorkbookIdResponse } from '../dto/workbookIdResponse';

@ApiTags('workbook')
@Controller('/api/workbook')
export class WorkbookController {
  constructor(private workbookService: WorkbookService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth()
  @ApiBody({ type: CreateWorkbookRequest })
  @ApiOperation({
    summary: '새로운 문제집 추가 추가',
  })
  @ApiResponse(
    createApiResponseOption(201, '문제집 생성 완료', WorkbookIdResponse),
  )
  async createAnswer(
    @Body() createWorkbookRequest: CreateWorkbookRequest,
    @Req() req: Request,
  ) {
    const workbook = await this.workbookService.createWorkbook(
      createWorkbookRequest,
      req.user as Member,
    );

    return WorkbookIdResponse.of(workbook);
  }
}
