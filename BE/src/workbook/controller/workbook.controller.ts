import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { WorkbookService } from '../service/workbook.service';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { createApiResponseOption } from '../../util/swagger.util';
import { Request, Response } from 'express';
import { CreateWorkbookRequest } from '../dto/createWorkbookRequest';
import { Member } from '../../member/entity/member';
import { WorkbookIdResponse } from '../dto/workbookIdResponse';
import { WorkbookResponse } from '../dto/workbookResponse';
import { WorkbookTitleResponse } from '../dto/workbookTitleResponse';
import { OptionalGuard } from '../../util/decorator.util';
import { TokenSoftGuard } from '../../token/guard/token.soft.guard';
import { isEmpty } from 'class-validator';
import { UpdateWorkbookRequest } from '../dto/updateWorkbookRequest';
import { TokenHardGuard } from 'src/token/guard/token.hard.guard';

@ApiTags('workbook')
@Controller('/api/workbook')
export class WorkbookController {
  constructor(private workbookService: WorkbookService) {}

  @Post()
  @UseGuards(TokenHardGuard)
  @ApiCookieAuth()
  @ApiBody({ type: CreateWorkbookRequest })
  @ApiOperation({
    summary: '새로운 문제집 추가 추가',
  })
  @ApiResponse(
    createApiResponseOption(201, '문제집 생성 완료', WorkbookIdResponse),
  )
  @ApiResponse(createApiResponseOption(500, 'SERVER', null))
  @ApiResponse(createApiResponseOption(401, 'T01', null))
  @ApiResponse(createApiResponseOption(404, 'C02', null))
  @ApiResponse(createApiResponseOption(410, 'T02', null))
  async createAnswer(
    @Body() createWorkbookRequest: CreateWorkbookRequest,
    @Req() req: Request,
  ) {
    const workbookId = await this.workbookService.createWorkbook(
      createWorkbookRequest,
      req.user as Member,
    );

    return new WorkbookIdResponse(workbookId);
  }

  @Get()
  @OptionalGuard()
  @UseGuards(TokenSoftGuard)
  @ApiOperation({
    summary: '카테고리별(null이면 전체) 문제집 조회',
  })
  @ApiResponse(
    createApiResponseOption(200, '카테고리별(null이면 전체) 문제집 조회', [
      WorkbookResponse,
    ]),
  )
  @ApiResponse(createApiResponseOption(404, 'C02', null))
  async findWorkbooks(@Query('category') categoryId: number) {
    return await this.workbookService.findWorkbooks(categoryId);
  }

  @Get('/title')
  @OptionalGuard()
  @UseGuards(TokenSoftGuard)
  @ApiOperation({
    summary: '회원의(null이면 Top5) 문제집 조회',
  })
  @ApiResponse(
    createApiResponseOption(200, '회원의(null이면 Top5) 문제집 조회', [
      WorkbookTitleResponse,
    ]),
  )
  @ApiResponse(createApiResponseOption(500, 'SERVER', null))
  @ApiResponse(createApiResponseOption(401, 'T01', null))
  @ApiResponse(createApiResponseOption(410, 'T02', null))
  async findMembersWorkbook(@Req() req: Request) {
    const member = isEmpty(req) ? null : (req.user as Member);
    return await this.workbookService.findWorkbookTitles(member);
  }

  @Get('/:workbookId')
  @ApiOperation({
    summary: '문제집 단건 조회',
  })
  @ApiResponse(
    createApiResponseOption(200, '문제집 단건 조회', WorkbookResponse),
  )
  @ApiResponse(createApiResponseOption(404, 'W01', null))
  async findSingleWorkbook(@Param('workbookId') workbookId: number) {
    return await this.workbookService.findSingleWorkbook(workbookId);
  }

  @Patch()
  @UseGuards(TokenHardGuard)
  @ApiCookieAuth()
  @ApiBody({ type: UpdateWorkbookRequest })
  @ApiOperation({
    summary: '문제집 수정',
  })
  @ApiResponse(
    createApiResponseOption(200, '문제집 수정 완료', WorkbookResponse),
  )
  @ApiResponse(createApiResponseOption(500, 'SERVER', null))
  @ApiResponse(createApiResponseOption(404, 'C02, W01', null))
  @ApiResponse(createApiResponseOption(403, 'W02', null))
  async updateAnswer(
    @Body() updateWorkbookRequest: UpdateWorkbookRequest,
    @Req() req: Request,
  ) {
    return await this.workbookService.updateWorkbook(
      updateWorkbookRequest,
      req.user as Member,
    );
  }

  @Delete('/:workbookId')
  @UseGuards(TokenHardGuard)
  @ApiCookieAuth()
  @ApiOperation({
    summary: '문제집 삭제',
  })
  @ApiResponse(createApiResponseOption(204, '문제집 삭제 완료', null))
  @ApiResponse(createApiResponseOption(500, 'SERVER', null))
  @ApiResponse(createApiResponseOption(404, 'W01', null))
  @ApiResponse(createApiResponseOption(403, 'W02', null))
  async deleteAnswer(
    @Req() req: Request,
    @Param('workbookId') workbookId: number,
    @Res() res: Response,
  ) {
    await this.workbookService.deleteWorkbookById(
      workbookId,
      req.user as Member,
    );
    res.status(204).send();
  }
}
