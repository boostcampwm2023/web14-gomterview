import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
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
import { WorkbookResponse } from '../dto/workbookResponse';
import { WorkbookTitleResponse } from '../dto/workbookTitleResponse';
import { OptionalGuard } from '../../util/decorator.util';
import { TokenSoftGuard } from '../../token/guard/token.soft.guard';
import { isEmpty } from 'class-validator';
import { UpdateWorkbookRequest } from '../dto/updateWorkbookRequest';

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

  @Get()
  @ApiOperation({
    summary: '카테고리별(null이면 전체) 문제집 조회',
  })
  @ApiResponse(
    createApiResponseOption(200, '카테고리별(null이면 전체) 문제집 조회', [
      WorkbookResponse,
    ]),
  )
  async findWorkbooks(@Query('categoryId') categoryId: number) {
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
  async findSingleWorkbook(@Param('workbookId') workbookId: number) {
    return await this.workbookService.findSingleWorkbook(workbookId);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth()
  @ApiBody({ type: UpdateWorkbookRequest })
  @ApiOperation({
    summary: '문제집 수정',
  })
  @ApiResponse(
    createApiResponseOption(200, '문제집 수정 완료', WorkbookResponse),
  )
  async updateAnswer(
    @Body() updateWorkbookRequest: UpdateWorkbookRequest,
    @Req() req: Request,
  ) {
    return await this.workbookService.updateWorkbook(
      updateWorkbookRequest,
      req.user as Member,
    );
  }
}
